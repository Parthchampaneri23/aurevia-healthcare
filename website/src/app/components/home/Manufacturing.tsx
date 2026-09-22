import Image from "next/image";
import Link from "next/link";
import {
    Factory,
    ShieldCheck,
    Settings,
    PackageCheck,
    ArrowRight,
} from "lucide-react";

const capabilities = [
    {
        icon: Factory,
        title: "Modern Infrastructure",
        description:
            "Purpose-built production blocks designed for controlled cGMP pharmaceutical manufacturing.",
    },
    {
        icon: Settings,
        title: "Controlled Processes",
        description:
            "Automated equipment and environmental air controls focused on consistency and operational reliability.",
    },
    {
        icon: ShieldCheck,
        title: "Quality Focus",
        description:
            "Integrated quality assurance and analytical testing protocols across every batch workflow.",
    },
    {
        icon: PackageCheck,
        title: "Reliable Packaging",
        description:
            "Automated primary blister packing & secondary labeling designed to safeguard product stability.",
    },
];

export default function Manufacturing() {
    return (
        <section aria-label="Manufacturing Excellence" className="relative overflow-hidden bg-white py-12 lg:py-12 border-t border-slate-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Main Content */}
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-stretch">

                    {/* Image with Hover Zoom & Floating Badge */}
                    <div className="group relative flex overflow-hidden rounded-3xl bg-slate-900 shadow-xl transition-all duration-500 hover:shadow-2xl min-h-[380px] sm:min-h-[440px] lg:min-h-full">
                        <div className="overflow-hidden w-full h-full relative">
                            <Image
                                src="/hero/manufacture%20intelligence.png?v=2"
                                alt="Aurevia Healthcare Manufacturing Facility"
                                width={900}
                                height={650}
                                unoptimized
                                className="h-full w-full object-cover object-center sm:object-[center_25%] transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                        </div>

                        {/* Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-950/10 to-transparent transition-opacity duration-500 group-hover:opacity-80" />

                        {/* Floating Badge */}
                        <div className="absolute bottom-6 left-6 rounded-2xl border border-white/20 bg-white/95 px-5 py-3 shadow-lg backdrop-blur-md transition-all duration-500 group-hover:-translate-y-1">
                            <p className="text-xs font-semibold uppercase tracking-wider text-[#0F766E]">
                                MANUFACTURING FACILITY
                            </p>
                            <p className="text-sm font-bold text-[#123B5D]">
                                Controlled Dosage Production
                            </p>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col justify-center">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" aria-hidden="true" />
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
                                MANUFACTURING EXCELLENCE
                            </p>
                            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" aria-hidden="true" />
                        </div>

                        <h2 className="text-3xl font-extrabold tracking-tight text-[#123B5D] leading-tight sm:text-4xl lg:text-5xl lg:leading-tight">
                            Built for
                            <span className="block mt-1 bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">
                                Consistent Quality
                            </span>
                        </h2>

                        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                            Aurevia Healthcare combines modern manufacturing infrastructure with structured processes to support high-capacity, reliable pharmaceutical production.
                        </p>

                        <p className="mt-3 text-base leading-relaxed text-slate-600">
                            From raw material qualification and cleanroom compounding to primary blister packing, every stage is executed with precision, efficiency, and dependable batch quality.
                        </p>

                        {/* Capabilities Card Grid */}
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {capabilities.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <div
                                        key={item.title}
                                        className="group/cap relative flex gap-3.5 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#0F766E]/40 hover:bg-white hover:shadow-md"
                                    >
                                        <div className="absolute top-0 left-0 h-[3px] w-0 bg-[#0F766E] transition-all duration-300 group-hover/cap:w-full" aria-hidden="true" />

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] transition-colors duration-300 group-hover/cap:bg-[#0F766E] group-hover/cap:text-white">
                                            <Icon size={18} strokeWidth={2} aria-hidden="true" />
                                        </div>

                                        <div>
                                            <h3 className="text-sm font-bold text-slate-900 transition-colors duration-300 group-hover/cap:text-[#0F766E]">
                                                {item.title}
                                            </h3>

                                            <p className="mt-1 text-xs font-normal leading-relaxed text-slate-600">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Button */}
                        <div className="mt-8">
                            <Link
                                href="/industries#industry-segments"
                                className="group/btn inline-flex items-center gap-2 rounded-xl bg-[#123B5D] px-6 py-3.5 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-[#0F766E] hover:shadow-lg active:scale-95"
                            >
                                <span>Explore Business Sectors</span>
                                <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
