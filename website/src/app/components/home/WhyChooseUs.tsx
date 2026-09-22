import {
  ShieldCheck,
  Building2,
  Users2,
  Award,
  CheckCircle2,
  ArrowUpRight,
} from "lucide-react";
import SectionBackground from "@/app/components/animations/SectionBackground";

const features = [
  {
    icon: ShieldCheck,
    title: "Quality Excellence",
    subtitle: "cGMP Standards & Batch Controls",
    description:
      "Operational infrastructure following strict WHO-GMP, ISO 9001:2015, and cGMP compliance protocols.",
    badge: "100% Quality Focus",
    gradient: "from-teal-500/10 to-teal-500/0",
    iconBg: "bg-teal-50 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
  },
  {
    icon: Building2,
    title: "Modern Infrastructure",
    subtitle: "High-Capacity Processing",
    description:
      "Automated high-speed production lines for tablets, capsules, syrups, topicals, and sterile injectables.",
    badge: "Automated Plant Machinery",
    gradient: "from-blue-500/10 to-blue-500/0",
    iconBg: "bg-blue-50 text-[#123B5D] group-hover:bg-[#123B5D] group-hover:text-white",
  },
  {
    icon: Users2,
    title: "Reliable Supply Chain",
    subtitle: "Domestic & Export Dispatch",
    description:
      "Streamlined inventory coordination and on-time shipment fulfillment across regional and global markets.",
    badge: "Dependable Logistics",
    gradient: "from-teal-500/10 to-teal-500/0",
    iconBg: "bg-teal-50 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white",
  },
  {
    icon: Award,
    title: "Strategic B2B Support",
    subtitle: "Dossier & Private Labeling",
    description:
      "Comprehensive CTD/ACTD regulatory support, custom primary packaging, and dedicated account management.",
    badge: "Dedicated Commercial Lead",
    gradient: "from-blue-500/10 to-blue-500/0",
    iconBg: "bg-blue-50 text-[#123B5D] group-hover:bg-[#123B5D] group-hover:text-white",
  },
];

export default function WhyChooseUs() {
  return (
    <SectionBackground variant="medical-grid" className="bg-white py-12 lg:py-12 border-t border-slate-100">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-3 justify-center">
            <span className="h-0.5 w-6 rounded-full bg-[#0F766E]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
              WHY CHOOSE AUREVIA
            </p>
            <span className="h-0.5 w-6 rounded-full bg-[#0F766E]" aria-hidden="true" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#123B5D] leading-tight">
            Built Around Quality, <span className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">Reliability &amp; Partnership</span>
          </h2>

          <p className="mt-4 text-base md:text-[17px] font-normal leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Combining WHO-GMP certified manufacturing, advanced technical infrastructure, and responsive B2B coordination to build enduring healthcare partnerships.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border-2 border-slate-300/90 bg-white p-7 shadow-md transition-all duration-500 hover:-translate-y-2.5 hover:border-[#0F766E] hover:shadow-2xl hover:shadow-teal-950/15"
              >
                {/* Top Sliding Accent Line */}
                <div className="absolute top-0 left-0 h-[4px] w-0 bg-gradient-to-r from-[#123B5D] to-[#0F766E] transition-all duration-500 group-hover:w-full" aria-hidden="true" />

                <div>
                  {/* Top Bar: Icon + Corner Arrow */}
                  <div className="flex items-center justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl shadow-xs transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${feature.iconBg}`}
                    >
                      <Icon size={22} strokeWidth={2} aria-hidden="true" />
                    </div>

                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400 opacity-60 transition-all duration-300 group-hover:bg-[#123B5D] group-hover:text-white group-hover:opacity-100 group-hover:scale-105">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="mt-6 text-lg font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#0F766E]">
                    {feature.title}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-[#0F766E]">
                    {feature.subtitle}
                  </p>

                  {/* Description */}
                  <p className="mt-2.5 text-[15px] font-normal leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Trust Badge */}
                <div className="mt-6 border-t border-slate-100 pt-3.5 flex items-center gap-2 text-xs font-medium text-slate-700">
                  <CheckCircle2 size={14} className="text-[#0F766E] shrink-0" />
                  <span>{feature.badge}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionBackground>
  );
}