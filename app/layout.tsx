import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"]
});
const greatVibes = Great_Vibes({ 
  subsets: ["latin"], 
  variable: "--font-great-vibes",
  weight: "400"
});

export const metadata: Metadata = {
  title: "Our Memories - Valentine's Day 💕",
  description: "A beautiful collection of our memories together - For my forever Valentine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${greatVibes.variable}`}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
