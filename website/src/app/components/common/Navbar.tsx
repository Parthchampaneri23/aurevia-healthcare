"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Manufacturing", href: "/manufacturing" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
                {/* Logo */}
                <div className="flex lg:flex-1">
                    <Link href="/" className="flex items-center">
                        <Image
                            src="/hero/logo.png"
                            alt="Aurevia Healthcare"
                            width={180}
                            height={55}
                            priority
                            className="h-auto w-[120px] object-contain sm:w-[140px]"
                        />
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="rounded-md p-2 text-[#123B5D] hover:bg-slate-100"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex lg:gap-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-[#0F766E] relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-[#0F766E] after:transition-all after:duration-300 hover:after:w-full"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Action / Quote Button */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link
                        href="/contact"
                        className="rounded-lg bg-[#123B5D] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#0F766E] hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Request a Quote
                    </Link>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="border-t border-slate-200 bg-white lg:hidden">
                    <div className="mx-auto flex max-w-7xl flex-col px-6 py-4">

                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700 hover:text-[#0F766E]"
                            >
                                {link.name}
                            </Link>
                        ))}

                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="mt-4 rounded-lg bg-[#123B5D] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[#0F766E]"
                        >
                            Request a Quote
                        </Link>

                    </div>
                </div>
            )}
        </header>
    );
}