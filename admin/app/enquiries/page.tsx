"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Mail,
    Phone,
    Building2,
    MessageSquare,
    RefreshCw,
    Search,
    Eye,
    Trash2,
    X,
    CheckCircle2,
    Clock3,
    AlertCircle,
} from "lucide-react";

type EnquiryStatus = "new" | "contacted" | "resolved";

type Enquiry = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    subject?: string;
    message: string;
    status: EnquiryStatus;
    createdAt: string;
    updatedAt: string;
};

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://aurevia-healthcare.onrender.com";

const statusOptions: {
    value: "All" | EnquiryStatus;
    label: string;
}[] = [
        { value: "All", label: "All Status" },
        { value: "new", label: "New" },
        { value: "contacted", label: "Contacted" },
        { value: "resolved", label: "Resolved" },
    ];

const formatStatus = (status: EnquiryStatus) => {
    switch (status) {
        case "new":
            return "New";
        case "contacted":
            return "Contacted";
        case "resolved":
            return "Resolved";
        default:
            return status;
    }
};

const getStatusClasses = (status: EnquiryStatus) => {
    switch (status) {
        case "new":
            return "bg-blue-50 text-blue-700";

        case "contacted":
            return "bg-amber-50 text-amber-700";

        case "resolved":
            return "bg-emerald-50 text-emerald-700";

        default:
            return "bg-slate-100 text-slate-600";
    }
};

const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

const formatDateTime = (date: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

export default function EnquiriesPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<
        "All" | EnquiryStatus
    >("All");

    const [selectedEnquiry, setSelectedEnquiry] =
        useState<Enquiry | null>(null);

    const [updatingId, setUpdatingId] = useState<string | null>(
        null
    );

    const [deletingId, setDeletingId] = useState<string | null>(
        null
    );

    /* ----------------------------------
       Fetch Enquiries
    ---------------------------------- */

    const fetchEnquiries = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/enquiries`,
                {
                    cache: "no-store",
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch enquiries: ${response.status}`
                );
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(
                    data.message || "Failed to fetch enquiries"
                );
            }

            setEnquiries(data.enquiries || []);
        } catch (error) {
            console.error("Enquiries fetch error:", error);

            setError(
                "Unable to load enquiries. Please check that the backend is running."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    /* ----------------------------------
       Update Status
    ---------------------------------- */

    const updateStatus = async (
        enquiryId: string,
        status: EnquiryStatus
    ) => {
        try {
            setUpdatingId(enquiryId);

            const response = await fetch(
                `${API_URL}/api/enquiries/${enquiryId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                    "Failed to update enquiry status"
                );
            }

            setEnquiries((current) =>
                current.map((enquiry) =>
                    enquiry._id === enquiryId
                        ? {
                            ...enquiry,
                            status: data.enquiry.status,
                            updatedAt:
                                data.enquiry.updatedAt,
                        }
                        : enquiry
                )
            );

            setSelectedEnquiry((current) =>
                current?._id === enquiryId
                    ? {
                        ...current,
                        status: data.enquiry.status,
                        updatedAt:
                            data.enquiry.updatedAt,
                    }
                    : current
            );
        } catch (error) {
            console.error(
                "Update enquiry status error:",
                error
            );

            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to update status"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    /* ----------------------------------
       Delete Enquiry
    ---------------------------------- */

    const deleteEnquiry = async (enquiryId: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this enquiry? This action cannot be undone."
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(enquiryId);

            const response = await fetch(
                `${API_URL}/api/enquiries/${enquiryId}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                    "Failed to delete enquiry"
                );
            }

            setEnquiries((current) =>
                current.filter(
                    (enquiry) =>
                        enquiry._id !== enquiryId
                )
            );

            if (
                selectedEnquiry?._id ===
                enquiryId
            ) {
                setSelectedEnquiry(null);
            }
        } catch (error) {
            console.error(
                "Delete enquiry error:",
                error
            );

            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to delete enquiry"
            );
        } finally {
            setDeletingId(null);
        }
    };

    /* ----------------------------------
       Statistics
    ---------------------------------- */

    const totalEnquiries = enquiries.length;

    const newEnquiries = enquiries.filter(
        (enquiry) => enquiry.status === "new"
    ).length;

    const contactedEnquiries = enquiries.filter(
        (enquiry) => enquiry.status === "contacted"
    ).length;

    const resolvedEnquiries = enquiries.filter(
        (enquiry) => enquiry.status === "resolved"
    ).length;

    /* ----------------------------------
       Search + Filter
    ---------------------------------- */

    const filteredEnquiries = useMemo(() => {
        const searchTerm = search
            .toLowerCase()
            .trim();

        return enquiries.filter((enquiry) => {
            const matchesSearch =
                enquiry.name
                    ?.toLowerCase()
                    .includes(searchTerm) ||
                enquiry.email
                    ?.toLowerCase()
                    .includes(searchTerm) ||
                enquiry.phone
                    ?.toLowerCase()
                    .includes(searchTerm) ||
                enquiry.company
                    ?.toLowerCase()
                    .includes(searchTerm) ||
                enquiry.subject
                    ?.toLowerCase()
                    .includes(searchTerm) ||
                enquiry.message
                    ?.toLowerCase()
                    .includes(searchTerm);

            const matchesStatus =
                statusFilter === "All" ||
                enquiry.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [
        enquiries,
        search,
        statusFilter,
    ]);

    return (
        <main className="min-h-screen bg-slate-50 p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
                        Management
                    </p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Enquiries
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        View and manage enquiries received
                        from the Aurevia Healthcare website.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={fetchEnquiries}
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

            {/* Statistics */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Total Enquiries
                            </p>

                            <p className="mt-2 text-3xl font-bold text-slate-900">
                                {totalEnquiries}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                            <MessageSquare size={21} />
                        </div>
                    </div>

                    <p className="mt-4 text-xs text-slate-400">
                        All enquiries received
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        New
                    </p>

                    <p className="mt-2 text-3xl font-bold text-blue-600">
                        {newEnquiries}
                    </p>

                    <p className="mt-4 text-xs text-slate-400">
                        Awaiting response
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Contacted
                    </p>

                    <p className="mt-2 text-3xl font-bold text-amber-600">
                        {contactedEnquiries}
                    </p>

                    <p className="mt-4 text-xs text-slate-400">
                        Currently being handled
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Resolved
                    </p>

                    <p className="mt-2 text-3xl font-bold text-emerald-600">
                        {resolvedEnquiries}
                    </p>

                    <p className="mt-4 text-xs text-slate-400">
                        Successfully completed
                    </p>
                </div>
            </div>

            {/* Filters */}
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
                            placeholder="Search by name, email, company, subject..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(
                                event.target
                                    .value as
                                | "All"
                                | EnquiryStatus
                            )
                        }
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                    >
                        {statusOptions.map(
                            (option) => (
                                <option
                                    key={
                                        option.value
                                    }
                                    value={
                                        option.value
                                    }
                                >
                                    {option.label}
                                </option>
                            )
                        )}
                    </select>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-5">
                    <AlertCircle
                        size={20}
                        className="mt-0.5 shrink-0 text-red-600"
                    />

                    <div>
                        <p className="text-sm font-semibold text-red-700">
                            {error}
                        </p>

                        <button
                            type="button"
                            onClick={
                                fetchEnquiries
                            }
                            className="mt-2 text-sm font-semibold text-red-700 underline underline-offset-2"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            )}

            {/* Enquiries Table */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Enquiry List
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Showing{" "}
                            {
                                filteredEnquiries.length
                            }{" "}
                            of{" "}
                            {enquiries.length}{" "}
                            enquiries
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex min-h-[350px] items-center justify-center">
                        <div className="text-center">
                            <RefreshCw
                                size={28}
                                className="mx-auto animate-spin text-teal-600"
                            />

                            <p className="mt-3 text-sm text-slate-500">
                                Loading enquiries...
                            </p>
                        </div>
                    </div>
                ) : filteredEnquiries.length ===
                    0 ? (
                    <div className="flex min-h-[350px] items-center justify-center px-6">
                        <div className="text-center">
                            <MessageSquare
                                size={40}
                                className="mx-auto text-slate-300"
                            />

                            <h3 className="mt-4 text-base font-semibold text-slate-700">
                                No enquiries found
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                                Try changing your
                                search or status
                                filter.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px] text-left">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/70">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Enquiry
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Company
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Subject
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Date
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
                                {filteredEnquiries.map(
                                    (enquiry) => (
                                        <tr
                                            key={
                                                enquiry._id
                                            }
                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                                        >
                                            <td className="px-6 py-5">
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">
                                                        {
                                                            enquiry.name
                                                        }
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {
                                                            enquiry.email
                                                        }
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {
                                                            enquiry.phone
                                                        }
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2 text-sm text-slate-600">
                                                    <Building2
                                                        size={
                                                            15
                                                        }
                                                        className="text-slate-400"
                                                    />

                                                    {enquiry.company ||
                                                        "—"}
                                                </div>
                                            </td>

                                            <td className="max-w-[220px] px-6 py-5">
                                                <p className="truncate text-sm font-medium text-slate-700">
                                                    {enquiry.subject ||
                                                        "General Enquiry"}
                                                </p>
                                            </td>

                                            <td className="px-6 py-5 text-sm text-slate-500">
                                                {formatDate(
                                                    enquiry.createdAt
                                                )}
                                            </td>

                                            <td className="px-6 py-5">
                                                <select
                                                    value={
                                                        enquiry.status
                                                    }
                                                    disabled={
                                                        updatingId ===
                                                        enquiry._id
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        updateStatus(
                                                            enquiry._id,
                                                            event
                                                                .target
                                                                .value as EnquiryStatus
                                                        )
                                                    }
                                                    className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none focus:ring-2 focus:ring-teal-500/20 disabled:cursor-not-allowed disabled:opacity-60 ${getStatusClasses(
                                                        enquiry.status
                                                    )}`}
                                                >
                                                    <option value="new">
                                                        New
                                                    </option>

                                                    <option value="contacted">
                                                        Contacted
                                                    </option>

                                                    <option value="resolved">
                                                        Resolved
                                                    </option>
                                                </select>
                                            </td>

                                            <td className="px-6 py-5">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        title="View enquiry"
                                                        onClick={() =>
                                                            setSelectedEnquiry(
                                                                enquiry
                                                            )
                                                        }
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                                                    >
                                                        <Eye
                                                            size={
                                                                16
                                                            }
                                                        />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        title="Delete enquiry"
                                                        disabled={
                                                            deletingId ===
                                                            enquiry._id
                                                        }
                                                        onClick={() =>
                                                            deleteEnquiry(
                                                                enquiry._id
                                                            )
                                                        }
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        {deletingId ===
                                                            enquiry._id ? (
                                                            <RefreshCw
                                                                size={
                                                                    16
                                                                }
                                                                className="animate-spin"
                                                            />
                                                        ) : (
                                                            <Trash2
                                                                size={
                                                                    16
                                                                }
                                                            />
                                                        )}
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* View Enquiry Modal */}
            {selectedEnquiry && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
                    onClick={() =>
                        setSelectedEnquiry(null)
                    }
                >
                    <div
                        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        {/* Modal Header */}
                        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600">
                                    Enquiry Details
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-slate-900">
                                    {
                                        selectedEnquiry.name
                                    }
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedEnquiry(
                                        null
                                    )
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X size={19} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="space-y-6 p-6">
                            {/* Contact Information */}
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-xl bg-slate-50 p-4">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        <Mail
                                            size={14}
                                        />
                                        Email
                                    </div>

                                    <a
                                        href={`mailto:${selectedEnquiry.email}`}
                                        className="mt-2 block break-all text-sm font-semibold text-teal-700 hover:underline"
                                    >
                                        {
                                            selectedEnquiry.email
                                        }
                                    </a>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        <Phone
                                            size={14}
                                        />
                                        Phone
                                    </div>

                                    <a
                                        href={`tel:${selectedEnquiry.phone}`}
                                        className="mt-2 block text-sm font-semibold text-slate-800 hover:text-teal-700"
                                    >
                                        {
                                            selectedEnquiry.phone
                                        }
                                    </a>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        <Building2
                                            size={14}
                                        />
                                        Company
                                    </div>

                                    <p className="mt-2 text-sm font-semibold text-slate-800">
                                        {selectedEnquiry.company ||
                                            "Not provided"}
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-50 p-4">
                                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                                        <Clock3
                                            size={14}
                                        />
                                        Received
                                    </div>

                                    <p className="mt-2 text-sm font-semibold text-slate-800">
                                        {formatDateTime(
                                            selectedEnquiry.createdAt
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Subject */}
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Subject
                                </p>

                                <p className="mt-2 text-base font-bold text-slate-900">
                                    {selectedEnquiry.subject ||
                                        "General Enquiry"}
                                </p>
                            </div>

                            {/* Message */}
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Message
                                </p>

                                <div className="mt-2 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                                        {
                                            selectedEnquiry.message
                                        }
                                    </p>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Status
                                </p>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {(
                                        [
                                            "new",
                                            "contacted",
                                            "resolved",
                                        ] as EnquiryStatus[]
                                    ).map(
                                        (
                                            status
                                        ) => (
                                            <button
                                                key={
                                                    status
                                                }
                                                type="button"
                                                disabled={
                                                    updatingId ===
                                                    selectedEnquiry._id
                                                }
                                                onClick={() =>
                                                    updateStatus(
                                                        selectedEnquiry._id,
                                                        status
                                                    )
                                                }
                                                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${selectedEnquiry.status ===
                                                        status
                                                        ? getStatusClasses(
                                                            status
                                                        )
                                                        : "border border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
                                                    }`}
                                            >
                                                {
                                                    formatStatus(
                                                        status
                                                    )
                                                }
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex flex-col gap-3 border-t border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2">
                                <CheckCircle2
                                    size={15}
                                    className="text-emerald-500"
                                />

                                <span className="text-xs text-slate-400">
                                    Last updated{" "}
                                    {formatDateTime(
                                        selectedEnquiry.updatedAt
                                    )}
                                </span>
                            </div>

                            <button
                                type="button"
                                disabled={
                                    deletingId ===
                                    selectedEnquiry._id
                                }
                                onClick={() =>
                                    deleteEnquiry(
                                        selectedEnquiry._id
                                    )
                                }
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <Trash2 size={16} />

                                Delete Enquiry
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Read-only source notice */}
            {!loading && enquiries.length > 0 && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3">
                    <MessageSquare
                        size={15}
                        className="text-slate-400"
                    />

                    <p className="text-xs text-slate-400">
                        Enquiries are loaded directly from
                        the Aurevia Healthcare database.
                        Status updates and deletion are
                        available to administrators.
                    </p>
                </div>
            )}
        </main>
    );
}