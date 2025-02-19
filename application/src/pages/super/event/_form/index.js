import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Form from "@gh/form";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import { useFormik } from "formik";

import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { JsonEditor } from "json-edit-react";
import InputStanding from "@/component/app/input/inputStanding";
import InputSlider from "@/component/app/input/inputSlider";
import InputRules from "@/component/app/input/inputRules";
import InputTurnamentDates from "@/component/app/input/inputTurnamentDates";
import Context from "@context";

//https://www.npmjs.com/package/react-json-editor-ajrm

export default function App({ refdata }) {
  const { r } = React.useContext(Context);
  const formik = useFormik({
    initialValues: refdata?.id
      ? {
          ...refdata,
          _newfile: refdata?.attachment,
          rules: refdata.rules || [""],
          tanggal_options: refdata.tanggal_options || [""],
          standing_json: JSON.stringify(refdata.standing_json),
        }
      : {
          standing_json: [],
          _newfile: [],
          rules: [""],
          tanggal_options: [""],
        },
    // validationSchema: validationSchema,
    onSubmit: async ({ _newfile, attachment, ...payload }) => {
      let res = await fetcher({
        url: `event`,
        method: "post",
        data: {
          ...payload,
        },
      });

      if (_newfile) {
        await Promise.all(
          _newfile.map(async (e) => {
            // Use a different variable name to avoid shadowing the outer res
            await fetcher({
              url: `upload`,
              method: "post",
              multipart: true,
              data: {
                ownerId: res.data.id, // Use the id from the outer res
                ownerType: "event",
                ...(e.deleted_at && { deleted_at: true, id: e.id }),
                ...(e._new && { file: e?._new }),
              },
            });
          })
        );
      }

      r.replace("/super");
    },
  });

  return (
    <UI.Col
      gap={2}
      sx={
        {
          // bgcolor: "#f5f5f5",
          // p: 2,
        }
      }
    >
      <Form.Text label="Nama Event" name="name" value={formik.values.name} onChange={formik.handleChange} />
      <Form.Text label=" Event Desc" name="desc" multiline rows={5} value={formik.values.desc} onChange={formik.handleChange} />

      <InputSlider multiple onChange={(e) => formik.setFieldValue("_newfile", e)} value={formik.values._newfile.map((d, ix) => ({ ...d, _tid: ix }))} />

      <UI.Row gap={2}>
        <Form.Date label="Tanggal Mulai" name="start" value={formik.values.start} onChange={formik.handleChange} />
        <Form.Date label="Tanggal Selesai" name="end" value={formik.values.end} onChange={formik.handleChange} />
      </UI.Row>
      <Form.Currency label="Maximum Participant" prefix="" name="max_pax" value={formik.values.max_pax} onChange={formik.handleChange} />

      <InputTurnamentDates value={formik.values.tanggal_options} onChange={(e) => formik.setFieldValue("tanggal_options", e)} />
      <InputRules value={formik.values.rules} onChange={(e) => formik.setFieldValue("rules", e)} />
      <Form.Text
        label="Standing HTML"
        rows={5}
        multiline
        value={formik.values.standing_json}
        onChange={(e) => formik.setFieldValue("standing_json", e.target.value)}
      />
      <Form.Text label="Group HTML" rows={5} multiline value={formik.values.group_json} onChange={(e) => formik.setFieldValue("group_json", e.target.value)} />
      <Form.Text
        label="Video URL"
        name="video_path"
        placeholder="https://www.youtube.com/embed/Xoe5IQ6kxpY"
        value={formik.values.video_path}
        onChange={formik.handleChange}
      />

      <UI.Button onClick={formik.handleSubmit}>Save</UI.Button>
    </UI.Col>
  );
}
