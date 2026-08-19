import Image from "next/image";

export default function AboutHero() {
    return (
        <section className="relative h-[260px] w-full overflow-hidden sm:h-[300px] lg:h-[340px]">
            {/* Background Image */}
            <Image
                src="/about/aboutbanner.png"
                alt="About Aurevia Healthcare"
                fill
                priority
                className="object-cover"
                sizes="100vw"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-slate-950/55" />

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
                <div className="max-w-2xl text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80 sm:text-sm">
                        About Aurevia
                    </p>

                    <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                        Building Trust Through
                        <span className="block text-white/85">
                            Pharmaceutical Excellence
                        </span>
                    </h1>

                    <p className="mt-4 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
                        Delivering quality-driven pharmaceutical manufacturing
                        solutions through reliable processes, modern
                        capabilities and long-term partnerships.
                    </p>
                </div>
            </div>
        </section>
    );
}