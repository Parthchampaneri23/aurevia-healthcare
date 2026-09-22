import Image from "next/image";
import Link from "next/link";
import {
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaLinkedinIn,
  FaXTwitter,
  FaInstagram,
  FaFacebookF,
  FaArrowRight,
} from "react-icons/fa6";

const companyLinks = [
  { name: "About Us", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Industries", href: "/industries" },
  { name: "Careers", href: "/careers" },
  { name: "Blogs & Insights", href: "/blog" },
  { name: "Contact Us", href: "/contact" },
];

const productLinks = [
  { name: "Tablets", href: "/products?category=tablets#explore" },
  { name: "Capsules", href: "/products?category=capsules#explore" },
  { name: "Syrups", href: "/products?category=syrups#explore" },
  { name: "Injectables", href: "/products?category=injectables#explore" },
  {
    name: "Ointments & Creams",
    href: "/products?category=ointments-creams#explore",
  },
  {
    name: "Nutraceuticals",
    href: "/products?category=nutraceuticals#explore",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-slate-800 bg-[#071E33] text-white overflow-hidden">
      {/* Top Accent Gradient Bar */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#123B5D] via-[#0F766E] to-[#2A9D8F]" />

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      {/* Main Footer Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1.4fr] lg:gap-12">

          {/* Column 1: Brand & Overview */}
          <div className="lg:pr-6">
            <Link href="/" className="inline-flex items-center group">
              <Image
                src="/hero/logo.png"
                alt="Aurevia Healthcare - Pharmaceutical Manufacturing"
                width={180}
                height={55}
                className="h-auto w-[155px] object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </Link>

            <p className="mt-5 text-sm leading-relaxed text-slate-300 font-normal">
              Aurevia Healthcare delivers quality-driven pharmaceutical manufacturing solutions built around reliability, WHO-GMP compliance, and long-term B2B partnerships.
            </p>

            {/* Social Media Links */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="#"
                aria-label="Aurevia Healthcare on LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/50 text-slate-300 transition-all duration-200 hover:border-[#0F766E] hover:bg-[#0F766E] hover:text-white hover:scale-105"
              >
                <FaLinkedinIn size={14} />
              </a>

              <a
                href="#"
                aria-label="Aurevia Healthcare on Twitter X"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/50 text-slate-300 transition-all duration-200 hover:border-[#0F766E] hover:bg-[#0F766E] hover:text-white hover:scale-105"
              >
                <FaXTwitter size={14} />
              </a>

              <a
                href="#"
                aria-label="Aurevia Healthcare on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/50 text-slate-300 transition-all duration-200 hover:border-[#0F766E] hover:bg-[#0F766E] hover:text-white hover:scale-105"
              >
                <FaInstagram size={14} />
              </a>

              <a
                href="#"
                aria-label="Aurevia Healthcare on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700/80 bg-slate-900/50 text-slate-300 transition-all duration-200 hover:border-[#0F766E] hover:bg-[#0F766E] hover:text-white hover:scale-105"
              >
                <FaFacebookF size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-teal-300 border-b border-slate-800 pb-2.5">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-slate-300 transition-all duration-200 hover:text-teal-300 hover:translate-x-1"
                  >
                    <FaArrowRight size={10} className="mr-2 text-[#0F766E] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-teal-300 border-b border-slate-800 pb-2.5">
              Dosage Portfolio
            </h3>

            <ul className="mt-4 space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm font-medium text-slate-300 transition-all duration-200 hover:text-teal-300 hover:translate-x-1"
                  >
                    <FaArrowRight size={10} className="mr-2 text-[#0F766E] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-teal-300 border-b border-slate-800 pb-2.5">
              Contact &amp; Facility
            </h3>

            <div className="mt-4 space-y-4">
              {/* Location */}
              <a
                href="https://maps.google.com/?q=Changodar+GIDC,+Ahmedabad,+Gujarat+382213,+India"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-sm text-slate-300 transition hover:text-teal-300"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-[#0F766E] group-hover:text-white transition-colors">
                  <FaLocationDot size={14} />
                </div>
                <p className="text-xs sm:text-sm leading-relaxed pt-0.5">
                  Changodar GIDC, Ahmedabad, Gujarat 382213, India
                </p>
              </a>

              {/* Phone */}
              <a
                href="tel:+918677456564"
                className="group flex items-center gap-3 text-sm text-slate-300 transition hover:text-teal-300"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-[#0F766E] group-hover:text-white transition-colors">
                  <FaPhone size={13} />
                </div>
                <span className="text-xs sm:text-sm font-medium">+91 8677456564</span>
              </a>

              {/* Email */}
              <a
                href="mailto:info@aureviahealthcare.com"
                className="group flex items-center gap-3 text-sm text-slate-300 transition hover:text-teal-300"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-500/10 text-teal-400 group-hover:bg-[#0F766E] group-hover:text-white transition-colors">
                  <FaEnvelope size={13} />
                </div>
                <span className="text-xs sm:text-sm font-medium break-all">info@aureviahealthcare.com</span>
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950/60 py-5">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">
          <p className="text-xs text-slate-400 font-medium">
            © {currentYear} Aurevia Healthcare. All rights reserved.
          </p>

          <div className="flex items-center justify-center gap-4 text-xs font-medium text-slate-400 sm:justify-end">
            <Link
              href="/privacy"
              className="transition hover:text-teal-300"
            >
              Privacy Policy
            </Link>

            <span className="text-slate-700">•</span>

            <Link
              href="/terms"
              className="transition hover:text-teal-300"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}