import type { Metadata } from "next";
import ContactPageClient from "@/components/contact-page-client";

export const metadata: Metadata = {
  title: "Contact | CrelyneX",
  description:
    "Contact CrelyneX for collaborations, support, and program details.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
