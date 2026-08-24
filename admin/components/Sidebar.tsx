"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    Factory,
    MessageSquare,
    BriefcaseBusiness,
    Settings,
    LogOut,
    X,
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

    return (
        <>
            {/* Mobile Overlay */}
            {mobileOpen && (
                <button
                    type="button"
                    aria-label="Close sidebar"
                    onClick={onClose}
                    className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
                />
            )}

            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Logo */}
                <div className="flex h-20 items-center justify-between border-b border-slate-200 px-6">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-3"
                        onClick={onClose}
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123B5D] text-sm font-bold text-white">
                            AH
                        </div>

                        <div>
                            <p className="text-base font-bold text-[#123B5D]">
                                Aurevia
                            </p>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
                                Healthcare
                            </p>
                        </div>
                    </Link>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 space-y-1 px-4 py-6">
                    <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        Management
                    </p>

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
                                className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all ${isActive
                                        ? "bg-[#123B5D] text-white shadow-sm"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-[#123B5D]"
                                    }`}
                            >
                                <Icon
                                    size={19}
                                    className={
                                        isActive
                                            ? "text-teal-200"
                                            : "text-slate-400 group-hover:text-[#0F766E]"
                                    }
                                />

                                <span>{item.label}</span>
                            </Link>
                        );
                    })}

                    <div className="my-6 border-t border-slate-100" />

                    <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                        System
                    </p>

                    <Link
                        href="/settings"
                        onClick={onClose}
                        className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-all ${pathname.startsWith("/settings")
                                ? "bg-[#123B5D] text-white"
                                : "text-slate-600 hover:bg-slate-100 hover:text-[#123B5D]"
                            }`}
                    >
                        <Settings
                            size={19}
                            className="text-slate-400 group-hover:text-[#0F766E]"
                        />

                        <span>Settings</span>
                    </Link>
                </nav>

                {/* Bottom */}
                <div className="border-t border-slate-200 p-4">
                    <div className="mb-3 rounded-xl bg-slate-50 p-3">
                        <p className="text-xs font-bold text-slate-700">
                            Admin Panel
                        </p>

                        <p className="mt-1 text-[11px] text-slate-500">
                            Aurevia Healthcare
                        </p>
                    </div>

                    <button
                        type="button"
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
                    >
                        <LogOut size={19} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}