import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import h from "@gh/helper";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import Context from "@context";
import MainButton from "@/component/app/mainButton";
import Pagination from "@mui/material/Pagination";

const itemsPerPage = 8; // Number of items per page

export default function App({ data }) {
  const { r } = React.useContext(Context);

  const isVisible = () => {
    const now = new Date();
    const start = new Date(data.start);
    const end = new Date(data.end);
    return now >= start && now <= end;
  };
  const registrationOption = () => {
    const now = new Date();
    const start = new Date(data.start);
    const end = new Date(data.end);
    if (now < start) return 1;
    else if (now >= start && now <= end) return 2;
    else if (now > end) return 3;
  };

  return (
    <UI.Col
      id="GROUPS"
      sx={{
        position: "relative",
        top: 0,
        overflow: "hidden",
      }}
    >
      <UI.Col
        sx={{
          zIndex: 2,
          alignItems: "center",
          background: "linear-gradient(180deg, #5B22D2 0%, #2F126C 100%)",
        }}
        py="100px"
      >
        {data?.group_json && (
          <>
            <UI.Text variant="h2" color="white" bold>
              GROUPS
            </UI.Text>
            <UI.Col
              sx={{
                maxWidth: 1440,
                minHeight: 600,
                width: "100%",
                pt: "38px",
              }}
            >
              <RenderGroup data={data?.group_json} />
            </UI.Col>
          </>
        )}

        <UI.Col id="REGISTRATION">
          {registrationOption() == 2 ? <MainButton onClick={() => r.push(`/regis?id=${data?.id}`)}>Join Now!</MainButton>:<span></span>}
          {registrationOption() == 1 ? <MainButton disabled={true} onClick={() => r.push(`javascript:void(0)`)} is_disabled={() => true}>Coming Soon</MainButton>:<span></span>}
          {registrationOption() == 3 ? <MainButton disabled={true} onClick={() => r.push(`javascript:void(0)`)} is_disabled={() => true}>Registration Closed</MainButton>:<span></span>}
        </UI.Col>
      </UI.Col>
    </UI.Col>
  );
}

function RenderGroup({ data }) {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => setPage(value);
  const startIndex = (page - 1) * itemsPerPage;

  let dataPrep = data?.length ? data?.map((d, ix) => ({ ...d, no: ix + 1 })).sort((a, b) => (a.point < b.point ? 1 : -1)) : [];

  return (
    <>
      <UI.Row
        sx={{
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {dataPrep?.length > 0 && dataPrep?.slice(startIndex, startIndex + itemsPerPage)?.map((d, ix) => <GroupBlock key={ix} data={d} />)}
      </UI.Row>
      <UI.Col center py={2}>
        <Pagination
          count={Math.ceil(data?.length / itemsPerPage)} // Total pages
          page={page}
          onChange={handleChange}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "white", // Change text color
            },
            "& .Mui-selected": {
              backgroundColor: "#fb9c05", // Change selected page background color
              color: "white", // Ensure selected text remains white
            },
          }}
        />
      </UI.Col>
    </>
  );
}

function GroupBlock({ data }) {
  return (
    <UI.Col
      sx={{
        m: 2,
        position: "relative",
        background: "linear-gradient(180deg, #FF0000 0%, #EF9F2E 100%)",
      }}
    >
      <UI.Col
        sx={{
          position: "absolute",
          top: 0,
          left: -40,
          width: 56,
          height: 80,
          bgcolor: "#fe0c04",
          fontSize: 40,
          color: "white",
          borderTopLeftRadius: "24px",
        }}
        center
      >
        {data.groupName}
      </UI.Col>
      {data?.member?.map((d, ix) => (
        <UI.Col
          key={ix}
          sx={{
            width: 300,
            height: 80,
            justifyContent: "center",
            pl: 3,
            fontSize: 24,
            bgcolor: "white",
            ml: "16px",
            borderBottom: "1px solid grey",
          }}
        >
          {d}
        </UI.Col>
      ))}
    </UI.Col>
  );
}
