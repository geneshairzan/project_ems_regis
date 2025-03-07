import React, { useState, useEffect, useRef } from "react";
import UI from "@gh/ui";
import MainButton from "@/component/app/mainButton";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Context from "@context";
import { useMediaQuery } from "@mui/material";

export default function App({ data, height = 640 }) {
  const isMobile = useMediaQuery("(max-width:600px)"); // Adjust breakpoint as needed

  const splideRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const { r } = React.useContext(Context);
  console.log(data);

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
      // splideRef?.current?.splide?.go(">");
    }, 3000);
  }, []);

  return (
    <>
      <Splide
        ref={splideRef}
        options={{
          height: isMobile ? 400 : 740,
          arrows: false,
          pagination: false,
          autoplay: false,
          type: "loop",
        }}
        style={{
          flex: 1,
          bgcolor: "red",
        }}
      >
        {data?.map((d) => (
          <SplideSlide
            key={d.id}
            style={{
              bgcolor: "red",
              height: isMobile ? 400 : 740,
            }}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_ASSET_URL}/api/file/event/${d?.img?.path}`}
              alt=""
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                objectPosition: "bottom",
              }}
            />
          </SplideSlide>
        ))}
      </Splide>
      <Banner />
    </>
  );
}

function Banner(params) {
  return (
    <UI.Col
      sx={{
        // height: 120,
        width: "100%",
        position: "absolute",
        zIndex: 2,
        bottom: 0,
        background: "#00000080",
        backdropFilter: "blur(10px)",
      }}
    >
      <UI.Row spaced px={"80px"}>
        <UI.Text
          variant="h2"
          color="white"
          bold
          sx={{
            textTransform: "uppercase",
          }}
        >
          Join the fun, Join the Hype <br />
          Register your team <span style={{ color: "#e8b931" }}>now</span>
        </UI.Text>
        <MainButton
          onClick={() => r.push(`/events?id=${data[currentSlide]?.id}`)}
          sx={{
            height: 80,
          }}
        >
          Join Now!
        </MainButton>
      </UI.Row>
    </UI.Col>
  );
}
