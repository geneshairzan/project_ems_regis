import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import QRCode from "react-qr-code";
import { QRCodeSVG, QRCodeCanvas } from "qrcode.react";

export default function App({ data, event }) {
  return (
    <UI.Col
      sx={{
        border: "1px solid grey",
        //  width: "280px",
        // bgcolor: "primary.main",
        width: "140mm",
        height: "210mm",
        position: "relative",
      }}
      alignItems="center"
    >
      <UI.Col
        sx={{
          width: "100%",
          heght: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          // bgcolor: "red",
        }}
        center
      >
        <img
          src={"/assets/img/idcard_bg_small.png"}
          className="img-cover"
          style={{
            position: "relative",

            width: "100%",
            height: "100%",
          }}
        />
      </UI.Col>

      <UI.Col
        sx={{
          p: 3,
          width: "100%",
          gap: 2,
        }}
        center
      >
        <img
          src={"/assets/img/logo_mpl.png"}
          className="img-contain"
          style={{
            width: 200,
          }}
        />
        <UI.Text
          // variant="h4"
          sx={{
            fontSize: 40,
            fontFamily: "Eixample",
          }}
          bold
          color="primary.main"
        >
          {event?.name || "MPL ID S14 - PLAYOFFS"}
        </UI.Text>
      </UI.Col>

      <UI.Col
        sx={{
          bgcolor: data.role?.color || "#0000fe",
          width: "100%",
          px: 2,
          height: 76,
        }}
        center
      >
        <UI.Text
          sx={{
            fontFamily: "Tandelle",
            fontSize: 70,
            letterSpacing: 4,
          }}
          align="center"
          bold
        >
          {data.role?.name || "CREW"}
        </UI.Text>
      </UI.Col>

      <UI.Col
        sx={{
          p: 3,
          width: "100%",
          height: "50%",
        }}
        center
      >
        <UI.Col
          sx={{
            minWidth: 450,
            maxWidth: 450,
            height: 300,
            bgcolor: "white",
            p: 2,
            gap: 1,
            zIndex: 9,
          }}
          center
        >
          <UI.Text variant="h4" align="center" color="black">
            {data.name?.split(" ")?.slice(0, 2)?.join(" ") || data.name || "CREW"}
          </UI.Text>
          <QRCodeCanvas
            value={data?.id}
            size={220}
            // style={{ "print-color-adjust": "exact" }}
            //  fgColor="#9900ef"
          />
        </UI.Col>
      </UI.Col>

      <UI.Col
        sx={{
          // p: 3,
          bgcolor: data.role?.color || "#0000fe",
          width: "100%",
          height: 70,
          // ml: 40,
        }}
        center
      >
        <UI.Text
          variant="h4"
          align="center"
          sx={{
            fontFamily: "Eixample",
          }}
        >
          {event?.tagline || "#WEOWNTHIS"}
        </UI.Text>
      </UI.Col>
    </UI.Col>
  );
}
