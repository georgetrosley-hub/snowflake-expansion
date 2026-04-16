import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "Territory Operating Console",
  description: "Named accounts, tiered coverage — stakeholder, wedge, demo, touch",
  icons: {
    icon: "/snowflake-symbol.png",
    apple: "/snowflake-symbol.png"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen font-sans antialiased`}>{children}</body>
    </html>
  );
}

