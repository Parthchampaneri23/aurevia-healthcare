"use client";

import { useEffect, useState } from "react";
import {
    Package,
    Factory,
    Mail,
    BriefcaseBusiness,
    ArrowUpRight,
    RefreshCw,
} from "lucide-react";
import StatCard from "@/components/StatCard";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://aurevia-healthcare.onrender.com";

type ProductResponse = {
    success: boolean;
    count: number;
    products: unknown[];
};

export default function DashboardPage() {
    const [productCount, setProductCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/products/admin`,
                {
                    method: "GET",
                    cache: "no-store",
                }
            );

            if (!response.ok) {
                throw new Error("Failed to fetch dashboard data");
            }

            const data: ProductResponse = await response.json();

            if (data.success) {
                setProductCount(data.count || data.products?.length || 0);
            }
        } catch (error) {
            console.error(
                "Dashboard data fetch error:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    return (
        <div className="space-y-8">

            {/* ======================================================
                PAGE HEADER
            ====================================================== */}
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                <div>
                    <p className="text-sm font-semibold text-[#0F766E]">
                        Overview
                    </p>

                    <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-[#123B5D]">
                        Dashboard
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Manage Aurevia Healthcare website content and
                        enquiries.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={fetchDashboardData}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
                >
                    <RefreshCw
                        size={16}
                        className={loading ? "animate-spin" : ""}
                    />

                    Refresh
                </button>
            </div>

            {/* ======================================================
                STATS
            ====================================================== */}
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Products"
                    value={loading ? "..." : String(productCount)}
                    description="Total products"
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

            {/* ======================================================
                WELCOME CARD
            ====================================================== */}
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
                            Manage products, industries, enquiries and
                            career applications from one central dashboard.
                        </p>
                    </div>

                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white">
                        <ArrowUpRight size={25} />
                    </div>

                </div>
            </div>

            {/* ======================================================
                QUICK ACTIONS
            ====================================================== */}
            <div>
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-[#123B5D]">
                            Quick Actions
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Quickly access different sections of the
                            admin panel.
                        </p>
                    </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                    {[
                        {
                            label: "Products",
                            href: "/products",
                            icon: Package,
                        },
                        {
                            label: "Industries",
                            href: "/industries",
                            icon: Factory,
                        },
                        {
                            label: "Enquiries",
                            href: "/enquiries",
                            icon: Mail,
                        },
                        {
                            label: "Careers",
                            href: "/careers",
                            icon: BriefcaseBusiness,
                        },
                    ].map(
                        ({
                            label,
                            href,
                            icon: Icon,
                        }) => (
                            <a
                                key={href}
                                href={href}
                                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-teal-200 hover:shadow-md"
                            >
                                <div className="flex items-center justify-between">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E] transition-colors group-hover:bg-teal-100">
                                        <Icon size={19} />
                                    </div>

                                    <ArrowUpRight
                                        size={17}
                                        className="text-slate-300 transition-colors group-hover:text-[#0F766E]"
                                    />

                                </div>

                                <p className="mt-4 text-sm font-bold text-slate-700 group-hover:text-[#0F766E]">
                                    Manage {label}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    View {label.toLowerCase()} information
                                </p>
                            </a>
                        )
                    )}

                </div>
            </div>

            {/* ======================================================
                CURRENT STATUS
            ====================================================== */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-bold text-[#123B5D]">
                            System Status
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Current admin panel data status.
                        </p>
                    </div>

                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        Connected
                    </span>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-3">

                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-medium text-slate-400">
                            Product API
                        </p>

                        <p className="mt-1 text-sm font-bold text-emerald-600">
                            Connected
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-medium text-slate-400">
                            Database
                        </p>

                        <p className="mt-1 text-sm font-bold text-emerald-600">
                            Connected
                        </p>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                        <p className="text-xs font-medium text-slate-400">
                            Products
                        </p>

                        <p className="mt-1 text-sm font-bold text-slate-700">
                            {loading
                                ? "Loading..."
                                : `${productCount} available`}
                        </p>
                    </div>

                </div>
            </div>

        </div>
    );
}