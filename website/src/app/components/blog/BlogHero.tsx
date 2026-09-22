import Image from "next/image";
import Breadcrumb from "@/app/components/common/Breadcrumb";

export default function BlogHero() {
  return (
    <section aria-label="Blogs & Insights Hero Banner" className="relative w-full overflow-hidden bg-slate-950 min-h-[240px] sm:min-h-[280px] lg:min-h-[310px] flex items-center py-8 sm:py-10">
      {/* Background Image with Natural Proportional Framing */}
      <Image
        src="/blogs/Blog-banner.png"
        alt="Aurevia Healthcare blogs and insights banner"
        fill
        priority
        unoptimized={true}
        className="object-cover object-center sm:object-[center_35%]"
        sizes="100vw"
      />

      {/* Professional Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#071E33]/90 via-[#071E33]/75 to-[#123B5D]/40" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl text-left text-white">

          {/* Eyebrow Pill */}
          <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-3.5 py-1 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-300">
              Aurevia Healthcare
            </span>
          </div>

          {/* Clean Title */}
          <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
            Blogs &amp; Insights
          </h1>

          {/* Breadcrumb on Banner */}
          <div className="mt-3">
            <Breadcrumb items={[{ name: "Blogs" }]} />
          </div>

        </div>
      </div>
    </section>
  );
}
