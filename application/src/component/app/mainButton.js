import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";

export default function App({ onClick, children, sx }) {
  return (
    <UI.Col
      center
      sx={{
        width: 390,
        height: 120,
        background: "linear-gradient(82.58deg, #DC7000 24.83%, #FCBE39 76.24%, #FFFFFF 100%)",
        borderRadius: 1,
        ...sx,
        "&:hover": {
          opacity: 0.8,
          cursor: "pointer",
        },
      }}
      onClick={onClick}
    >
      <UI.Text
        sx={{
          fontSize: 48,
          color: "white",
          textTransform: "uppercase",
        }}
      >
        {children}
      </UI.Text>
    </UI.Col>
  );
}
