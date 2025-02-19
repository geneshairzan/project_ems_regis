import React, { useEffect, useState } from "react";

import UI from "@gh/ui";
import Icon from "@gh/icon";
import Context from "@/component/context";
import { Tabs, Tab, Menu, MenuItem, Drawer, IconButton } from "@mui/material";

import Login from "./_login";
import Register from "./_register";
import MenuList from "@/component/app/_menuRenderer";

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
      <UI.IconButton color="fwhite" onClick={(e) => (auth?.user ? setAnchorEl(e.currentTarget) : setmodalOpen(true))}>
        {auth?.user ? <Icon.Menu /> : <Icon.Person />}
      </UI.IconButton>
      <Drawer anchor={"left"} open={Boolean(anchorEl)} onClose={handleClose}>
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

export function AuthForm({}) {
  const [value, setvalue] = useState(0);
  const [onPasscode, setonPasscode] = useState(false);
  useEffect(() => {
    value == 0 && setonPasscode(false);
  }, [value]);

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
        sx={{
          width: "100%",
          bgcolor: "#1f2937",
          pt: 2,
          pb: 5,
          px: 2,
          borderRadius: 2,
        }}
      >
        <Login onLogged={() => {}} onPasscode={setonPasscode} />
      </UI.Col>
    </UI.Col>
  );
}
