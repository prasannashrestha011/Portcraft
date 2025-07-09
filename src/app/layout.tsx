import type { Metadata } from "next";
import "@shadeui/ui/styles.css";
import "./globals.css";
import { AuthListener } from "./clientComponents/AuthListener";

export const metadata: Metadata = {
  title: "Portfolio Builder",
  description:
    "Build and share your portfolio instantly  simple, smart, no fuss.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthListener />
        {children}
      </body>
    </html>
  );
}
