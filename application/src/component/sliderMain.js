import React, { useState, useEffect, useRef } from "react";
import UI from "@gh/ui";
import MainButton from "@/component/app/mainButton";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import { Splide, SplideTrack, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Context from "@context";

export default function App({ data, height = 640 }) {
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
      splideRef?.current?.splide?.go(">");
    }, 3000);
  }, []);

  return (
    <UI.Col
      sx={{
        flexShrink: 0,
        position: "relative",
        bgcolor: "#1e1e1e",
        flex: 1,
        height: "100%",
        flexShrink: 0,
      }}
    >
      <Splide
        ref={splideRef}
        options={{
          height: "100%",
          arrows: false,
          pagination: false,
          autoplay: false,
          // rewind: true,
          type: "loop",
          // cover: false,
        }}
        // hasTrack={false}
        style={{
          flex: 1,
          height: "100%",
          display: "flex",
        }}
        // onMounted={(splide) => {
        //   console.log("mounter");
        //   splide.Components.Autoplay.play();
        // }}
      >
        {data?.map((d) => (
          <SplideSlide
            key={d.id}
            style={{
              height: "100%",
              width: "100vw",
            }}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_APP_URL}/api/file/event/${d?.img?.path}`}
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
            Join Now !
          </MainButton>
        </UI.Row>
      </UI.Col>
    </UI.Col>
  );
}
