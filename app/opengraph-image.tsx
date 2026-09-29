import { ImageResponse } from "next/og";
import { items, peso, site } from "@/lib/site";

export const alt = `${site.name} – ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #1f2a44 0%, #2b3a5e 55%, #e8622a 140%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 88, fontWeight: 800 }}>{site.name}</div>
        <div style={{ fontSize: 40, marginTop: 12, color: "#ffd479" }}>{site.tagline}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 48 }}>
          {items.map((it) => (
            <div
              key={it.key}
              style={{ display: "flex", padding: "12px 22px", borderRadius: 999, background: "rgba(255,255,255,0.14)", fontSize: 28 }}
            >
              {`${it.name} ${peso(it.price)}`}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
