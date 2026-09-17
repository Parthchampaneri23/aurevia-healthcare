import { MapPin, Navigation, Building2, Phone, Mail, Globe, ExternalLink } from "lucide-react";
import Image from "next/image";

export default function ContactLocation() {
    return (
        <section className="bg-slate-50 py-12 lg:py-12">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes locationSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-location-card {
                    animation: locationSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
            `}} />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-10 text-center">
                    <div className="inline-flex items-center gap-2 mb-3">
                        <span className="h-1.5 w-8 rounded-full bg-teal-600" />
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
                            VISIT OUR HEADQUARTERS
                        </p>
                    </div>

                    <h2 className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#123B5D] bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                        Global Manufacturing Hub & Registered Office
                    </h2>

                    <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
                        Strategically located in Gujarat&apos;s premier pharmaceutical cluster to streamline high-volume domestic manufacturing and international export logistics.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="animate-location-card overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl transition-all duration-500 hover:shadow-2xl">
                    <div className="grid gap-0 lg:grid-cols-12">
                        {/* Left Info Column (5 cols) */}
                        <div className="flex flex-col justify-between p-8 sm:p-10 lg:col-span-5 bg-gradient-to-b from-white to-slate-50/70 border-b lg:border-b-0 lg:border-r border-slate-200">
                            <div>
                                {/* Header Badge */}
                                <div className="inline-flex items-center gap-2.5 rounded-full bg-teal-50 px-3.5 py-1.5 border border-teal-200/60 text-teal-800 mb-6">
                                    <Building2 size={15} className="text-teal-600" />
                                    <span className="text-xs font-bold uppercase tracking-wider">
                                        Headquarters & Plant
                                    </span>
                                </div>

                                <h3 className="text-2xl font-bold text-slate-900 leading-snug">
                                    Aurevia Healthcare Limited
                                </h3>

                                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                                    Changodar GIDC, Ahmedabad, Gujarat 382213, India
                                </p>

                                {/* Location Details List */}
                                <div className="mt-8 space-y-4">
                                    <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm transition-all duration-300 hover:border-teal-200 hover:shadow-md">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#123B5D]/10 text-[#123B5D]">
                                            <MapPin size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                                                Industrial Zone
                                            </p>
                                            <p className="text-xs text-slate-600 mt-0.5">
                                                Changodar GIDC Pharma Hub, Gujarat
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm transition-all duration-300 hover:border-teal-200 hover:shadow-md">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-[#0F766E]">
                                            <Globe size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                                                Export & Logistics Connectivity
                                            </p>
                                            <p className="text-xs text-slate-600 mt-0.5">
                                                Direct access to air cargo & major sea ports
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200/80 shadow-sm transition-all duration-300 hover:border-teal-200 hover:shadow-md">
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#123B5D]/10 text-[#123B5D]">
                                            <Navigation size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                                                Visitor & Audit Access
                                            </p>
                                            <p className="text-xs text-slate-600 mt-0.5">
                                                Prior appointment required for facility audits
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Actions & Logo Banner */}
                            <div className="mt-8 pt-6 border-t border-slate-200">
                                <a
                                    href="https://maps.google.com/?q=Changodar+GIDC,+Ahmedabad,+Gujarat+382213,+India"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#123B5D] px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-[#0d2d46] hover:shadow-lg active:scale-[0.98]"
                                >
                                    <span>Open in Google Maps</span>
                                    <ExternalLink size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </a>

                                <div className="mt-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3.5 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-9 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 p-1">
                                            <Image
                                                src="/hero/logo.png"
                                                alt="Aurevia Healthcare"
                                                width={40}
                                                height={30}
                                                className="h-7 w-auto object-contain"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-900">
                                                Aurevia HQ Facility
                                            </p>
                                            <p className="text-[11px] text-slate-500">
                                                WHO-GMP Certified Unit
                                            </p>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-[#0F766E] border border-teal-200">
                                        Verified
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Map Column (7 cols) */}
                        <div className="relative min-h-[400px] sm:min-h-[480px] lg:min-h-[540px] lg:col-span-7 w-full bg-slate-100">
                            <iframe
                                src="https://maps.google.com/maps?q=Changodar%20GIDC%2C%20Ahmedabad%2C%20Gujarat%20382213%2C%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="h-full w-full transition-all duration-700"
                            />

                            {/* Floating Map Card Overlay */}
                            <div className="absolute bottom-5 left-5 right-5 sm:right-auto sm:max-w-xs rounded-2xl border border-white/40 bg-white/90 p-4 shadow-xl backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#123B5D] text-white shadow-sm">
                                        <MapPin size={20} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                                            Changodar GIDC
                                        </p>
                                        <p className="text-[11px] text-slate-600">
                                            Ahmedabad, Gujarat 382213
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}