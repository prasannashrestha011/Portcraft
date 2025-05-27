import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "Portfolio Builder",
  description: "Build and share your portfolio instantly  simple, smart, no fuss.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      
      >
        {children}
      </body>
    </html>
  );
}
