import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { notFound } from "next/navigation";
import FAQSection from "@/app/components/common/FAQSection";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import ProductDescriptionSection from "@/app/components/products/ProductDescriptionSection";

type ProductSpecification = {
    label: string;
    value: string;
};

type Product = {
    _id: string;
    slug: string;
    name: string;
    category: string;
    image: string;
    shortDescription: string;
    description: string;
    applications?: string[];
    specifications: ProductSpecification[];
    isActive: boolean;
};

type ProductDetailsPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://aurevia-healthcare.onrender.com";

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
        answer: "Click the 'Request a Quote' button on this product page or contact our commercial export desk with your target volume, destination country, and packaging requirements. Our sales engineers will evaluate batch sizes and deliver a detailed commercial quote with production lead times.",
    },
];

/* ----------------------------------
   Product Image URL Helper
---------------------------------- */

function getProductImageUrl(image?: string) {
    if (!image) {
        return "/products/productbanner.png";
    }

    const cleanImage = image.trim();

    // Already a complete URL
    if (
        cleanImage.startsWith("http://") ||
        cleanImage.startsWith("https://")
    ) {
        return cleanImage;
    }

    // Remove leading slash
    const normalizedImage = cleanImage.replace(/^\/+/, "");

    /*
     * Backend database examples:
     *
     * /products/tablet1.jpg
     * products/tablet1.jpg
     */
    if (normalizedImage.startsWith("products/")) {
        return `${API_URL}/${normalizedImage}`;
    }

    /*
     * Backend database example:
     *
     * uploads/products/tablet1.jpg
     */
    if (normalizedImage.startsWith("uploads/products/")) {
        return `${API_URL}/${normalizedImage}`;
    }

    /*
     * Fallback:
     *
     * tablet1.jpg
     */
    return `${API_URL}/products/${normalizedImage}`;
}

export default async function ProductDetailsPage({
    params,
}: ProductDetailsPageProps) {
    const { slug } = await params;

    let product: Product;

    try {
        const response = await fetch(
            `${API_URL}/api/products/${slug}`,
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            console.error(
                `Failed to fetch product ${slug}: ${response.status}`
            );

            notFound();
        }

        const data = await response.json();

        console.log("Product details API response:", data);

        if (!data.success || !data.product) {
            console.error(
                "Invalid product response:",
                data
            );

            notFound();
        }

        product = data.product;
    } catch (error) {
        console.error(
            "Failed to fetch product:",
            error
        );

        notFound();
    }

    const productImageUrl = getProductImageUrl(
        product.image
    );

    return (
        <main className="overflow-hidden bg-white">
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes pageFadeIn {
                            from {
                                opacity: 0;
                            }

                            to {
                                opacity: 1;
                            }
                        }

                        @keyframes detailSlideUp {
                            from {
                                opacity: 0;
                                transform: translateY(24px);
                            }

                            to {
                                opacity: 1;
                                transform: translateY(0);
                            }
                        }

                        .animate-page-fade {
                            animation: pageFadeIn 0.6s
                                cubic-bezier(0.16, 1, 0.3, 1)
                                forwards;
                        }

                        .animate-detail-slide {
                            animation: detailSlideUp 0.8s
                                cubic-bezier(0.16, 1, 0.3, 1)
                                forwards;
                        }
                    `,
                }}
            />

            {/* Product Banner */}
            <section className="relative h-[240px] w-full overflow-hidden sm:h-[280px] lg:h-[320px]">
                <Image
                    src="/products/productbanner.png"
                    alt={product.name}
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
                                {product.category}
                            </span>
                        </div>

                        <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
                            {product.name}
                        </h1>

                        {/* Breadcrumb on Banner */}
                        <Breadcrumb
                            items={[
                                { name: "Products", href: "/products" },
                                { name: product.name }
                            ]}
                        />
                    </div>
                </div>
            </section>

            {/* Product Overview */}
            <section className="animate-page-fade py-8 lg:py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            href="/products"
                            className="group inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-[#123B5D] hover:text-white"
                        >
                            <ArrowLeft
                                size={14}
                                className="transition-transform duration-300 group-hover:-translate-x-0.5"
                            />
                            Back to Products
                        </Link>
                    </div>

                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

                        {/* Product Image */}
                        <div className="relative flex h-[380px] items-center justify-center overflow-hidden rounded-3xl border border-slate-100/60 bg-slate-50 p-8 shadow-md transition-all duration-500 hover:shadow-xl sm:h-[480px]">
                            <div className="relative h-full w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                <Image
                                    src={productImageUrl}
                                    alt={product.name}
                                    fill
                                    priority
                                    className="object-contain p-2 transition-transform duration-700 hover:scale-103"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                            </div>
                        </div>

                        {/* Product Information */}
                        <div className="animate-detail-slide">
                            <div className="mb-3 inline-flex items-center gap-2">
                                <span className="h-1 w-5 rounded-full bg-[#0F766E]" />

                                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                                    {product.category}
                                </p>
                            </div>

                            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                                {product.name}
                            </h1>

                            <p className="mt-6 text-base leading-relaxed text-slate-600">
                                {product.shortDescription}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Description */}
            <ProductDescriptionSection
                productName={product.name}
                description={product.description}
                category={product.category}
            />

            {/* Specifications */}
            <section className="border-t border-slate-100 py-12 lg:py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="mb-3 inline-flex items-center gap-2">
                            <span className="h-1 w-5 rounded-full bg-[#0F766E]" />

                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                                Product Information
                            </p>
                        </div>

                        <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                            Technical Specifications
                        </h2>

                        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                            <table className="w-full border-collapse text-left">
                                <tbody>
                                    {product.specifications?.map(
                                        (specification, index) => (
                                            <tr
                                                key={
                                                    specification.label +
                                                    index
                                                }
                                                className={`transition-colors duration-200 hover:bg-slate-50/80 ${index % 2 === 0
                                                        ? "bg-slate-50/50"
                                                        : "bg-white"
                                                    }`}
                                            >
                                                <th className="w-1/3 border-b border-slate-100 px-6 py-4 text-sm font-bold text-[#123B5D]">
                                                    {
                                                        specification.label
                                                    }
                                                </th>

                                                <td className="border-b border-slate-100 px-6 py-4 text-sm text-slate-600">
                                                    {
                                                        specification.value
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Quote CTA */}
                        <div className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl bg-gradient-to-r from-[#123B5D] to-[#0F766E] p-8 shadow-lg shadow-blue-900/10 sm:flex-row sm:items-center">
                            <div>
                                <h3 className="text-xl font-bold text-white">
                                    Interested in this product?
                                </h3>

                                <p className="mt-2 max-w-xl text-sm leading-relaxed text-teal-100/90">
                                    Contact Aurevia Healthcare
                                    for product customization,
                                    contract manufacturing
                                    opportunities, or wholesale
                                    purchase enquiries.
                                </p>
                            </div>

                            <Link
                                href={`/contact?product=${encodeURIComponent(
                                    product.name
                                )}#contact-form`}
                                className="inline-flex shrink-0 items-center rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-[#123B5D] shadow-md transition-all duration-300 hover:scale-102 hover:bg-slate-50 active:scale-98"
                            >
                                Request a Quote

                                <FileText
                                    size={16}
                                    className="ml-2 text-[#123B5D]"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Specific FAQs */}
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