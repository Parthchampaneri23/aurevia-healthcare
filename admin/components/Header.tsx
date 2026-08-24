"use client";

import { useEffect, useState } from "react";
import { Bell, Menu, Search, ShieldCheck } from "lucide-react";

type HeaderProps = {
    onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
    const [username, setUsername] = useState("admin@aurevia");

    useEffect(() => {
        const storedUser = localStorage.getItem("aurevia_admin_user");

        if (storedUser) {
            try {
                const user = JSON.parse(storedUser);

                if (user?.username) {
                    setUsername(user.username);
                }
            } catch {
                setUsername("admin@aurevia");
            }
        }
    }, []);

    return (
        <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-slate-200 bg-white/95 px-4 shadow-sm shadow-slate-900/[0.02] backdrop-blur-md sm:px-6 lg:px-8">
            {/* ----------------------------------
                LEFT SIDE
            ---------------------------------- */}
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                {/* Mobile Menu */}
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-all hover:bg-slate-50 hover:text-[#123B5D] lg:hidden"
                    aria-label="Open menu"
                >
                    <Menu size={20} />
                </button>

                {/* Page Information */}
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <h1 className="truncate text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                            Admin Panel
                        </h1>

                        <span className="hidden rounded-full bg-teal-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-teal-700 sm:inline-flex">
                            Secure
                        </span>
                    </div>

                    <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                        Manage your Aurevia Healthcare website
                    </p>
                </div>
            </div>

            {/* ----------------------------------
                RIGHT SIDE
            ---------------------------------- */}
            <div className="flex items-center gap-2 sm:gap-3">
                {/* Search */}
                <div className="hidden h-10 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition-all focus-within:border-teal-300 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-50 md:flex">
                    <Search
                        size={16}
                        className="shrink-0 text-slate-400"
                    />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-32 bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 lg:w-44"
                    />

                    <span className="hidden rounded-md border border-slate-200 bg-white px-1.5 py-0.5 text-[9px] font-semibold text-slate-400 lg:inline-block">
                        /
                    </span>
                </div>

                {/* Notifications */}
                <button
                    type="button"
                    className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-transparent text-slate-500 transition-all hover:border-slate-200 hover:bg-slate-50 hover:text-[#123B5D]"
                    aria-label="Notifications"
                >
                    <Bell size={19} />

                    {/* Notification indicator */}
                    <span className="absolute right-[9px] top-[8px] h-2 w-2 rounded-full border-2 border-white bg-teal-600" />
                </button>

                {/* Divider */}
                <div className="hidden h-8 w-px bg-slate-200 sm:block" />

                {/* Admin Profile */}
                <div className="flex items-center gap-2.5">
                    <div className="hidden text-right sm:block">
                        <p className="max-w-[150px] truncate text-xs font-bold text-slate-800">
                            {username}
                        </p>

                        <div className="mt-0.5 flex items-center justify-end gap-1">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                            <span className="text-[10px] font-medium text-slate-400">
                                Administrator
                            </span>
                        </div>
                    </div>

                    <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[#123B5D] text-sm font-bold text-white shadow-sm shadow-[#123B5D]/20">
                        A

                        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500" />
                    </div>
                </div>
            </div>
        </header>
    );
}
