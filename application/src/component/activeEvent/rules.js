import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";

export default function App({ data }) {
  return (
    <UI.Col
      id="RULES"
      sx={{
        position: "relative",
        top: 0,
        overflow: "hidden",
      }}
    >
      <UI.Col
        sx={{
          zIndex: 2,
          alignItems: "center",
          px: 2,
          py: {
            xs: "32px",
            md: "100px",
          },
        }}
      >
        <UI.Text variant="h2" bold>
          RULES
        </UI.Text>
        <UI.Col
          sx={{
            maxWidth: 1080,
            pt: "38px",
          }}
        >
          {data.map((d, ix) => (
            <UI.Col
              key={ix}
              sx={{
                borderBottom: "1px solid lightgrey",
                py: 2,
              }}
            >
              <UI.Text>{`${ix + 1}. ${d}`}</UI.Text>
            </UI.Col>
          ))}
        </UI.Col>
      </UI.Col>
    </UI.Col>
  );
}
