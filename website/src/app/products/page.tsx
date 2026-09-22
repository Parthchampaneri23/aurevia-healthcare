import type { Metadata } from "next";
import { Suspense } from "react";
import ProductsHero from "@/app/components/products/ProductsHero";
import FilterableProducts from "@/app/components/products/FilterableProducts";
import ProductEnquiryCTA from "@/app/components/products/ProductEnquiryCTA";

export const metadata: Metadata = {
    title: "Pharmaceutical Product Portfolio | Aurevia Healthcare B2B Catalogue",
    description: "Browse Aurevia Healthcare's comprehensive B2B pharmaceutical catalogue covering tablets, capsules, syrups, injectables, topical creams, and nutraceuticals.",
};

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* 1. Products Hero */}
            <ProductsHero />

            {/* 2. Product Catalogue Navigation & Grid */}
            <section className="py-12 sm:py-12">
                <Suspense fallback={
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 text-center text-slate-500">
                        Loading products...
                    </div>
                }>
                    <FilterableProducts />
                </Suspense>
            </section>

            {/* 3. B2B Product Enquiry CTA */}
            <ProductEnquiryCTA />
        </main>
    );
}
