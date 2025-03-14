import React, { useState, useEffect, useRef } from "react";
import UI from "@gh/ui";
import Form from "@gh/form";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import { useFormik } from "formik";
import InputKabupaten from "@/component/app/input/inputKabupaten";
import LabelRegister from "@/component/app/input/labelRegister";
import Context from "@context";
import MainButton from "@/component/app/mainButton";
import RemoteImg from "@/component/remoteImg";

export default function App({ refdata, loc, event }) {
  const [error, setError] = useState(false);
  const [isDuplicate, setisDuplicate] = useState(false);
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
      label: "Screenshot Rank",
      name: "photo_ss_path",
      bg: "ico_rank",
      notes: "*KTP/Kartu Pelajar/SIM",
    },
  ];

  const formik = useFormik({
    initialValues: refdata || { sk: false, tc: false },
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
      if (res.data == "duplicate") {
        setisDuplicate(true);
      } else {
        r.push(`/success?eid=${event.id}`);
      }
    },
  });

  function emailCheck() {
    const isValid = /\S+@\S+\.\S+/.test(formik.values.email); // Simple email regex
    setError(!isValid);
  }

  function isValid() {
    if (
      !formik.values?.name ||
      !formik.values?.hp ||
      !formik.values?.game_id ||
      !formik.values?.email ||
      !formik.values?.photo_ss_path ||
      !Boolean(parseInt(formik.values?.tournament_date) >= 0) ||
      !formik.values?.tc
    )
      return false;
    return true;
  }

  return (
    <UI.Col center maxWidth="920px" width="100%" position="relative" px={2}>
      <UI.Col
        maxWidth="720px"
        position="relative"
        sx={{
          width: "90%",
        }}
      >
        <Label l="Nama Lengkap" />
        <Form.Text name="name" value={formik.values.name} onChange={formik.handleChange} />

        {/* <Label l="Tanggal Lahir" />
        <Form.Date name="dob" value={formik.values.dob} onChange={formik.handleChange} /> */}

        {/* <Label l="Lokasi" />
        <InputKabupaten value={formik.values.kabupaten_id} onChange={(e) => formik.setFieldValue("kabupaten_id", e)} /> */}
        <Label l="No. HP/WA" />
        <Form.Text name="hp" prefix="+62" value={formik.values.hp} onChange={(e) => formik.setFieldValue("hp", e.target.value.replace(/\D/g, ""))} />

        <Label l="Email" />
        <Form.Text
          error={error}
          helperText={error && "Invalid Email Address"}
          name="email"
          onBlur={emailCheck}
          value={formik.values.email}
          onChange={formik.handleChange}
        />

        <Label l="UID" />
        <Form.Text name="game_id" value={formik.values.game_id} onChange={formik.handleChange} />

        <Label l="Nickname / Ingame Name" />
        <Form.Text name="nickname" value={formik.values.nickname} onChange={formik.handleChange} />
        {/* 
        <UI.Stack
          sx={{
            flexDirection: {
              xs: "column",
              md: "row",
            },
            justifyContent: "center",
            alignItems: "center",
          }}
          gap={5}
        >
          <InputPhoto data={photoinput[0]} value={formik.values.photo_path} onChange={(e) => formik.setFieldValue("photo_path", e)} />
          <InputPhoto data={photoinput[1]} value={formik.values.photo_id_path} onChange={(e) => formik.setFieldValue("photo_id_path", e)} />
        </UI.Stack> */}

        {/* <Label l="Rank" />
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
        /> */}
        <UI.Col center>
          <InputPhoto data={photoinput[2]} value={formik.values.photo_ss_path} onChange={(e) => formik.setFieldValue("photo_ss_path", e)} />
          <Sample />
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
        <UI.Row alignItems="center">
          <Form.Checkbox value={formik.values.tc} onChange={() => formik.setFieldValue("tc", !formik.values.tc)} />
          <UI.Text variant="body1">
            {`Saya setuju dengan syarat dan ketentuan tournament `}
            <UI.Text
              component="a"
              // href={`https://mcggesports.id/events?id=${event?.id}#RULES`}
              href="https://docs.google.com/document/d/1TtRtmdyunRJIcwh6UUYE92FFZBuT_s2dYxuPzs1Ap74/edit?usp=sharing"
              target="_blank"
              sx={{
                color: "#0066ff",
                textDecoration: "underline",
              }}
            >
              {`Syarat & Ketentuan.`}
            </UI.Text>
          </UI.Text>
        </UI.Row>
      </UI.Col>

      {!refdata?.id && (
        <UI.Col center>
          {isDuplicate && (
            <UI.Text color="error.main" pb={2}>
              This user already registered in out system
            </UI.Text>
          )}
          <MainButton onLoading={formik.isSubmitting} disabled={!isValid()} onClick={formik.handleSubmit}>
            Confirm
          </MainButton>
          {/* <UI.Col
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
          </UI.Col> */}
        </UI.Col>
      )}
    </UI.Col>
  );
}

function Sample(params) {
  const [onPreview, setonPreview] = useState(false);
  return (
    <>
      <UI.Row
        onClick={() => setonPreview(true)}
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
        }}
      >
        <UI.Text variant="body1">
          {`* Contoh Screenshot lihat `}
          <span
            style={{
              color: "primary",
              textDecoration: "underline",
              fontWeight: "bold",
            }}
          >
            {`disini`}
          </span>
        </UI.Text>
      </UI.Row>
      {onPreview && (
        <UI.Modal open>
          <UI.Col
            sx={{
              width: "100vw",
              height: "100vh",
              bgcolor: "black",
              position: "relative",
            }}
          >
            <UI.Col
              sx={{
                position: "absolute",
                top: "32px",
                right: "32px",
              }}
            >
              <UI.IconButton onClick={() => setonPreview(false)} name="close" size={48} color="white" />
            </UI.Col>
            <img
              src={`/assets/img/sample-ss.jpg`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
            {/* <img
              src={`${process.env.NEXT_PUBLIC_ASSET_URL}/assets/img/sample-ss.jpg`}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            /> */}
          </UI.Col>
        </UI.Modal>
      )}
    </>
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
      {/* <UI.Text variant="body2" align="center" pt={1}>
        {data.notes}
      </UI.Text> */}
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
