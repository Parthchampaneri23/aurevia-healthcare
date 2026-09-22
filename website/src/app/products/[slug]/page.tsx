import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileText, CheckCircle2, ShieldCheck, Factory, Award } from "lucide-react";
import { notFound } from "next/navigation";
import FAQSection from "@/app/components/common/FAQSection";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import ProductDescriptionSection from "@/app/components/products/ProductDescriptionSection";
import RelatedProducts from "@/app/components/products/RelatedProducts";
import localProducts from "@/app/components/products/productData";
import type { Product } from "@/app/components/products/productTypes";

type ProductDetailsPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://aurevia-healthcare.onrender.com";

const categorySlugMap: Record<string, string> = {
    Tablets: "tablets",
    Capsules: "capsules",
    Syrups: "syrups",
    Injectables: "injectables",
    "Ointments & Creams": "ointments-creams",
    Nutraceuticals: "nutraceuticals",
};

const productDetailFaqs = [
    {
        question: "What quality control documentation and certificates are supplied with this product?",
        answer: "Every production lot is dispatched with a comprehensive Batch Certificate of Analysis (COA), Method of Analysis (MOA), Material Safety Data Sheet (MSDS), and Certificate of Free Sale (CFS) where applicable. Accelerated and real-time stability data generated under ICH climatic zones are also available for dossier registrations.",
    },
    {
        question: "What storage conditions, shelf-life, and packaging options apply to this product?",
        answer: "Product storage recommendations follow pharmacopoeial guidelines (typically stored below 25°C / 30°C in controlled moisture conditions). Standard shelf life ranges from 24 to 36 months depending on active ingredient stability. Primary packaging options include Alu-Alu blister packs, PVC/PVDC blisters, HDPE containers, and sterile glass vials/ampoules.",
    },
    {
        question: "Can Aurevia customize dosage strengths, active ingredients, or private label branding?",
        answer: "Yes, we specialize in contract manufacturing and OEM customization. We can adjust active ingredient strengths, tablet coatings, flavoring profiles, primary packaging formats, and secondary outer carton branding to comply with specific target market regulatory requirements.",
    },
    {
        question: "How do commercial buyers request volume pricing, sample batches, and lead times?",
        answer: "Click the 'Request Product Information' button on this page or contact our commercial export desk with your target volume, destination country, and packaging requirements. Our technical sales engineers will evaluate batch sizes and deliver a detailed commercial quote with production lead times.",
    },
];

/* ----------------------------------
   Fetch Product Data (API with Fallback)
---------------------------------- */
async function getProductData(slug: string): Promise<Product | null> {
    try {
        const response = await fetch(`${API_URL}/api/products/${slug}`, {
            cache: "no-store",
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success && data.product) {
                return data.product;
            }
        }
    } catch {
        // network or backend offline, fallback below
    }

    const found = (localProducts as unknown as Product[]).find(
        (p) => p.slug === slug || p._id === slug
    );

    return found || null;
}

async function getAllProductsData(): Promise<Product[]> {
    try {
        const response = await fetch(`${API_URL}/api/products`, {
            cache: "no-store",
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success && Array.isArray(data.products) && data.products.length > 0) {
                return data.products;
            }
        }
    } catch {
        // fallback
    }

    return localProducts as unknown as Product[];
}

/* ----------------------------------
   Dynamic Metadata
---------------------------------- */
export async function generateMetadata({
    params,
}: ProductDetailsPageProps): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProductData(slug);

    if (!product) {
        return {
            title: "Product Not Found | Aurevia Healthcare",
            description: "The requested pharmaceutical product could not be found.",
        };
    }

    return {
        title: `${product.name} | Aurevia Healthcare B2B Product Detail`,
        description: product.shortDescription || product.description,
    };
}

/* ----------------------------------
   Image URL Helper
---------------------------------- */
function getProductImageUrl(image?: string) {
    if (!image) {
        return "/products/productbanner.png";
    }

    const cleanImage = image.trim();

    if (cleanImage.startsWith("http://") || cleanImage.startsWith("https://")) {
        return cleanImage;
    }

    const normalizedImage = cleanImage.replace(/^\/+/, "");

    if (normalizedImage.startsWith("products/")) {
        return `${API_URL}/${normalizedImage}`;
    }

    if (normalizedImage.startsWith("uploads/products/")) {
        return `${API_URL}/${normalizedImage}`;
    }

    return `${API_URL}/products/${normalizedImage}`;
}

export default async function ProductDetailsPage({
    params,
}: ProductDetailsPageProps) {
    const { slug } = await params;
    const product = await getProductData(slug);

    if (!product) {
        notFound();
    }

    const allProducts = await getAllProductsData();
    const productImageUrl = getProductImageUrl(product.image);

    const categorySlug = categorySlugMap[product.category] || "tablets";

    return (
        <main className="min-h-screen bg-white">
            {/* 1. Compact Banner */}
            <section aria-label="Product Banner" className="relative w-full overflow-hidden bg-slate-950 min-h-[220px] sm:min-h-[260px] flex items-center py-8">
                <Image
                    src="/products/productbanner.png"
                    alt={product.name}
                    fill
                    priority
                    className="object-cover object-center sm:object-[center_35%]"
                    sizes="100vw"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#071E33]/92 via-[#071E33]/80 to-[#123B5D]/45" />

                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
                    <div className="max-w-3xl text-left text-white">
                        <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-3.5 py-1 backdrop-blur-md">
                            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-300">
                                {product.category}
                            </span>
                        </div>

                        <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-3xl lg:text-4xl">
                            {product.name}
                        </h1>

                        <div className="mt-3">
                            <Breadcrumb
                                items={[
                                    { name: "Products", href: "/products" },
                                    { name: product.category, href: `/products?category=${categorySlug}` },
                                    { name: product.name }
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Main Product Hero Section (2-Column B2B Layout) */}
            <section className="py-10 sm:py-12 border-b border-slate-100">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">

                    {/* Back Link */}
                    <div className="mb-6">
                        <Link
                            href={`/products?category=${categorySlug}`}
                            className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-bold text-slate-700 transition hover:bg-[#123B5D] hover:text-white"
                        >
                            <ArrowLeft
                                size={14}
                                className="transition-transform duration-300 group-hover:-translate-x-0.5"
                            />
                            <span>Back to {product.category}</span>
                        </Link>
                    </div>

                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">

                        {/* LEFT: Product Image Container */}
                        <div className="relative flex h-[340px] sm:h-[440px] items-center justify-center overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-50/70 p-6 shadow-sm transition-all duration-500 hover:shadow-lg">
                            <div className="relative h-full w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-2xs flex items-center justify-center">
                                <Image
                                    src={productImageUrl}
                                    alt={product.name}
                                    fill
                                    priority
                                    className="object-contain p-3 transition-transform duration-700 ease-out hover:scale-105"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>

                            {/* Floating Category Pill */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className="inline-flex items-center rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-[#0F766E] border border-teal-200 shadow-2xs backdrop-blur-md">
                                    {product.category}
                                </span>
                            </div>
                        </div>

                        {/* RIGHT: Product Information Panel */}
                        <div className="flex flex-col justify-center">

                            <div className="inline-flex items-center gap-2 mb-3">
                                <span className="h-1.5 w-6 rounded-full bg-[#0F766E]" />
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                                    FORMULATION INFORMATION
                                </p>
                            </div>

                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
                                {product.name}
                            </h1>

                            <p className="mt-4 text-base sm:text-lg leading-relaxed text-slate-600">
                                {product.shortDescription || product.description}
                            </p>

                            {/* Key Metadata Chips Grid */}
                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Dosage Form</span>
                                    <p className="text-sm font-bold text-[#123B5D] mt-0.5">{product.category}</p>
                                </div>

                                <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Quality Standard</span>
                                    <p className="text-sm font-bold text-[#0F766E] mt-0.5">cGMP Certified</p>
                                </div>
                            </div>

                            {/* B2B Enquiry Button */}
                            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                <Link
                                    href={`/contact?product=${encodeURIComponent(
                                        product.name
                                    )}#contact-form`}
                                    className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F766E] px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-teal-950/20 transition-all duration-300 hover:bg-[#123B5D] hover:shadow-xl active:scale-95"
                                >
                                    <span>Request Product Information</span>
                                    <FileText size={17} className="transition-transform duration-300 group-hover:scale-110" />
                                </Link>

                                <Link
                                    href="/contact#contact-form"
                                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-800 transition-all duration-300 hover:border-[#0F766E] hover:text-[#0F766E] active:scale-95"
                                >
                                    Contact Aurevia
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Product Description & Formulation Details */}
            <ProductDescriptionSection
                productName={product.name}
                description={product.description}
                category={product.category}
            />

            {/* 4. Specifications Table */}
            {product.specifications && product.specifications.length > 0 && (
                <section aria-label="Technical Specifications" className="border-t border-slate-100 py-12 sm:py-12">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="max-w-4xl">
                            <div className="mb-3 inline-flex items-center gap-2">
                                <span className="h-1.5 w-6 rounded-full bg-[#0F766E]" />
                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                                    SPECIFICATIONS
                                </p>
                            </div>

                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Technical Specifications &amp; Composition
                            </h2>

                            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                                <table className="w-full border-collapse text-left">
                                    <tbody>
                                        {product.specifications.map(
                                            (specification, index) => (
                                                <tr
                                                    key={specification.label + index}
                                                    className={`transition-colors duration-200 hover:bg-slate-50/80 ${index % 2 === 0
                                                        ? "bg-slate-50/50"
                                                        : "bg-white"
                                                        }`}
                                                >
                                                    <th className="w-1/3 border-b border-slate-100 px-6 py-4 text-xs sm:text-sm font-bold text-[#123B5D]">
                                                        {specification.label}
                                                    </th>

                                                    <td className="border-b border-slate-100 px-6 py-4 text-xs sm:text-sm text-slate-600 font-medium">
                                                        {specification.value}
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Manufacturing Quality Context Card */}
                            <div className="mt-8 rounded-2xl border border-teal-100 bg-teal-50/60 p-5 sm:p-6">
                                <div className="flex items-start gap-3">
                                    <Factory className="h-6 w-6 text-[#0F766E] shrink-0 mt-0.5" />
                                    <div>
                                        <h3 className="text-sm font-bold text-[#123B5D]">Controlled cGMP Batch Manufacturing</h3>
                                        <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                                            Manufactured in compliance with automated batch monitoring, positive pressure cleanrooms, and comprehensive analytical laboratory testing to ensure dosage integrity.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* 5. Related Products */}
            <RelatedProducts
                currentSlug={product.slug}
                category={product.category}
                allProducts={allProducts}
            />

            {/* 6. Product Specific FAQs */}
            <FAQSection
                eyebrow={`FAQS ABOUT ${product.name.toUpperCase()}`}
                title={`Product FAQs - ${product.name}`}
                subtitle="Common questions regarding storage, quality control documentation, private labeling, and commercial ordering for this formulation."
                faqs={productDetailFaqs}
                showContactCTA={false}
            />
        </main>
    );
}
