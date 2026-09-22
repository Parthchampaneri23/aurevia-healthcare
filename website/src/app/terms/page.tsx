import type { Metadata } from "next";
import TermsContent from "@/app/components/terms/TermsContent";

export const metadata: Metadata = {
  title: "Terms & Conditions | Aurevia Healthcare",
  description:
    "Review the Terms & Conditions governing your access and use of Aurevia Healthcare's website, products, and services.",
  openGraph: {
    title: "Terms & Conditions | Aurevia Healthcare",
    description:
      "Review the Terms & Conditions governing your access and use of Aurevia Healthcare's website, products, and services.",
    type: "website",
  },
};

export default function TermsPage() {
  return <TermsContent />;
}