import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7F3EE",
          border: "5px solid #222222",
          color: "#222222",
          fontFamily: "Georgia, serif",
          fontSize: "38px",
          fontWeight: 400,
        }}
      >
        H
        <div
          style={{
            position: "absolute",
            right: "4px",
            bottom: "4px",
            width: "10px",
            height: "3px",
            background: "#B85C4B",
          }}
        />
      </div>
    ),
    size,
  );
}
