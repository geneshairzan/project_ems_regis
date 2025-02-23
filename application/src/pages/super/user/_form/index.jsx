import React, { useState, useEffect } from "react";

import UI from "@/component/gh/ui";
import Form from "@/component/gh/form";
import Icon from "@gh/icon";

import { useContext } from "react";
import Context from "@/component/context";
import { useRouter } from "next/router";
import { useFormik } from "formik";

import * as yup from "yup";
import useFetch, { fetcher } from "@gh/helper/useFetch";

import DynamicFormRenderer from "@gh/form/renderer";
import RelationForm from "@gh/form/renderer/relationForm";
import { getInfo } from "@/model";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { redirect } from "next/navigation";

const validationSchema = yup.object({
  email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
});

export default function Main({ refdata }) {
  const { app } = useContext(Context);
  const router = useRouter();
  const formik = useFormik({
    initialValues: refdata ? refdata : {},
    validationSchema: validationSchema,
    onSubmit: async ({ type, role, has_pwd, new_pp, ...payload }) => {
      let res = await fetcher({
        url: `user`,
        method: "post",
        data: {
          ...payload,
        },
      });

      if (res?.data?.id && new_pp) {
        let res2 = await fetcher({
          multipart: true,
          url: `upload`,
          method: "post",
          data: {
            new_img: new_pp,
            name: res?.data?.id,
            storage: "user",
            model: "user",
            pid: res?.data?.id,
            old: res.data.img,
          },
        });

        res2?.data && router.push(`/super/user`);
      } else {
        router.push(`/super/user`);
      }
    },
  });

  return (
    <UI.Col spacing={2}>
      <UI.Row alignItems="center" spacing={1}>
        <UI.IconButton onClick={() => router.back()}>
          <Icon.Back />
        </UI.IconButton>
        <UI.Text variant="h6" bold capitalize>
          User
        </UI.Text>
      </UI.Row>

      <UI.Col
        spacing={2}
        sx={{
          bgcolor: "app.bg",
          padding: 2,
        }}
      >
        {/* <Form.ImgCrop
          refimg={refdata?.img && process.env.NEXT_PUBLIC_APP_URL + "/api/file/user/" + refdata?.img}
          result={(e) => formik.setFieldValue("new_pp", e)}
          triggerEl={
            <UI.Col
              sx={{
                bgcolor: "grey",
                borderRadius: "50%",
                width: 120,
                height: 120,
              }}
              center
            >
              <AddPhotoAlternateIcon
                sx={{
                  fontSize: 64,
                  color: "white",
                }}
              />
            </UI.Col>
          }
        /> */}
        {/* <Form.Text name="name" label="name" value={formik.values.name} onChange={formik.handleChange} /> */}
        <Form.Text
          name="email"
          label="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.errors.email}
          helperText={formik.errors.email}
        />

        {/* <Form.Text name="phone" label="phone" value={formik.values.phone} onChange={formik.handleChange} />
        <Form.Text name="company" label="company" value={formik.values.company} onChange={formik.handleChange} />
        <Form.Text name="title" label="title" value={formik.values.title} onChange={formik.handleChange} />
        <Form.Data url={"userrole"} name="role_id" label="role" value={formik.values.role_id} onChange={formik.handleChange} />
        <Form.Data url={"usertype"} name="type_id" label="type" value={formik.values.type_id} onChange={formik.handleChange} /> */}
        <Form.Text name="password" label="New Password" type="password" value={formik.values.password} onChange={formik.handleChange} />
      </UI.Col>

      <UI.Row alignItems="flex-end">
        <UI.Button
          onClick={formik.handleSubmit}
          type="submit"
          sx={{
            width: "180px",
          }}
          disabled={formik.onSubmit}
          onLoading={formik.onSubmit}
        >
          Save Changes
        </UI.Button>
      </UI.Row>
    </UI.Col>
  );
}
