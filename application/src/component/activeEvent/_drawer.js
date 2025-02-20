import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";

export default function App(props) {
  return (
    <UI.Row justifyContent="flex-end" alignItems="center">
      <UI.IconButton name="menu" color="white" size={36} />
    </UI.Row>
  );
}
