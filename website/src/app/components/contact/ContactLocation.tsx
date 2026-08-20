import { MapPin } from "lucide-react";

export default function ContactLocation() {
    return (
        <section className="bg-white py-12">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes locationSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-location-card {
                    animation: locationSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
            `}} />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="overflow-hidden rounded-2xl bg-slate-50 p-8 sm:p-10 animate-location-card border border-slate-200/60 shadow-md transition-all duration-500 hover:shadow-lg">
                    <div className="grid gap-8 lg:grid-cols-2 items-center">
                        <div className="flex flex-col gap-5">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#123B5D]/10 text-[#123B5D] transition-all duration-500 hover:scale-110 hover:rotate-3 hover:bg-[#123B5D] hover:text-white">
                                    <MapPin size={23} />
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-600">
                                        OUR LOCATION
                                    </p>

                                    <h2 className="mt-1 text-2xl font-bold text-slate-900">
                                        Ahmedabad, Gujarat, India
                                    </h2>

                                    <p className="mt-2 text-sm text-slate-650 leading-relaxed">
                                        Aurevia Healthcare — Pharmaceutical Manufacturing & Healthcare Solutions.
                                    </p>
                                    
                                    <p className="mt-3 text-xs text-slate-500">
                                        Headquartered in Gujarat's primary pharmaceutical hub to efficiently coordinate domestic production and international distribution.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-xl border border-slate-200 h-[250px] sm:h-[300px] w-full shadow-sm hover:shadow-md transition-all duration-300">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117512.44199999999!2d72.50858!3d23.022505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fccd11d087798c9!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="grayscale hover:grayscale-0 transition-all duration-550"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}