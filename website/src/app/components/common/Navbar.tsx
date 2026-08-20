"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import products from "@/app/components/products/productData";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Industries", href: "/industries" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
];

const categoryOrder = [
    "Tablets",
    "Capsules",
    "Syrups",
    "Injectables",
    "Ointments & Creams",
    "Nutraceuticals",
];

const categoryLinks: Record<string, string> = {
    Tablets: "/products?category=tablets",
    Capsules: "/products?category=capsules",
    Syrups: "/products?category=syrups",
    Injectables: "/products?category=injectables",
    "Ointments & Creams": "/products?category=ointments-creams",
    Nutraceuticals: "/products?category=nutraceuticals",
};

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [productsOpen, setProductsOpen] = useState(false);

    const groupedProducts = categoryOrder.map((category) => ({
        name: category,
        href: categoryLinks[category],
        products: products.filter(
            (product) => product.category === category
        ),
    }));

    const closeMenus = () => {
        setIsOpen(false);
        setProductsOpen(false);
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
            <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

                {/* Logo */}
                <div className="flex lg:flex-1">
                    <Link
                        href="/"
                        onClick={closeMenus}
                        className="flex items-center"
                    >
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
                        onClick={() => {
                            setIsOpen((prev) => !prev);
                            setProductsOpen(false);
                        }}
                        className="rounded-md p-2 text-[#123B5D] transition hover:bg-slate-100"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {isOpen ? <X size={26} /> : <Menu size={26} />}
                    </button>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-x-8 lg:flex">

                    {/* Home */}
                    <Link
                        href="/"
                        className="relative text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-[#0F766E] after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-[#0F766E] after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Home
                    </Link>

                    {/* About */}
                    <Link
                        href="/about"
                        className="relative text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-[#0F766E] after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-[#0F766E] after:transition-all after:duration-300 hover:after:w-full"
                    >
                        About
                    </Link>

                    {/* Products Mega Menu */}
                    <div
                        className="relative"
                        onMouseEnter={() => setProductsOpen(true)}
                        onMouseLeave={() => setProductsOpen(false)}
                    >
                        <button
                            type="button"
                            onClick={() =>
                                setProductsOpen((prev) => !prev)
                            }
                            className="relative flex items-center gap-1.5 py-7 text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-[#0F766E]"
                        >
                            Products

                            <ChevronDown
                                size={15}
                                className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""
                                    }`}
                            />

                            <span
                                className={`absolute bottom-[17px] left-0 h-[2px] bg-[#0F766E] transition-all duration-300 ${productsOpen ? "w-full" : "w-0"
                                    }`}
                            />
                        </button>

                        {/* Mega Menu */}
                        <div
                            className={`absolute left-1/2 top-full z-50 w-[1000px] -translate-x-1/2 pt-2 transition-all duration-200 ${productsOpen
                                    ? "visible translate-y-0 opacity-100"
                                    : "invisible -translate-y-2 opacity-0"
                                }`}
                        >
                            <div className="overflow-hidden border-t-2 border-[#123B5D] bg-white shadow-[0_20px_50px_rgba(15,23,42,0.14)]">

                                {/* Header */}
                                <div className="flex items-center justify-between border-b border-slate-100 px-8 py-5">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0F766E]">
                                            PRODUCT PORTFOLIO
                                        </p>

                                        <h2 className="mt-1 text-lg font-semibold text-slate-900">
                                            Pharmaceutical & Healthcare Products
                                        </h2>
                                    </div>

                                    <Link
                                        href="/products"
                                        onClick={() =>
                                            setProductsOpen(false)
                                        }
                                        className="group flex items-center gap-2 text-xs font-semibold text-[#123B5D] transition hover:text-[#0F766E]"
                                    >
                                        View All Products

                                        <ArrowRight
                                            size={15}
                                            className="transition-transform duration-200 group-hover:translate-x-1"
                                        />
                                    </Link>
                                </div>

                                {/* Categories */}
                                <div className="grid grid-cols-3 gap-x-10 gap-y-7 px-8 py-7">
                                    {groupedProducts.map((category) => (
                                        <div key={category.name}>

                                            {/* Category Title */}
                                            <Link
                                                href={category.href}
                                                onClick={() =>
                                                    setProductsOpen(false)
                                                }
                                                className="group inline-flex items-center text-sm font-bold text-slate-900 transition hover:text-[#0F766E]"
                                            >
                                                <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#0F766E] transition-transform duration-200 group-hover:scale-150" />

                                                {category.name}

                                                <ArrowRight
                                                    size={12}
                                                    className="ml-1.5 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                                                />
                                            </Link>

                                            {/* Product List */}
                                            <div className="mt-2.5 space-y-1 border-l border-slate-200 pl-4">
                                                {category.products.map(
                                                    (product) => (
                                                        <Link
                                                            key={product.slug}
                                                            href={`/products/${product.slug}`}
                                                            onClick={() =>
                                                                setProductsOpen(
                                                                    false
                                                                )
                                                            }
                                                            className="block text-[11px] leading-5 text-slate-500 transition-all duration-150 hover:translate-x-1 hover:text-[#123B5D]"
                                                        >
                                                            {product.name}
                                                        </Link>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom Strip */}
                                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-8 py-3.5">
                                    <p className="text-[11px] text-slate-500">
                                        Explore Aurevia Healthcare&apos;s
                                        pharmaceutical and nutraceutical
                                        portfolio.
                                    </p>

                                    <Link
                                        href="/contact"
                                        onClick={() =>
                                            setProductsOpen(false)
                                        }
                                        className="text-[11px] font-semibold text-[#123B5D] transition hover:text-[#0F766E]"
                                    >
                                        Request Product Information →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Industries */}
                    <Link
                        href="/industries"
                        className="relative text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-[#0F766E] after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-[#0F766E] after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Industries
                    </Link>

                    {/* Careers */}
                    <Link
                        href="/careers"
                        className="relative text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-[#0F766E] after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-[#0F766E] after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Careers
                    </Link>

                    {/* Contact */}
                    <Link
                        href="/contact"
                        className="relative text-sm font-medium text-slate-700 transition-colors duration-200 hover:text-[#0F766E] after:absolute after:bottom-[-6px] after:left-0 after:h-[2px] after:w-0 after:bg-[#0F766E] after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Contact
                    </Link>
                </div>

                {/* Request Quote */}
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link
                        href="/contact"
                        className="rounded-lg bg-[#123B5D] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] hover:bg-[#0F766E] hover:shadow-md active:scale-[0.98]"
                    >
                        Request a Quote
                    </Link>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="border-t border-slate-200 bg-white lg:hidden">
                    <div className="mx-auto flex max-h-[calc(100vh-80px)] max-w-7xl flex-col overflow-y-auto px-6 py-4">

                        {/* Home + About */}
                        <Link
                            href="/"
                            onClick={closeMenus}
                            className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700 hover:text-[#0F766E]"
                        >
                            Home
                        </Link>

                        <Link
                            href="/about"
                            onClick={closeMenus}
                            className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700 hover:text-[#0F766E]"
                        >
                            About
                        </Link>

                        {/* Mobile Products */}
                        <button
                            type="button"
                            onClick={() =>
                                setProductsOpen((prev) => !prev)
                            }
                            className="flex w-full items-center justify-between border-b border-slate-100 py-3 text-left text-sm font-medium text-slate-700 hover:text-[#0F766E]"
                        >
                            Products

                            <ChevronDown
                                size={16}
                                className={`transition-transform duration-200 ${productsOpen ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {productsOpen && (
                            <div className="border-b border-slate-100 py-2 pl-3">
                                {groupedProducts.map((category) => (
                                    <div
                                        key={category.name}
                                        className="border-l border-slate-200 pl-4"
                                    >
                                        <Link
                                            href={category.href}
                                            onClick={closeMenus}
                                            className="block py-2.5 text-sm font-semibold text-[#123B5D]"
                                        >
                                            {category.name}
                                        </Link>

                                        <div className="pb-2">
                                            {category.products.map(
                                                (product) => (
                                                    <Link
                                                        key={product.slug}
                                                        href={`/products/${product.slug}`}
                                                        onClick={closeMenus}
                                                        className="block py-1.5 text-xs text-slate-500 transition hover:text-[#0F766E]"
                                                    >
                                                        {product.name}
                                                    </Link>
                                                )
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Remaining Mobile Links */}
                        <Link
                            href="/industries"
                            onClick={closeMenus}
                            className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700 hover:text-[#0F766E]"
                        >
                            Industries
                        </Link>

                        <Link
                            href="/careers"
                            onClick={closeMenus}
                            className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700 hover:text-[#0F766E]"
                        >
                            Careers
                        </Link>

                        <Link
                            href="/contact"
                            onClick={closeMenus}
                            className="border-b border-slate-100 py-3 text-sm font-medium text-slate-700 hover:text-[#0F766E]"
                        >
                            Contact
                        </Link>

                        {/* Mobile Quote */}
                        <Link
                            href="/contact"
                            onClick={closeMenus}
                            className="mt-4 rounded-lg bg-[#123B5D] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#0F766E]"
                        >
                            Request a Quote
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
