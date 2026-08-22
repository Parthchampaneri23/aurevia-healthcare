import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import { notFound } from "next/navigation";

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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default async function ProductDetailsPage({
    params,
}: ProductDetailsPageProps) {
    const { slug } = await params;

    let product: Product;

    try {
        if (!API_URL) {
            console.error("NEXT_PUBLIC_API_URL is not configured");
            notFound();
        }

        const response = await fetch(`${API_URL}/api/products/${slug}`, {
            cache: "no-store",
        });

        if (!response.ok) {
            console.error(
                `Failed to fetch product ${slug}: ${response.status}`
            );
            notFound();
        }

        const data = await response.json();

        console.log("Product details API response:", data);

        if (!data.success || !data.product) {
            console.error("Invalid product response:", data);
            notFound();
        }

        product = data.product;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        notFound();
    }

    return (
        <main className="overflow-hidden bg-white">
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes pageFadeIn {
                            from { opacity: 0; }
                            to { opacity: 1; }
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
                            animation: pageFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                        }

                        .animate-detail-slide {
                            animation: detailSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                        }
                    `,
                }}
            />

            {/* Product Banner */}
            <section className="relative h-[180px] overflow-hidden sm:h-[210px] lg:h-[240px]">
                <Image
                    src="/products/productbanner.png"
                    alt={product.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#08243a]/85 via-[#123B5D]/65 to-[#123B5D]/20" />

                <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-8">
                    <div className="mb-3">
                        <Link
                            href="/products"
                            className="group inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-950/60 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-teal-300 backdrop-blur-sm transition-all duration-300 hover:border-[#123B5D]/40 hover:bg-[#123B5D] hover:text-white"
                        >
                            <ArrowLeft
                                size={14}
                                className="transition-transform duration-300 group-hover:-translate-x-0.5"
                            />
                            Back to Products
                        </Link>
                    </div>

                    <div className="max-w-2xl text-white">
                        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-teal-300">
                            {product.category}
                        </p>

                        <h1 className="mt-2 text-2xl font-bold leading-tight sm:text-3xl lg:text-4xl">
                            {product.name}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Product Overview */}
            <section className="animate-page-fade py-12 lg:py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        {/* Product Image */}
                        <div className="relative flex h-[380px] items-center justify-center overflow-hidden rounded-3xl border border-slate-100/60 bg-slate-50 p-8 shadow-md transition-all duration-500 hover:shadow-xl sm:h-[480px]">
                            <div className="relative h-full w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                                <Image
                                    src={product.image}
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
            <section className="border-t border-slate-100 bg-slate-50/50 py-12 lg:py-12">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="max-w-4xl">
                        <div className="mb-3 inline-flex items-center gap-2">
                            <span className="h-1 w-5 rounded-full bg-[#0F766E]" />

                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                                Product Overview
                            </p>
                        </div>

                        <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                            About {product.name}
                        </h2>

                        <div className="mt-6 space-y-6 text-base leading-relaxed text-slate-600">
                            <p className="font-semibold text-[#123B5D]">
                                {product.description}
                            </p>

                            <p>
                                At Aurevia Healthcare, we ensure that every
                                batch of {product.name} is produced using
                                state-of-the-art manufacturing methodologies.
                                Our dedicated quality assurance teams monitor
                                crucial production parameters from raw
                                ingredient testing to final packaging
                                compliance.
                            </p>

                            <p>
                                Built upon a foundation of scientific
                                evaluation and formulation optimization, this
                                product represents our commitment to consistent
                                quality, reliability, and healthcare
                                excellence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

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
                                                    specification.label + index
                                                }
                                                className={`transition-colors duration-200 hover:bg-slate-50/80 ${index % 2 === 0
                                                        ? "bg-slate-50/50"
                                                        : "bg-white"
                                                    }`}
                                            >
                                                <th className="w-1/3 border-b border-slate-100 px-6 py-4 text-sm font-bold text-[#123B5D]">
                                                    {specification.label}
                                                </th>

                                                <td className="border-b border-slate-100 px-6 py-4 text-sm text-slate-600">
                                                    {specification.value}
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
                                    Contact Aurevia Healthcare for product
                                    customization, contract manufacturing
                                    opportunities, or wholesale purchase
                                    enquiries.
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
        </main>
    );
}