"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Package,
  Building2,
  MessageSquare,
  BriefcaseBusiness,
  ArrowUpRight,
  Clock3,
  RefreshCw,
  Activity,
  ShieldCheck,
  LogOut,
  ExternalLink,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://aurevia-healthcare.onrender.com";

type Enquiry = {
  _id: string;
  name?: string;
  fullName?: string;
  company?: string;
  companyName?: string;
  product?: string;
  productName?: string;
  createdAt?: string;
  status?: string;
};

export default function Dashboard() {
  const router = useRouter();

  const [productsCount, setProductsCount] = useState(0);
  const [industriesCount, setIndustriesCount] = useState(0);
  const [enquiriesCount, setEnquiriesCount] = useState(0);
  const [applicationsCount, setApplicationsCount] = useState(0);

  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("aurevia_admin_token");

      if (!token) {
        router.replace("/login");
        return;
      }

      const [
        productsResponse,
        industriesResponse,
        enquiriesResponse,
        applicationsResponse,
      ] = await Promise.all([
        fetch(`${API_URL}/api/products/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        fetch(`${API_URL}/api/industries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        fetch(`${API_URL}/api/enquiries`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),

        fetch(`${API_URL}/api/careers`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      if (
        productsResponse.status === 401 ||
        industriesResponse.status === 401 ||
        enquiriesResponse.status === 401 ||
        applicationsResponse.status === 401
      ) {
        localStorage.removeItem("aurevia_admin_token");
        localStorage.removeItem("aurevia_admin_user");

        router.replace("/login");
        return;
      }

      if (!productsResponse.ok) {
        throw new Error("Failed to fetch products");
      }

      if (!industriesResponse.ok) {
        throw new Error("Failed to fetch industries");
      }

      if (!enquiriesResponse.ok) {
        throw new Error("Failed to fetch enquiries");
      }

      if (!applicationsResponse.ok) {
        throw new Error("Failed to fetch applications");
      }

      const [
        productsData,
        industriesData,
        enquiriesData,
        applicationsData,
      ] = await Promise.all([
        productsResponse.json(),
        industriesResponse.json(),
        enquiriesResponse.json(),
        applicationsResponse.json(),
      ]);

      setProductsCount(
        productsData.products?.length ??
        productsData.count ??
        0
      );

      setIndustriesCount(
        industriesData.industries?.length ??
        industriesData.count ??
        0
      );

      const enquiries: Enquiry[] =
        enquiriesData.enquiries ||
        enquiriesData.data ||
        [];

      setEnquiriesCount(
        enquiriesData.count ?? enquiries.length
      );

      const sortedEnquiries = [...enquiries]
        .sort((a, b) => {
          const dateA = a.createdAt
            ? new Date(a.createdAt).getTime()
            : 0;

          const dateB = b.createdAt
            ? new Date(b.createdAt).getTime()
            : 0;

          return dateB - dateA;
        })
        .slice(0, 4);

      setRecentEnquiries(sortedEnquiries);

      const applications =
        applicationsData.applications ||
        applicationsData.data ||
        [];

      setApplicationsCount(
        applicationsData.count ?? applications.length
      );
    } catch (error) {
      console.error("Dashboard fetch error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("aurevia_admin_token");

    if (!token) {
      router.replace("/login");
      return;
    }

    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("aurevia_admin_token");
    localStorage.removeItem("aurevia_admin_user");
    router.replace("/login");
  };

  const stats = [
    {
      title: "Total Products",
      value: productsCount,
      description: "Products in catalogue",
      icon: Package,
      href: "/products",
    },
    {
      title: "Industries",
      value: industriesCount,
      description: "Industries served",
      icon: Building2,
      href: "/industries",
    },
    {
      title: "Enquiries",
      value: enquiriesCount,
      description: "Total enquiries received",
      icon: MessageSquare,
      href: "/enquiries",
    },
    {
      title: "Applications",
      value: applicationsCount,
      description: "Career applications",
      icon: BriefcaseBusiness,
      href: "/careers",
    },
  ];

  const formatDate = (date?: string) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "new":
        return "bg-blue-50 text-blue-700 border-blue-100";

      case "contacted":
        return "bg-amber-50 text-amber-700 border-amber-100";

      case "resolved":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";

      default:
        return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  return (
    <main className="min-h-screen bg-[#f6f8fb]">
      {/* TOP HEADER */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="flex h-[76px] items-center justify-between px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-100 bg-white shadow-sm">
              <img
                src="/logo.png"
                alt="Aurevia Healthcare"
                className="max-h-9 max-w-[38px] object-contain"
              />
            </div>

            <div className="hidden sm:block">
              <p className="text-[15px] font-bold tracking-tight text-[#123B5D]">
                Aurevia Healthcare
              </p>

              <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
                Admin Portal
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="https://aurevia-healthcare-one.vercel.app"
              target="_blank"
              className="hidden items-center gap-2 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700 sm:inline-flex"
            >
              <ExternalLink size={14} />
              View Website
            </Link>

            <div className="hidden h-8 w-px bg-slate-200 sm:block" />

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#123B5D] text-xs font-bold text-white">
              A
            </div>

            <div className="hidden md:block">
              <p className="text-xs font-bold text-slate-800">
                Administrator
              </p>

              <p className="text-[11px] text-slate-400">
                Admin Account
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Logout"
              className="ml-1 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={17} />
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1600px] px-5 py-7 sm:px-8 lg:px-10 lg:py-9">
        {/* PAGE HEADING */}
        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-700">
                Administration
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Dashboard
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
              Monitor your Aurevia Healthcare website, products,
              enquiries and career applications from one place.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchDashboardData}
            disabled={loading}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              size={16}
              className={loading ? "animate-spin" : ""}
            />
            Refresh Data
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-red-500" />

            <div>
              <p className="text-sm font-bold text-red-700">
                Unable to load dashboard data
              </p>

              <p className="mt-1 text-xs text-red-600">
                {error}
              </p>
            </div>
          </div>
        )}

        {/* STATISTICS */}
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Link
                href={stat.href}
                key={stat.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.03)] transition duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-lg"
              >
                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-teal-50 opacity-0 transition duration-300 group-hover:opacity-100" />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      {stat.title}
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                      {loading ? "—" : stat.value}
                    </p>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#eef8f7] text-teal-700 transition duration-300 group-hover:bg-[#123B5D] group-hover:text-white">
                    <Icon size={20} />
                  </div>
                </div>

                <div className="relative mt-5 flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    {stat.description}
                  </p>

                  <ArrowUpRight
                    size={15}
                    className="text-slate-300 transition group-hover:text-teal-600"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* CONTENT GRID */}
        <div className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_350px]">
          {/* RECENT ENQUIRIES */}
          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.03)]">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                    <MessageSquare size={16} />
                  </div>

                  <h2 className="text-base font-bold text-slate-900">
                    Recent Enquiries
                  </h2>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Latest enquiries received from website visitors
                </p>
              </div>

              <Link
                href="/enquiries"
                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-bold text-teal-600 transition hover:bg-teal-50"
              >
                View all
                <ArrowUpRight size={14} />
              </Link>
            </div>

            {loading ? (
              <div className="flex min-h-[280px] items-center justify-center">
                <div className="text-center">
                  <RefreshCw
                    size={25}
                    className="mx-auto animate-spin text-teal-600"
                  />

                  <p className="mt-3 text-xs text-slate-400">
                    Loading dashboard...
                  </p>
                </div>
              </div>
            ) : recentEnquiries.length === 0 ? (
              <div className="flex min-h-[280px] items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50">
                    <MessageSquare
                      size={22}
                      className="text-slate-300"
                    />
                  </div>

                  <p className="mt-4 text-sm font-bold text-slate-600">
                    No enquiries yet
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    New website enquiries will appear here.
                  </p>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/70">
                      <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Name
                      </th>

                      <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Company
                      </th>

                      <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Product
                      </th>

                      <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Date
                      </th>

                      <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {recentEnquiries.map((enquiry) => {
                      const name =
                        enquiry.name ||
                        enquiry.fullName ||
                        "Unknown";

                      const company =
                        enquiry.company ||
                        enquiry.companyName ||
                        "—";

                      const product =
                        enquiry.product ||
                        enquiry.productName ||
                        "—";

                      return (
                        <tr
                          key={enquiry._id}
                          className="border-b border-slate-100 last:border-0 transition hover:bg-slate-50/70"
                        >
                          <td className="px-6 py-4">
                            <p className="text-sm font-semibold text-slate-800">
                              {name}
                            </p>
                          </td>

                          <td className="px-6 py-4 text-sm text-slate-600">
                            {company}
                          </td>

                          <td className="max-w-[220px] px-6 py-4 text-sm text-slate-600">
                            <p className="truncate">
                              {product}
                            </p>
                          </td>

                          <td className="whitespace-nowrap px-6 py-4 text-xs text-slate-500">
                            {formatDate(enquiry.createdAt)}
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-[10px] font-bold ${getStatusClass(
                                enquiry.status
                              )}`}
                            >
                              {enquiry.status || "New"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* QUICK ACTIONS */}
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#123B5D] text-white">
                    <Activity size={16} />
                  </div>

                  <h2 className="text-base font-bold text-slate-900">
                    Quick Actions
                  </h2>
                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Frequently used admin actions
                </p>
              </div>

              <div className="mt-5 space-y-2.5">
                <Link
                  href="/products"
                  className="group flex items-center justify-between rounded-xl border border-slate-100 p-3.5 transition hover:border-teal-200 hover:bg-teal-50/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                      <Package size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Products
                      </p>

                      <p className="text-[11px] text-slate-400">
                        Manage catalogue
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className="text-slate-300 transition group-hover:text-teal-600"
                  />
                </Link>

                <Link
                  href="/industries"
                  className="group flex items-center justify-between rounded-xl border border-slate-100 p-3.5 transition hover:border-teal-200 hover:bg-teal-50/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                      <Building2 size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Industries
                      </p>

                      <p className="text-[11px] text-slate-400">
                        Manage industries
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className="text-slate-300 transition group-hover:text-teal-600"
                  />
                </Link>

                <Link
                  href="/enquiries"
                  className="group flex items-center justify-between rounded-xl border border-slate-100 p-3.5 transition hover:border-teal-200 hover:bg-teal-50/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                      <MessageSquare size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Enquiries
                      </p>

                      <p className="text-[11px] text-slate-400">
                        Check customer enquiries
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className="text-slate-300 transition group-hover:text-teal-600"
                  />
                </Link>

                <Link
                  href="/careers"
                  className="group flex items-center justify-between rounded-xl border border-slate-100 p-3.5 transition hover:border-teal-200 hover:bg-teal-50/50"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                      <BriefcaseBusiness size={17} />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Applications
                      </p>

                      <p className="text-[11px] text-slate-400">
                        Career applications
                      </p>
                    </div>
                  </div>

                  <ArrowUpRight
                    size={15}
                    className="text-slate-300 transition group-hover:text-teal-600"
                  />
                </Link>
              </div>
            </section>

            {/* SYSTEM STATUS */}
            <section className="relative overflow-hidden rounded-2xl bg-[#123B5D] p-6 text-white shadow-lg">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-white/5" />
              <div className="absolute -bottom-16 -left-10 h-36 w-36 rounded-full bg-teal-400/10" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <ShieldCheck size={20} />
                  </div>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    ONLINE
                  </span>
                </div>

                <h3 className="mt-5 text-base font-bold">
                  System Status
                </h3>

                <p className="mt-1 text-xs leading-5 text-slate-300">
                  Aurevia Healthcare admin services are running normally.
                </p>

                <div className="mt-5 flex items-center gap-2 border-t border-white/10 pt-4 text-[11px] text-slate-300">
                  <Clock3 size={13} />

                  {loading
                    ? "Checking backend connection..."
                    : "Backend connected successfully"}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-slate-200 pt-6 text-[11px] text-slate-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Aurevia Healthcare. Admin
            Portal.
          </p>

          <p className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Secure administration panel
          </p>
        </footer>
      </div>
    </main>
  );
}