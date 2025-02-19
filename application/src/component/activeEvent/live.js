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
      <BG />
      <UI.Col
        sx={{
          zIndex: 2,
          alignItems: "center",
        }}
        py="100px"
      >
        <UI.Text variant="h2" color="white" mb={"36px"}>
          Live
        </UI.Text>
        <iframe
          width="640"
          height="480"
          src={data?.video_path}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          // allowfullscreen
        ></iframe>
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
        src="/assets/img/bg-live.png"
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
