import CountUp from "@/app/components/common/CountUp";

const stats = [
    {
        value: 15,
        suffix: "+",
        label: "Years of Experience",
        gradient: "from-blue-600 to-indigo-600",
    },
    {
        value: 25,
        suffix: "+",
        label: "Products Manufactured",
        gradient: "from-teal-600 to-emerald-600",
    },
    {
        value: 10,
        suffix: "+",
        label: "Markets Served",
        gradient: "from-indigo-600 to-purple-600",
    },
    {
        value: 100,
        suffix: "%",
        label: "Quality Focus",
        gradient: "from-emerald-600 to-cyan-600",
    },
];

export default function Stats() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100 py-12 lg:py-12">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-40">
                <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-teal-100 blur-3xl" />
                <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-blue-100 blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:gap-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="group relative overflow-hidden rounded-2xl border border-white bg-white/70 p-6 text-center shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:shadow-slate-200/80"
                        >
                            {/* Accent bottom bar that expands on hover */}
                            <div className="absolute bottom-0 left-0 h-[4px] w-0 bg-gradient-to-r from-[#123B5D] to-[#0F766E] transition-all duration-300 group-hover:w-full" />

                            <p className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-4xl font-extrabold text-transparent transition-transform duration-300 group-hover:scale-105 sm:text-5xl">
                                <CountUp
                                    end={stat.value}
                                    suffix={stat.suffix}
                                />
                            </p>

                            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-slate-500 transition-colors duration-300 group-hover:text-slate-800 sm:text-sm">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}