import Image from "next/image";
import Link from "next/link";

const categories = [
    {
        name: "Tablets",
        description:
            "Quality-focused tablet formulations designed for consistent pharmaceutical solutions.",
        image: "/hero/tablets.jpg?v=2",
        href: "/products?category=tablets#explore",
        objectPosition: "object-[center_25%]",
    },
    {
        name: "Capsules",
        description:
            "Reliable capsule formulations manufactured with a focus on quality and consistency.",
        image: "/hero/capsules.jpg?v=2",
        href: "/products?category=capsules#explore",
        objectPosition: "object-[center_25%]",
    },
    {
        name: "Syrups",
        description:
            "Patient-friendly liquid formulations developed for dependable healthcare applications.",
        image: "/hero/syrups.jpg?v=2",
        href: "/products?category=syrups#explore",
        objectPosition: "object-[center_10%]",
    },
    {
        name: "Injectables",
        description:
            "Pharmaceutical injectable solutions supported by controlled manufacturing processes.",
        image: "/hero/Injectables.jpg?v=2",
        href: "/products?category=injectables#explore",
        objectPosition: "object-[center_25%]",
    },
    {
        name: "Ointments & Creams",
        description:
            "Topical pharmaceutical formulations developed for a range of healthcare needs.",
        image: "/hero/Ointments & Creams.jpg?v=2",
        href: "/products?category=ointments-creams#explore",
        objectPosition: "object-[center_25%]",
    },
    {
        name: "Nutraceuticals",
        description:
            "Nutritional healthcare solutions designed to support everyday wellness and health.",
        image: "/hero/Nutraceuticals.jpg?v=2",
        href: "/products?category=nutraceuticals#explore",
        objectPosition: "object-[center_25%]",
    },
];

export default function ProductCategories() {
    return (
        <section className="relative overflow-hidden bg-slate-50 py-12 lg:py-12">
            {/* Background elements */}
            <div className="absolute top-1/2 left-0 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-teal-100/20 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* Section Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-3 mb-2.5 justify-center">
                        <span className="h-0.5 w-6 rounded-full bg-[#0F766E]" aria-hidden="true" />
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
                            OUR PRODUCTS
                        </p>
                        <span className="h-0.5 w-6 rounded-full bg-[#0F766E]" aria-hidden="true" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#123B5D] leading-tight">
                        Pharmaceutical <span className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">Solutions</span>
                    </h2>

                    <p className="mt-4 text-base md:text-[17px] font-normal leading-relaxed text-slate-600 max-w-2xl mx-auto">
                        Explore our range of pharmaceutical dosage forms and healthcare solutions developed with a focus on quality, consistency and reliability.
                    </p>
                </div>

                {/* Category Cards */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={category.href}
                            className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-slate-300/90 bg-white shadow-md backdrop-blur-sm transition-all duration-500 hover:-translate-y-2.5 hover:border-[#0F766E] hover:shadow-2xl hover:shadow-teal-950/20"
                        >
                            {/* Slide-in Top Accent Line */}
                            <div className="absolute top-0 left-0 z-20 h-[4px] w-0 bg-gradient-to-r from-[#123B5D] via-[#0F766E] to-[#123B5D] transition-all duration-500 group-hover:w-full" />

                            {/* Image Container with Zoom & Badge */}
                            <div className="relative h-60 overflow-hidden bg-slate-900">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    unoptimized
                                    className={`object-cover ${category.objectPosition} opacity-90 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-100`}
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />

                                {/* Dark Gradient Overlay for High Contrast Text Visibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent transition-opacity duration-500 group-hover:opacity-60" />

                                {/* Category Badge Floating Top Left */}
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#123B5D] shadow-sm backdrop-blur-md transition-colors duration-300 group-hover:bg-[#0F766E] group-hover:text-white">
                                        {category.name}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="flex flex-1 flex-col p-6 sm:p-7 bg-white transition-colors duration-500 group-hover:bg-slate-50/50">
                                <h3 className="text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#0F766E]">
                                    {category.name}
                                </h3>

                                <p className="mt-2.5 flex-1 text-[15px] font-normal leading-relaxed text-slate-600">
                                    {category.description}
                                </p>

                                {/* Action Bar */}
                                <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-3.5">
                                    <span className="text-xs font-medium text-[#0F766E]">
                                        Explore Range
                                    </span>

                                    <div className="flex items-center gap-2 text-sm font-semibold text-[#123B5D] transition-colors duration-300 group-hover:text-[#0F766E]">
                                        <span>View Products</span>
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all duration-300 group-hover:bg-[#0F766E] group-hover:text-white group-hover:translate-x-1">
                                            →
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Products */}
                <div className="mt-12 text-center">
                    <Link
                        href="/products#explore"
                        className="group/btn inline-flex items-center gap-2 rounded-xl bg-[#123B5D] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/10 transition-all duration-300 hover:bg-[#0F766E] hover:shadow-xl hover:shadow-teal-900/20 hover:translate-x-0.5 active:scale-95"
                    >
                        View All Products
                        <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </Link>
                </div>

            </div>
        </section>
    );
}