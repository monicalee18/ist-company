import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with IST Entertainment. Business inquiries, fan support, and audition questions.",
  openGraph: {
    title: "Contact | IST COMPANY",
    description:
      "Get in touch with IST Entertainment. Business inquiries, fan support, and audition questions.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
