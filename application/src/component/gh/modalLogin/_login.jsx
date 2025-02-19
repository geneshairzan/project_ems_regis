import React, { useState } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import h from "@gh/helper";
import Badge from "@mui/material/Badge";
import Context from "@/component/context";
import { Tabs, Tab, Menu, MenuItem } from "@mui/material";
import Form from "@gh/form";

import { useFormik } from "formik";
import * as yup from "yup";
import Google from "./_google";
import LoginForget from "./_loginForget";
import { fetcher } from "@gh/helper/useFetch";
import { useRouter } from "next/router";

export default function App({ onLogged, onPasscode }) {
  let r = useRouter();
  const [err, seterr] = useState();
  const { auth, app } = React.useContext(Context);
  const [onForget, setonForget] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    // validationSchema: validationSchema,
    onSubmit: async (values) => {
      let res = await fetcher({
        url: `auth/signin`,
        method: "post",
        data: values,
      });
      if (res?.data?.id) {
        auth.signin(res.data);
        onLogged(true);
        r.replace("/super");
      } else {
        seterr("Authentication Failed");
      }
    },
  });

  async function signin() {
    let res = await fetcher({
      url: `auth/signin`,
      method: "post",
      data: { email: "admin@admin.com" },
    });
  }

  if (onForget) return <LoginForget onLogged={onLogged} onPasscode={onPasscode} />;

  return (
    <UI.Col spacing={2}>
      <UI.Col center pt={3}>
        <UI.Text variant="h4" bold>
          SUPER
        </UI.Text>
      </UI.Col>
      <Form.Text label="email" name="email" value={formik.values.email} onChange={formik.handleChange} />
      <Form.Text label="password" type="password" name="password" value={formik.values.password} onChange={formik.handleChange} />

      <UI.Text
        variant="body2"
        color="error"
        sx={{
          minHeight: 16,
        }}
      >
        {err}
      </UI.Text>
      <UI.Button onClick={formik.handleSubmit}>Signin</UI.Button>
    </UI.Col>
  );
}
