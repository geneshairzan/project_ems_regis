import UI from "@gh/ui";
import { useEffect, useRef, useState } from "react";
import ImageRoundedIcon from "@mui/icons-material/ImageRounded";

export default function InputImage({ onChange, error, helperText, sx, noLabel = false, label = "Lampiran", value, multiple = false, ...props }) {
  const inputRef = useRef();

  function handleDelete(_tid) {
    let temp = value;
    let target = temp.find((d) => d._tid == _tid);
    target.deleted_at = true;
    onChange([...temp]);
  }

  return (
    <UI.Col spacing={1} width={props.fullWidth ? "100%" : "auto"}>
      <UI.Text variant="body2" bold color="primary.dark">
        Slider
      </UI.Text>
      <UI.Col spacing={0.5} width={props.fullWidth ? "100%" : "auto"} center={props.center}>
        <UI.Stack width={"100%"} height={"100%"}>
          <UI.Row
            sx={{
              width: "100%",
              height: "100%",
              p: 2,

              backgroundColor: "#f5f5f5",
            }}
            spacing={1}
          >
            <Preview value={value} onDelete={handleDelete} />
            <UI.Col
              onClick={() => inputRef.current.click()}
              sx={{
                border: "1px solid lightgrey",
                borderRadius: 2,
                p: 2,
                color: "black",
                width: 200,
              }}
              center
            >
              <UI.Text variant="body1" bold>
                {" "}
                + Add Slider
              </UI.Text>
            </UI.Col>
          </UI.Row>
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
    <UI.Row spacing={1}>
      {value
        ?.filter((d) => !d.deleted_at)
        ?.map((d, ix) => (
          <UI.Col
            key={ix}
            sx={{
              position: "relative",
              width: "200px",
              height: "112px",
            }}
          >
            <img src={getLink(d)} alt="Preview" style={{ height: "100%", width: "100%", objectFit: "cover" }} />
            <UI.Col
              onClick={() => onDelete(d._tid)}
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
    </UI.Row>
  );
}
