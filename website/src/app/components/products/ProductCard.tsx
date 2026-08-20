import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Product } from "./productData";

type ProductCardProps = {
    product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link
            href={`/products/${product.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/60"
        >
            {/* Slide-in Accent Bar */}
            <div className="absolute top-0 left-0 z-10 h-[4px] w-0 bg-gradient-to-r from-[#0F766E] to-[#123B5D] transition-all duration-500 group-hover:w-full" />

            {/* Image Container with contain fit and padding */}
            <div className="relative h-60 overflow-hidden bg-slate-50 p-5 flex items-center justify-center border-b border-slate-100">
                <div className="relative w-full h-full rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm transition-all duration-300 group-hover:border-[#0F766E]/40 group-hover:shadow-md">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-6">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0F766E]">
                    {product.category}
                </p>

                <h3 className="mt-2.5 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#0F766E]">
                    {product.name}
                </h3>

                <p className="mt-2.5 line-clamp-2 flex-1 text-sm leading-relaxed text-slate-500">
                    {product.shortDescription}
                </p>

                <div className="mt-6 inline-flex items-center text-sm font-bold text-[#123B5D] transition-colors duration-300 group-hover:text-[#0F766E]">
                    View Details
                    <ArrowRight
                        size={16}
                        className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5"
                    />
                </div>
            </div>
        </Link>
    );
}