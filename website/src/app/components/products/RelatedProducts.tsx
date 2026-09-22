"use client";

import ProductCard from "./ProductCard";
import type { Product } from "./productTypes";

type RelatedProductsProps = {
  currentSlug: string;
  category: string;
  allProducts: Product[];
};

export default function RelatedProducts({
  currentSlug,
  category,
  allProducts,
}: RelatedProductsProps) {
  // Filter products in the same category excluding the current product
  const related = allProducts
    .filter(
      (p) =>
        p.category.toLowerCase() === category.toLowerCase() &&
        p.slug !== currentSlug &&
        p.isActive !== false
    )
    .slice(0, 3);

  if (related.length === 0) {
    return null;
  }

  return (
    <section aria-label="Related Products" className="border-t border-slate-200/80 bg-slate-50/50 py-12 sm:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="mb-2.5 inline-flex items-center gap-2">
            <span className="h-1.5 w-6 rounded-full bg-[#0F766E]" />
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
              SAME CATEGORY FORMULATIONS
            </p>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#123B5D] tracking-tight">
            Related Products in {category}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Explore additional dosage formulations in the {category} category.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((product) => (
            <div key={product._id || product.slug}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
