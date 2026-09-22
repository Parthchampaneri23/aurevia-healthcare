"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X, ArrowRight, Package, Building2, User, Phone, Newspaper, HelpCircle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import products from "@/app/components/products/productData";

const categoryOrder = [
  "Tablets",
  "Capsules",
  "Syrups",
  "Injectables",
  "Ointments & Creams",
  "Nutraceuticals",
];

const categoryLinks: Record<string, string> = {
  Tablets: "/products?category=tablets#explore",
  Capsules: "/products?category=capsules#explore",
  Syrups: "/products?category=syrups#explore",
  Injectables: "/products?category=injectables#explore",
  "Ointments & Creams": "/products?category=ointments-creams#explore",
  Nutraceuticals: "/products?category=nutraceuticals#explore",
};

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Group products by category from existing product data
  const groupedProducts = categoryOrder.map((category) => ({
    name: category,
    href: categoryLinks[category],
    products: products.filter((product) => product.category === category),
  }));

  // Track page scroll for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle escape key to close menu
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeMenus = () => {
    setIsOpen(false);
    setProductsOpen(false);
    if (typeof document !== "undefined") {
      document.body.style.overflow = "";
    }
  };

  const toggleMobileMenu = () => {
    setIsOpen((prev) => {
      const nextState = !prev;
      if (typeof document !== "undefined") {
        document.body.style.overflow = nextState ? "hidden" : "";
      }
      return nextState;
    });
    setProductsOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname?.startsWith(href)) return true;
    return false;
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200/90 bg-white/95 backdrop-blur-md shadow-md py-0"
          : "border-b border-slate-100 bg-white shadow-sm py-0"
      }`}
    >
      <nav
        ref={navRef}
        className={`mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-300 ${
          isScrolled ? "h-20" : "h-24"
        }`}
      >
        {/* Brand Logo */}
        <div className="flex lg:flex-1">
          <Link
            href="/"
            onClick={closeMenus}
            className="flex items-center group transition-transform duration-200 hover:scale-[1.02]"
            aria-label="Aurevia Healthcare Homepage"
          >
            <Image
              src="/hero/logo.png"
              alt="Aurevia Healthcare - Pharmaceutical Manufacturing"
              width={180}
              height={55}
              priority
              className="h-auto w-[135px] sm:w-[155px] object-contain"
            />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center rounded-xl p-2.5 text-[#123B5D] transition hover:bg-slate-100 hover:text-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close main navigation menu" : "Open main navigation menu"}
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden items-center gap-x-8 lg:flex">
          {/* About Us */}
          <Link
            href="/about"
            className={`relative py-2 text-sm font-bold transition-colors duration-200 ${
              isActive("/about")
                ? "text-[#0F766E]"
                : "text-slate-800 hover:text-[#0F766E]"
            }`}
          >
            <span>About Us</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#0F766E] transition-all duration-300 ${
                isActive("/about") ? "w-full" : "w-0 hover:w-full"
              }`}
            />
          </Link>

          {/* Products Mega Menu Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <Link
              href="/products"
              onClick={() => setProductsOpen(false)}
              className={`relative flex items-center gap-1.5 py-8 text-sm font-bold transition-colors duration-200 ${
                isActive("/products")
                  ? "text-[#0F766E]"
                  : "text-slate-800 hover:text-[#0F766E]"
              }`}
            >
              <span>Products</span>
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${
                  productsOpen ? "rotate-180 text-[#0F766E]" : ""
                }`}
              />
              <span
                className={`absolute bottom-6 left-0 h-[2px] bg-[#0F766E] transition-all duration-300 ${
                  isActive("/products") || productsOpen ? "w-full" : "w-0"
                }`}
              />
            </Link>

            {/* Mega Menu Dropdown Panel */}
            <div
              className={`absolute left-1/2 top-full z-50 w-[960px] -translate-x-1/2 pt-1 transition-all duration-200 ${
                productsOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0 pointer-events-none"
              }`}
            >
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
                {/* Top Accent Bar */}
                <div className="h-1 bg-gradient-to-r from-[#123B5D] via-[#0F766E] to-[#2A9D8F]" />

                {/* Dropdown Header */}
                <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/60 px-8 py-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0F766E]">
                      DOSAGE FORMULATIONS
                    </span>
                    <h3 className="mt-0.5 text-base font-extrabold text-slate-900">
                      Pharmaceutical &amp; Healthcare Products
                    </h3>
                  </div>

                  <Link
                    href="/products"
                    onClick={() => setProductsOpen(false)}
                    className="group inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-[#123B5D] shadow-sm transition hover:border-[#0F766E] hover:text-[#0F766E]"
                  >
                    <span>View All Products</span>
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </Link>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-3 gap-x-8 gap-y-6 px-8 py-6">
                  {groupedProducts.map((category) => (
                    <div key={category.name} className="group/cat">
                      <Link
                        href={category.href}
                        onClick={() => setProductsOpen(false)}
                        className="inline-flex items-center text-xs font-extrabold uppercase tracking-wider text-slate-900 transition hover:text-[#0F766E]"
                      >
                        <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#0F766E] transition-transform duration-200 group-hover/cat:scale-150" />
                        {category.name}
                        <ArrowRight
                          size={12}
                          className="ml-1 opacity-0 transition-all duration-200 group-hover/cat:translate-x-1 group-hover/cat:opacity-100"
                        />
                      </Link>

                      <div className="mt-2 space-y-1 border-l-2 border-slate-100 pl-3">
                        {category.products.slice(0, 4).map((product) => (
                          <Link
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            onClick={() => setProductsOpen(false)}
                            className="block text-[12px] font-medium leading-5 text-slate-600 transition-all duration-150 hover:translate-x-1 hover:text-[#0F766E]"
                          >
                            {product.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Strip */}
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-8 py-3 text-xs text-slate-600">
                  <span>WHO-GMP Compliant Contract Manufacturing Portfolio</span>
                  <Link
                    href="/contact#contact-form"
                    onClick={() => setProductsOpen(false)}
                    className="font-bold text-[#123B5D] transition hover:text-[#0F766E]"
                  >
                    Request Manufacturing Quote →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Industries */}
          <Link
            href="/industries"
            className={`relative py-2 text-sm font-bold transition-colors duration-200 ${
              isActive("/industries")
                ? "text-[#0F766E]"
                : "text-slate-800 hover:text-[#0F766E]"
            }`}
          >
            <span>Industries</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#0F766E] transition-all duration-300 ${
                isActive("/industries") ? "w-full" : "w-0 hover:w-full"
              }`}
            />
          </Link>

          {/* Careers */}
          <Link
            href="/careers"
            className={`relative py-2 text-sm font-bold transition-colors duration-200 ${
              isActive("/careers")
                ? "text-[#0F766E]"
                : "text-slate-800 hover:text-[#0F766E]"
            }`}
          >
            <span>Careers</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#0F766E] transition-all duration-300 ${
                isActive("/careers") ? "w-full" : "w-0 hover:w-full"
              }`}
            />
          </Link>

          {/* Blogs */}
          <Link
            href="/blog"
            className={`relative py-2 text-sm font-bold transition-colors duration-200 ${
              isActive("/blog")
                ? "text-[#0F766E]"
                : "text-slate-800 hover:text-[#0F766E]"
            }`}
          >
            <span>Blogs</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#0F766E] transition-all duration-300 ${
                isActive("/blog") ? "w-full" : "w-0 hover:w-full"
              }`}
            />
          </Link>

          {/* Contact Us */}
          <Link
            href="/contact"
            className={`relative py-2 text-sm font-bold transition-colors duration-200 ${
              isActive("/contact")
                ? "text-[#0F766E]"
                : "text-slate-800 hover:text-[#0F766E]"
            }`}
          >
            <span>Contact Us</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-[#0F766E] transition-all duration-300 ${
                isActive("/contact") ? "w-full" : "w-0 hover:w-full"
              }`}
            />
          </Link>
        </div>

        {/* Right Action Button */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/contact#contact-form"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123B5D] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#0F766E] hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Request a Quote</span>
            <ArrowRight size={15} />
          </Link>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden shadow-xl animate-in slide-in-from-top duration-200">
          <div className="mx-auto flex max-h-[calc(100vh-80px)] max-w-7xl flex-col overflow-y-auto px-6 py-5">
            {/* About Us */}
            <Link
              href="/about"
              onClick={closeMenus}
              className={`flex items-center gap-3 border-b border-slate-100 py-3.5 text-base font-bold transition ${
                isActive("/about") ? "text-[#0F766E]" : "text-slate-800 hover:text-[#0F766E]"
              }`}
            >
              <User size={18} className="text-[#0F766E]" />
              <span>About Us</span>
            </Link>

            {/* Mobile Products Accordion */}
            <div className="border-b border-slate-100 py-1">
              <button
                type="button"
                onClick={() => setProductsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between py-3 text-left text-base font-bold text-slate-800 hover:text-[#0F766E]"
              >
                <span className="flex items-center gap-3">
                  <Package size={18} className="text-[#0F766E]" />
                  Products
                </span>
                <ChevronDown
                  size={18}
                  className={`transition-transform duration-200 ${
                    productsOpen ? "rotate-180 text-[#0F766E]" : ""
                  }`}
                />
              </button>

              {productsOpen && (
                <div className="my-2 space-y-3 pl-6 border-l-2 border-teal-500/30">
                  {groupedProducts.map((category) => (
                    <div key={category.name}>
                      <Link
                        href={category.href}
                        onClick={closeMenus}
                        className="block text-sm font-bold text-[#123B5D]"
                      >
                        {category.name}
                      </Link>
                      <div className="mt-1 space-y-1 pl-2">
                        {category.products.slice(0, 3).map((product) => (
                          <Link
                            key={product.slug}
                            href={`/products/${product.slug}`}
                            onClick={closeMenus}
                            className="block py-1 text-xs text-slate-500 hover:text-[#0F766E]"
                          >
                            {product.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Industries */}
            <Link
              href="/industries"
              onClick={closeMenus}
              className={`flex items-center gap-3 border-b border-slate-100 py-3.5 text-base font-bold transition ${
                isActive("/industries") ? "text-[#0F766E]" : "text-slate-800 hover:text-[#0F766E]"
              }`}
            >
              <Building2 size={18} className="text-[#0F766E]" />
              <span>Industries</span>
            </Link>

            {/* Careers */}
            <Link
              href="/careers"
              onClick={closeMenus}
              className={`flex items-center gap-3 border-b border-slate-100 py-3.5 text-base font-bold transition ${
                isActive("/careers") ? "text-[#0F766E]" : "text-slate-800 hover:text-[#0F766E]"
              }`}
            >
              <User size={18} className="text-[#0F766E]" />
              <span>Careers</span>
            </Link>

            {/* Blogs */}
            <Link
              href="/blog"
              onClick={closeMenus}
              className={`flex items-center gap-3 border-b border-slate-100 py-3.5 text-base font-bold transition ${
                isActive("/blog") ? "text-[#0F766E]" : "text-slate-800 hover:text-[#0F766E]"
              }`}
            >
              <Newspaper size={18} className="text-[#0F766E]" />
              <span>Blogs</span>
            </Link>

            {/* Contact Us */}
            <Link
              href="/contact"
              onClick={closeMenus}
              className={`flex items-center gap-3 border-b border-slate-100 py-3.5 text-base font-bold transition ${
                isActive("/contact") ? "text-[#0F766E]" : "text-slate-800 hover:text-[#0F766E]"
              }`}
            >
              <Phone size={18} className="text-[#0F766E]" />
              <span>Contact Us</span>
            </Link>

            {/* Mobile Quote Button */}
            <div className="pt-5">
              <Link
                href="/contact#contact-form"
                onClick={closeMenus}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#123B5D] py-3.5 text-center text-sm font-bold text-white shadow-md transition hover:bg-[#0F766E]"
              >
                <span>Request a Quote</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
