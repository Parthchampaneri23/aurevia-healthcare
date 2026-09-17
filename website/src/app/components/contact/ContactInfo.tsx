import Image from "next/image";
import {
    MapPin,
    Mail,
    Phone,
    Clock3,
} from "lucide-react";

const contactItems = [
    {
        icon: MapPin,
        title: "Head Office",
        value: "Changodar GIDC, Ahmedabad, Gujarat 382213, India",
        link: "https://maps.google.com/?q=Changodar+GIDC,+Ahmedabad,+Gujarat+382213,+India",
    },
    {
        icon: Mail,
        title: "Email",
        value: "info@aureviahealthcare.com",
        link: "mailto:info@aureviahealthcare.com",
    },
    {
        icon: Phone,
        title: "Phone",
        value: "+91 8677456564",
        link: "tel:+918677456564",
    },
    {
        icon: Clock3,
        title: "Business Hours",
        value: "Monday – Saturday, 9:00 AM – 6:00 PM",
    },
];

export default function ContactInfo() {
    return (
        <section className="bg-white py-12 lg:py-12">
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes cardFadeIn {
                    from { opacity: 0; transform: translateY(15px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .animate-card-fade-in {
                    animation: cardFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    opacity: 0;
                }
            `}} />
            <div className="mx-auto grid max-w-7xl gap-10 lg:gap-16 px-6 lg:grid-cols-2 lg:items-center lg:px-8">
                <div className="flex flex-col justify-center">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-teal-600">
                        GET IN TOUCH
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl bg-gradient-to-r from-slate-900 via-slate-800 to-[#123B5D] bg-clip-text text-transparent">
                        We&apos;re Here to Help
                    </h2>

                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-600">
                        Connect with Aurevia Healthcare for product enquiries,
                        manufacturing requirements, business partnerships and
                        other healthcare-related enquiries.
                    </p>

                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                        {contactItems.map((item, index) => {
                            const Icon = item.icon;
                            const isLink = !!item.link;
                            const Component = isLink ? "a" : "div";
                            const linkProps = isLink ? {
                                href: item.link,
                                target: item.link.startsWith("http") ? "_blank" : undefined,
                                rel: item.link.startsWith("http") ? "noopener noreferrer" : undefined,
                            } : {};

                            return (
                                <Component
                                    key={item.title}
                                    className="group relative overflow-hidden flex gap-4 p-4 rounded-xl border border-slate-200/80 bg-slate-50 transition-all duration-500 hover:-translate-y-1 hover:border-teal-400/60 hover:shadow-xl hover:shadow-teal-900/10 hover:bg-white animate-card-fade-in"
                                    style={{ animationDelay: `${index * 80}ms` }}
                                    {...linkProps}
                                >
                                    {/* Slide-in Top Accent Line */}
                                    <div className="absolute top-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#123B5D] to-[#0F766E] transition-all duration-500 group-hover:w-full" />
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#123B5D]/10 text-[#123B5D] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-[#123B5D] group-hover:text-white">
                                        <Icon size={19} />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-semibold text-slate-900 transition-colors duration-300 group-hover:text-[#123B5D]">
                                            {item.title}
                                        </h3>

                                        <p className="mt-1 text-sm leading-5 text-slate-500">
                                            {item.value}
                                        </p>
                                    </div>
                                </Component>
                            );
                        })}
                    </div>
                </div>

                <div className="group relative overflow-hidden rounded-2xl bg-slate-100 shadow-lg transition-all duration-500 hover:shadow-xl hover:shadow-[#123B5D]/10 max-h-[300px] sm:max-h-[340px] lg:max-h-[360px] max-w-[500px] mx-auto w-full aspect-[4/3]">
                    <div className="overflow-hidden w-full h-full relative">
                        <Image
                            src="/contact/contactoffice.png?v=2"
                            alt="Aurevia Healthcare Office"
                            width={800}
                            height={600}
                            unoptimized
                            className="h-full w-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}