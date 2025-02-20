import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import Menu from "@mui/material/Menu";
import Context from "@context";
import Drawer from "./_drawer";

export default function App({ events, activeEvent, setactiveEvent, selector = true, menu = true, isMobile }) {
  const { r } = React.useContext(Context);
  let menus = ["STANDINGS", "LIVE", "RULES", "GROUPS", "REGISTRATION"];
  return (
    <UI.Row
      sx={{
        width: "100%",
        height: 80,
        px: {
          xs: 0,
          md: 3,
        },
        background: "linear-gradient(180deg, #1A1B1F 50%, #1D1D3A 100%)",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        zIndex: 9,
        // opacity: 0.5,
      }}
    >
      <UI.Row
        flex={1}
        sx={{
          height: "100%",
          gap: 2,
          pl: {
            xs: 3.5,
            md: 0,
          },
        }}
      >
        <img
          onClick={() => r.push("/")}
          src="/assets/img/logo_mcgg.png"
          alt=""
          style={{
            height: "100%",
            width: "auto",
            objectFit: "contain",
          }}
        />
        {selector && !isMobile && <MenuRender events={events} activeEvent={activeEvent} setactiveEvent={setactiveEvent} />}
      </UI.Row>

      {menu && !isMobile && (
        <UI.Row
          sx={{
            gap: 3,
            alignItems: "center",
          }}
        >
          {menus.map((d, ix) => (
            <a href={`#${d}`} key={ix}>
              <UI.Text
                variant="body1"
                color="white"
                style={{
                  "&:hover": {
                    cursor: "pointer",
                    color: "#fb9c05",
                  },
                }}
              >
                {d}
              </UI.Text>
            </a>
          ))}
        </UI.Row>
      )}
      {isMobile && (
        <UI.Row>
          {/* <Drawer /> */}
          <MenuRender w={240} events={events} activeEvent={activeEvent} setactiveEvent={setactiveEvent} />
        </UI.Row>
      )}
    </UI.Row>
  );
}

function MenuRender({ events, activeEvent, setactiveEvent, w = 280 }) {
  const { r } = React.useContext(Context);
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <>
      <UI.Row
        sx={{
          width: w,
          justifyContent: "space-between",
          px: 3,
          alignItems: "center",
          borderRight: "1px solid #323343",
          borderLeft: "1px solid #323343",
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <UI.Text variant="body1" color="white">
          {events?.[activeEvent]?.name?.toUpperCase() || "Select Event"}
        </UI.Text>
        <UI.Icon name="arrow_drop_down" color="#e8b931" />
      </UI.Row>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl()}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          p: 0,
          "& .MuiPaper-root": {
            bgcolor: "#d9d9d9",
            borderRadius: 0,
          },
        }}
      >
        {events.map((d, ix) => (
          <UI.Col
            key={ix}
            onClick={() => {
              r.push(`/events?id=${d.id}`);
            }}
            sx={{
              width: w,
              height: 48,
              bgcolor: "#d9d9d9",
              p: 1,
              justifyContent: "center",
              "&:hover": {
                bgcolor: "#cabe9c",
              },
            }}
          >
            {d.name}
          </UI.Col>
        ))}
      </Menu>
    </>
  );
}
