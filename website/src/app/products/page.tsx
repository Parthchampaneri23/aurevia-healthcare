import FilterableProducts from "@/app/components/products/FilterableProducts";
import Image from "next/image";
import { Suspense } from "react";
import Breadcrumb from "@/app/components/common/Breadcrumb";

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
            <section className="relative h-[240px] w-full overflow-hidden sm:h-[280px] lg:h-[320px]">
                <Image
                    src="/products/productbanner.png"
                    alt="Products"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />

                {/* Banner Content */}
                <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
                    <div className="max-w-2xl text-left">
                        <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-3.5 py-1 backdrop-blur-md">
                            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300">
                                Product Portfolio
                            </span>
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
                            Products
                        </h1>

                        {/* Breadcrumb on Banner */}
                        <Breadcrumb items={[{ name: "Products" }]} />
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
