import React, { useState, useEffect, useRef } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useMediaQuery } from "@mui/material";
import RemoteImg from "@/component/remoteImg";

export default function App({ data }) {
  const isMobile = useMediaQuery("(max-width:600px)"); // Adjust breakpoint as needed

  const splideRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

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
        flexShrink: 0,
        position: "relative",
        bgcolor: "#1e1e1e",
      }}
    >
      <Slider {...settings} beforeChange={(oldIx, newIx) => setCurrentSlide(newIx)}>
        {data?.map((d, ix) => (
          <UI.Col
            sx={{
              height: isMobile ? 400 : "calc(100vh - 220px)",
              minHeight: isMobile ? 0 : 720,
              flexShrink: 0,
            }}
            key={ix}
          >
            <RemoteImg
              src={`${process.env.NEXT_PUBLIC_ASSET_URL}/api/file/event/${d.path}`}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "bottom",
              }}
            />

            {/* <img
              src={`${process.env.NEXT_PUBLIC_ASSET_URL}/api/file/event/${d.path}`}
              alt=""
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "bottom",
              }}
            /> */}
          </UI.Col>
        ))}
      </Slider>
      <UI.Col
        sx={{
          height: 120,
          width: "100%",
          position: "absolute",
          zIndex: 2,
          bottom: 0,
          background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)",
        }}
      />

      <UI.Row
        gap={2}
        sx={{
          zIndex: 2,
          position: "absolute",
          bottom: "24px",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {data?.map((_, ix) => (
          <UI.Col
            key={ix}
            onClick={() => splideRef.current?.go(ix)} // Change slide on click
            sx={{
              width: 16,
              height: 16,
              bgcolor: "#8c918b",
              borderRadius: "16px",
              transition: "width 0.5s ease-in-out",
              ...(ix == currentSlide && {
                bgcolor: "#e8b931",
                width: 170,
              }),
            }}
          />
        ))}
      </UI.Row>
    </UI.Col>
  );
}
