import {
    Package,
    Factory,
    Mail,
    BriefcaseBusiness,
    ArrowUpRight,
} from "lucide-react";
import StatCard from "@/components/StatCard";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div>
                <p className="text-sm font-semibold text-[#0F766E]">
                    Overview
                </p>

                <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#123B5D]">
                    Dashboard
                </h1>

                <p className="mt-2 text-sm text-slate-500">
                    Manage Aurevia Healthcare website content and enquiries.
                </p>
            </div>

            {/* Stats */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    title="Products"
                    value="30"
                    description="Active products"
                    icon={Package}
                />

                <StatCard
                    title="Industries"
                    value="0"
                    description="Managed industries"
                    icon={Factory}
                />

                <StatCard
                    title="Enquiries"
                    value="0"
                    description="Total enquiries"
                    icon={Mail}
                />

                <StatCard
                    title="Applications"
                    value="0"
                    description="Career applications"
                    icon={BriefcaseBusiness}
                />
            </div>

            {/* Welcome Card */}
            <div className="rounded-3xl bg-gradient-to-r from-[#123B5D] to-[#0F766E] p-8 shadow-lg shadow-slate-900/10">
                <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                    <div>
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-200">
                            Aurevia Healthcare
                        </p>

                        <h2 className="mt-2 text-2xl font-bold text-white">
                            Welcome to the Admin Panel
                        </h2>

                        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-teal-50/90">
                            Manage products, industries, enquiries and career
                            applications from one central dashboard.
                        </p>
                    </div>

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                        <ArrowUpRight size={25} />
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-lg font-bold text-[#123B5D]">
                    Quick Actions
                </h2>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[
                        ["Products", "/products"],
                        ["Industries", "/industries"],
                        ["Enquiries", "/enquiries"],
                        ["Careers", "/careers"],
                    ].map(([label, href]) => (
                        <a
                            key={href}
                            href={href}
                            className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-teal-200 hover:text-[#0F766E] hover:shadow-md"
                        >
                            Manage {label}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}