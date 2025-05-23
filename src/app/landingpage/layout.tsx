import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import Navbar from "../DashboardComp/Navbar";
import Footer from "../Component/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bidvest",
  description: "Generated by create next app",
  icons: [
    { rel: "icon", url: "/img/logo3.jpg" },
    { rel: "apple-touch-icon", url: "/img/logo3.jpg" },
    { rel: "shortcut icon", url: "/img/logo3.jpg" }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen ">
          <Navbar />
          <div className="mt-3 ">
           

            {children}
          </div>
          <Footer/>
        </div>
      </body>
    </html>
  );
}
