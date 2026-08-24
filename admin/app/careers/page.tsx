"use client";

import { useEffect, useMemo, useState } from "react";
import {
    BriefcaseBusiness,
    CalendarDays,
    Download,
    FileText,
    Mail,
    Phone,
    RefreshCw,
    Search,
    Trash2,
    User,
    X,
} from "lucide-react";

type ApplicationStatus =
    | "new"
    | "reviewing"
    | "shortlisted"
    | "rejected";

type CareerApplication = {
    _id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    experience?: string;
    resume: string;
    coverMessage?: string;
    status: ApplicationStatus;
    createdAt?: string;
    updatedAt?: string;
};

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://aurevia-healthcare.onrender.com";

const statuses: {
    value: ApplicationStatus;
    label: string;
}[] = [
        { value: "new", label: "New" },
        { value: "reviewing", label: "Reviewing" },
        { value: "shortlisted", label: "Shortlisted" },
        { value: "rejected", label: "Rejected" },
    ];

export default function CareersPage() {
    const [applications, setApplications] = useState<
        CareerApplication[]
    >([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] =
        useState<"all" | ApplicationStatus>("all");

    const [selectedApplication, setSelectedApplication] =
        useState<CareerApplication | null>(null);

    const [updatingId, setUpdatingId] = useState<string | null>(
        null
    );

    const [deletingId, setDeletingId] = useState<string | null>(
        null
    );

    /* ----------------------------------
       Fetch Applications
    ---------------------------------- */

    const fetchApplications = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/careers`,
                {
                    cache: "no-store",
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch applications: ${response.status}`
                );
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(
                    data.message ||
                    "Failed to fetch applications"
                );
            }

            setApplications(data.applications || []);
        } catch (error) {
            console.error(
                "Career applications fetch error:",
                error
            );

            setError(
                "Unable to load career applications. Please check that the backend is running."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    /* ----------------------------------
       Resume URL
    ---------------------------------- */

    const getResumeUrl = (resume: string) => {
        if (!resume) {
            return "";
        }

        if (
            resume.startsWith("http://") ||
            resume.startsWith("https://")
        ) {
            return resume;
        }

        return `${API_URL}${resume.startsWith("/") ? "" : "/"}${resume}`;
    };

    /* ----------------------------------
       Status Update
    ---------------------------------- */

    const updateStatus = async (
        id: string,
        status: ApplicationStatus
    ) => {
        try {
            setUpdatingId(id);

            const response = await fetch(
                `${API_URL}/api/careers/${id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                    "Failed to update application status"
                );
            }

            setApplications((current) =>
                current.map((application) =>
                    application._id === id
                        ? {
                            ...application,
                            status: data.application.status,
                        }
                        : application
                )
            );

            setSelectedApplication((current) =>
                current?._id === id
                    ? {
                        ...current,
                        status: data.application.status,
                    }
                    : current
            );
        } catch (error) {
            console.error(
                "Update application status error:",
                error
            );

            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to update application status"
            );
        } finally {
            setUpdatingId(null);
        }
    };

    /* ----------------------------------
       Delete Application
    ---------------------------------- */

    const deleteApplication = async (id: string) => {
        const confirmed = window.confirm(
            "Are you sure you want to permanently delete this application?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(id);

            const response = await fetch(
                `${API_URL}/api/careers/${id}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                    "Failed to delete application"
                );
            }

            setApplications((current) =>
                current.filter(
                    (application) =>
                        application._id !== id
                )
            );

            if (
                selectedApplication?._id === id
            ) {
                setSelectedApplication(null);
            }
        } catch (error) {
            console.error(
                "Delete application error:",
                error
            );

            alert(
                error instanceof Error
                    ? error.message
                    : "Failed to delete application"
            );
        } finally {
            setDeletingId(null);
        }
    };

    /* ----------------------------------
       Search + Filter
    ---------------------------------- */

    const filteredApplications = useMemo(() => {
        const searchTerm = search
            .toLowerCase()
            .trim();

        return applications.filter(
            (application) => {
                const matchesSearch =
                    application.name
                        .toLowerCase()
                        .includes(searchTerm) ||
                    application.email
                        .toLowerCase()
                        .includes(searchTerm) ||
                    application.phone
                        .toLowerCase()
                        .includes(searchTerm) ||
                    application.position
                        .toLowerCase()
                        .includes(searchTerm);

                const matchesStatus =
                    statusFilter === "all" ||
                    application.status ===
                    statusFilter;

                return (
                    matchesSearch &&
                    matchesStatus
                );
            }
        );
    }, [
        applications,
        search,
        statusFilter,
    ]);

    /* ----------------------------------
       Statistics
    ---------------------------------- */

    const newCount = applications.filter(
        (application) =>
            application.status === "new"
    ).length;

    const reviewingCount =
        applications.filter(
            (application) =>
                application.status ===
                "reviewing"
        ).length;

    const shortlistedCount =
        applications.filter(
            (application) =>
                application.status ===
                "shortlisted"
        ).length;

    const rejectedCount =
        applications.filter(
            (application) =>
                application.status ===
                "rejected"
        ).length;

    /* ----------------------------------
       Date Formatter
    ---------------------------------- */

    const formatDate = (date?: string) => {
        if (!date) {
            return "—";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    /* ----------------------------------
       Status Styling
    ---------------------------------- */

    const getStatusStyle = (
        status: ApplicationStatus
    ) => {
        switch (status) {
            case "new":
                return "bg-blue-50 text-blue-700";

            case "reviewing":
                return "bg-amber-50 text-amber-700";

            case "shortlisted":
                return "bg-emerald-50 text-emerald-700";

            case "rejected":
                return "bg-red-50 text-red-700";

            default:
                return "bg-slate-100 text-slate-500";
        }
    };

    const getStatusLabel = (
        status: ApplicationStatus
    ) => {
        return (
            statuses.find(
                (item) =>
                    item.value === status
            )?.label || status
        );
    };

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
                        Career Applications
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Manage applications submitted
                        through the Aurevia Healthcare
                        careers page.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={fetchApplications}
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
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
            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Total Applications
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        {applications.length}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        New
                    </p>

                    <p className="mt-2 text-3xl font-bold text-blue-600">
                        {newCount}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Reviewing
                    </p>

                    <p className="mt-2 text-3xl font-bold text-amber-600">
                        {reviewingCount}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Shortlisted
                    </p>

                    <p className="mt-2 text-3xl font-bold text-emerald-600">
                        {shortlistedCount}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Rejected
                    </p>

                    <p className="mt-2 text-3xl font-bold text-red-600">
                        {rejectedCount}
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
                            placeholder="Search by name, email, phone or position..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(event) =>
                            setStatusFilter(
                                event.target.value as
                                | "all"
                                | ApplicationStatus
                            )
                        }
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                    >
                        <option value="all">
                            All Status
                        </option>

                        {statuses.map(
                            (status) => (
                                <option
                                    key={
                                        status.value
                                    }
                                    value={
                                        status.value
                                    }
                                >
                                    {status.label}
                                </option>
                            )
                        )}
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
                        onClick={fetchApplications}
                        className="mt-3 text-sm font-semibold text-red-700 underline"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Applications */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Applications
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Showing{" "}
                            {
                                filteredApplications.length
                            }{" "}
                            of{" "}
                            {applications.length}{" "}
                            applications
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
                                Loading applications...
                            </p>
                        </div>
                    </div>
                ) : filteredApplications.length ===
                    0 ? (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <div className="text-center">
                            <BriefcaseBusiness
                                size={40}
                                className="mx-auto text-slate-300"
                            />

                            <h3 className="mt-4 text-base font-semibold text-slate-700">
                                No applications found
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
                        <table className="w-full min-w-[1100px] text-left">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/70">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Applicant
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Position
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Experience
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Applied
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredApplications.map(
                                    (application) => (
                                        <tr
                                            key={
                                                application._id
                                            }
                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                                        >
                                            {/* Applicant */}
                                            <td className="px-6 py-5">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setSelectedApplication(
                                                            application
                                                        )
                                                    }
                                                    className="text-left"
                                                >
                                                    <p className="text-sm font-bold text-slate-800 hover:text-teal-700">
                                                        {
                                                            application.name
                                                        }
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {
                                                            application.email
                                                        }
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {
                                                            application.phone
                                                        }
                                                    </p>
                                                </button>
                                            </td>

                                            {/* Position */}
                                            <td className="px-6 py-5">
                                                <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-700">
                                                    <BriefcaseBusiness
                                                        size={
                                                            15
                                                        }
                                                        className="text-teal-600"
                                                    />

                                                    {
                                                        application.position
                                                    }
                                                </span>
                                            </td>

                                            {/* Experience */}
                                            <td className="px-6 py-5">
                                                <span className="text-sm text-slate-600">
                                                    {application.experience ||
                                                        "Not specified"}
                                                </span>
                                            </td>

                                            {/* Date */}
                                            <td className="px-6 py-5">
                                                <span className="inline-flex items-center gap-2 text-sm text-slate-500">
                                                    <CalendarDays
                                                        size={
                                                            15
                                                        }
                                                    />

                                                    {formatDate(
                                                        application.createdAt
                                                    )}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td className="px-6 py-5">
                                                <select
                                                    value={
                                                        application.status
                                                    }
                                                    disabled={
                                                        updatingId ===
                                                        application._id
                                                    }
                                                    onChange={(
                                                        event
                                                    ) =>
                                                        updateStatus(
                                                            application._id,
                                                            event
                                                                .target
                                                                .value as ApplicationStatus
                                                        )
                                                    }
                                                    className={`rounded-xl border border-transparent px-3 py-2 text-xs font-bold outline-none ${getStatusStyle(
                                                        application.status
                                                    )} disabled:cursor-not-allowed disabled:opacity-60`}
                                                >
                                                    {statuses.map(
                                                        (
                                                            status
                                                        ) => (
                                                            <option
                                                                key={
                                                                    status.value
                                                                }
                                                                value={
                                                                    status.value
                                                                }
                                                            >
                                                                {
                                                                    status.label
                                                                }
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setSelectedApplication(
                                                                application
                                                            )
                                                        }
                                                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                                                    >
                                                        View
                                                    </button>

                                                    <a
                                                        href={getResumeUrl(
                                                            application.resume
                                                        )}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                                                    >
                                                        <Download
                                                            size={
                                                                14
                                                            }
                                                        />

                                                        Resume
                                                    </a>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            deleteApplication(
                                                                application._id
                                                            )
                                                        }
                                                        disabled={
                                                            deletingId ===
                                                            application._id
                                                        }
                                                        className="rounded-xl border border-red-100 bg-red-50 p-2 text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                                        title="Delete application"
                                                    >
                                                        <Trash2
                                                            size={
                                                                15
                                                            }
                                                        />
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

            {/* View Application Modal */}
            {selectedApplication && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
                    <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-teal-600">
                                    Career Application
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-slate-900">
                                    {
                                        selectedApplication.name
                                    }
                                </h2>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setSelectedApplication(
                                        null
                                    )
                                }
                                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="max-h-[calc(90vh-80px)] overflow-y-auto p-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                                        <User
                                            size={14}
                                        />
                                        Name
                                    </div>

                                    <p className="mt-2 text-sm font-semibold text-slate-800">
                                        {
                                            selectedApplication.name
                                        }
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                                        <BriefcaseBusiness
                                            size={
                                                14
                                            }
                                        />
                                        Position
                                    </div>

                                    <p className="mt-2 text-sm font-semibold text-slate-800">
                                        {
                                            selectedApplication.position
                                        }
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                                        <Mail
                                            size={14}
                                        />
                                        Email
                                    </div>

                                    <p className="mt-2 break-all text-sm font-semibold text-slate-800">
                                        {
                                            selectedApplication.email
                                        }
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                                        <Phone
                                            size={14}
                                        />
                                        Phone
                                    </div>

                                    <p className="mt-2 text-sm font-semibold text-slate-800">
                                        {
                                            selectedApplication.phone
                                        }
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Experience
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-slate-800">
                                        {selectedApplication.experience ||
                                            "Not specified"}
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-slate-50 p-4">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                        Applied
                                    </p>

                                    <p className="mt-2 text-sm font-semibold text-slate-800">
                                        {formatDate(
                                            selectedApplication.createdAt
                                        )}
                                    </p>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="mt-6">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Application Status
                                </p>

                                <select
                                    value={
                                        selectedApplication.status
                                    }
                                    disabled={
                                        updatingId ===
                                        selectedApplication._id
                                    }
                                    onChange={(event) =>
                                        updateStatus(
                                            selectedApplication._id,
                                            event.target
                                                .value as ApplicationStatus
                                        )
                                    }
                                    className={`mt-2 rounded-xl border border-transparent px-4 py-2.5 text-sm font-bold outline-none ${getStatusStyle(
                                        selectedApplication.status
                                    )}`}
                                >
                                    {statuses.map(
                                        (status) => (
                                            <option
                                                key={
                                                    status.value
                                                }
                                                value={
                                                    status.value
                                                }
                                            >
                                                {
                                                    status.label
                                                }
                                            </option>
                                        )
                                    )}
                                </select>

                                <p className="mt-2 text-xs text-slate-400">
                                    Current status:{" "}
                                    {getStatusLabel(
                                        selectedApplication.status
                                    )}
                                </p>
                            </div>

                            {/* Cover Message */}
                            <div className="mt-6">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                    Cover Message
                                </p>

                                <div className="mt-2 rounded-2xl border border-slate-200 bg-white p-5">
                                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-slate-600">
                                        {selectedApplication.coverMessage ||
                                            "No cover message provided."}
                                    </p>
                                </div>
                            </div>

                            {/* Resume */}
                            <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-teal-100 bg-teal-50/50 p-5 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">
                                        <FileText
                                            size={21}
                                        />
                                    </div>

                                    <div>
                                        <p className="text-sm font-bold text-slate-800">
                                            Applicant Resume
                                        </p>

                                        <p className="mt-1 text-xs text-slate-500">
                                            Open the uploaded
                                            resume in a new
                                            tab.
                                        </p>
                                    </div>
                                </div>

                                <a
                                    href={getResumeUrl(
                                        selectedApplication.resume
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123B5D] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0F766E]"
                                >
                                    <Download
                                        size={16}
                                    />

                                    View Resume
                                </a>
                            </div>

                            {/* Delete */}
                            <div className="mt-6 flex justify-end">
                                <button
                                    type="button"
                                    onClick={() =>
                                        deleteApplication(
                                            selectedApplication._id
                                        )
                                    }
                                    disabled={
                                        deletingId ===
                                        selectedApplication._id
                                    }
                                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <Trash2
                                        size={16}
                                    />

                                    Delete Application
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Read-only applicant notice */}
            {!loading &&
                applications.length > 0 && (
                    <div className="mt-4 flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3">
                        <BriefcaseBusiness
                            size={15}
                            className="text-slate-400"
                        />

                        <p className="text-xs text-slate-400">
                            Applicant information comes
                            directly from the Aurevia
                            Healthcare database. Status
                            changes and deletions are saved
                            to MongoDB.
                        </p>
                    </div>
                )}
        </main>
    );
}