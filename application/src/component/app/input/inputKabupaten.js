import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import UI from "@gh/ui";
import { styled, lighten, darken } from "@mui/system";

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor: lighten(theme.palette.primary.light, 0.85),
  ...theme.applyStyles("dark", {
    backgroundColor: darken(theme.palette.primary.main, 0.8),
  }),
}));

const GroupItems = styled("ul")({
  padding: 0,
});

export default function Grouped({ value, onChange }) {
  let loc = useFetch({ url: `data/location?_token=223344!!` });

  if (!loc.data) return <UI.Loader />;
  return (
    <Autocomplete
      options={loc.data?.kabupaten}
      groupBy={(option) => option.provinsi_id}
      getOptionLabel={(option) => option.name}
      value={loc?.data?.kabupaten.find((d) => d.id == value) || null}
      renderInput={(params) => <TextField {...params} label="Kota" />}
      onChange={(event, newValue) => {
        onChange(newValue?.id);
      }}
      renderGroup={(params) => (
        <li key={params.key}>
          <GroupHeader>{loc.data?.provinsi.find((d) => d.id == params.group)?.nama}</GroupHeader>
          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
    />
  );
}
