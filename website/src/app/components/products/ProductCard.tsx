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
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-[#0F766E] hover:shadow-xl hover:shadow-teal-950/10"
        >
            {/* Top Slide Accent Bar */}
            <div className="absolute left-0 top-0 z-10 h-[3.5px] w-0 bg-gradient-to-r from-[#0F766E] to-[#123B5D] transition-all duration-500 group-hover:w-full" />

            {/* Image Container */}
            <div className="relative flex h-52 sm:h-56 items-center justify-center overflow-hidden border-b border-slate-100 bg-slate-50/70 p-4">
                <div className="relative h-full w-full rounded-xl border border-slate-200/70 bg-white p-2.5 shadow-2xs transition-all duration-300 group-hover:border-teal-200 group-hover:shadow-xs">
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
                                size={40}
                                className="text-slate-300"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Content Container */}
            <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-[#0F766E] border border-teal-200/70">
                        {product.category}
                    </span>
                </div>

                <h3 className="mt-3 text-base sm:text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#0F766E]">
                    {product.name}
                </h3>

                <p className="mt-2 text-xs sm:text-sm line-clamp-2 flex-1 leading-relaxed text-slate-600">
                    {product.shortDescription || product.description}
                </p>

                <div className="mt-5 inline-flex items-center text-xs sm:text-sm font-bold text-[#123B5D] transition-colors duration-300 group-hover:text-[#0F766E] border-t border-slate-100 pt-3">
                    <span>View Details</span>
                    <ArrowRight
                        size={15}
                        className="ml-1.5 transition-transform duration-300 group-hover:translate-x-1"
                    />
                </div>
            </div>
        </Link>
    );
}