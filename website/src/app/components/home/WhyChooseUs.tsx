import {
    ShieldCheck,
    Factory,
    Truck,
    Handshake,
} from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Quality Focus",
        description:
            "Consistent quality across our manufacturing processes with a strong focus on reliability and standards.",
        color: "group-hover:border-teal-500/30",
        iconBg: "bg-teal-50 text-teal-700 group-hover:bg-teal-700",
    },
    {
        icon: Factory,
        title: "Modern Manufacturing",
        description:
            "Efficient infrastructure and controlled processes designed for dependable pharmaceutical production.",
        color: "group-hover:border-blue-500/30",
        iconBg: "bg-blue-50 text-blue-700 group-hover:bg-blue-700",
    },
    {
        icon: Truck,
        title: "Reliable Supply",
        description:
            "Dependable manufacturing and supply support to help our partners meet their business requirements.",
        color: "group-hover:border-[#123B5D]/30",
        iconBg: "bg-[#123B5D]/10 text-[#123B5D] group-hover:bg-[#123B5D]",
    },
    {
        icon: Handshake,
        title: "Customer Partnership",
        description:
            "Building long-term relationships through transparency, responsive service and mutual trust.",
        color: "group-hover:border-emerald-500/30",
        iconBg: "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700",
    },
];

export default function WhyChooseUs() {
    return (
        <section className="relative overflow-hidden bg-white py-12 lg:py-12">
            {/* Background Details */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-80 w-80 rounded-full bg-slate-50 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-80 w-80 rounded-full bg-slate-50 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">

                {/* Section Heading */}
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center gap-2 mb-3 justify-center">
                        <span className="h-1 w-6 rounded-full bg-[#123B5D]" />
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#123B5D]">
                            Why Choose Aurevia
                        </p>
                        <span className="h-1 w-6 rounded-full bg-[#123B5D]" />
                    </div>

                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#123B5D] bg-clip-text text-transparent">
                        Built Around Quality, Reliability & Partnership
                    </h2>

                    <p className="mt-5 text-base leading-relaxed text-slate-600 max-w-2xl mx-auto">
                        We combine quality-focused manufacturing, reliable processes and customer-oriented service to create long-term pharmaceutical partnerships.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className={`group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${feature.color}`}
                            >
                                {/* Slide-in top border color */}
                                <div className="absolute top-0 left-0 h-[4px] w-0 bg-gradient-to-r from-[#123B5D] to-[#0F766E] transition-all duration-500 group-hover:w-full" />

                                {/* Icon container with hover animation */}
                                <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:text-white ${feature.iconBg}`}>
                                    <Icon size={26} strokeWidth={1.8} className="transition-transform duration-500" />
                                </div>

                                {/* Title with hover color change */}
                                <h3 className="mt-6 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#123B5D]">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-3 text-sm leading-relaxed text-slate-500">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}