import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import Button from "@/component/app/mainButton";
import Context from "@context";

export default function App(props) {
  const { r } = React.useContext(Context);
  return (
    <UI.Col px={{ xs: 2, md: 5 }} width="100%" flex={1} center>
      <UI.Text variant="h1">Success</UI.Text>
      <Button onClick={() => r.push("/")}>Return</Button>
    </UI.Col>
  );
}
