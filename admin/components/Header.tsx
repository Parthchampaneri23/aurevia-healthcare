"use client";

import { Bell, Menu, Search } from "lucide-react";

type HeaderProps = {
    onMenuClick?: () => void;
};

export default function Header({ onMenuClick }: HeaderProps) {
    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="rounded-xl p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
                    aria-label="Open menu"
                >
                    <Menu size={22} />
                </button>

                <div>
                    <h1 className="text-lg font-bold text-slate-900">
                        Admin Panel
                    </h1>

                    <p className="hidden text-xs text-slate-500 sm:block">
                        Manage your Aurevia Healthcare website
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
                <div className="hidden items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 md:flex">
                    <Search size={17} className="text-slate-400" />

                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-40 bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />
                </div>

                <button
                    type="button"
                    className="relative rounded-xl p-2.5 text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#123B5D]"
                    aria-label="Notifications"
                >
                    <Bell size={20} />

                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#0F766E]" />
                </button>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123B5D] text-sm font-bold text-white">
                    A
                </div>
            </div>
        </header>
    );
}