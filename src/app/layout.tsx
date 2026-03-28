import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TONYA Inc.",
  description:
    "EC/D2Cブランドの国内リテール進出を支援する株式会社TONYAの公式サイト",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
