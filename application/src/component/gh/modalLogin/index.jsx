import React, { useEffect, useState } from "react";

import UI from "@gh/ui";
import Form from "@gh/form";
import Icon from "@gh/icon";
import Context from "@/component/context";
import { Tabs, Tab, Menu, MenuItem, Drawer, IconButton } from "@mui/material";

import Login from "./_login";
import Register from "./_register";
import MenuList from "@/component/app/_menuRenderer";
import { functions } from "lodash";
import { fetcher } from "@gh/helper/useFetch";
import useSwitch from "@gh/useSwitch";

export default function App({ grey = false, auth, extraMenu }) {
  const { app } = React.useContext(Context);
  const [modalOpen, setmodalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClose = (path) => {
    setAnchorEl(null);
  };

  useEffect(() => {
    !modalOpen && app.set("forcelogin", false);
  }, [auth.user]);

  return (
    <>
      <UI.IconButton
        color="fwhite"
        name={auth?.user?.id ? "menu" : "person"}
        onClick={(e) => (auth?.user ? setAnchorEl(e.currentTarget) : setmodalOpen(true))}
      />

      <Drawer anchor={"right"} open={Boolean(anchorEl)} onClose={handleClose}>
        <UI.Col width="100vw" maxWidth={300} py={3} justifyContent="space-between" height="100%">
          <UI.Col px={2}>
            <UI.Row justifyContent="space-between" alignItems="flex-start">
              <UI.Col
                sx={{
                  width: 48,
                  height: 48,
                  bgcolor: "primary.main",
                  borderRadius: "50%",
                  color: "white",
                }}
                center
              >
                <UI.Text variant="h3" mt={-0.5}>
                  {auth?.user?.name?.[0]}
                </UI.Text>
              </UI.Col>

              <UI.Col alignItems="flex-end">
                <UI.Text variant="body1">Hi, {auth?.user?.name}</UI.Text>
                <UI.Text variant="body2" color="grey">
                  {auth?.user?.email}
                </UI.Text>
                <UI.Text variant="body2" color="primary">
                  {auth?.user?.role_name}
                </UI.Text>
              </UI.Col>
            </UI.Row>
          </UI.Col>
          <MenuList onClick={handleClose} />
        </UI.Col>
      </Drawer>
      <UI.Modal open={modalOpen || app.forcelogin ? true : false} onClose={() => !onPasscode && setmodalOpen(false)}>
        <AuthForm />
      </UI.Modal>
    </>
  );
}

export function AuthForm({ sx }) {
  const { auth } = React.useContext(Context);
  const AuthInputRef = React.createRef();

  const [step, setstep] = useState(0);
  const [form, setform] = useState({});
  const [onLoading, setonLoading] = useState(false);
  const [err, seterr] = useState();

  async function getPasscode(params) {
    setonLoading(true);
    let res = await fetcher({
      url: "auth/passcode",
      method: "post",
      data: form,
    });
    setonLoading(false);

    if (step == 0) setstep(1);
    if (step == 1 && !res.data) {
      seterr("authentication failed");
      setform({ token: null });
    }

    if (res.data) {
    } else {
      // setstep(0);
      // setform({});
      // seterr("authentication failed");
    }

    if (res?.data?.token) {
      auth.signin(res.data);
    }
  }

  function handleSubmit() {
    if (step < 2) {
      getPasscode();
      // AuthInputRef.current?.clear();
    }
  }

  function handleForm(e) {
    setform({ ...form, [e.target]: e.value });
  }

  function handleBack(params) {
    setstep(0);
    setform({});
    seterr();
  }

  useEffect(() => {
    form?.token?.length == 4 && handleSubmit();
  }, [form?.token]);

  return (
    <UI.Col center width="100%" p={2} maxWidth={480} spacing={2}>
      <img
        src={process.env.NEXT_PUBLIC_APP_LOGO}
        style={{
          height: 120,
        }}
        alt=""
      />
      <UI.Text variant="h5" color="white" bold>
        Event Management System
      </UI.Text>
      <UI.Col
        spacing={2}
        sx={{
          width: "100%",
          bgcolor: "#1f2937",
          padding: 4,
          borderRadius: 3,
        }}
      >
        <UI.Text variant="h5" color="white" bold>
          Sign in to your account
        </UI.Text>

        {step == 0 && (
          <UI.Col>
            <Form.Text
              name="email"
              value={form?.email}
              onChange={(e) =>
                handleForm({
                  value: e?.target.value,
                  target: "email",
                })
              }
              label="email"
              placeholder="name@company.com"
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  getPasscode();
                  // Code to execute when Enter is pressed
                }
              }}
            />
          </UI.Col>
        )}
        {step == 1 && (
          <UI.Col center>
            <UI.Text variant="label">Please input passcode that we sent to your email</UI.Text>
            <Form.Passcode
              length={4}
              // value={form?.token}
              onChange={(e) =>
                handleForm({
                  value: e,
                  target: "token",
                })
              }
              ref={AuthInputRef}
            />
          </UI.Col>
        )}

        <UI.Button onClick={handleSubmit} disabled={onLoading} onLoading={onLoading}>
          Sign in
        </UI.Button>
        {err && (
          <UI.Col justifyContent="space-between" spacing={2}>
            {/* <UI.Button variant="outlined" color="fwhite" onClick={() => AuthInputRef.current?.clear()}>
              clear
            </UI.Button> */}
            <UI.Button variant="outlined" color="fwhite" onClick={handleBack}>
              back
            </UI.Button>
            <UI.Text variant="body1" color="error.main" align="center">
              {err}
            </UI.Text>
          </UI.Col>
        )}
      </UI.Col>
    </UI.Col>
  );
}
