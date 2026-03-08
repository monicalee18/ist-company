import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import IntroAnimation from "@/components/IntroAnimation";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import SmoothScroll from "@/components/SmoothScroll";
import ConditionalFooter from "@/components/ConditionalFooter";
import { MenuProvider } from "@/context/MenuContext";
import { LanguageProvider } from "@/context/LanguageContext";

const ppEiko = localFont({
  src: "../fonts/PPEiko-Medium.otf",
  variable: "--font-pp-eiko",
  display: "swap",
});

const aspekta = localFont({
  src: "../fonts/AspektaVF.woff2",
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
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
        className={`${ppEiko.variable} ${aspekta.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <MenuProvider>
            <IntroAnimation />
            <CustomCursor />
            <SmoothScroll>
              <Header />
              <MenuOverlay />
              <main>{children}</main>
              <ConditionalFooter />
            </SmoothScroll>
          </MenuProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
