import { Stack } from "@mui/material";
import Icon from "@mui/material/Icon";

export default function IconButton({ size = 24, color = "grey", name = "star", iconStyle, ...props }) {
  return (
    <Stack
      {...props}
      sx={{
        p: 0.5,
        color: color,
        fontSize: size,
        "&:hover": {
          opacity: 0.8,
          cursor: "pointer",
        },
        ...iconStyle,
      }}
    >
      <Icon
        style={{
          fontSize: size,
        }}
      >
        {name}
      </Icon>
    </Stack>
  );
}
