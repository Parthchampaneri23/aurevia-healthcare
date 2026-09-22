import type { Metadata } from "next";
import PrivacyContent from "@/app/components/privacy/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Aurevia Healthcare",
  description:
    "Learn how Aurevia Healthcare collects, uses, and protects your information when using our website and services.",
  openGraph: {
    title: "Privacy Policy | Aurevia Healthcare",
    description:
      "Learn how Aurevia Healthcare collects, uses, and protects your information when using our website and services.",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyContent />;
}