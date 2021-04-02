import React, { FunctionComponent } from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

const CarSlideshow: FunctionComponent = () => {
  const frame = useCurrentFrame();
  const { width, height, durationInFrames } = useVideoConfig();
  const left = interpolate(frame, [0, durationInFrames], [width, width * -1]);
  return (
    <div
      style={{
        backgroundColor: "hotpink",
        width: width,
        height: height,
        position: "absolute",
        left: 0,
        top: 0
      }}
    >
      <h1
        style={{
          fontSize: "5em",
          fontWeight: "bold",
          position: "absolute",
          top: height / 2 - 100,
          left,
          color: "white",
          whiteSpace: "nowrap"
        }}
      >
        OMG BUY THIS AWESOME CAR!!1!
      </h1>
    </div>
  );
};

export default CarSlideshow;
