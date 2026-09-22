import { FlaskConical, Factory, ShieldCheck, PackageCheck, Truck } from "lucide-react";

const processSteps = [
  {
    step: "01",
    title: "Raw Material Handling",
    description: "Rigorous vendor verification & incoming raw material analytical qualification.",
    icon: FlaskConical,
  },
  {
    step: "02",
    title: "Controlled Production",
    description: "Automated dosage processing in positive pressure cGMP cleanroom blocks.",
    icon: Factory,
  },
  {
    step: "03",
    title: "In-Process Quality Control",
    description: "Comprehensive batch testing, HPLC assay validation, & quality inspection.",
    icon: ShieldCheck,
  },
  {
    step: "04",
    title: "Primary & Secondary Packaging",
    description: "Automated blister packing, strip sealing, & barcode-traceable carton packaging.",
    icon: PackageCheck,
  },
  {
    step: "05",
    title: "Dispatch & Logistics",
    description: "Complete COA batch certification, CTD dossiers, & international delivery.",
    icon: Truck,
  },
];

export default function ManufacturingProcess() {
  return (
    <section aria-label="Manufacturing Process Workflow" className="relative overflow-hidden bg-slate-50 py-12 lg:py-12 border-t border-slate-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 mb-3 justify-center">
            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
              MANUFACTURING WORKFLOW
            </p>
            <span className="h-1.5 w-8 rounded-full bg-[#0F766E]" aria-hidden="true" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#123B5D] leading-tight">
            Controlled Production <span className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">Process</span>
          </h2>

          <p className="mt-4 text-base md:text-[17px] font-normal leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Our manufacturing operations follow a structured 5-stage quality process to ensure consistency, safety, and operational reliability.
          </p>
        </div>

        {/* Horizontal Process Track (Desktop) */}
        <div className="relative mt-16">
          {/* Connector Line across top of nodes */}
          <div className="hidden lg:block absolute top-[22px] left-[8%] right-[8%] h-[3px] bg-slate-200 z-0 rounded-full" aria-hidden="true">
            <div className="h-full w-full bg-gradient-to-r from-[#0F766E] via-[#123B5D] to-[#0F766E] rounded-full" />
          </div>

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 relative z-10">
            {processSteps.map((item) => {
              const Icon = item.icon;

              return (
                <li key={item.step} className="group flex flex-col items-center">
                  {/* Step Number Circle */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0F766E] font-bold text-sm text-white shadow-md transition-all duration-300 ring-4 ring-white group-hover:bg-[#123B5D] group-hover:scale-110">
                    {item.step}
                  </div>

                  {/* Vertical Stub */}
                  <div className="w-[2px] h-5 bg-gradient-to-b from-teal-600/50 to-teal-600/20 my-1" aria-hidden="true" />

                  {/* Card Content */}
                  <div className="w-full flex-1 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all duration-300 hover:border-[#0F766E]/40 hover:shadow-md hover:-translate-y-1 motion-reduce:hover:translate-y-0">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] mb-3 transition-colors duration-300 group-hover:bg-[#0F766E] group-hover:text-white">
                      <Icon size={18} strokeWidth={2} aria-hidden="true" />
                    </div>

                    <h3 className="text-base font-bold text-slate-900 transition-colors duration-300 group-hover:text-[#0F766E]">
                      {item.title}
                    </h3>

                    <p className="mt-1.5 text-xs font-normal leading-relaxed text-slate-600">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
