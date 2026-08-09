import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = "LeadbyLead — Exclusive roofing appointments";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#0f172a",
        color: "white",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px",
        width: "100%",
      }}
    >
      <div
        style={{
          color: "#fcd34d",
          display: "flex",
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 4,
        }}
      >
        {site.name.toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: -3,
            lineHeight: 1.05,
          }}
        >
          Roofing appointments for teams ready to grow.
        </div>
        <div
          style={{
            color: "#cbd5e1",
            display: "flex",
            fontSize: 28,
            lineHeight: 1.4,
            marginTop: 28,
          }}
        >
          Compare flexible packages or request a qualifying two-appointment trial.
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 24, fontWeight: 600, gap: 16 }}>
        <span style={{ color: "#fcd34d" }}>01</span>
        <span>Choose a package</span>
        <span style={{ color: "#fcd34d" }}>→</span>
        <span>Confirm fit</span>
      </div>
    </div>,
    size,
  );
}
