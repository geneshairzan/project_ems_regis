import * as React from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Stack, Checkbox } from "@mui/material";

export default function RadioButtonsGroup({ label, defaultChecked = false, onChange, value, name, color }) {
  return (
    <FormControlLabel
      control={<Checkbox color={color} checked={value ? true : false} />}
      label={label}
      onClick={(e) =>
        onChange({
          target: {
            e: e,
            name: name,
            value: e.target.checked,
          },
        })
      }
      sx={{
        m: !label && 0,
      }}
    />
  );
}
