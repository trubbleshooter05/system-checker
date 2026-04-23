import { ImageResponse } from "next/og";

import { SITE_NAME } from "@/lib/site";

export const runtime = "edge";

export const alt = `${SITE_NAME} — educational dog health triage (informational only)`;
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 72,
          background: "linear-gradient(135deg, #0f172a 0%, #020617 50%, #0c4a6e 100%)",
          color: "#e2e8f0",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, letterSpacing: -1 }}>{SITE_NAME}</div>
        <div style={{ marginTop: 20, fontSize: 28, maxWidth: 900, lineHeight: 1.35, color: "#94a3b8" }}>
          Dog emergency symptom triage — not veterinary diagnosis, treatment, or ER care.
        </div>
        <div style={{ marginTop: 36, fontSize: 22, color: "#22d3ee" }}>symptom.fursbliss.com</div>
      </div>
    ),
    {
      ...size,
    }
  );
}
