"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, X, PackageSearch, Filter, SlidersHorizontal, RefreshCw } from "lucide-react";
import ProductCard from "./ProductCard";
import type { Product } from "./productTypes";
import localProducts from "./productData";

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

const API_URL = `${process.env.NEXT_PUBLIC_API_URL || "https://aurevia-healthcare.onrender.com"}/api/products`;

export default function FilterableProducts() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const containerRef = useRef<HTMLDivElement>(null);

    const [products, setProducts] = useState<Product[]>(localProducts as unknown as Product[]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch products from API with fallback to local static data
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);

                const response = await fetch(API_URL);

                if (!response.ok) {
                    throw new Error(`Failed to fetch products (${response.status})`);
                }

                const data = await response.json();

                if (data.success && Array.isArray(data.products) && data.products.length > 0) {
                    setProducts(data.products);
                } else {
                    // Fallback to local verified products
                    setProducts(localProducts as unknown as Product[]);
                }
            } catch (error) {
                console.warn("Product API fetch error, utilizing fallback data:", error);
                setProducts(localProducts as unknown as Product[]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Sync category filter with URL query param
    useEffect(() => {
        const categoryParam = searchParams.get("category");

        let targetCategory = "All";

        if (categoryParam) {
            const lowerParam = categoryParam.toLowerCase();

            if (categoryMap[lowerParam]) {
                targetCategory = categoryMap[lowerParam];
            } else {
                const matchedCategory = Object.values(categoryMap).find(
                    (category) => category.toLowerCase() === lowerParam
                );

                targetCategory = matchedCategory || "All";
            }
        }

        setSelectedCategory(targetCategory);

        if (categoryParam) {
            requestAnimationFrame(() => {
                containerRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            });
        }
    }, [searchParams]);

    // Calculate product counts per category
    const categoryCounts = useMemo(() => {
        const counts: Record<string, number> = { All: products.length };
        categories.forEach((cat) => {
            if (cat !== "All") {
                counts[cat] = products.filter(
                    (p) => p.category === cat && p.isActive !== false
                ).length;
            }
        });
        return counts;
    }, [products]);

    // Filter products based on selected category & search query
    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            if (product.isActive === false) return false;

            const matchesCategory =
                selectedCategory === "All" || product.category === selectedCategory;

            const q = searchQuery.toLowerCase().trim();
            const matchesSearch =
                !q ||
                product.name.toLowerCase().includes(q) ||
                product.category.toLowerCase().includes(q) ||
                (product.shortDescription &&
                    product.shortDescription.toLowerCase().includes(q)) ||
                (product.description &&
                    product.description.toLowerCase().includes(q));

            return matchesCategory && matchesSearch;
        });
    }, [products, selectedCategory, searchQuery]);

    // Handle category click
    const handleCategoryClick = (category: string) => {
        const slug = Object.keys(categoryMap).find(
            (key) => categoryMap[key] === category
        );

        if (slug) {
            router.push(`/products?category=${slug}`, { scroll: false });
        } else {
            router.push("/products", { scroll: false });
        }
    };

    // Reset all filters
    const handleClearFilters = () => {
        setSearchQuery("");
        setSelectedCategory("All");
        router.push("/products", { scroll: false });
    };

    return (
        <div
            id="explore"
            ref={containerRef}
            className="mx-auto max-w-7xl px-6 lg:px-8 scroll-mt-24"
        >
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes cardFadeIn {
                            from {
                                opacity: 0;
                                transform: translateY(12px) scale(0.98);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0) scale(1);
                            }
                        }

                        .animate-card-fade-in {
                            animation: cardFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                        }
                    `,
                }}
            />

            {/* Introduction & Search Toolbar */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200/80">
                <div className="max-w-xl">
                    <div className="mb-2.5 inline-flex items-center gap-2">
                        <span className="h-1.5 w-6 rounded-full bg-[#0F766E]" />
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                            CATALOGUE NAVIGATION
                        </p>
                        <span className="h-1.5 w-6 rounded-full bg-[#0F766E]" />
                    </div>

                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#123B5D] tracking-tight">
                        Explore Our Formulations
                    </h2>

                    <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600">
                        Browse Aurevia Healthcare&apos;s pharmaceutical product portfolio across multiple dosage categories.
                    </p>
                </div>

                {/* Search Bar */}
                <div className="w-full md:w-80 lg:w-96">
                    <label htmlFor="product-search" className="sr-only">
                        Search Products
                    </label>
                    <div className="relative flex items-center">
                        <Search
                            size={18}
                            className="absolute left-3.5 text-slate-400 pointer-events-none"
                        />
                        <input
                            id="product-search"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by product name or dosage..."
                            className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-9 text-sm text-slate-900 placeholder:text-slate-400 shadow-2xs transition-all focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                aria-label="Clear search"
                                className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-600 hover:bg-slate-300 transition-colors"
                            >
                                <X size={12} />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Category Filter Pills Bar */}
            <div className="mt-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                        <SlidersHorizontal size={15} />
                        <span>Filter by Category</span>
                    </div>

                    <span className="text-xs font-semibold text-slate-500">
                        Showing {filteredProducts.length} of {products.length} Products
                    </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    {categories.map((category) => {
                        const isActive = selectedCategory === category;
                        const count = categoryCounts[category] || 0;

                        return (
                            <button
                                key={category}
                                type="button"
                                onClick={() => handleCategoryClick(category)}
                                className={`cursor-pointer inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all duration-300 active:scale-95 ${isActive
                                    ? "bg-[#123B5D] text-white shadow-md shadow-blue-950/20 border border-[#123B5D]"
                                    : "border border-slate-200/90 bg-white text-slate-700 hover:border-[#0F766E] hover:text-[#0F766E] hover:bg-teal-50/50"
                                    }`}
                            >
                                <span>{category}</span>
                                <span
                                    className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${isActive
                                        ? "bg-teal-500 text-white"
                                        : "bg-slate-100 text-slate-600 border border-slate-200"
                                        }`}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}

                    {(selectedCategory !== "All" || searchQuery) && (
                        <button
                            type="button"
                            onClick={handleClearFilters}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0F766E] hover:underline px-2 py-1 ml-auto"
                        >
                            <RefreshCw size={12} />
                            <span>Reset Filters</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Skeleton Loading State */}
            {loading && (
                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3, 4, 5, 6].map((idx) => (
                        <div
                            key={idx}
                            className="h-80 w-full animate-pulse rounded-2xl bg-slate-100 border border-slate-200/80"
                        />
                    ))}
                </div>
            )}

            {/* Product Grid */}
            {!loading && (
                <>
                    {filteredProducts.length > 0 ? (
                        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredProducts.map((product, index) => (
                                <div
                                    key={product._id || product.slug}
                                    className="animate-card-fade-in"
                                    style={{
                                        animationDelay: `${index * 40}ms`,
                                    }}
                                >
                                    <ProductCard product={product} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Empty State */
                        <div className="mt-12 rounded-3xl border border-slate-200/90 bg-slate-50/70 px-6 py-12 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-[#0F766E] border border-teal-100">
                                <PackageSearch size={28} />
                            </div>

                            <h3 className="mt-4 text-lg font-bold text-slate-900">
                                No Products Found
                            </h3>

                            <p className="mt-1.5 text-sm text-slate-600 max-w-md mx-auto">
                                We couldn&apos;t find any pharmaceutical products matching your search criteria. Try adjusting your search query or selecting another category.
                            </p>

                            <div className="mt-6">
                                <button
                                    type="button"
                                    onClick={handleClearFilters}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#123B5D] active:scale-95"
                                >
                                    <RefreshCw size={15} />
                                    <span>Clear Search &amp; Filters</span>
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}