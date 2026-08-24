"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Building2,
    RefreshCw,
    Search,
    Package,
} from "lucide-react";

type Industry = {
    _id: string;
    slug: string;
    eyebrow?: string;
    title: string;
    image?: string;
    description?: string;
    overview?: string;
    companies?: {
        name: string;
        description: string;
    }[];
    supportPoints?: string[];
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
};

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://aurevia-healthcare.onrender.com";

export default function IndustriesPage() {
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    /* ----------------------------------
       Fetch Industries
    ---------------------------------- */

    const fetchIndustries = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/industries`,
                {
                    cache: "no-store",
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch industries: ${response.status}`
                );
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(
                    data.message || "Failed to fetch industries"
                );
            }

            setIndustries(data.industries || []);
        } catch (error) {
            console.error(
                "Industries fetch error:",
                error
            );

            setError(
                "Unable to load industries. Please check that the backend is running."
            );
        } finally {
            setLoading(false);
        }
    };

    /* ----------------------------------
       Initial Load
    ---------------------------------- */

    useEffect(() => {
        fetchIndustries();
    }, []);

    /* ----------------------------------
       Image URL Helper
    ---------------------------------- */

    const getImageUrl = (image?: string) => {
        if (!image) {
            return "";
        }

        const cleanImage = image.trim();

        // Already a complete URL
        if (
            cleanImage.startsWith("http://") ||
            cleanImage.startsWith("https://")
        ) {
            return cleanImage;
        }

        // Remove all leading slashes
        const normalizedImage =
            cleanImage.replace(/^\/+/, "");

        /*
         * Database:
         *
         * /uploads/industries/industry1.jpg
         *
         * Result:
         *
         * https://aurevia-healthcare.onrender.com/uploads/industries/industry1.jpg
         */
        if (
            normalizedImage.startsWith(
                "uploads/industries/"
            )
        ) {
            return `${API_URL}/${normalizedImage}`;
        }

        /*
         * Database:
         *
         * /industries/industry1.jpg
         *
         * Result:
         *
         * https://aurevia-healthcare.onrender.com/uploads/industries/industry1.jpg
         */
        if (
            normalizedImage.startsWith(
                "industries/"
            )
        ) {
            return `${API_URL}/uploads/${normalizedImage}`;
        }

        /*
         * Database:
         *
         * industry1.jpg
         *
         * Result:
         *
         * https://aurevia-healthcare.onrender.com/uploads/industries/industry1.jpg
         */
        return `${API_URL}/uploads/industries/${normalizedImage}`;
    };

    /* ----------------------------------
       Active / Inactive Counts
    ---------------------------------- */

    const activeIndustries = industries.filter(
        (industry) => industry.isActive
    ).length;

    const inactiveIndustries = industries.filter(
        (industry) => !industry.isActive
    ).length;

    /* ----------------------------------
       Search + Status Filter
    ---------------------------------- */

    const filteredIndustries = useMemo(() => {
        const searchTerm = search
            .toLowerCase()
            .trim();

        return industries.filter((industry) => {
            const matchesSearch =
                industry.title
                    ?.toLowerCase()
                    .includes(searchTerm) ||
                industry.slug
                    ?.toLowerCase()
                    .includes(searchTerm) ||
                industry.eyebrow
                    ?.toLowerCase()
                    .includes(searchTerm) ||
                industry.description
                    ?.toLowerCase()
                    .includes(searchTerm);

            const matchesStatus =
                status === "All" ||
                (status === "Active" &&
                    industry.isActive) ||
                (status === "Inactive" &&
                    !industry.isActive);

            return (
                matchesSearch &&
                matchesStatus
            );
        });
    }, [
        industries,
        search,
        status,
    ]);

    /* ----------------------------------
       Render
    ---------------------------------- */

    return (
        <main className="min-h-screen bg-slate-50 p-6 lg:p-8">

            {/* Header */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
                        Management
                    </p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Industries
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        View industries served by Aurevia Healthcare.
                    </p>
                </div>

                {/* Refresh */}
                <button
                    type="button"
                    onClick={fetchIndustries}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <RefreshCw
                        size={17}
                        className={
                            loading
                                ? "animate-spin"
                                : ""
                        }
                    />

                    Refresh
                </button>
            </div>

            {/* Summary Cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">

                {/* Total */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Total Industries
                            </p>

                            <p className="mt-2 text-3xl font-bold text-slate-900">
                                {industries.length}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                            <Building2 size={21} />
                        </div>
                    </div>

                    <p className="mt-4 text-xs text-slate-400">
                        Industries in catalogue
                    </p>
                </div>

                {/* Active */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Active Industries
                    </p>

                    <p className="mt-2 text-3xl font-bold text-emerald-600">
                        {activeIndustries}
                    </p>

                    <p className="mt-4 text-xs text-slate-400">
                        Currently active
                    </p>
                </div>

                {/* Inactive */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Inactive Industries
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-500">
                        {inactiveIndustries}
                    </p>

                    <p className="mt-4 text-xs text-slate-400">
                        Currently inactive
                    </p>
                </div>
            </div>

            {/* Filters */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

                    {/* Search */}
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(
                                    event.target.value
                                )
                            }
                            placeholder="Search industries..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                        />
                    </div>

                    {/* Status */}
                    <select
                        value={status}
                        onChange={(event) =>
                            setStatus(
                                event.target.value
                            )
                        }
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                    >
                        <option value="All">
                            All Status
                        </option>

                        <option value="Active">
                            Active
                        </option>

                        <option value="Inactive">
                            Inactive
                        </option>
                    </select>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                    <p className="text-sm font-semibold text-red-700">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={fetchIndustries}
                        className="mt-3 text-sm font-semibold text-red-700 underline underline-offset-2"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Industry Catalogue */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                {/* Catalogue Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Industry Catalogue
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Showing{" "}
                            {filteredIndustries.length}{" "}
                            of{" "}
                            {industries.length}{" "}
                            industries
                        </p>
                    </div>
                </div>

                {/* Loading */}
                {loading ? (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <div className="text-center">
                            <RefreshCw
                                size={28}
                                className="mx-auto animate-spin text-teal-600"
                            />

                            <p className="mt-3 text-sm text-slate-500">
                                Loading industries...
                            </p>
                        </div>
                    </div>
                ) : filteredIndustries.length === 0 ? (
                    /* Empty */
                    <div className="flex min-h-[300px] items-center justify-center px-6">
                        <div className="text-center">
                            <Package
                                size={40}
                                className="mx-auto text-slate-300"
                            />

                            <h3 className="mt-4 text-base font-semibold text-slate-700">
                                No industries found
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                                Try changing your search or filter.
                            </p>
                        </div>
                    </div>
                ) : (
                    /* Table */
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[950px] text-left">

                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/70">

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Industry
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Slug
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Description
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Status
                                    </th>

                                </tr>
                            </thead>

                            <tbody>
                                {filteredIndustries.map(
                                    (industry) => {
                                        const imageUrl =
                                            getImageUrl(
                                                industry.image
                                            );

                                        return (
                                            <tr
                                                key={
                                                    industry._id
                                                }
                                                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                                            >

                                                {/* Industry */}
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-4">

                                                        {/* Image */}
                                                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

                                                            {imageUrl ? (
                                                                <img
                                                                    src={
                                                                        imageUrl
                                                                    }
                                                                    alt={
                                                                        industry.title
                                                                    }
                                                                    className="h-full w-full object-cover"
                                                                    loading="lazy"
                                                                    onError={(
                                                                        event
                                                                    ) => {
                                                                        console.error(
                                                                            "Industry image failed:",
                                                                            imageUrl
                                                                        );

                                                                        event.currentTarget.style.display =
                                                                            "none";
                                                                    }}
                                                                />
                                                            ) : (
                                                                <Building2
                                                                    size={
                                                                        22
                                                                    }
                                                                    className="text-slate-300"
                                                                />
                                                            )}

                                                        </div>

                                                        {/* Details */}
                                                        <div className="min-w-0">

                                                            <p className="text-sm font-bold text-slate-800">
                                                                {
                                                                    industry.title
                                                                }
                                                            </p>

                                                            {industry.eyebrow && (
                                                                <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-teal-600">
                                                                    {
                                                                        industry.eyebrow
                                                                    }
                                                                </p>
                                                            )}

                                                            <p className="mt-1 max-w-md truncate text-xs text-slate-400">
                                                                {
                                                                    industry.description ||
                                                                    "No description available."
                                                                }
                                                            </p>

                                                        </div>

                                                    </div>
                                                </td>

                                                {/* Slug */}
                                                <td className="px-6 py-5">
                                                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                                                        {
                                                            industry.slug
                                                        }
                                                    </span>
                                                </td>

                                                {/* Description */}
                                                <td className="max-w-lg px-6 py-5">
                                                    <p className="line-clamp-3 text-sm leading-relaxed text-slate-500">
                                                        {
                                                            industry.overview ||
                                                            industry.description ||
                                                            "No description available."
                                                        }
                                                    </p>
                                                </td>

                                                {/* Status */}
                                                <td className="px-6 py-5">

                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${industry.isActive
                                                                ? "bg-emerald-50 text-emerald-700"
                                                                : "bg-slate-100 text-slate-500"
                                                            }`}
                                                    >

                                                        <span
                                                            className={`h-1.5 w-1.5 rounded-full ${industry.isActive
                                                                    ? "bg-emerald-500"
                                                                    : "bg-slate-400"
                                                                }`}
                                                        />

                                                        {industry.isActive
                                                            ? "Active"
                                                            : "Inactive"}

                                                    </span>

                                                </td>

                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>

                        </table>
                    </div>
                )}
            </div>

            {/* Read-only Notice */}
            {!loading &&
                industries.length > 0 && (
                    <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3">

                        <Building2
                            size={15}
                            className="text-slate-400"
                        />

                        <p className="text-xs text-slate-400">
                            Industry information is loaded
                            directly from the Aurevia Healthcare
                            database. This panel is view-only.
                        </p>

                    </div>
                )}
        </main>
    );
}