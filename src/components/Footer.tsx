"use client";

import Link from "next/link";

const footerLinks = {
  social: [
    { label: "Instagram", href: "https://instagram.com" },
    { label: "X", href: "https://x.com" },
  ],
  company: [
    { label: "Contact", href: "/contact" },
    { label: "Audition", href: "/audition" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
  ],
};

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
      <span className="text-white/60 group-hover:text-white transition-colors duration-300">
        {children}
      </span>
      <span className="absolute left-0 bottom-[4px] h-[1px] bg-white transition-all duration-300 w-0 group-hover:w-full" />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="content-padding" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* Column 1: Social */}
          <div className="flex flex-col">
            {footerLinks.social.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>

          {/* Column 2: Company */}
          <div className="flex flex-col">
            {footerLinks.company.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>

          {/* Column 3: Legal */}
          <div className="flex flex-col">
            {footerLinks.legal.map((link) => (
              <FooterLink key={link.label} href={link.href}>
                {link.label}
              </FooterLink>
            ))}
          </div>

          {/* Column 4-5: Empty */}
          <div />
          <div />

          {/* Column 6: IST Symbol */}
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
