import React from "react";
import { Button, Stack } from "@mui/material";
import Context from "@/component/context";
import CircularProgress from "@mui/material/CircularProgress";

export default function App({ small, label, children, onLoading, ...props }) {
  const { app } = React.useContext(Context);

  function getStartIcon(params) {
    if (props.type == "submit") {
      app.isLoading ? <CircularProgress size={"14px"} color="fwhite" /> : props.startIcon;
    }
    return props.startIcon;
  }
  return (
    <Button
      {...props}
      disabled={(props.type == "submit" && app.isLoading) || props.disabled}
      sx={{
        width: small && "180px",
        ...props.sx,
      }}
      startIcon={getStartIcon()}
    >
      {onLoading ? <CircularProgress size={"14px"} color="fwhite" /> : children}
    </Button>
  );
}
