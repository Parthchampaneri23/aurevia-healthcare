"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    Factory,
    MessageSquare,
    BriefcaseBusiness,
    Settings,
    LogOut,
    X,
    ChevronRight,
} from "lucide-react";

type SidebarProps = {
    mobileOpen?: boolean;
    onClose?: () => void;
};

const menuItems = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
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
        icon: MessageSquare,
    },
    {
        label: "Careers",
        href: "/careers",
        icon: BriefcaseBusiness,
    },
];

export default function Sidebar({
    mobileOpen = false,
    onClose,
}: SidebarProps) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem("aurevia_admin_token");
        localStorage.removeItem("aurevia_admin_user");

        onClose?.();
        router.replace("/login");
    };

    return (
        <>
            {/* ----------------------------------
                MOBILE OVERLAY
            ---------------------------------- */}
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-[2px] lg:hidden"
                />
            )}

            {/* ----------------------------------
                SIDEBAR
            ---------------------------------- */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-slate-200 bg-white shadow-xl shadow-slate-900/5 transition-transform duration-300 lg:translate-x-0 lg:shadow-none ${mobileOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }`}
            >
                {/* ----------------------------------
                    BRAND HEADER
                ---------------------------------- */}
                <div className="relative flex h-[82px] items-center justify-between border-b border-slate-100 px-5">
                    <Link
                        href="/dashboard"
                        onClick={onClose}
                        className="group flex items-center gap-3"
                    >
                        {/* Logo */}
                        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
                            <Image
                                src="/hero/logo.png"
                                alt="Aurevia Healthcare"
                                width={48}
                                height={48}
                                priority
                                className="h-full w-full object-contain p-1"
                            />
                        </div>

                        {/* Brand Name */}
                        <div className="leading-none">
                            <p className="text-[17px] font-bold tracking-tight text-[#123B5D]">
                                Aurevia
                            </p>

                            <p className="mt-1.5 text-[9px] font-bold uppercase tracking-[0.25em] text-[#0F766E]">
                                Healthcare
                            </p>

                            <p className="mt-1 text-[9px] font-medium text-slate-400">
                                Admin Portal
                            </p>
                        </div>
                    </Link>

                    {/* Mobile Close */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 lg:hidden"
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* ----------------------------------
                    NAVIGATION
                ---------------------------------- */}
                <nav className="flex-1 overflow-y-auto px-4 py-6">
                    <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        Management
                    </p>

                    <div className="space-y-1.5">
                        {menuItems.map((item) => {
                            const Icon = item.icon;

                            const isActive =
                                pathname === item.href ||
                                pathname.startsWith(`${item.href}/`);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={onClose}
                                    className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 ${isActive
                                            ? "bg-[#123B5D] text-white shadow-md shadow-[#123B5D]/15"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-[#123B5D]"
                                        }`}
                                >
                                    {/* Active indicator */}
                                    {isActive && (
                                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-teal-400" />
                                    )}

                                    <div
                                        className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${isActive
                                                ? "bg-white/10"
                                                : "bg-slate-50 group-hover:bg-teal-50"
                                            }`}
                                    >
                                        <Icon
                                            size={18}
                                            strokeWidth={2}
                                            className={
                                                isActive
                                                    ? "text-teal-200"
                                                    : "text-slate-400 group-hover:text-[#0F766E]"
                                            }
                                        />
                                    </div>

                                    <span className="flex-1">
                                        {item.label}
                                    </span>

                                    {isActive && (
                                        <ChevronRight
                                            size={15}
                                            className="text-white/60"
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* ----------------------------------
                        SYSTEM
                    ---------------------------------- */}
                    <div className="my-7 border-t border-slate-100" />

                    <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        System
                    </p>

                    <Link
                        href="/settings"
                        onClick={onClose}
                        className={`group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200 ${pathname === "/settings" ||
                                pathname.startsWith("/settings/")
                                ? "bg-[#123B5D] text-white shadow-md shadow-[#123B5D]/15"
                                : "text-slate-600 hover:bg-slate-50 hover:text-[#123B5D]"
                            }`}
                    >
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg ${pathname === "/settings" ||
                                    pathname.startsWith("/settings/")
                                    ? "bg-white/10"
                                    : "bg-slate-50 group-hover:bg-teal-50"
                                }`}
                        >
                            <Settings
                                size={18}
                                className={
                                    pathname === "/settings" ||
                                        pathname.startsWith("/settings/")
                                        ? "text-teal-200"
                                        : "text-slate-400 group-hover:text-[#0F766E]"
                                }
                            />
                        </div>

                        <span className="flex-1">Settings</span>

                        {(pathname === "/settings" ||
                            pathname.startsWith("/settings/")) && (
                                <ChevronRight
                                    size={15}
                                    className="text-white/60"
                                />
                            )}
                    </Link>
                </nav>

                {/* ----------------------------------
                    ADMIN PROFILE / LOGOUT
                ---------------------------------- */}
                <div className="border-t border-slate-100 p-4">
                    {/* Admin Info */}
                    <div className="mb-3 flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#123B5D] text-xs font-bold text-white">
                            AD
                        </div>

                        <div className="min-w-0">
                            <p className="truncate text-xs font-bold text-slate-800">
                                Administrator
                            </p>

                            <p className="mt-0.5 truncate text-[10px] text-slate-400">
                                Aurevia Healthcare
                            </p>
                        </div>

                        <span
                            className="ml-auto h-2 w-2 shrink-0 rounded-full bg-emerald-500"
                            title="Online"
                        />
                    </div>

                    {/* Logout */}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="group flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 transition-colors group-hover:bg-red-100">
                            <LogOut size={18} />
                        </div>

                        <span>Logout</span>
                    </button>

                    {/* Version */}
                    <p className="mt-4 text-center text-[9px] font-medium tracking-wide text-slate-300">
                        Aurevia Healthcare • Admin v1.0
                    </p>
                </div>
            </aside>
        </>
    );
}