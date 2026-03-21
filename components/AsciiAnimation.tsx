import { useEffect, useState } from "react";
import { Text } from "react-native";
import animation from "../assets/pookie.json";

const frames = animation.frames
  .map((f) => f.contentString)
  .filter((f) => f.trim() !== "");

export default function AsciiAnimation() {
  const [frameIndex, setFrameIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frames.length);
    }, 2000 / animation.animation.frameRate);

    return () => clearInterval(interval);
  }, []);

  return (
    <Text
      adjustsFontSizeToFit
      numberOfLines={20}
      style={{  
        fontFamily: "monospace",
        color: "white",
      }}
    >
      {frames[frameIndex]}
    </Text>
  );
}
