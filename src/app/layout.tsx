import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EyNoah – Streamer",
  description: "Offizieller Stream von EyNoah – Live Gaming, Clips und mehr.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`noise grid-bg min-h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Cursor />
      <Navbar />
        {children}
      <Footer />
      </body>
    </html>
  );
}
