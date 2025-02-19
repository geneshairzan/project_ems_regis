import { Stack } from "@mui/material";
import Icon from "@mui/material/Icon";
import { useTheme } from "@mui/material/styles";

export default function IconButton({ size = 24, color = "grey", name = "star", sx, ...props }) {
  let theme = useTheme();

  function getColor() {
    if (color.includes(".")) {
      let c = color.split(".");
      return theme?.palette[c[0]]?.[c[1]];
    }
    return color;
  }
  return (
    <Icon
      style={{
        fontSize: size,
        color: getColor(),
        ...sx,
      }}
    >
      {name}
    </Icon>
  );
}
