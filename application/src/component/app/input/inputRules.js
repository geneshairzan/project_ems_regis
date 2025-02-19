import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Form from "@gh/form";
import useFetch, { fetcher } from "@gh/helper/useFetch";

export default function App({ value, onChange }) {
  function handleChange(v, ix) {
    let temp = value;
    temp[ix] = v;
    onChange([...temp]);
  }

  function handleDelete(ix) {
    let temp = value;
    temp.splice(ix, 1);
    onChange([...temp]);
  }

  return (
    <UI.Col gap={1}>
      <UI.Text variant="body2" bold color="primary">
        Rules
      </UI.Text>
      <UI.Col gap={2}>
        {value.map((d, ix) => (
          <UI.Col
            key={ix}
            sx={{
              position: "relative",
            }}
          >
            <Form.Text rows={3} multiline value={d} onChange={(e) => handleChange(e.target.value, ix)} />
            <UI.Col
              onClick={() => handleDelete(ix)}
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                bgcolor: "grey",
                borderRadius: "50%",
                p: "2px",
              }}
            >
              <UI.Icon name="close" color="error.main" size={20} />
            </UI.Col>
          </UI.Col>
        ))}

        <UI.Button variant="outlined" onClick={() => onChange([...value, ""])}>
          + Add Rules
        </UI.Button>
      </UI.Col>
    </UI.Col>
  );
}
