import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";

export default function App(props) {
  return (
    <UI.Col px={{ xs: 2, md: 5 }} width="100%">
      Active Event
    </UI.Col>
  );
}
