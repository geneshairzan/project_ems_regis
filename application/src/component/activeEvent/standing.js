import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";

export default function App({ data }) {
  return (
    <UI.Col
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
        }}
        py="100px"
      >
        <UI.Text variant="h2">STANDINGS</UI.Text>
        <RowItem d={{ no: "#", name: "Team Name", point: "Point", wl: "Match (W-L)", game: "Game (W-L)", diff: "Diff", bgcolor: "#35353d", color: "white" }} />
        {data?.standing_json &&
          data?.standing_json?.map((d, ix) => (
            <RowItem
              d={{
                ...d,
                no: ix + 1,
              }}
              key={ix}
              lastItem={ix == data?.standing_json?.length - 1}
            />
          ))}

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
        <UI.Text variant="body1" flex={1}>
          {d.point}
        </UI.Text>
        <UI.Text variant="body1" flex={1}>
          {d.wl}
        </UI.Text>
        <UI.Text variant="body1" flex={1}>
          {d.game}
        </UI.Text>
      </UI.Row>
      <UI.Row
        flex={1}
        sx={{
          borderRight: "1px solid black",
          px: 2,
          height: "100%",
          alignItems: "center",
        }}
      >
        {d.diff}
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
