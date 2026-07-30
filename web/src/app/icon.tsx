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
          background: "#F6F2EC",
          border: "5px solid #1F1F1F",
          color: "#1F1F1F",
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
            background: "#A85A4A",
          }}
        />
      </div>
    ),
    size,
  );
}
