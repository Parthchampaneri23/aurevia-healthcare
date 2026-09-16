import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BlogCTA() {
  return (
    <section className="my-16 overflow-hidden rounded-3xl bg-gradient-to-r from-[#0b1724] via-[#123B5D] to-[#0F766E] p-8 sm:p-12 text-white shadow-xl relative">
      {/* Background Decorative Element */}
      <div className="absolute right-0 top-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full bg-teal-500/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-teal-300 mb-4 backdrop-blur-md">
          PARTNERSHIP OPPORTUNITIES
        </span>
        
        <h2 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl text-white leading-tight">
          Looking for a Reliable Pharmaceutical Manufacturing Partner?
        </h2>
        
        <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
          Connect with Aurevia Healthcare to explore reliable pharmaceutical manufacturing and healthcare solutions.
        </p>

        <div className="mt-8">
          <Link
            href="/contact#contact-form"
            className="inline-flex items-center gap-2.5 rounded-xl bg-white px-8 py-4 text-base font-bold text-[#123B5D] transition-all duration-200 hover:bg-teal-50 hover:text-[#0F766E] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            Talk to Our Team
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
