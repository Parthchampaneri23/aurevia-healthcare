import Image from "next/image";
import Breadcrumb from "@/app/components/common/Breadcrumb";

export default function BlogHero() {
  return (
    <section className="relative h-[240px] w-full overflow-hidden sm:h-[280px] lg:h-[320px] flex items-center">
      {/* Background Image (Bright, crisp, no dulling opacity or mix-blend) */}
      <Image
        src="/blogs/Blog-banner.png"
        alt="Pharmaceutical Insights & Industry Knowledge"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Subtle Gradient Overlay for Text Readability without dulling image */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl text-left">
          
          {/* Eyebrow Label */}
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-3.5 py-1 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300">
              INSIGHTS &amp; KNOWLEDGE
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
            Blog &amp; Insights
          </h1>

          {/* Breadcrumb */}
          <Breadcrumb items={[{ name: "Blog" }]} />

        </div>
      </div>
    </section>
  );
}
