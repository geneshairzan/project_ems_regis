import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";

export default function App({ data }) {
  return (
    <UI.Col
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
        }}
        py="100px"
      >
        <UI.Text variant="h2">RULES</UI.Text>
        <UI.Col
          sx={{
            maxWidth: 1080,
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

function BG(params) {
  return (
    <UI.Col
      sx={{
        position: "absolute",
        zIndex: 1,
        width: "100%",
      }}
    >
      <img
        src="/assets/img/standing-bg.png"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </UI.Col>
  );
}
