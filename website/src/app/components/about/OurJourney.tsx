const journey = [
    {
        number: "01",
        title: "Foundation",
        description:
            "Establishing a strong foundation for reliable pharmaceutical manufacturing and healthcare solutions.",
    },
    {
        number: "02",
        title: "Manufacturing",
        description:
            "Developing structured manufacturing capabilities with a focus on consistency and operational efficiency.",
    },
    {
        number: "03",
        title: "Quality",
        description:
            "Strengthening quality-focused processes and controls across manufacturing and product handling.",
    },
    {
        number: "04",
        title: "Product Portfolio",
        description:
            "Expanding pharmaceutical product categories to support a wider range of healthcare requirements.",
    },
    {
        number: "05",
        title: "Partnerships",
        description:
            "Building long-term relationships with healthcare businesses through dependable service and support.",
    },
];

export default function OurJourney() {
    return (
        <section className="bg-[#f8fafc] py-12 sm:py-12 lg:py-12 overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">

                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <span className="h-1.5 w-8 rounded-full bg-[#0F766E]"></span>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0F766E]">
                            Our Journey
                        </p>
                        <span className="h-1.5 w-8 rounded-full bg-[#0F766E]"></span>
                    </div>

                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">
                        Growing With Purpose
                    </h2>

                    <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                        Our journey is shaped by continuous improvement,
                        manufacturing capabilities and long-term healthcare
                        partnerships.
                    </p>
                </div>

                {/* Journey Grid */}
                <div className="relative mt-16">
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
                        {journey.map((item, index) => (
                            <div
                                key={item.number}
                                className="group relative rounded-3xl border border-slate-100 bg-white p-6 shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                            >
                                {/* Connector Line (Desktop) */}
                                {index < journey.length - 1 && (
                                    <div className="absolute left-[calc(50%+24px)] top-12 w-[calc(100%-48px)] hidden h-[2px] bg-slate-100 lg:block z-0 group-hover:bg-gradient-to-r group-hover:from-[#123B5D] group-hover:to-[#0F766E] transition-colors duration-500" />
                                )}

                                {/* Card Header with Number & Slide Bar */}
                                <div className="relative z-10 flex items-center justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 font-extrabold text-lg text-[#0F766E] transition-all duration-300 group-hover:bg-[#0F766E] group-hover:text-white">
                                        {item.number}
                                    </div>

                                    {/* Sliding Progress Indicator */}
                                    <div className="h-1.5 w-12 rounded-full bg-slate-100 overflow-hidden">
                                        <div className="h-full w-0 bg-gradient-to-r from-[#123B5D] to-[#0F766E] transition-all duration-500 ease-out group-hover:w-full" />
                                    </div>
                                </div>

                                {/* Card Content */}
                                <div className="relative z-10 mt-6 text-left">
                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#123B5D] transition-colors duration-300">
                                        {item.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-relaxed text-slate-500 group-hover:text-slate-600 transition-colors duration-300">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}