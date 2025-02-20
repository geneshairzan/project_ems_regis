import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import Context from "@context";
import Form from "./_form";

export default function App(props) {
  const { r } = React.useContext(Context);

  if (!r.query?.id) return;
  return (
    <UI.Col width="100%">
      <FormRegis id={r.query?.id} />
    </UI.Col>
  );
}

function FormRegis({ id }) {
  let event = useFetch({ url: `event/${id}` });
  let loc = useFetch({ url: `data/location?_token=223344!!` });

  return (
    <UI.Col
      sx={{
        position: "relative",
        mb: "50px",
        // overflowY: "auto",
        maxWidth: "100vw",
      }}
    >
      <BG />
      <UI.Col
        sx={{
          py: 3,
          alignItems: "center",
          zIndex: 2,
          px: 2,
          maxWidth: "100vw",
        }}
      >
        <UI.Text variant="h2" bold py={"50px"}>
          REGISTRATIONS
        </UI.Text>
        <UI.Col
          center
          sx={{
            width: "100vw",
            maxWidth: {
              xs: "calc(100vw - 36px)",
              md: 1080,
            },
            zIndex: 1,
            boxShadow: "0px 4px 20px 0px #00000080",
            bgcolor: "white",
            py: 4,
          }}
        >
          <Form loc={loc.data} event={event?.data} />
        </UI.Col>
      </UI.Col>
    </UI.Col>
  );
}

function BG(params) {
  return (
    <UI.Col
      sx={{
        position: "absolute",
        zIndex: 1,
        width: "100vw",
        top: 0,
      }}
    >
      <img
        src="/assets/img/standing-bg.png"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
        }}
      />
    </UI.Col>
  );
}
