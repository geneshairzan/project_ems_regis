//https://s-yadav.github.io/react-number-format/docs/intro/

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NumericFormat } from "react-number-format";
import { TextField, Typography, Stack, InputAdornment } from "@mui/material";
import Label from "./label";
import _ from "lodash";

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, prefix, ...other } = props;

  return (
    <NumericFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      // isNumericString
      // prefix={prefix}
    />
  );
});

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default function FormattedInputs({ prefix = `IDR `, suffix = ``, value, onChange, disabled = false, variant = "outlined", ...props }) {
  // const [val, setval] = useState();
  // useEffect(() => {
  //   props.value(val);
  // }, [val]);
  return (
    <Stack spacing={1} width={"100%"}>
      {props.label && <Label label={props.label} tip={props.tip} />}
      <TextField
        {..._.omit(props, ["value"])}
        variant={variant}
        // inputProps={{
        //   prefix: prefix,
        // }}
        disabled={disabled}
        slotProps={{
          input: {
            prefix: prefix,
            inputComponent: NumberFormatCustom,
            startAdornment: prefix ? <InputAdornment position="start">{prefix}</InputAdornment> : undefined,
            endAdornment: suffix ? <InputAdornment position="end">{suffix}</InputAdornment> : undefined,
          },
        }}
        value={value || ""}
        // InputProps={{
        //   inputComponent: NumberFormatCustom,
        //   startAdornment: prefix && <InputAdornment position="start">{prefix}</InputAdornment>,
        //   endAdornment: suffix && <InputAdornment position="end">{suffix}</InputAdornment>,
        // }}
        label=""
        onChange={onChange}
        sx={{
          ...props.sx,
          bgcolor: "white.main",
          border: "none",
        }}
      />
    </Stack>
  );
}
