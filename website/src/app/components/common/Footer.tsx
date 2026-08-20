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
} from "react-icons/fa6";

const companyLinks = [
    { name: "About", href: "/about" },
    { name: "Manufacturing", href: "/manufacturing" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
];

const productLinks = [
    { name: "Tablets", href: "/products?category=tablets" },
    { name: "Capsules", href: "/products?category=capsules" },
    { name: "Syrups", href: "/products?category=syrups" },
    { name: "Injectables", href: "/products?category=injectables" },
    {
        name: "Ointments & Creams",
        href: "/products?category=ointments-creams",
    },
    {
        name: "Nutraceuticals",
        href: "/products?category=nutraceuticals",
    },
];

export default function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-[#0b1724] text-white">

            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">

                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.8fr_0.8fr_1fr_1.2fr] lg:gap-12">

                    {/* Brand */}
                    <div className="lg:pr-10">
                        <Link href="/" className="inline-flex items-center">
                            <Image
                                src="/hero/logo.png"
                                alt="Aurevia Healthcare"
                                width={180}
                                height={55}
                                className="h-auto w-[150px] object-contain"
                            />
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
                            Quality-driven pharmaceutical manufacturing
                            solutions built around reliability, consistency
                            and long-term healthcare partnerships.
                        </p>

                        {/* Social Icons */}
                        <div className="mt-6 flex items-center gap-2.5">

                            {/* LinkedIn */}
                            <a
                                href="#"
                                aria-label="LinkedIn"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-all duration-200 hover:border-[#0F766E] hover:bg-[#0F766E] hover:text-white"
                            >
                                <FaLinkedinIn size={15} />
                            </a>

                            {/* X */}
                            <a
                                href="#"
                                aria-label="X"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-all duration-200 hover:border-[#0F766E] hover:bg-[#0F766E] hover:text-white"
                            >
                                <FaXTwitter size={15} />
                            </a>

                            {/* Instagram */}
                            <a
                                href="#"
                                aria-label="Instagram"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-all duration-200 hover:border-[#0F766E] hover:bg-[#0F766E] hover:text-white"
                            >
                                <FaInstagram size={15} />
                            </a>

                            {/* Facebook */}
                            <a
                                href="#"
                                aria-label="Facebook"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition-all duration-200 hover:border-[#0F766E] hover:bg-[#0F766E] hover:text-white"
                            >
                                <FaFacebookF size={15} />
                            </a>

                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Company
                        </h3>

                        <ul className="mt-4 space-y-2.5">
                            {companyLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 transition hover:text-white"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Products
                        </h3>

                        <ul className="mt-4 space-y-2.5">
                            {productLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-slate-400 transition hover:text-white"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-white">
                            Contact Us
                        </h3>

                        <div className="mt-4 space-y-4">

                            {/* Location */}
                            <div className="flex items-start gap-3">
                                <FaLocationDot
                                    size={15}
                                    className="mt-1 shrink-0 text-[#2dd4bf]"
                                />

                                <p className="text-sm leading-5 text-slate-400">
                                    Gujarat, India
                                </p>
                            </div>

                            {/* Phone */}
                            <a
                                href="tel:+910000000000"
                                className="flex items-center gap-3 text-sm text-slate-400 transition hover:text-white"
                            >
                                <FaPhone
                                    size={14}
                                    className="shrink-0 text-[#2dd4bf]"
                                />

                                <span>+91 8677456564</span>
                            </a>

                            {/* Email */}
                            <a
                                href="mailto:info@aureviahealthcare.com"
                                className="flex items-center gap-3 text-sm text-slate-400 transition hover:text-white"
                            >
                                <FaEnvelope
                                    size={14}
                                    className="shrink-0 text-[#2dd4bf]"
                                />

                                <span>info@aureviahealthcare.com</span>
                            </a>

                        </div>
                    </div>

                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left lg:px-8">

                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} Aurevia Healthcare.
                        All rights reserved.
                    </p>

                    <div className="flex items-center justify-center gap-4 text-xs text-slate-500 sm:justify-end">
                        <Link
                            href="/privacy"
                            className="transition hover:text-white"
                        >
                            Privacy Policy
                        </Link>

                        <span className="text-slate-700">|</span>

                        <Link
                            href="/terms"
                            className="transition hover:text-white"
                        >
                            Terms & Conditions
                        </Link>
                    </div>

                </div>
            </div>

        </footer>
    );
}