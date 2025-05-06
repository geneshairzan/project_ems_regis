import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import Form from "@gh/form";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import { useFormik } from "formik";

import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import { JsonEditor } from "json-edit-react";

//https://www.npmjs.com/package/react-json-editor-ajrm

export default function App({ value, onChange }) {
  const [activeState, setactiveState] = useState(1); // 1data;  2preview
  return (
    <UI.Col gap={2}>
      <UI.Row>
        <UI.Text variant="body1" flex={1} onClick={() => setactiveState(1)}>
          Data JSON
        </UI.Text>
        <UI.Text variant="body1" flex={1} onClick={() => setactiveState(2)}>
          Preview
        </UI.Text>
      </UI.Row>
      {activeState == 1 && (
        <JsonEditor
          data={value}
          setData={(e) => {
            onChange(e);
          }}
        />
      )}
      {activeState == 2 && <Preview data={value} />}
    </UI.Col>
  );
}

function Preview({ data }) {
  return (
    <UI.Col>
      {data.map((d) => (
        <PreviewItem data={d} />
      ))}
    </UI.Col>
  );
}

function PreviewItem({ data }) {
  return (
    <UI.Row>
      <UI.Text variant="body1" width={200}>
        {data.label}
      </UI.Text>
      <UI.Text variant="body1">{data.path}</UI.Text>
    </UI.Row>
  );
}
