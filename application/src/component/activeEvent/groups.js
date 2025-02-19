import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import Context from "@context";

let sample = [
  {
    groupName: "A",
    member: ["name A1", "name A2", "name A3", "name A4"],
  },
  {
    groupName: "B",
    member: ["name B1", "name B2", "name B3", "name B4"],
  },
  {
    groupName: "C",
    member: ["name C1", "name C2", "name C3", "name C4"],
  },
  {
    groupName: "D",
    member: ["name D1", "name D2", "name D3", "name D4"],
  },
];

export default function App({ data }) {
  const { r } = React.useContext(Context);
  return (
    <UI.Col
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
        <UI.Text variant="h2" color="white">
          GROUPS
        </UI.Text>
        <UI.Col
          sx={{
            maxWidth: 1440,
            minHeight: 600,
            width: "100%",
          }}
        >
          <RenderGroup data={data?.group_json} />
          {/* <div dangerouslySetInnerHTML={{ __html: data?.group_json }} /> */}
        </UI.Col>
        <UI.Col
          center
          sx={{
            width: 390,
            height: 120,
            background: "linear-gradient(82.58deg, #DC7000 24.83%, #FCBE39 76.24%, #FFFFFF 100%)",
            "&:hover": {
              opacity: 0.8,
              cursor: "pointer",
            },
          }}
          onClick={() => r.push(`/regis?id=${data?.id}`)}
        >
          <UI.Text
            sx={{
              fontSize: 48,
              color: "white",
            }}
          >
            Join Now !
          </UI.Text>
        </UI.Col>
      </UI.Col>
    </UI.Col>
  );
}

function RenderGroup({ data }) {
  if (!data) return;
  return (
    <UI.Row
      sx={{
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {data?.map((d, ix) => (
        <GroupBlock key={ix} data={d} />
      ))}
    </UI.Row>
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
      {data?.member.map((d, ix) => (
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
