import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardControlKeyIcon from "@mui/icons-material/KeyboardControlKey";
import CloseIcon from "@mui/icons-material/Close";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Drawer from "@mui/material/Drawer";
import h from "@gh/helper/index";
import { QrScanner } from "@yudiel/react-qr-scanner";
import { Switch } from "@mui/material";
import { useRouter } from "next/router";
import Context from "@context";
import Slider from "@/component/sliderMain";
import Header from "../activeEvent/header";

export default function App(props) {
  const { r } = React.useContext(Context);
  const [activeEvent, setactiveEvent] = useState(0);
  // / Adjust breakpoint as needed

  let events = useFetch({
    url: "event",
  });

  if (!events.data) return;

  return (
    <UI.Col
      sx={{
        width: "100vw",
        // posisition: "relative",
        // flex: 1,
        // overflow: "auto",
      }}
    >
      <Header events={events.data} activeEvent={activeEvent} setactiveEvent={setactiveEvent} selector={false} menu={false} />
      <Slider
        data={events?.data?.map((d) => ({
          link: "#",
          id: d.id,
          img: d.attachment[0],
        }))}
        height="100%"
      />
    </UI.Col>
  );
}
