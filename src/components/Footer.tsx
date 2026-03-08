"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isExternal = href.startsWith("http");

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="group relative w-fit"
      style={{
        fontSize: "16px",
        fontFamily: "var(--font-geist-sans)",
        fontWeight: 400,
        paddingTop: "4px",
        paddingBottom: "4px",
      }}
    >
      <span className="text-white group-hover:text-white/60 transition-colors duration-300">
        {children}
      </span>
      <span className="absolute left-0 bottom-[4px] h-[1px] bg-white transition-all duration-300 w-0 group-hover:w-full" />
    </Link>
  );
}

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = {
    social: [
      { label: t("인스타그램", "Instagram"), href: "https://www.instagram.com/ist_entertainment" },
      { label: "X", href: "https://x.com" },
    ],
    company: [
      { label: t("오디션", "Audition"), href: "/audition" },
      { label: t("문의", "Contact"), href: "/contact" },
    ],
    legal: [
      { label: t("개인정보처리방침", "Privacy"), href: "/privacy" },
    ],
  };

  return (
    <footer className="bg-black">
      {/* Mobile */}
      <div
        className="md:hidden"
        style={{ padding: "40px 16px 16px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr) 44px",
            alignItems: "start",
          }}
        >
          <div className="flex flex-col">
            {footerLinks.social.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
          <div className="flex flex-col">
            {footerLinks.company.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
          <div className="flex flex-col">
            {footerLinks.legal.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
          <div className="flex justify-end">
            <svg
              width="24"
              height="24"
              viewBox="0 0 100 100"
              fill="none"
            >
              <path
                fill="#ff1f5d"
                d="M0 35.5h47.5V100L82.9 65V0H35.5Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div
        className="hidden md:block"
        style={{ padding: "40px 24px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "24px",
            alignItems: "start",
          }}
        >
          <div className="flex flex-col">
            {footerLinks.social.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
          <div className="flex flex-col">
            {footerLinks.company.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
          <div className="flex flex-col">
            {footerLinks.legal.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>
          <div />
          <div />
          <div className="flex justify-end">
            <svg
              width="24"
              height="24"
              viewBox="0 0 100 100"
              fill="none"
            >
              <path
                fill="#ff1f5d"
                d="M0 35.5h47.5V100L82.9 65V0H35.5Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </footer>
  );
}
