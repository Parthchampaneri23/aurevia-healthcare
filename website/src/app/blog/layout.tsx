import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pharmaceutical Insights & Knowledge | Aurevia Healthcare",
  description:
    "Explore pharmaceutical industry insights, manufacturing knowledge, and healthcare perspectives from Aurevia Healthcare.",
  openGraph: {
    title: "Pharmaceutical Insights & Knowledge | Aurevia Healthcare",
    description:
      "Explore pharmaceutical industry insights, manufacturing knowledge, and healthcare perspectives from Aurevia Healthcare.",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
