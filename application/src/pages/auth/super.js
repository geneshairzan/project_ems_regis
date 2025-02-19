import React from "react";
import UI from "@gh/ui";
import { AuthForm } from "@gh/modalLogin/default";
import Link from "next/link";
import Context from "@/component/context";

export default function Pages(props) {
  return (
    <UI.Col width="100%" height="100%" center>
      <AuthForm />
    </UI.Col>
  );
}
