import { Factory, ShieldCheck, Microscope, Truck } from "lucide-react";

const capabilities = [
  {
    icon: Factory,
    title: "cGMP Manufacturing",
    description: "High-capacity automated dosage formulation & contract production.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    description: "In-house analytical testing laboratories with comprehensive batch control.",
  },
  {
    icon: Microscope,
    title: "R&D & Formulation",
    description: "Continuous process optimization & stability protocol validation.",
  },
  {
    icon: Truck,
    title: "Reliable B2B Supply",
    description: "End-to-end OEM packaging, CTD dossiers, & international export support.",
  },
];

export default function TrustStrip() {
  return (
    <section aria-label="Core Capabilities" className="border-b border-slate-200/80 bg-white py-8 lg:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {capabilities.map((item) => {
            const Icon = item.icon;

            return (
              <li
                key={item.title}
                className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5 shadow-xs transition-all duration-300 hover:border-teal-600/40 hover:bg-white hover:shadow-md hover:-translate-y-1 motion-reduce:hover:translate-y-0"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] transition-colors duration-300 group-hover:bg-[#0F766E] group-hover:text-white">
                  <Icon size={20} strokeWidth={2} aria-hidden="true" />
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#123B5D] transition-colors duration-300 group-hover:text-[#0F766E]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs font-normal leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
