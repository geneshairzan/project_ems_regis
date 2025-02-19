import React from "react";
import UI from "@gh/ui";
import { AuthForm } from "@gh/modalLogin";
import Link from "next/link";
import Context from "@/component/context";

export default function Pages(props) {
  return (
    <UI.Col overflow="auto" center height="100dvh" width="100vw">
      <UI.Col
        sx={{
          zIndex: 2,
          height: "100%",
          width: "100%",
        }}
        center
      >
        <AuthForm
          sx={{
            background: "rgba(255, 255, 255, 0.6)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(5px)",
          }}
        />
      </UI.Col>
    </UI.Col>
  );
}
