import Image from "next/image";
import Link from "next/link";

const categories = [
    {
        name: "Tablets",
        description:
            "Quality-focused tablet formulations designed for consistent pharmaceutical solutions.",
        image: "/hero/tablets.jpg",
        href: "/products?category=tablets",
    },
    {
        name: "Capsules",
        description:
            "Reliable capsule formulations manufactured with a focus on quality and consistency.",
        image: "/hero/capsules.jpg",
        href: "/products?category=capsules",
    },
    {
        name: "Syrups",
        description:
            "Patient-friendly liquid formulations developed for dependable healthcare applications.",
        image: "/hero/syrups.jpg",
        href: "/products?category=syrups",
    },
    {
        name: "Injectables",
        description:
            "Pharmaceutical injectable solutions supported by controlled manufacturing processes.",
        image: "/hero/Injectables.jpg",
        href: "/products?category=injectables",
    },
    {
        name: "Ointments & Creams",
        description:
            "Topical pharmaceutical formulations developed for a range of healthcare needs.",
        image: "/hero/Ointments & Creams.jpg",
        href: "/products?category=ointments-creams",
    },
    {
        name: "Nutraceuticals",
        description:
            "Nutritional healthcare solutions designed to support everyday wellness and health.",
        image: "/hero/Nutraceuticals.jpg",
        href: "/products?category=nutraceuticals",
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
                    <div className="inline-flex items-center gap-2 mb-3 justify-center">
                        <span className="h-1 w-6 rounded-full bg-[#0F766E]" />
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#0F766E]">
                            Our Products
                        </p>
                        <span className="h-1 w-6 rounded-full bg-[#0F766E]" />
                    </div>

                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl bg-gradient-to-r from-slate-900 to-[#123B5D] bg-clip-text text-transparent">
                        Pharmaceutical Solutions
                    </h2>

                    <p className="mt-5 text-base leading-relaxed text-slate-600 max-w-2xl mx-auto">
                        Explore our range of pharmaceutical dosage forms and healthcare solutions developed with a focus on quality, consistency and reliability.
                    </p>
                </div>

                {/* Category Cards */}
                <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={category.href}
                            className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/60"
                        >
                            {/* Slide-in Accent Bar */}
                            <div className="absolute top-0 left-0 z-10 h-[4px] w-0 bg-gradient-to-r from-[#0F766E] to-[#123B5D] transition-all duration-500 group-hover:w-full" />

                            {/* Image */}
                            <div className="relative h-60 overflow-hidden">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />

                                {/* Image Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/10 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
                            </div>

                            {/* Content */}
                            <div className="flex flex-1 flex-col p-6 sm:p-8">
                                <h3 className="text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#0F766E]">
                                    {category.name}
                                </h3>

                                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                                    {category.description}
                                </p>

                                <div className="mt-6 inline-flex items-center text-sm font-bold text-[#123B5D] transition-colors duration-300 group-hover:text-[#0F766E]">
                                    View Products
                                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1.5">
                                        →
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All Products */}
                <div className="mt-12 text-center">
                    <Link
                        href="/products#explore"
                        className="group/btn inline-flex items-center gap-2 rounded-xl bg-[#123B5D] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/10 transition-all duration-300 hover:bg-[#0d2d46] hover:shadow-xl hover:shadow-blue-900/20 hover:translate-x-0.5 active:scale-95"
                    >
                        View All Products
                        <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </Link>
                </div>

            </div>
        </section>
    );
}