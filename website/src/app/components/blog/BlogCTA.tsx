import Link from "next/link";
import { ArrowRight, MessageSquare, Package } from "lucide-react";

export default function BlogCTA() {
  return (
    <section className="my-16 overflow-hidden rounded-3xl bg-gradient-to-r from-[#071E33] via-[#123B5D] to-[#0F766E] p-8 sm:p-12 text-white shadow-xl relative">
      {/* Background Decorative Element */}
      <div className="absolute right-0 top-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 -mb-10 -ml-10 h-64 w-64 rounded-full bg-slate-900/40 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <span className="inline-block rounded-full bg-teal-500/20 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-teal-300 mb-4 backdrop-blur-md border border-teal-400/30">
          PARTNERSHIP &amp; MANUFACTURING
        </span>
        
        <h2 className="text-2xl font-extrabold sm:text-3xl lg:text-4xl text-white leading-tight">
          Looking for Pharmaceutical Manufacturing Solutions?
        </h2>
        
        <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl mx-auto">
          Explore Aurevia&apos;s products and capabilities or connect with our team to discuss your custom manufacturing requirements.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-[#123B5D] transition-all duration-200 hover:bg-teal-50 hover:text-[#0F766E] hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <Package size={17} />
            Explore Products
          </Link>
          <Link
            href="/contact#contact-form"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-teal-600/30 border border-teal-400/40 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all duration-200 hover:bg-teal-600/50 hover:border-teal-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageSquare size={17} />
            Contact Aurevia
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

