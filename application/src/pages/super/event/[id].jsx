import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import { useRouter } from "next/router";

import Form from "./_form";
import Context from "@/component/context";
import useFetch from "@gh/helper/useFetch";

export default function ModelForm(props) {
  const { app } = React.useContext(Context);
  const router = useRouter();
  const refdata = useFetch({
    url: `event/${router.query.id || "noid"}`,
    method: "get",
  });

  if (!refdata.get()) return;
  return <UI.Stack>{<Form refdata={refdata.get()} />}</UI.Stack>;
}
