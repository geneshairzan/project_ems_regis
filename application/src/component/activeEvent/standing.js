import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import Pagination from "@mui/material/Pagination";

const itemsPerPage = 20; // Number of items per page

export default function App({ data }) {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => setPage(value);
  const startIndex = (page - 1) * itemsPerPage;

  let dataPrep = data?.standing_json.map((d, ix) => ({ ...d, no: ix + 1 })).sort((a, b) => (a.point < b.point ? 1 : -1));

  return (
    <UI.Col
      id="STANDINGS"
      sx={{
        position: "relative",
        top: 0,
        overflow: "hidden",
        minHeight: 720,
      }}
      alignItems="center"
    >
      <BG />
      <UI.Col
        sx={{
          zIndex: 2,
          alignItems: "center",
          width: "100%",
          maxWidth: 920,
          px: 2,
        }}
        py="100px"
      >
        <UI.Text variant="h2" bold>
          STANDINGS
        </UI.Text>
        <UI.Col
          width="100%"
          sx={{
            pt: "38px",
          }}
        >
          <RowItem d={{ no: "#", name: "Name", point: "Point", wl: "Match (W-L)", bgcolor: "#35353d", color: "white" }} />
          {data?.standing_json &&
            dataPrep?.slice(startIndex, startIndex + itemsPerPage)?.map((d, ix) => (
              <RowItem
                d={{
                  ...d,
                }}
                key={ix}
                lastItem={d.no == data?.standing_json?.length || ix == itemsPerPage - 1}
              />
            ))}

          <UI.Col center pt={2}>
            <Pagination
              count={Math.ceil(data?.standing_json?.length / itemsPerPage)} // Total pages
              page={page}
              onChange={handleChange}
            />
          </UI.Col>
        </UI.Col>

        {/* <div dangerouslySetInnerHTML={{ __html: data?.standing_json }} /> */}
      </UI.Col>
    </UI.Col>
  );
}

function RowItem({ d, lastItem = false }) {
  return (
    <UI.Row
      width="100%"
      sx={{
        bgcolor: d?.bgcolor,
        color: d.color,
        borderBottom: lastItem && "1px solid black",
        height: 36,
      }}
    >
      <UI.Row
        flex={3}
        gap={2}
        sx={{
          borderRight: "1px solid black",
          borderLeft: "1px solid black",
          px: 2,
          height: "100%",
          alignItems: "center",
        }}
      >
        <UI.Text variant="body1">{d.no}</UI.Text>
        <UI.Text variant="body1" flex={1}>
          {d.name}
        </UI.Text>
      </UI.Row>
      <UI.Row
        flex={4}
        sx={{
          borderRight: "1px solid black",
          px: 2,
          height: "100%",
          alignItems: "center",
        }}
      >
        <UI.Text variant="body1" flex={1} align="center">
          {d.point}
        </UI.Text>
        <UI.Text variant="body1" flex={1} align="center">
          {d.wl}
        </UI.Text>
      </UI.Row>
    </UI.Row>
  );
}

function BG(params) {
  return (
    <UI.Col
      sx={{
        position: "absolute",
        zIndex: 1,
        width: "100%",
      }}
    >
      <img
        src="/assets/img/standing-bg.png"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </UI.Col>
  );
}
