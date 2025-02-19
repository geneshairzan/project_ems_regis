import React, { useEffect, useState } from "react";

import UI from "@gh/ui";
import Context from "@/component/context";
import { Stack, Typography, Menu, MenuItem, IconButton } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { nav, extra } from "./_nav";

import Link from "next/link";
import { useRouter } from "next/router";

import Icon from "@gh/icon";

import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import SpaIcon from "@mui/icons-material/Spa";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function DesktopMenu({ onClick }) {
  const { app, auth } = React.useContext(Context);
  const loc = useRouter();
  const [onOpen, setonOpen] = useState(1);

  function handleOpen(ix) {
    setonOpen(onOpen == ix ? null : ix);
  }

  function authFilter(d) {
    if (d.is_strict && auth.user?.type_id != 3) return false;
    return true;
  }

  return (
    <UI.Col justifyContent="space-between" height="100%" mt={3}>
      <UI.Col px={2} spacing={2}>
        {nav.filter(authFilter)?.map((d, ix) => (
          <RenderMultiMenu key={ix} d={d} onClick={() => handleOpen(ix)} open={onOpen == ix} ix={ix} onSelect={onClick} />
        ))}
      </UI.Col>
      <UI.Col px={2} spacing={2}>
        <UI.Row>
          <UI.Button
            // variant="outlined"
            color="error"
            fullWidth
            onClick={() => {
              auth.signout();
              onClick();
              loc.push("/");
            }}
          >
            Sign Out
          </UI.Button>
        </UI.Row>
      </UI.Col>
    </UI.Col>
  );
}

function RenderMultiMenu({ d, onSelect, ...props }) {
  const loc = useRouter();
  return (
    <>
      <UI.Row
        justifyContent="space-between"
        alignItems="center"
        onClick={() => (d.path ? onSelect() : props.onClick())}
        component={d.path ? Link : "div"}
        href={d.path || "#"}
        sx={{
          ...props?.sx,
        }}
      >
        <UI.Text
          variant="h6"
          color={loc.asPath == d?.path ? "error.main" : "primary.main"}
          sx={{
            letterSpacing: 2,
          }}
        >
          {d.name}
        </UI.Text>
        {d?.child?.length > 0 && <>{props.open ? <ExpandLess /> : <ExpandMore />}</>}
      </UI.Row>
      {d?.child?.length > 0 && (
        <Collapse in={props.open} timeout="auto" unmountOnExit>
          <UI.Col spacing={2} pl={3}>
            {d?.child?.filter(rolefilter).map((dx, dix) => (
              <RenderSingleMenu d={dx} key={dix} onClick={onSelect} />
            ))}
          </UI.Col>
        </Collapse>
      )}
    </>
  );
}

function RenderSingleMenu({ d, asButton = false, ...props }) {
  const loc = useRouter();

  return (
    <UI.Row
      alignItems="center"
      spacing={2}
      component={d.path ? Link : "div"}
      href={d.path || "#"}
      onClick={props.onClick}
      sx={{
        p: {
          // color: "#464649",
          textTransform: "capitalize",
          "&:hover": d.path && {
            color: "grey",
          },
        },
      }}
    >
      {d?.icon && (
        <d.icon
          sx={{
            fontSize: 16,
          }}
        />
      )}
      <UI.Text
        variant="h6"
        bold={!Boolean(d.path)}
        color={loc.asPath == d?.path ? "error.main" : "grey"}
        sx={{
          letterSpacing: 2,
        }}
      >
        {d.name}
      </UI.Text>
    </UI.Row>
  );
}

function rolefilter(d, auth) {
  if (d?.role) {
    if (auth?.user?.role_id == 2) {
      if (d.role.includes("admin")) return true;
    }
    if (auth?.user?.role_id == 4) {
      if (d.role.includes("tenant")) return true;
    }
    return false;
  }
  return true;
}
