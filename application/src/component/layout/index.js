import React from "react";
import UI from "@gh/ui";
import Context from "@/component/context";
import Header from "./header";
import { useRouter } from "next/router";

export default function Layout(props) {
  const { app, r } = React.useContext(Context);
  const onPrint = app.onprint;

  return (
    <UI.Col
      sx={
        onPrint
          ? {}
          : {
              width: "100%",
              height: "100dvh",
              maxHeight: "100dvh",
              position: "absolute",
              overflow: "auto",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              // bgcolor: "#fafafa",
              bgcolor: r.asPath.includes("/super") ? "#6b7280" : "white",
              alignItems: "center",
            }
      }
    >
      {!onPrint && <Header />}
      <UI.Col
        sx={{
          maxWidth: onPrint ? {} : { xs: "100vw", md: "1280px" },
          width: "100%",
          py: onPrint ? 0 : 3,
          px: onPrint ? {} : { xs: 2, md: 0 },
          zIndex: 99,
          height: onPrint ? "auto" : "100dvh",
          overflow: "auto",
          mt: onPrint ? 0 : 5,
        }}
      >
        {props.children}
      </UI.Col>

      {app?.isLoading == 1 && <UI.Loader modal={true} />}
      {app?.fetcherCallback != null && <UI.FetcherCallback type={app?.fetcherCallback.type} message={app?.fetcherCallback.message} />}
    </UI.Col>
  );
}
