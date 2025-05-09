import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";

export default function App({ onClick, children, sx, fontStye, disabled = false, onLoading = false, is_disabled = false }) {
  let bg_color = "linear-gradient(82.58deg, #DC7000 24.83%, #FCBE39 76.24%, #FFFFFF 100%)"
  let btn_font_size_xs = 24
  let btn_font_size_md = 48
  let hov_op = 0.8
  let hov_ptr = 'pointer'
  if (is_disabled) {
    btn_font_size_xs = 24
    btn_font_size_md = 30
    hov_op = 1
    hov_ptr = 'not-allowed'
    bg_color = "linear-gradient(82.58deg,rgb(119, 116, 112) 24.83%,rgb(68, 68, 68) 100%)"
  }
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
        background: bg_color,
        boxShadow: " 0px 10px 20px 0px #00000059",
        borderRadius: 1,
        ...(disabled && { filter: "grayscale(1)" }),
        ...sx,
        "&:hover": {
          opacity: hov_op,
          cursor: hov_ptr,
        },
      }}
      onClick={() => !disabled && !onLoading && onClick()}
    >
      {onLoading && <UI.Loader size={36} />}
      {!onLoading && (
        <UI.Text
          sx={{
            fontSize: {
              xs: btn_font_size_xs,
              md: btn_font_size_md,
            },
            color: "white",
            ...fontStye,
          }}
        >
          {children}
        </UI.Text>
      )}
    </UI.Col>
  );
}
