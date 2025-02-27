import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import React, { useState, useEffect, useRef } from "react";
import UI from "@gh/ui";
import MainButton from "@/component/app/mainButton";
import Context from "@context";
import { useMediaQuery } from "@mui/material";
import RemoteImg from "@/component/remoteImg";

export default function SimpleSlider({ data }) {
  const isMobile = useMediaQuery("(max-width:600px)"); // Adjust breakpoint as needed
  const [activeEvent, setactiveEvent] = useState(0);
  const { r } = React.useContext(Context);
  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
  };
  return (
    <UI.Col
      sx={{
        flex: 1,
        overflowX: "hidden",
        flexShrink: 0,
        position: "relative",
        bgcolor: "#0f122b",
        pt: "80px",
      }}
    >
      <Slider {...settings} beforeChange={(oldIx, newIx) => setactiveEvent(newIx)}>
        {data?.map((d, ix) => (
          <UI.Col
            key={ix}
            sx={{
              height: isMobile ? 400 : "calc(100vh - 220px)",
              minHeight: isMobile ? 0 : 720,
              flexShrink: 0,
            }}
          >
            <RemoteImg
              src={`${process.env.NEXT_PUBLIC_ASSET_URL}/api/file/event/${d?.img?.path}`}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            />
            {/* <img
              src={`${process.env.NEXT_PUBLIC_ASSET_URL}/api/file/event/${d?.img?.path}`}
              alt=""
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
              }}
            /> */}
          </UI.Col>
        ))}
      </Slider>
      <Banner isMobile={isMobile} onClick={() => r.push(`/events?id=${data[activeEvent]?.id}`)} />
    </UI.Col>
  );
}

function Banner({ isMobile, onClick }) {
  return (
    <UI.Col
      sx={{
        width: "100%",
        position: isMobile ? "relative" : "absolute",
        zIndex: 2,
        bottom: 0,
        background: "#00000080",
        backdropFilter: "blur(10px)",
      }}
    >
      <UI.Stack
        sx={{
          flexDirection: {
            xs: "column",
            md: "row",
          },
          px: {
            xs: 2,
            md: "80px",
          },
          py: 2,
          gap: 2,
          justifyContent: {
            xs: "center",
            md: "space-between",
          },
          alignItems: "center",
        }}
      >
        <UI.Text
          color="white"
          bold
          sx={{
            fontSize: 40,
            textTransform: "uppercase",
            textAlign: {
              xs: "center",
              md: "left",
            },
          }}
        >
          Claim the Throne <br />& Rule the Board. <span style={{ color: "#e8b931" }}>Go Chess, Go!</span>
        </UI.Text>
        <MainButton onClick={onClick}>Join Now !</MainButton>
      </UI.Stack>
    </UI.Col>
  );
}
