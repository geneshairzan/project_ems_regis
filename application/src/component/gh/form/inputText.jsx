import React from "react";

import { TextField, Stack } from "@mui/material";
import Label from "./label";

export default function App({ noLabel = false, grow = false, ...props }) {
  return (
    <Stack spacing={0.5} width={props.fullWidth ? "100%" : "auto"} flexGrow={grow}>
      {props.label && <Label label={props.label || props.name} tip={props.tip} />}
      <TextField
        {...props}
        sx={{
          ...props.sx,
          "& .MuiFormHelperText-root": {
            position: "absolute",
            bottom: -16,
            borderColor: "red",
          },
        }}
        label=""
        type={props.type || "text"}
        value={props.value || ""}
        placeholder={props.placeholder}
        error={props.error ? true : false}
        helperText={props.helperText}
      />
    </Stack>
  );
}
