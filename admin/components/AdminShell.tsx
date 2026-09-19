"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function AdminRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#f6f8fb]">
            <Sidebar
                mobileOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
            />

            <div className="lg:pl-[270px]">
                <Header onMenuClick={() => setMobileOpen(true)} />
                <main className="p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
