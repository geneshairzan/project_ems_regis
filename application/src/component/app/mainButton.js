import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";

export default function App({ onClick, children, sx, disabled = false, onLoading = false }) {
  return (
    <UI.Col
      center
      sx={{
        width: {
          xs: 200,
          md: 390,
        },
        height: {
          xs: 64,
          md: 80,
        },
        background: "linear-gradient(82.58deg, #DC7000 24.83%, #FCBE39 76.24%, #FFFFFF 100%)",
        boxShadow: " 0px 10px 20px 0px #00000059",
        borderRadius: 1,
        ...(disabled && { filter: "grayscale(1)" }),
        ...sx,
        "&:hover": {
          opacity: 0.8,
          cursor: "pointer",
        },
      }}
      onClick={() => !disabled && onClick()}
    >
      {onLoading && <UI.Loader size={36} />}
      {!onLoading && (
        <UI.Text
          sx={{
            fontSize: {
              xs: 24,
              md: 48,
            },
            color: "white",
          }}
        >
          {children}
        </UI.Text>
      )}
    </UI.Col>
  );
}
