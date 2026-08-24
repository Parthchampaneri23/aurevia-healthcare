import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Package } from "lucide-react";
import type { Product } from "./productTypes";

type ProductCardProps = {
    product: Product;
};

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://aurevia-healthcare.onrender.com";

function getImageUrl(image?: string) {
    if (!image) {
        return "";
    }

    // Already a complete URL
    if (
        image.startsWith("http://") ||
        image.startsWith("https://")
    ) {
        return image;
    }

    let cleanImage = image.trim();

    // Remove leading slash
    cleanImage = cleanImage.replace(/^\/+/, "");

    // uploads/products/product.jpg
    if (cleanImage.startsWith("uploads/products/")) {
        return `${API_URL}/${cleanImage}`;
    }

    // products/product.jpg
    if (cleanImage.startsWith("products/")) {
        return `${API_URL}/uploads/${cleanImage}`;
    }

    // Just product.jpg
    return `${API_URL}/uploads/products/${cleanImage}`;
}

export default function ProductCard({
    product,
}: ProductCardProps) {
    const imageUrl = getImageUrl(product.image);

    return (
        <Link
            href={`/products/${product.slug}`}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/60"
        >
            {/* Accent Bar */}
            <div className="absolute left-0 top-0 z-10 h-[4px] w-0 bg-gradient-to-r from-[#0F766E] to-[#123B5D] transition-all duration-500 group-hover:w-full" />

            {/* Image */}
            <div className="relative flex h-60 items-center justify-center overflow-hidden border-b border-slate-100 bg-slate-50 p-5">
                <div className="relative h-full w-full rounded-2xl border border-slate-200/80 bg-white p-3 shadow-sm transition-all duration-300 group-hover:border-[#0F766E]/40 group-hover:shadow-md">
                    {imageUrl ? (
                        <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center">
                            <Package
                                size={42}
                                className="text-slate-300"
                            />
                        </div>
                    )}
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