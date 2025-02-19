import React, { useState, useEffect } from "react";
import UI from "@gh/ui";
import useFetch, { fetcher } from "@gh/helper/useFetch";
import QRCode from "react-qr-code";

export default function App({ data, event, asResult = false }) {
  return (
    <UI.Col
      sx={{
        border: "1px solid grey",
        width: "100%",
        height: { xs: "auto", md: 650 },
        position: "relative",
        position: "relative",
        overflow: "hidden",
      }}
      alignItems="center"
    >
      <UI.Col
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
        center
      >
        <img
          src={"/assets/img/idcard_bg.png"}
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
          gap: 1,
          zIndex: 2,
        }}
        center
      >
        <UI.Col
          sx={{
            width: {
              xs: "45%",
              md: "50%",
            },
            height: {
              xs: "90px",
              md: "auto",
            },
          }}
        >
          <img
            src={"/assets/img/logo_mpl.png"}
            // className="img-contain"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </UI.Col>
        <UI.Text
          sx={{
            fontSize: { xs: 26, md: 30 },
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
          width: "100%",
          justifyContent: "space-between",
          zIndex: 2,
          flex: 1,
          gap: 1,
        }}
      >
        <UI.Col
          sx={{
            bgcolor: data.role?.color || "#0000fe",
            width: "100%",
            px: 2,
            // py: 0.5,
          }}
          center
        >
          <UI.Text
            sx={{
              fontSize: 36,
              fontFamily: "Tandelle",
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
            width: "100%",
            // height: "50%",
            flex: 1,
          }}
          center
        >
          <UI.Col
            sx={{
              width: { xs: 220, md: 300 },
              // minHeight: { xs: 180, md: 200 },
              bgcolor: "white",
              // bgcolor: "yellow",
              p: 1,
              gap: 1,
              flex: 1,
            }}
            center
          >
            <UI.Text
              variant="h5"
              align="center"
              color="black"
              sx={
                {
                  // fontSize: { xs: 18, md: 24 },
                }
              }
            >
              {data.name?.split(" ")?.slice(0, 2)?.join(" ") || data.name || "CREW"}
            </UI.Text>
            <UI.Col
              sx={{
                width: "100%",
                flex: 1,
                overflow: "hidden",
                maxHeight: 170,
              }}
              center
            >
              {data?.img ? (
                <img
                  src={process.env.NEXT_PUBLIC_APP_URL + "/api/file/user/" + data?.img}
                  style={{
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <UI.Col
                  center
                  sx={{
                    borderRadius: "50%",
                    border: "1px solid grey",
                    height: 120,
                    width: 120,
                    bgcolor: "primary.main",
                  }}
                >
                  <UI.Text variant="h1" align="center" color="white" pt={0.5}>
                    {data?.user?.name[0] || data?.name[0] || "A"}
                  </UI.Text>
                </UI.Col>
              )}
            </UI.Col>
            {/* <QRCode value={data?.id} /> */}
          </UI.Col>
        </UI.Col>

        <UI.Col
          sx={{
            bgcolor: data.role?.color || "#0000fe",
            width: "100%",
            px: 2,
            py: 0.5,
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
    </UI.Col>
  );
}
