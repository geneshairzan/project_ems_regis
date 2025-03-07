import * as React from "react";
import { Stack } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Label from "./label";
import h from "@gh/helper";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

export default function DatePickerText({ disablePast = false, showplaceholder = false, clearable = false, noLabel = false, error = false, ...props }) {
  return (
    <Stack spacing={1} flex={1}>
      {!noLabel && <Label label={props.label} tip={props.tip} />}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          {...props}
          onChange={(v) =>
            props.onChange({
              target: {
                value: dayjs(v),
                name: props?.name,
              },
            })
          }
          slotProps={{
            textField: {
              error: false,
            },
          }}
          value={dayjs(props.value) || null}
          label=""
          // inputFormat="DD MMM YYYY"
          // format="DD MMM YYYY h.m"
          format="DD MM YYYY HH:mm"
          sx={{
            bgcolor: "white.main",
            "& .MuiFormHelperText-root": {
              position: "absolute",
              bottom: -16,
            },
          }}
        />
      </LocalizationProvider>
    </Stack>
  );
}
