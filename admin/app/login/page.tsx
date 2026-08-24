"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { LockKeyhole, User, Loader2, ShieldCheck } from "lucide-react";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://aurevia-healthcare.onrender.com";

export default function LoginPage() {
    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");

        if (!username.trim() || !password.trim()) {
            setError("Username and password are required.");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username.trim(),
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message || "Invalid username or password"
                );
            }

            localStorage.setItem("aurevia_admin_token", data.token);

            localStorage.setItem(
                "aurevia_admin_user",
                JSON.stringify(data.admin)
            );

            router.push("/dashboard");
        } catch (error) {
            console.error("Login error:", error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Login failed. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f8fa] px-5 py-10">

            {/* Background Decoration */}
            <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#123B5D]/5 blur-3xl" />
            <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#0F766E]/5 blur-3xl" />

            <div className="relative z-10 w-full max-w-[440px]">

                {/* Brand */}
                <div className="mb-8 text-center">

                    <div className="mx-auto mb-5 flex h-20 items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="Aurevia Healthcare"
                            width={230}
                            height={80}
                            priority
                            className="h-auto max-h-20 w-auto object-contain"
                        />
                    </div>

                    <h1 className="text-2xl font-bold tracking-tight text-[#123B5D]">
                        Admin Portal
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Secure administration for Aurevia Healthcare
                    </p>
                </div>

                {/* Login Card */}
                <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-[0_20px_60px_rgba(18,59,93,0.10)] sm:p-9">

                    {/* Card Header */}
                    <div className="mb-7">

                        <div className="flex items-center gap-3">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#123B5D] text-white shadow-sm">
                                <LockKeyhole size={20} />
                            </div>

                            <div>
                                <h2 className="text-lg font-bold text-slate-900">
                                    Welcome back
                                </h2>

                                <p className="text-xs text-slate-500">
                                    Sign in to continue
                                </p>
                            </div>

                        </div>

                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">

                        {/* Username */}
                        <div>

                            <label
                                htmlFor="username"
                                className="text-sm font-semibold text-slate-700"
                            >
                                Username
                            </label>

                            <div className="relative mt-2">

                                <User
                                    size={18}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="username"
                                    type="text"
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    placeholder="admin@aurevia"
                                    autoComplete="username"
                                    disabled={loading}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0F766E] focus:bg-white focus:ring-4 focus:ring-[#0F766E]/10 disabled:cursor-not-allowed disabled:opacity-60"
                                />

                            </div>

                        </div>

                        {/* Password */}
                        <div>

                            <label
                                htmlFor="password"
                                className="text-sm font-semibold text-slate-700"
                            >
                                Password
                            </label>

                            <div className="relative mt-2">

                                <LockKeyhole
                                    size={18}
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    disabled={loading}
                                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0F766E] focus:bg-white focus:ring-4 focus:ring-[#0F766E]/10 disabled:cursor-not-allowed disabled:opacity-60"
                                />

                            </div>

                        </div>

                        {/* Error */}
                        {error && (
                            <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">

                                <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                                <p className="text-sm font-medium text-red-600">
                                    {error}
                                </p>

                            </div>
                        )}

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#123B5D] px-5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-[#0d2d46] hover:shadow-md active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? (
                                <>
                                    <Loader2
                                        size={18}
                                        className="animate-spin"
                                    />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in to Admin Portal
                                </>
                            )}
                        </button>

                    </form>

                    {/* Security Notice */}
                    <div className="mt-7 border-t border-slate-100 pt-6">

                        <div className="flex items-center gap-3">

                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                <ShieldCheck size={18} />
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-slate-700">
                                    Secure Admin Access
                                </p>

                                <p className="mt-0.5 text-[11px] leading-4 text-slate-400">
                                    Authorized personnel only
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Footer */}
                <div className="mt-7 text-center">

                    <p className="text-xs font-medium text-slate-400">
                        © {new Date().getFullYear()} Aurevia Healthcare
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">
                        Admin Management Portal
                    </p>

                </div>

            </div>
        </main>
    );
}