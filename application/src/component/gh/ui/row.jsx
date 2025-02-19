import { Stack } from "@mui/material";

export default function App({ center, spaced = false, ...props }) {
  return (
    <Stack
      direction={"row"}
      sx={{
        ...(spaced && {
          justifyContent: "space-between",
          alignItems: "center",
        }),
        ...(center && {
          justifyContent: "center",
          alignItems: "center",
        }),
        ...props.sx,
      }}
      {...props}
    >
      {props.children}
    </Stack>
  );
}
