import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import SmoothScroll from "@/components/SmoothScroll";
import { MenuProvider } from "@/context/MenuContext";
import { LanguageProvider } from "@/context/LanguageContext";

const ppEiko = localFont({
  src: "../fonts/PPEiko-Medium.otf",
  variable: "--font-pp-eiko",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IST COMPANY",
  description: "IST Entertainment - K-Pop Entertainment Company",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${ppEiko.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <MenuProvider>
            <SmoothScroll>
              <Header />
              <MenuOverlay />
              <main>{children}</main>
            </SmoothScroll>
          </MenuProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
