import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Symptom Checker",
  description:
    "AI-assisted symptom checker for dog owners. Structured, fast, and vet-safe guidance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
