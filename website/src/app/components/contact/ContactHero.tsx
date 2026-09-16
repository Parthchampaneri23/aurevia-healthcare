"use client";

import Image from "next/image";
import Breadcrumb from "@/app/components/common/Breadcrumb";

export default function ContactHero() {
    return (
        <section className="relative h-[240px] w-full overflow-hidden sm:h-[280px] lg:h-[320px]">
            {/* Background Image */}
            <Image
                src="/contact/contacthero.png"
                alt="Contact Us"
                fill
                priority
                className="object-cover object-center"
                sizes="100vw"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/65 to-transparent" />

            {/* Content */}
            <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 lg:px-8">
                <div className="max-w-2xl text-left">
                    <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-3.5 py-1 backdrop-blur-md">
                        <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                        <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300">
                            Get In Touch
                        </span>
                    </div>

                    <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
                        Contact Us
                    </h1>

                    {/* Breadcrumb on Banner */}
                    <Breadcrumb items={[{ name: "Contact Us" }]} />
                </div>
            </div>
        </section>
    );
}