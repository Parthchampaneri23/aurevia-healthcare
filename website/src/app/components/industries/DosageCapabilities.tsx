import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const capabilities = [
    {
        name: "Tablets",
        image: "/products/tablet1.jpg",
        description: "Solid oral dosage manufacturing solutions.",
        href: "/products?category=tablets",
    },
    {
        name: "Capsules",
        image: "/products/capsule1.jpg",
        description: "Capsule-based pharmaceutical formulations.",
        href: "/products?category=capsules",
    },
    {
        name: "Syrups",
        image: "/products/syrup1.jpg",
        description: "Liquid oral pharmaceutical formulations.",
        href: "/products?category=syrups",
    },
    {
        name: "Injectables",
        image: "/products/injection1.jpg",
        description: "Injectable pharmaceutical product solutions.",
        href: "/products?category=injectables",
    },
    {
        name: "Ointments & Creams",
        image: "/products/oc1.jpg",
        description: "Topical pharmaceutical formulations.",
        href: "/products?category=ointments-creams",
    },
    {
        name: "Nutraceuticals",
        image: "/products/Nutraceuticals1.jpg",
        description: "Health, nutrition and wellness products.",
        href: "/products?category=nutraceuticals",
    },
];

export default function DosageCapabilities() {
    return (
        <section className="bg-slate-50 py-12 lg:py-12">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes capabilityFadeIn {
                    from { opacity: 0; transform: translateY(12px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-capability-card {
                    animation: capabilityFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
            `}} />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div className="max-w-2xl">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
                            OUR CAPABILITIES
                        </p>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                            Pharmaceutical Product Capabilities
                        </h2>

                        <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
                            Our product portfolio spans multiple pharmaceutical
                            and healthcare dosage forms designed to support
                            diverse business requirements.
                        </p>
                    </div>

                    <Link
                        href="/products"
                        className="inline-flex w-fit items-center text-sm font-semibold text-[#123B5D] hover:text-teal-600"
                    >
                        View All Products
                        <ArrowRight size={17} className="ml-2" />
                    </Link>
                </div>

                <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {capabilities.map((item, index) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="group relative overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg animate-capability-card"
                            style={{ animationDelay: `${index * 60}ms` }}
                        >
                            {/* Premium top border accent */}
                            <div className="absolute top-0 left-0 z-10 h-[3px] w-0 bg-[#0F766E] transition-all duration-300 group-hover:w-full" />

                            <div className="relative h-32 bg-slate-50">
                                <div className="absolute inset-2 overflow-hidden rounded-lg">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-contain transition-all duration-500 group-hover:scale-105"
                                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                    />
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="text-sm font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#123B5D]">
                                    {item.name}
                                </h3>

                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}