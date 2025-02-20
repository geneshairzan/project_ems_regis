import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import Button from "@/component/app/mainButton";
import Context from "@context";

export default function App(props) {
  const { r } = React.useContext(Context);
  return (
    <UI.Col px={{ xs: 2, md: 5 }} width="100%" flex={1} center gap={2}>
      <UI.Text variant="h2">Registrasi Berhasil</UI.Text>
      <UI.Text variant="body1">Silahkan menunggu proses verifikasi dari admin</UI.Text>
      <Button onClick={() => r.push(`/events?id=${r.query.eid}`)}>Return</Button>
    </UI.Col>
  );
}
