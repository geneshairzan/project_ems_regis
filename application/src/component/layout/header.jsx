import React, { useState } from "react";

import UI from "@gh/ui";

import Context from "@/component/context";

import ModalLogin from "@gh/modalLogin";
import Link from "next/link";

import { AppBar } from "@mui/material";
import { useRouter } from "next/router";

export default function App({ grey = false }) {
  let r = useRouter();
  const { auth } = React.useContext(Context);
  return (
    <AppBar
      position="fixed"
      sx={
        {
          // bgcolor: "#111827",
        }
      }
    >
      <UI.Row spacing={2} spaced justifyContent="space-between" px={2} py={1} bgcolor="primary.main">
        <UI.Col onClick={() => r.push("/")}>
          <img
            src={process.env.NEXT_PUBLIC_APP_LOGO}
            style={{
              height: 32,
            }}
            alt=""
          />
        </UI.Col>
        {auth.user?.id && <ModalLogin auth={auth} setmodalOpen={() => {}} />}
      </UI.Row>
    </AppBar>
  );
}
