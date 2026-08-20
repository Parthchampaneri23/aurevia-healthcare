import FilterableProducts from "@/app/components/products/FilterableProducts";
import Image from "next/image";
import { Suspense } from "react";

export default function ProductsPage() {
    return (
        <main className="bg-white animate-fade-in">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes pageFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: pageFadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />

            {/* Products Banner */}
            <section className="relative h-[200px] overflow-hidden sm:h-[240px] lg:h-[280px]">
                <Image
                    src="/products/productbanner.png"
                    alt="Aurevia Healthcare Products"
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#08243a]/85 via-[#123B5D]/65 to-[#123B5D]/20" />

                {/* Banner Content */}
                <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
                    <div className="max-w-2xl text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">
                            Our Products
                        </p>

                        <h1 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                            Pharmaceutical Solutions
                        </h1>

                        <p className="mt-2 max-w-xl text-xs leading-relaxed text-white/85 sm:text-sm">
                            Explore our pharmaceutical and nutraceutical
                            product portfolio developed with a focus on
                            quality, consistency and reliable healthcare
                            solutions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="py-12 sm:py-12 lg:py-12">
                <Suspense fallback={
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 text-center text-slate-500">
                        Loading products...
                    </div>
                }>
                    <FilterableProducts />
                </Suspense>
            </section>
        </main>
    );
}