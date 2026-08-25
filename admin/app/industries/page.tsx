"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
    Building2,
    RefreshCw,
    Search,
    Plus,
    Pencil,
    Trash2,
    X,
    Loader2,
    Package,
} from "lucide-react";

type Company = {
    name: string;
    description: string;
};

type Industry = {
    _id: string;
    slug: string;
    eyebrow: string;
    title: string;
    image?: string;
    description: string;
    overview: string;
    companies?: Company[];
    supportPoints?: string[];
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
};

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://aurevia-healthcare.onrender.com";

const emptyForm = {
    slug: "",
    eyebrow: "",
    title: "",
    image: "",
    description: "",
    overview: "",
    companies: "",
    supportPoints: "",
    isActive: true,
};

export default function IndustriesPage() {
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("All");

    const [modalOpen, setModalOpen] = useState(false);
    const [editingIndustry, setEditingIndustry] =
        useState<Industry | null>(null);

    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    // ======================================================
    // TOKEN
    // ======================================================

    const getToken = () => {
        if (typeof window === "undefined") {
            return "";
        }

        return localStorage.getItem("aurevia_admin_token") || "";
    };

    // ======================================================
    // FETCH INDUSTRIES
    // ======================================================

    const fetchIndustries = async () => {
        try {
            setLoading(true);
            setError("");

            const token = getToken();

            const response = await fetch(
                `${API_URL}/api/industries/admin`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                }
            );

            if (response.status === 401) {
                window.location.href = "/login";
                return;
            }

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch industries (${response.status})`
                );
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(
                    data.message ||
                    "Failed to fetch industries"
                );
            }

            setIndustries(data.industries || []);
        } catch (err) {
            console.error(
                "Industries fetch error:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to load industries."
            );
        } finally {
            setLoading(false);
        }
    };

    // ======================================================
    // INITIAL LOAD
    // ======================================================

    useEffect(() => {
        fetchIndustries();
    }, []);

    // ======================================================
    // IMAGE URL
    // ======================================================

    const getImageUrl = (image?: string) => {
        if (!image) {
            return "";
        }

        const cleanImage = image.trim();

        if (
            cleanImage.startsWith("http://") ||
            cleanImage.startsWith("https://")
        ) {
            return cleanImage;
        }

        const normalizedImage =
            cleanImage.replace(/^\/+/, "");

        if (
            normalizedImage.startsWith(
                "uploads/industries/"
            )
        ) {
            return `${API_URL}/${normalizedImage}`;
        }

        if (
            normalizedImage.startsWith(
                "industries/"
            )
        ) {
            return `${API_URL}/uploads/${normalizedImage}`;
        }

        return `${API_URL}/uploads/industries/${normalizedImage}`;
    };

    // ======================================================
    // COUNTS
    // ======================================================

    const activeIndustries = industries.filter(
        (industry) => industry.isActive
    ).length;

    const inactiveIndustries = industries.filter(
        (industry) => !industry.isActive
    ).length;

    // ======================================================
    // FILTER
    // ======================================================

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
    }, [industries, search, status]);

    // ======================================================
    // SLUG GENERATOR
    // ======================================================

    const generateSlug = (value: string) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    // ======================================================
    // OPEN ADD MODAL
    // ======================================================

    const openAddModal = () => {
        setEditingIndustry(null);
        setForm(emptyForm);
        setError("");
        setModalOpen(true);
    };

    // ======================================================
    // OPEN EDIT MODAL
    // ======================================================

    const openEditModal = (industry: Industry) => {
        setEditingIndustry(industry);

        const companies =
            industry.companies
                ?.map(
                    (company) =>
                        `${company.name}: ${company.description}`
                )
                .join("\n") || "";

        const supportPoints =
            industry.supportPoints?.join("\n") || "";

        setForm({
            slug: industry.slug || "",
            eyebrow: industry.eyebrow || "",
            title: industry.title || "",
            image: industry.image || "",
            description:
                industry.description || "",
            overview: industry.overview || "",
            companies,
            supportPoints,
            isActive: industry.isActive,
        });

        setError("");
        setModalOpen(true);
    };

    // ======================================================
    // CLOSE MODAL
    // ======================================================

    const closeModal = () => {
        if (saving) {
            return;
        }

        setModalOpen(false);
        setEditingIndustry(null);
        setForm(emptyForm);
    };

    // ======================================================
    // CREATE / UPDATE
    // ======================================================

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");

            const token = getToken();

            if (!token) {
                window.location.href = "/login";
                return;
            }

            // --------------------------------------------------
            // Companies
            // Format:
            // Company Name: Description
            // --------------------------------------------------

            const companies = form.companies
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => {
                    const separatorIndex =
                        line.indexOf(":");

                    if (separatorIndex === -1) {
                        return {
                            name: line,
                            description: "",
                        };
                    }

                    return {
                        name: line
                            .slice(
                                0,
                                separatorIndex
                            )
                            .trim(),

                        description: line
                            .slice(
                                separatorIndex + 1
                            )
                            .trim(),
                    };
                })
                .filter(
                    (company) =>
                        company.name &&
                        company.description
                );

            // --------------------------------------------------
            // Support Points
            // --------------------------------------------------

            const supportPoints =
                form.supportPoints
                    .split("\n")
                    .map((point) => point.trim())
                    .filter(Boolean);

            const payload = {
                slug: form.slug.trim(),
                eyebrow: form.eyebrow.trim(),
                title: form.title.trim(),
                image: form.image.trim(),
                description:
                    form.description.trim(),
                overview: form.overview.trim(),
                companies,
                supportPoints,
                isActive: form.isActive,
            };

            // --------------------------------------------------
            // URL
            // --------------------------------------------------

            const url = editingIndustry
                ? `${API_URL}/api/industries/${editingIndustry._id}`
                : `${API_URL}/api/industries`;

            const response = await fetch(url, {
                method: editingIndustry
                    ? "PUT"
                    : "POST",

                headers: {
                    "Content-Type":
                        "application/json",

                    Authorization: `Bearer ${token}`,
                },

                body: JSON.stringify(payload),
            });

            if (response.status === 401) {
                window.location.href = "/login";
                return;
            }

            const data = await response.json();

            if (
                !response.ok ||
                !data.success
            ) {
                throw new Error(
                    data.message ||
                    "Failed to save industry"
                );
            }

            closeModal();

            await fetchIndustries();
        } catch (err) {
            console.error(
                "Save industry error:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to save industry"
            );
        } finally {
            setSaving(false);
        }
    };

    // ======================================================
    // DELETE
    // ======================================================

    const handleDelete = async (
        industry: Industry
    ) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${industry.title}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            setError("");

            const token = getToken();

            if (!token) {
                window.location.href = "/login";
                return;
            }

            const response = await fetch(
                `${API_URL}/api/industries/${industry._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 401) {
                window.location.href = "/login";
                return;
            }

            const data = await response.json();

            if (
                !response.ok ||
                !data.success
            ) {
                throw new Error(
                    data.message ||
                    "Failed to delete industry"
                );
            }

            setIndustries((current) =>
                current.filter(
                    (item) =>
                        item._id !== industry._id
                )
            );
        } catch (err) {
            console.error(
                "Delete industry error:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to delete industry"
            );
        }
    };

    // ======================================================
    // RENDER
    // ======================================================

    return (
        <main className="min-h-screen bg-slate-50 p-6 lg:p-8">

            {/* ==================================================
                HEADER
            ================================================== */}

            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
                        Management
                    </p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Industries
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Manage industries served by
                        Aurevia Healthcare.
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        type="button"
                        onClick={fetchIndustries}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
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

                    <button
                        type="button"
                        onClick={openAddModal}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123B5D] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0d304b] hover:shadow-md"
                    >
                        <Plus size={18} />

                        Add Industry
                    </button>
                </div>
            </div>

            {/* ==================================================
                SUMMARY
            ================================================== */}

            <div className="mt-8 grid gap-4 sm:grid-cols-3">

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
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Active Industries
                    </p>

                    <p className="mt-2 text-3xl font-bold text-emerald-600">
                        {activeIndustries}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Inactive Industries
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-500">
                        {inactiveIndustries}
                    </p>
                </div>
            </div>

            {/* ==================================================
                FILTERS
            ================================================== */}

            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

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
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-black outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                        />
                    </div>

                    <select
                        value={status}
                        onChange={(event) =>
                            setStatus(
                                event.target.value
                            )
                        }
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-black outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
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

            {/* ==================================================
                ERROR
            ================================================== */}

            {error && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                    <p className="text-sm font-semibold text-red-700">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={() =>
                            setError("")
                        }
                        className="mt-3 text-sm font-semibold text-red-700 underline underline-offset-2"
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {/* ==================================================
                TABLE
            ================================================== */}

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

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
                ) : filteredIndustries.length ===
                    0 ? (
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
                                Try changing your
                                search or filter.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1050px] text-left">

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

                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Actions
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

                                                {/* Actions */}
                                                <td className="px-6 py-5">
                                                    <div className="flex justify-end gap-2">

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openEditModal(
                                                                    industry
                                                                )
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                                                            title="Edit industry"
                                                        >
                                                            <Pencil
                                                                size={
                                                                    16
                                                                }
                                                            />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    industry
                                                                )
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                            title="Delete industry"
                                                        >
                                                            <Trash2
                                                                size={
                                                                    16
                                                                }
                                                            />
                                                        </button>

                                                    </div>
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

            {/* ==================================================
                ADD / EDIT MODAL
            ================================================== */}

            {modalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">

                    <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    {editingIndustry
                                        ? "Edit Industry"
                                        : "Add Industry"}
                                </h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    {editingIndustry
                                        ? "Update industry information"
                                        : "Add a new industry to the catalogue"}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                disabled={saving}
                                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={
                                handleSubmit
                            }
                            className="overflow-y-auto"
                        >

                            <div className="grid gap-5 p-6 sm:grid-cols-2">

                                {/* Title */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700">
                                        Industry Title *
                                    </label>

                                    <input
                                        required
                                        value={
                                            form.title
                                        }
                                        onChange={(
                                            event
                                        ) => {
                                            const value =
                                                event
                                                    .target
                                                    .value;

                                            setForm(
                                                (
                                                    current
                                                ) => ({
                                                    ...current,
                                                    title: value,
                                                    slug: editingIndustry
                                                        ? current.slug
                                                        : generateSlug(
                                                            value
                                                        ),
                                                })
                                            );
                                        }}
                                        placeholder="e.g. Pharmaceutical"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                                    />
                                </div>

                                {/* Slug */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700">
                                        Slug *
                                    </label>

                                    <input
                                        required
                                        value={
                                            form.slug
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setForm(
                                                (
                                                    current
                                                ) => ({
                                                    ...current,
                                                    slug: generateSlug(
                                                        event
                                                            .target
                                                            .value
                                                    ),
                                                })
                                            )
                                        }
                                        placeholder="pharmaceutical"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                                    />
                                </div>

                                {/* Eyebrow */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700">
                                        Eyebrow *
                                    </label>

                                    <input
                                        required
                                        value={
                                            form.eyebrow
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setForm(
                                                (
                                                    current
                                                ) => ({
                                                    ...current,
                                                    eyebrow:
                                                        event
                                                            .target
                                                            .value,
                                                })
                                            )
                                        }
                                        placeholder="Industries We Serve"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700">
                                        Status
                                    </label>

                                    <select
                                        value={
                                            form.isActive
                                                ? "active"
                                                : "inactive"
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setForm(
                                                (
                                                    current
                                                ) => ({
                                                    ...current,
                                                    isActive:
                                                        event
                                                            .target
                                                            .value ===
                                                        "active",
                                                })
                                            )
                                        }
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-black outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                                    >
                                        <option value="active">
                                            Active
                                        </option>

                                        <option value="inactive">
                                            Inactive
                                        </option>
                                    </select>
                                </div>

                                {/* Image */}
                                <div className="sm:col-span-2">
                                    <label className="text-sm font-semibold text-slate-700">
                                        Image Path / URL
                                    </label>

                                    <input
                                        value={
                                            form.image
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setForm(
                                                (
                                                    current
                                                ) => ({
                                                    ...current,
                                                    image:
                                                        event
                                                            .target
                                                            .value,
                                                })
                                            )
                                        }
                                        placeholder="uploads/industries/pharma.jpg"
                                        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                                    />

                                    <p className="mt-1 text-[11px] text-slate-400">
                                        Enter an existing image
                                        path or complete image
                                        URL.
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="sm:col-span-2">
                                    <label className="text-sm font-semibold text-slate-700">
                                        Description *
                                    </label>

                                    <textarea
                                        required
                                        rows={4}
                                        value={
                                            form.description
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setForm(
                                                (
                                                    current
                                                ) => ({
                                                    ...current,
                                                    description:
                                                        event
                                                            .target
                                                            .value,
                                                })
                                            )
                                        }
                                        placeholder="Short description of this industry..."
                                        className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                                    />
                                </div>

                                {/* Overview */}
                                <div className="sm:col-span-2">
                                    <label className="text-sm font-semibold text-slate-700">
                                        Overview *
                                    </label>

                                    <textarea
                                        required
                                        rows={6}
                                        value={
                                            form.overview
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setForm(
                                                (
                                                    current
                                                ) => ({
                                                    ...current,
                                                    overview:
                                                        event
                                                            .target
                                                            .value,
                                                })
                                            )
                                        }
                                        placeholder="Detailed overview of Aurevia Healthcare's capabilities in this industry..."
                                        className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                                    />
                                </div>

                                {/* Companies */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700">
                                        Companies
                                    </label>

                                    <textarea
                                        rows={7}
                                        value={
                                            form.companies
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setForm(
                                                (
                                                    current
                                                ) => ({
                                                    ...current,
                                                    companies:
                                                        event
                                                            .target
                                                            .value,
                                                })
                                            )
                                        }
                                        placeholder={
                                            "Company Name: Company description\nAnother Company: Company description"
                                        }
                                        className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                                    />

                                    <p className="mt-1 text-[11px] text-slate-400">
                                        Format: Company Name:
                                        Description. One per
                                        line.
                                    </p>
                                </div>

                                {/* Support Points */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-700">
                                        Support Points
                                    </label>

                                    <textarea
                                        rows={7}
                                        value={
                                            form.supportPoints
                                        }
                                        onChange={(
                                            event
                                        ) =>
                                            setForm(
                                                (
                                                    current
                                                ) => ({
                                                    ...current,
                                                    supportPoints:
                                                        event
                                                            .target
                                                            .value,
                                                })
                                            )
                                        }
                                        placeholder={
                                            "Flexible manufacturing\nQuality assurance\nRegulatory support\nScalable production"
                                        }
                                        className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-black outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                                    />

                                    <p className="mt-1 text-[11px] text-slate-400">
                                        Enter one support point
                                        per line.
                                    </p>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={saving}
                                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123B5D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0d304b] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2
                                                size={
                                                    17
                                                }
                                                className="animate-spin"
                                            />

                                            Saving...
                                        </>
                                    ) : editingIndustry ? (
                                        <>
                                            <Pencil
                                                size={
                                                    17
                                                }
                                            />

                                            Update Industry
                                        </>
                                    ) : (
                                        <>
                                            <Plus
                                                size={
                                                    17
                                                }
                                            />

                                            Create Industry
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}