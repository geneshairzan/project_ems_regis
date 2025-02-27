import { useEffect, useState } from "react";
import { Md5 } from "ts-md5";

const accX = "w}5opZ%3oIQ6Vq(PUsTL";
const accY = new Date().getTime();

export default function RemoteImg({ src, style }) {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(src, {
          headers: {
            "x-access-x": Md5.hashStr(accX + accY),
            "x-access-y": accY,
          },
        });
        const blob = await response.blob();
        setImageSrc(URL.createObjectURL(blob));
      } catch (error) {
        console.error("Error loading image:", error);
      }
    };

    fetchImage();
  }, [src]);

  return <img src={imageSrc} alt="" style={style} />;
}
