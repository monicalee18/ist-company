import type { Metadata } from "next";
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

const aspekta = localFont({
  src: "../fonts/AspektaVF.woff2",
  variable: "--font-aspekta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IST COMPANY",
    template: "%s | IST COMPANY",
  },
  description: "IST Entertainment - K-Pop Entertainment Company",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "IST COMPANY",
    description: "IST Entertainment - K-Pop Entertainment Company",
    siteName: "IST COMPANY",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IST Entertainment",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IST COMPANY",
    description: "IST Entertainment - K-Pop Entertainment Company",
    images: ["/og-image.png"],
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
        className={`${aspekta.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EntertainmentBusiness",
              name: "IST Entertainment",
              alternateName: "IST COMPANY",
              url: "https://ist-company.vercel.app",
              logo: "https://ist-company.vercel.app/og-image.png",
              description: "K-Pop Entertainment Company specializing in creative direction, strategic management, and global production.",
              foundingDate: "2006",
              sameAs: [
                "https://www.instagram.com/ist_entertainment",
                "https://x.com/ist_ent",
              ],
            }),
          }}
        />
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
