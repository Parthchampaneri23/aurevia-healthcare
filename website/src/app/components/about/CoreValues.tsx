import {
    Award,
    HeartHandshake,
    Lightbulb,
    ShieldCheck,
} from "lucide-react";

const values = [
    {
        icon: ShieldCheck,
        title: "Quality",
        description:
            "Maintaining a consistent focus on product and process quality across our operations.",
    },
    {
        icon: HeartHandshake,
        title: "Integrity",
        description:
            "Building lasting relationships through transparency, responsibility and trust.",
    },
    {
        icon: Lightbulb,
        title: "Innovation",
        description:
            "Continuously improving our processes, capabilities and pharmaceutical solutions.",
    },
    {
        icon: Award,
        title: "Customer Focus",
        description:
            "Understanding our partners' requirements and delivering dependable support.",
    },
];

export default function CoreValues() {
    return (
        <section className="bg-white py-12 sm:py-12 lg:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0F766E]">
                        What We Stand For
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
                        Our Core Values
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-slate-600 sm:text-base">
                        The principles that guide how we work, manufacture and
                        build lasting relationships with our partners.
                    </p>
                </div>

                {/* Values */}
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
                    {values.map((value) => {
                        const Icon = value.icon;

                        return (
                            <div
                                key={value.title}
                                className="group rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg"
                            >
                                {/* Icon */}
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#123B5D]/10 text-[#123B5D] transition duration-300 group-hover:bg-[#123B5D] group-hover:text-white">
                                    <Icon
                                        size={23}
                                        strokeWidth={1.8}
                                    />
                                </div>

                                {/* Title */}
                                <h3 className="mt-5 text-lg font-bold text-slate-900">
                                    {value.title}
                                </h3>

                                {/* Description */}
                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    {value.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}