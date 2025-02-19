import "../../public/assets/css/global.css";

import Layout from "@/component/layout";
import React, { useState, useEffect } from "react";

import Context from "@/component/context";
import useauth from "@context/reducer/useauth";
import useapp from "@context/reducer/useapp";
import ThemeProvider from "@context/theme";
import AppMiddleware from "@/component/middleware/client";
import { useRouter } from "next/router";
import UI from "@gh/ui";
import { Snackbar, Alert } from "@mui/material";

export default function MyApp({ Component, pageProps }) {
  const r = useRouter();
  const auth = useauth();
  const app = useapp();

  if (auth?.user == "loading") return <></>;
  return (
    <Context.Provider
      value={{
        auth,
        app,
        r,
      }}
    >
      <ThemeProvider
        // isDark={false}
        isDark={r.asPath.includes("/super")}
      >
        <UI.Col
          minHeight={"100dvh"}
          overflow={"hidden"}
          width={"100vw"}
          // bgcolor={r.asPath.includes("/super") ? "white" : "#111827"}
          // center
        >
          <AppMiddleware>
            <Component {...pageProps} key={r?.asPath} />
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              open={app?.get("snack")?.open}
              autoHideDuration={3000}
              onClose={app?.closeSnack}
            >
              <Alert onClose={app?.closeSnack} color="fwhite" variant="filled" sx={{ width: "100%" }}>
                {app?.get("snack")?.msg}
              </Alert>
            </Snackbar>
          </AppMiddleware>
        </UI.Col>
      </ThemeProvider>
    </Context.Provider>
  );
}
