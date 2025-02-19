import UI from "@gh/ui";
import { useEffect, useRef, useState } from "react";
import Label from "./label";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";

export default function InputImage({
  onChange,
  error,
  helperText,
  sx,
  noLabel = false,
  label = "Lampiran",
  value,
  multiple = false,
  ...props
}) {
  const inputRef = useRef();

  function handleDelete(_tid) {
    let temp = value;
    let target = temp.find((d) => d._tid == _tid);
    target.deleted_at = true;
    onChange([...temp]);
  }

  return (
    <UI.Col spacing={1} width={props.fullWidth ? "100%" : "auto"}>
      {!noLabel && <Label label={label} tip={props.tip} />}
      <UI.Col spacing={0.5} width={props.fullWidth ? "100%" : "auto"} center={props.center}>
        <UI.Stack width={"100%"} height={"100%"}>
          <UI.Col
            sx={{
              width: "100%",
              height: "100%",
              p: 2,

              backgroundColor: "#f5f5f5",
            }}
            spacing={1}
          >
            <Preview value={value} onDelete={handleDelete} />
            <UI.Button
              onClick={() => inputRef.current.click()}
              sx={{
                width: 160,
              }}
            >
              {"+ Tambah Lampiran"}
            </UI.Button>
          </UI.Col>
        </UI.Stack>
        {error && helperText && (
          <UI.Text align="center" variant="caption" color="red" sx={{ fontWeight: 200 }}>
            {helperText}
          </UI.Text>
        )}
      </UI.Col>
      <input
        multiple={multiple}
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        onChange={(e) => {
          onChange([...value, ...Object.values(e.target.files).map((d) => ({ _new: d, name: d?.name }))]);
        }}
      />
    </UI.Col>
  );
}

function Preview({ value, onDelete }) {
  function getLink(d) {
    if (d?.created_at) {
      return `/api/file/${d.ownerType}/${d.path}`;
    } else {
      return URL.createObjectURL(d?._new);
    }
  }
  return (
    <UI.Col spacing={1}>
      {value
        ?.filter((d) => !d.deleted_at)
        ?.map((d, ix) => (
          <UI.Row spaced key={ix}>
            <a
              href={getLink(d)}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                borderBottom: "1px dashed black",
              }}
            >
              <UI.Text variant="body1">{d?.name}</UI.Text>
            </a>
            <UI.IconButton name="close" color="error.main" onClick={() => onDelete(d._tid)}>
              Hapus
            </UI.IconButton>
          </UI.Row>
        ))}
    </UI.Col>
  );
}
