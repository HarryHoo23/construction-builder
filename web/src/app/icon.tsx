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
          display: "flex",
          flexWrap: "wrap",
          gap: "4px",
          background: "#f5f1e8",
          padding: "8px",
          border: "5px solid #20211f",
        }}
      >
        <div style={{ width: "19px", height: "19px", background: "#20211f" }} />
        <div style={{ width: "19px", height: "19px", border: "3px solid #20211f" }} />
        <div style={{ width: "19px", height: "19px", border: "3px solid #20211f" }} />
        <div style={{ width: "19px", height: "19px", background: "#8a6b43" }} />
      </div>
    ),
    size,
  );
}
