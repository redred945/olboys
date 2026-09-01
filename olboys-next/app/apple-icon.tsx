import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Icône d'écran d'accueil iOS : le ballon OLBOYS sur fond nuit. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0C0A0A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="132" height="132" viewBox="0 0 64 64">
          <circle cx="32" cy="32" r="27" fill="#FFD22E" />
          <g fill="none" stroke="#7A1226" strokeWidth={3.4}>
            <circle cx="32" cy="32" r="27" />
            <path d="M32 5 V59 M5 32 H59 M13 12 C 27 22, 27 42, 13 52 M51 12 C 37 22, 37 42, 51 52" />
          </g>
        </svg>
      </div>
    ),
    size
  );
}
