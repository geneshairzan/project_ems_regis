import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";

export default function App({ data, isMobile }) {
  const [hasplay, sethasplay] = useState(false);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    // Load YouTube API script dynamically
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    tag.async = true;
    document.body.appendChild(tag);

    // Create a global function required by the YouTube API
    window.onYouTubeIframeAPIReady = () => {
      const newPlayer = new YT.Player("youtube-iframe", {
        events: {
          onReady: (event) => setPlayer(event.target),
        },
      });
    };
  }, []);

  const playVideo = () => {
    sethasplay(true);

    if (player) {
      player.playVideo();
    }
  };
  function getYouTubeVideoId(url) {
    const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&?/]+)/);
    return match ? match[1] : null;
  }

  if (!data?.video_path?.includes("https")) return;

  return (
    <UI.Col
      id="LIVE"
      sx={{
        position: "relative",
        top: 0,
        overflow: "hidden",
        minHeight: 400,
      }}
    >
      <BG />
      <UI.Col
        sx={{
          zIndex: 2,
          alignItems: "center",
          py: {
            xs: "36px",
            md: "100px",
          },
        }}
      >
        <UI.Text variant="h2" color="white" mb={"36px"} bold>
          Live
        </UI.Text>
        <UI.Col
          position="relative"
          sx={{
            height: isMobile ? 192 : 480,
          }}
        >
          {!hasplay && (
            <>
              <UI.Col
                onClick={playVideo}
                sx={{
                  position: "absolute",

                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "rgba(0, 0, 0, .5)",
                }}
              >
                <img
                  src="/assets/img/yt-overlay.png"
                  alt=""
                  style={{
                    zIndex: 9,
                  }}
                />

                <UI.Col
                  sx={{
                    width: isMobile ? 360 : 640,
                    height: isMobile ? 192 : 480,
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    zIndex: 1,
                  }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${getYouTubeVideoId(data?.video_path)}/hqdefault.jpg`}
                    alt="Video thumbnail"
                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px", zIndex: 1 }}
                  />
                </UI.Col>
              </UI.Col>
            </>
          )}
          {hasplay && (
            <>
              <iframe
                id="youtube-iframe"
                width={isMobile ? "360" : "640"}
                height={isMobile ? "192" : "480"}
                src={`${data?.video_path}?autoplay=1&enablejsapi=1&modestbranding=1&controls=0&fs=0&showinfo=0&rel=0`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </>
          )}
        </UI.Col>
      </UI.Col>
    </UI.Col>
  );
}

function BG(params) {
  return (
    <UI.Col
      sx={{
        position: "absolute",
        zIndex: 1,
        width: "100%",
        height: "100%",
      }}
    >
      <img
        src="/assets/img/bg-live.png"
        alt=""
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </UI.Col>
  );
}
