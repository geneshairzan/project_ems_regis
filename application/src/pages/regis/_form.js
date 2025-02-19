import React, { useState, useEffect, useRef } from "react";
import UI from "@gh/ui";
import Form from "@gh/form";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import { useFormik } from "formik";
import InputKabupaten from "@/component/app/input/inputKabupaten";
import LabelRegister from "@/component/app/input/labelRegister";
import Context from "@context";

export default function App({ refdata, loc, event }) {
  const { r } = React.useContext(Context);
  let photoinput = [
    {
      label: "ID Card Photo",
      name: "photo_path",
      bg: "ico_photo_player",
      notes: "*Foto setengah badan",
    },
    {
      label: "Foto ID",
      name: "photo_id_path",
      bg: "ico_photo_id",
      notes: "*KTP/Kartu Pelajar/SIM",
    },
    {
      label: "Screenshoot Rank",
      name: "photo_ss_path",
      bg: "ico_rank",
      notes: "*KTP/Kartu Pelajar/SIM",
    },
  ];

  const formik = useFormik({
    initialValues: refdata || {},
    // validationSchema: validationSchema,
    onSubmit: async (payload) => {
      // console.log(payload);
      let res = await fetcher({
        url: `registrant`,
        method: "post",
        multipart: true,
        data: {
          ...payload,
          event_id: event.id,
        },
      });
      r.push("/success");
      // console.log(res.data);
      // if (res?.data?.id) {
      //   auth.signin(res.data);
      //   onLogged(true);
      //   r.replace("/home");
      // } else {
      //   seterr("Authentication Failed");
      // }
    },
  });

  return (
    <UI.Col center maxWidth="920px" width="100vw" position="relative">
      <UI.Col maxWidth="720px" width="80%" position="relative">
        <Label l="Nama Lengkap" />
        <Form.Text name="name" value={formik.values.name} onChange={formik.handleChange} />

        <Label l="Tanggal Lahir" />
        <Form.Date name="dob" value={formik.values.dob} onChange={formik.handleChange} />

        <Label l="Lokasi" />
        <InputKabupaten value={formik.values.kabupaten_id} onChange={(e) => formik.setFieldValue("kabupaten_id", e)} />

        <Label l="Nickname" />
        <Form.Text name="name_nick" value={formik.values.name_nick} onChange={formik.handleChange} />

        <Label l="Ingame ID" />
        <Form.Text name="game_id" value={formik.values.game_id} onChange={formik.handleChange} />

        <Label l="No. HP/WA" />
        <Form.Currency name="hp" prefix="+62" value={formik.values.hp} onChange={formik.handleChange} />

        <UI.Row justifyContent="center" gap={5}>
          <InputPhoto data={photoinput[0]} value={formik.values.photo_path} onChange={(e) => formik.setFieldValue("photo_path", e)} />
          <InputPhoto data={photoinput[1]} value={formik.values.photo_id_path} onChange={(e) => formik.setFieldValue("photo_id_path", e)} />
        </UI.Row>

        <Label l="Rank" />
        <Form.Select
          options={[
            { id: 1, name: "Legend" },
            { id: 2, name: "Mytic" },
            { id: 3, name: "Mytic Glory" },
          ]}
          label="Rank"
          name="rank"
          value={formik.values.rank}
          onChange={formik.handleChange}
        />
        <UI.Col center>
          <InputPhoto data={photoinput[2]} value={formik.values.photo_ss_path} onChange={(e) => formik.setFieldValue("photo_ss_path", e)} />
        </UI.Col>

        <Form.Select
          options={event?.tanggal_options?.map((d, ix) => ({
            id: ix,
            name: d,
          }))}
          label="Tournament Date"
          name="tournament_date"
          value={formik.values.tournament_date}
          onChange={formik.handleChange}
        />
      </UI.Col>

      <UI.Col
        gap={1}
        sx={{
          flex: 1,
          borderTop: "1px solid lightgrey",
          borderBottom: "1px solid lightgrey",
          py: "32px",
          my: "24px",
        }}
      >
        <UI.Row>
          <Form.Checkbox value={formik.values.sk} onChange={() => formik.setFieldValue("sk", !formik.values.sk)} />

          <UI.Text variant="body1">
            Lorem ipsum dolor sit amet consectetur. Suspendisse varius urna nunc nec lacinia <br />
            porttitor hendrerit sagittis.
            <span
              style={{
                color: "#0066ff",
                textDecoration: "underline",
              }}
            >
              Syarat & Ketentuan.
            </span>
          </UI.Text>
        </UI.Row>
        <UI.Row>
          <Form.Checkbox value={formik.values.tc} onChange={() => formik.setFieldValue("tc", !formik.values.tc)} />
          <UI.Text variant="body1">
            aaa Lorem ipsum dolor sit amet consectetur. Suspendisse varius urna nunc nec lacinia <br />
            porttitor hendrerit sagittis.
            <span
              style={{
                color: "#0066ff",
                textDecoration: "underline",
              }}
            >
              Syarat & Ketentuan.
            </span>
          </UI.Text>
        </UI.Row>
      </UI.Col>

      {!refdata?.id && (
        <UI.Col center>
          <UI.Col
            center
            sx={{
              width: 390,
              height: 120,
              borderRadius: 1,
              background: "linear-gradient(82.58deg, #DC7000 24.83%, #FCBE39 76.24%, #FFFFFF 100%)",
              boxShadow: "0px 10px 20px 0px #00000059",
              "&:hover": {
                opacity: 0.8,
                cursor: "pointer",
              },
            }}
            onClick={formik.handleSubmit}
          >
            {formik.isSubmitting ? (
              <UI.Loader />
            ) : (
              <UI.Text
                sx={{
                  fontSize: 48,
                  color: "white",
                }}
              >
                Confirm
              </UI.Text>
            )}
          </UI.Col>
        </UI.Col>
      )}
    </UI.Col>
  );
}

function InputPhoto({ data, value, onChange }) {
  const inputRef = useRef();
  return (
    <UI.Col>
      <Label l={data.label} />
      <UI.Col onClick={() => inputRef.current.click()} center sx={{ border: "1px solid lightgrey", borderRadius: 1, width: 192, height: 192, p: 1 }}>
        {value && <img src={URL.createObjectURL(value)} alt="Preview" style={{ height: "100%", width: "100%", objectFit: "contain" }} />}
        {!value && (
          <>
            <img src={`/assets/img/${data.bg}.png`} alt="" />
            <UI.Col
              sx={{
                height: 56,
                width: 56,
                bgcolor: "error.main",
                borderRadius: 28,
                position: "absolute",
              }}
              center
            >
              <UI.Icon name="add" size={32} color="white" />
            </UI.Col>
          </>
        )}
      </UI.Col>
      <UI.Text variant="body2" align="center" pt={1}>
        {data.notes}
      </UI.Text>
      <input
        multiple={false}
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        onChange={(e) => {
          onChange(e.target.files[0]);
          if (inputRef.current) {
            inputRef.current.value = "";
          }
        }}
      />
    </UI.Col>
  );
}

function Label({ l }) {
  return (
    <UI.Text variant="body1" align="center" bold pt={3} pb={1}>
      {l}
    </UI.Text>
  );
}
