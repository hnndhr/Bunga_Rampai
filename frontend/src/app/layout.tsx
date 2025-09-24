import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bunga Rampai",
  description: "Exploring Facts, Building the Future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
