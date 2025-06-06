import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";


import Footer from "../DashboardComp/Footer";
import { NotificationProvider } from "../context/NotificationContext";
import ClientLayoutCom from "../context/ClientLayoutCom";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Apexion",
  description: "Generated by create next app",
  icons: [
    { rel: "icon", url: "/img/logo3.jpg" },
    { rel: "apple-touch-icon", url: "/img/logo3.jpg" },
    { rel: "shortcut icon", url: "/img/logo3.jpg" },
  ],
};

export default function market({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NotificationProvider>
        <div className=" min-h-screen ">
         
          <ClientLayoutCom>
          <div>{children}</div>
          </ClientLayoutCom>
          <Footer />
        </div>
        </NotificationProvider>
      </body>
    </html>
  );
}
