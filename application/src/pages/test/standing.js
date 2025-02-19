import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";

export default function App(props) {
  return (
    <UI.Col
      flex={1}
      width="100%"
      sx={{
        "& div": {
          display: "flex",
        },
      }}
    >
      <div
        style={{
          flexDirection: "row",
        }}
      >
        <div
          style={{
            width: 60,
          }}
        >
          #
        </div>
        <div
          style={{
            width: 60,
          }}
        >
          Team
        </div>
      </div>
    </UI.Col>
  );
}
