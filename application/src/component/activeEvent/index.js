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
import Slider from "@/component/slider";
import Header from "./header";
import Standing from "./standing";
import Live from "./live";
import Rules from "./rules";
import Groups from "./groups";
import Footer from "./footer";

export default function App(props) {
  const { r } = React.useContext(Context);
  const [activeEvent, setactiveEvent] = useState(0);

  let events = useFetch({
    url: "event",
  });

  useEffect(() => {
    if (r.query?.id && events?.data?.length) setactiveEvent(events?.data?.findIndex((d) => d.id == r.query.id));
  }, [r.query, events.data]);

  if (!events.data || activeEvent == -1) return;

  return (
    <UI.Col
      sx={{
        width: "100vw",
        overflow: "auto",
        posisition: "relative",
        height: "100vh",
      }}
    >
      <Header events={events.data} activeEvent={activeEvent} setactiveEvent={setactiveEvent} />
      <UI.Col
        sx={{
          flex: 1,
          overflow: "auto",
        }}
      >
        <UI.Col>
          <Slider data={events?.data[activeEvent]?.attachment} />
          <Standing data={events?.data[activeEvent]} />
          <Live data={events?.data[activeEvent]} />
          <Rules data={events?.data[activeEvent]?.rules} />
          <Groups data={events?.data[activeEvent]} />
          <Footer data={events?.data[activeEvent]} />
        </UI.Col>
      </UI.Col>
    </UI.Col>
  );
}
