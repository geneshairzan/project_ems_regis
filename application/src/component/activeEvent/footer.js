import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";

export default function App({ data }) {
  let logo = ["logo_mt.png", "logo_mcgg.png", "logo_bd.png"];
  return (
    <UI.Col
      sx={{
        position: "relative",
        top: 0,
        overflow: "hidden",
        background: "linear-gradient(180deg, #1A1B1F 50%, #1D1D3A 100%)",
        height: 210,
        width: "100%",
      }}
      center
    >
      <UI.Row gap={4} height={36}>
        {logo.map((d, ix) => (
          <img
            key={ix}
            src={`/assets/img/${d}`}
            alt=""
            style={{
              // objectFit: "cover",
              height: "100%",
              width: "auto",
            }}
          />
        ))}
      </UI.Row>
      <UI.Text variant="body1" color="white" pt="44px">
        Contact Us:{" "}
        <a href="mailto:mobilechess.help@moonton.com">
          mobilechess.help@moonton.com
        </a>
      </UI.Text>
      <UI.Text variant="body1" color="white" pt="12px">
        © Moonton. All rights reserved.
      </UI.Text>
    </UI.Col>
  );
}
