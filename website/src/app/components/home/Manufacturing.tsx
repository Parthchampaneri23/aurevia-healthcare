import Image from "next/image";
import Link from "next/link";
import {
    Factory,
    ShieldCheck,
    Settings,
    PackageCheck,
} from "lucide-react";

const capabilities = [
    {
        icon: Factory,
        title: "Modern Infrastructure",
        description:
            "Purpose-driven facilities and infrastructure designed to support efficient pharmaceutical manufacturing.",
    },
    {
        icon: Settings,
        title: "Controlled Processes",
        description:
            "Structured and controlled manufacturing processes focused on consistency and operational reliability.",
    },
    {
        icon: ShieldCheck,
        title: "Quality Focus",
        description:
            "Quality-focused operations integrated throughout the manufacturing and production workflow.",
    },
    {
        icon: PackageCheck,
        title: "Reliable Packaging",
        description:
            "Careful packaging processes designed to support product integrity and dependable delivery.",
    },
];

export default function Manufacturing() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-12 lg:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Main Content */}
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">

                    {/* Image with Hover Zoom & Floating Badge */}
                    <div className="group relative overflow-hidden rounded-3xl bg-slate-100 shadow-2xl transition-all duration-500 hover:shadow-cyan-900/10">
                        <div className="overflow-hidden">
                            <Image
                                src="/hero/manufacture%20intelligence.png"
                                alt="Aurevia Healthcare manufacturing facility"
                                width={900}
                                height={650}
                                className="h-[400px] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 sm:h-[450px] lg:h-[520px]"
                            />
                        </div>

                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                        {/* Image Overlay Badge */}
                        <div className="absolute bottom-6 left-6 translate-y-0 rounded-2xl border border-white/20 bg-white/90 px-6 py-4 shadow-xl backdrop-blur-md transition-all duration-500 group-hover:-translate-y-2 group-hover:bg-white">
                            <p className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-sm font-extrabold text-transparent uppercase tracking-wider">
                                MANUFACTURING
                            </p>
                            <p className="mt-1 text-xs font-semibold text-slate-600">
                                Quality-focused operations
                            </p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div>
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="h-1.5 w-8 rounded-full bg-[#123B5D]"></span>
                            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#123B5D]">
                                Manufacturing Excellence
                            </p>
                        </div>

                        <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            Built for
                            <span className="block mt-1 bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">
                                Consistent Quality
                            </span>
                        </h2>

                        <p className="mt-6 text-base leading-relaxed text-slate-600">
                            Aurevia Healthcare combines modern manufacturing infrastructure with structured processes to support reliable pharmaceutical production.
                        </p>

                        <p className="mt-4 text-base leading-relaxed text-slate-600">
                            From production and quality control to packaging, every stage is approached with a focus on consistency, efficiency and dependable outcomes.
                        </p>

                        {/* Capabilities Card Grid */}
                        <div className="mt-10 grid gap-5 sm:grid-cols-2">
                            {capabilities.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="group/cap flex gap-4 rounded-2xl border border-slate-100/50 bg-white/60 p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-md hover:border-slate-100"
                                    >
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#123B5D]/10 text-[#123B5D] transition-all duration-300 group-hover/cap:scale-110 group-hover/cap:bg-[#123B5D] group-hover/cap:text-white">
                                            <Icon size={20} strokeWidth={1.8} />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-slate-900 transition-colors duration-300 group-hover/cap:text-[#123B5D]">
                                                {item.title}
                                            </h3>

                                            <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Button */}
                        <div className="mt-10">
                            <Link
                                href="/industries#industry-segments"
                                className="group/btn inline-flex items-center gap-2 rounded-xl bg-[#123B5D] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/10 transition-all duration-300 hover:bg-[#0d2d46] hover:shadow-xl hover:shadow-blue-900/20 hover:translate-x-0.5 active:scale-95"
                            >
                                Explore Industries
                                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}