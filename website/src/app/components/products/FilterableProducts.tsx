"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "./ProductCard";
import products from "./productData";

const categories = [
    "All",
    "Tablets",
    "Capsules",
    "Syrups",
    "Injectables",
    "Ointments & Creams",
    "Nutraceuticals",
];

const categoryMap: { [key: string]: string } = {
    "tablets": "Tablets",
    "capsules": "Capsules",
    "syrups": "Syrups",
    "injectables": "Injectables",
    "ointments-creams": "Ointments & Creams",
    "nutraceuticals": "Nutraceuticals",
};

export default function FilterableProducts() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [animateGrid, setAnimateGrid] = useState(false);

    // Sync state with URL category query param
    useEffect(() => {
        const catParam = searchParams.get("category");
        if (catParam) {
            const lowerParam = catParam.toLowerCase();
            if (categoryMap[lowerParam]) {
                setSelectedCategory(categoryMap[lowerParam]);
            } else {
                // Also match direct category name values
                const matchedValue = Object.values(categoryMap).find(
                    (val) => val.toLowerCase() === lowerParam
                );
                if (matchedValue) {
                    setSelectedCategory(matchedValue);
                } else {
                    setSelectedCategory("All");
                }
            }
            // Scroll to the products section
            setTimeout(() => {
                containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 150);
        } else {
            setSelectedCategory("All");
        }
    }, [searchParams]);

    // Filter products when category changes
    useEffect(() => {
        setAnimateGrid(false);
        const timer = setTimeout(() => {
            if (selectedCategory === "All") {
                setFilteredProducts(products);
            } else {
                setFilteredProducts(
                    products.filter((p) => p.category === selectedCategory)
                );
            }
            setAnimateGrid(true);
        }, 100);

        return () => clearTimeout(timer);
    }, [selectedCategory]);

    const handleCategoryClick = (category: string) => {
        // Find slug for the category
        const slug = Object.keys(categoryMap).find(
            (key) => categoryMap[key] === category
        );
        if (slug) {
            router.push(`/products?category=${slug}`, { scroll: false });
        } else {
            router.push("/products", { scroll: false });
        }
    };

    return (
        <div id="explore" ref={containerRef} className="mx-auto max-w-7xl px-6 lg:px-8 scroll-mt-24">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes cardFadeIn {
                    from { opacity: 0; transform: translateY(15px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-card-fade-in {
                    animation: cardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />

            {/* Section Heading */}
            <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-3">
                    <span className="h-1 w-6 rounded-full bg-[#0F766E]" />
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                        Our Product Portfolio
                    </p>
                </div>

                <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">
                    Explore Our Products
                </h2>

                <p className="mt-4 text-base leading-relaxed text-slate-600">
                    Discover our range of pharmaceutical and nutraceutical formulations across multiple dosage categories.
                </p>
            </div>

            {/* Category Filters */}
            <div className="mt-10 flex flex-wrap gap-2.5">
                {categories.map((category) => {
                    const isActive = selectedCategory === category;
                    return (
                        <button
                            key={category}
                            type="button"
                            onClick={() => handleCategoryClick(category)}
                            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 cursor-pointer ${
                                isActive
                                    ? "bg-[#123B5D] text-white shadow-lg shadow-blue-900/10 scale-105"
                                    : "border border-slate-200 bg-white text-slate-600 hover:border-[#123B5D] hover:text-[#123B5D] hover:scale-102"
                            }`}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>

            {/* Product Grid */}
            <div
                className={`mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-300 ${
                    animateGrid ? "opacity-100" : "opacity-0"
                }`}
            >
                {filteredProducts.map((product, index) => (
                    <div
                        key={product.slug}
                        className="animate-card-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            
            {filteredProducts.length === 0 && (
                <div className="mt-16 text-center text-slate-500 py-12">
                    No products found in this category.
                </div>
            )}
        </div>
    );
}
