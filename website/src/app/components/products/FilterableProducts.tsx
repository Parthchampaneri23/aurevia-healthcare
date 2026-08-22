"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductCard from "./ProductCard";
import type { Product } from "./productTypes";

const categories = [
    "All",
    "Tablets",
    "Capsules",
    "Syrups",
    "Injectables",
    "Ointments & Creams",
    "Nutraceuticals",
];

const categoryMap: Record<string, string> = {
    tablets: "Tablets",
    capsules: "Capsules",
    syrups: "Syrups",
    injectables: "Injectables",
    "ointments-creams": "Ointments & Creams",
    nutraceuticals: "Nutraceuticals",
};

const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/products`;

export default function FilterableProducts() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    const [products, setProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [animateGrid, setAnimateGrid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(
                        `Failed to fetch products (${response.status})`
                    );
                }

                const data = await response.json();

                console.log("Products API response:", data);

                if (!data.success || !Array.isArray(data.products)) {
                    throw new Error("Invalid product data received");
                }

                setProducts(data.products);
                setFilteredProducts(data.products);
            } catch (error) {
                console.error("Product fetch error:", error);
                setError(
                    "Unable to load products. Please try again later."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Sync category with URL
    useEffect(() => {
        const categoryParam = searchParams.get("category");

        if (!categoryParam) {
            setSelectedCategory("All");
            return;
        }

        const lowerParam = categoryParam.toLowerCase();

        if (categoryMap[lowerParam]) {
            setSelectedCategory(categoryMap[lowerParam]);
        } else {
            const matchedCategory = Object.values(categoryMap).find(
                (category) => category.toLowerCase() === lowerParam
            );

            setSelectedCategory(matchedCategory || "All");
        }

        setTimeout(() => {
            containerRef.current?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }, 150);
    }, [searchParams]);

    // Filter products
    useEffect(() => {
        if (loading) return;

        setAnimateGrid(false);

        const timer = setTimeout(() => {
            if (selectedCategory === "All") {
                setFilteredProducts(products);
            } else {
                setFilteredProducts(
                    products.filter(
                        (product) =>
                            product.category === selectedCategory &&
                            product.isActive !== false
                    )
                );
            }

            setAnimateGrid(true);
        }, 100);

        return () => clearTimeout(timer);
    }, [selectedCategory, products, loading]);

    // Category button
    const handleCategoryClick = (category: string) => {
        const slug = Object.keys(categoryMap).find(
            (key) => categoryMap[key] === category
        );

        if (slug) {
            router.push(`/products?category=${slug}`, {
                scroll: false,
            });
        } else {
            router.push("/products", {
                scroll: false,
            });
        }
    };

    return (
        <div
            id="explore"
            ref={containerRef}
            className="mx-auto max-w-7xl px-6 scroll-mt-24 lg:px-8"
        >
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes cardFadeIn {
                            from {
                                opacity: 0;
                                transform: translateY(15px) scale(0.98);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0) scale(1);
                            }
                        }

                        .animate-card-fade-in {
                            animation: cardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                        }
                    `,
                }}
            />

            {/* Section Heading */}
            <div className="max-w-2xl">
                <div className="mb-3 inline-flex items-center gap-2">
                    <span className="h-1 w-6 rounded-full bg-[#0F766E]" />

                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                        Our Product Portfolio
                    </p>
                </div>

                <h2 className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                    Explore Our Products
                </h2>

                <p className="mt-4 text-base leading-relaxed text-slate-600">
                    Discover our range of pharmaceutical and nutraceutical
                    formulations across multiple dosage categories.
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
                            className={`cursor-pointer rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${isActive
                                ? "scale-105 bg-[#123B5D] text-white shadow-lg shadow-blue-900/10"
                                : "border border-slate-200 bg-white text-slate-600 hover:scale-102 hover:border-[#123B5D] hover:text-[#123B5D]"
                                }`}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>

            {/* Loading */}
            {loading && (
                <div className="mt-16 py-16 text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-[#0F766E]" />

                    <p className="mt-4 text-sm text-slate-500">
                        Loading products...
                    </p>
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <div className="mt-16 rounded-2xl border border-red-100 bg-red-50 px-6 py-10 text-center">
                    <p className="text-sm font-medium text-red-600">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() => window.location.reload()}
                        className="mt-4 rounded-lg bg-[#123B5D] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0F766E]"
                    >
                        Try Again
                    </button>
                </div>
            )}

            {/* Product Grid */}
            {!loading && !error && (
                <>
                    <div
                        className={`mt-12 grid gap-8 transition-opacity duration-300 sm:grid-cols-2 lg:grid-cols-3 ${animateGrid ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        {filteredProducts.map((product, index) => (
                            <div
                                key={product._id || product.slug}
                                className="animate-card-fade-in"
                                style={{
                                    animationDelay: `${index * 50}ms`,
                                }}
                            >
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="mt-16 py-12 text-center text-slate-500">
                            No products found in this category.
                        </div>
                    )}
                </>
            )}
        </div>
    );
}