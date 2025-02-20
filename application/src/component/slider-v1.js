import React, { useState, useEffect, useRef } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

export default function App({ data }) {
  const splideRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Add event listener to update the current slide index when slides change
    const splide = splideRef.current?.splide;
    if (splide) {
      splide.on("moved", (newIndex) => {
        setCurrentSlide(newIndex);
      });
    }

    return () => {
      if (splide) {
        splide.off("moved");
      }
    };
  }, []);

  useEffect(() => {
    setInterval(() => {
      splideRef?.current?.splide?.go(">");
    }, 3000);
  }, []);

  return (
    <UI.Col
      sx={{
        flexShrink: 0,
        position: "relative",
        // overflow: "hidden",
        bgcolor: "#1e1e1e",
      }}
    >
      <Splide
        ref={splideRef}
        options={{
          arrows: false,
          pagination: false,
        }}
      >
        {data?.map((d, ix) => (
          <SplideSlide
            key={ix}
            style={{
              height: 640,
              // maxHeight: 640,
            }}
          >
            <>
              <img
                src={`${process.env.NEXT_PUBLIC_ASSET_URL}/api/file/event/${d.path}`}
                alt=""
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  objectPosition: "bottom",
                }}
              />
            </>
          </SplideSlide>
        ))}
      </Splide>
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
