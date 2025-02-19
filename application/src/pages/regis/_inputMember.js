import React, { useState } from "react";

import UI from "@gh/ui";
import Form from "@gh/form";
import Context from "@context";
import { tableConfig } from "@/component/constant";

export default function App({ value, onChange, units, items }) {
  const { r } = React.useContext(Context);

  function handleChange(v, target, ix) {
    let temp = value;
    temp[ix][target] = v;
    onChange([...temp]);
  }

  function handleAdd(params) {
    let temp = value;
    temp.push({});
    onChange([...temp]);
  }

  function handleDelete(ix) {
    let temp = value;
    temp[ix].deleted_at = new Date();

    // temp.splice(ix, 1);
    onChange([...temp]);
  }

  return (
    <UI.Col gap={2}>
      <UI.Row spaced>
        <UI.Text variant="h6" bold color="primary.dark">
          Purchase Items
        </UI.Text>
      </UI.Row>
      <UI.Col gap={1}>
        <RenderHeader />
        {value?.length == 0 && (
          <UI.Text variant="body1" color="grey">
            members
          </UI.Text>
        )}

        {value.map((d, ix) => (
          <UI.Row spacing={1} alignItems="center" key={ix}>
            <UI.Col flex={1.5}>
              <Form.Text
                value={d.name}
                onChange={(e) => {
                  handleChange(e.target.value, "name", ix);
                }}
              />
            </UI.Col>
            <UI.Col flex={1}>
              <Form.Currency
                prefix="+62"
                value={d.name}
                onChange={(e) => {
                  handleChange(e.target.value, "name", ix);
                }}
              />{" "}
            </UI.Col>
            <UI.Col flex={1}>
              <UI.Button variant="outlined">Upload</UI.Button>
            </UI.Col>

            <UI.Col flex={0.2}>
              <UI.IconButton name="close" color="error.main" size={20} onClick={() => handleDelete(ix)} />
            </UI.Col>
          </UI.Row>
        ))}
      </UI.Col>
      <UI.Button color="primary" size="small" onClick={handleAdd}>
        + Add Member
      </UI.Button>
    </UI.Col>
  );
}

function RenderHeader() {
  let data = [
    { label: "Name", flex: 1.5 },
    { label: "WA Number", flex: 1 },
    { label: "Photo", flex: 1 },
    { label: "", flex: 0.2 },
  ];
  return (
    <UI.Row
      spacing={1}
      alignItems="space-between"
      sx={{
        bgcolor: tableConfig.bgcolorhead,
        color: "white",
        height: tableConfig.rowHeight,
        alignItems: "center",
      }}
    >
      {data.map((d, ix) => (
        <UI.Col flex={d.flex} key={ix}>
          <UI.Text variant="body1" bold pl={2}>
            {d.label}
          </UI.Text>
        </UI.Col>
      ))}
    </UI.Row>
  );
}
