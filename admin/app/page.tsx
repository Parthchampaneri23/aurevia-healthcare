"use client";

import { useEffect, useState } from "react";
import {
  Package,
  Building2,
  MessageSquare,
  BriefcaseBusiness,
  ArrowUpRight,
  Clock3,
  RefreshCw,
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

      const [
        productsResponse,
        industriesResponse,
        enquiriesResponse,
        applicationsResponse,
      ] = await Promise.all([
        fetch(`${API_URL}/api/products/admin`),
        fetch(`${API_URL}/api/industries`),
        fetch(`${API_URL}/api/enquiries`),
        fetch(`${API_URL}/api/careers`),
      ]);

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

      /*
       * PRODUCTS
       */
      setProductsCount(
        productsData.products?.length ??
        productsData.count ??
        0
      );

      /*
       * INDUSTRIES
       */
      setIndustriesCount(
        industriesData.industries?.length ??
        industriesData.count ??
        0
      );

      /*
       * ENQUIRIES
       */
      const enquiries =
        enquiriesData.enquiries ||
        enquiriesData.data ||
        [];

      setEnquiriesCount(
        enquiriesData.count ?? enquiries.length
      );

      /*
       * Show latest 4 enquiries
       */
      const sortedEnquiries = [...enquiries]
        .sort((a: Enquiry, b: Enquiry) => {
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

      /*
       * CAREER APPLICATIONS
       *
       * Backend route is:
       * /api/careers
       */
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
    fetchDashboardData();
  }, []);

  const stats = [
    {
      title: "Total Products",
      value: productsCount,
      description: "Products in catalogue",
      icon: Package,
    },
    {
      title: "Industries",
      value: industriesCount,
      description: "Industries served",
      icon: Building2,
    },
    {
      title: "Enquiries",
      value: enquiriesCount,
      description: "Total enquiries received",
      icon: MessageSquare,
    },
    {
      title: "Applications",
      value: applicationsCount,
      description: "Career applications",
      icon: BriefcaseBusiness,
    },
  ];

  const formatDate = (date?: string) => {
    if (!date) return "—";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const getStatusClass = (status?: string) => {
    switch (status?.toLowerCase()) {
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

  return (
    <main className="min-h-screen bg-slate-50 p-6 lg:p-8">
      {/* Page Heading */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
            Dashboard
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Good morning, Admin 👋
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Here's an overview of your Aurevia Healthcare website.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchDashboardData}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-700">
            Unable to load dashboard data
          </p>

          <p className="mt-1 text-xs text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* Statistics */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {loading ? "—" : stat.value}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition-colors group-hover:bg-teal-600 group-hover:text-white">
                  <Icon size={21} />
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-400">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_320px]">
        {/* Recent Enquiries */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Enquiries
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Latest enquiries received from website visitors
              </p>
            </div>

            <a
              href="/enquiries"
              className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700"
            >
              View all
              <ArrowUpRight size={15} />
            </a>
          </div>

          {loading ? (
            <div className="flex min-h-[250px] items-center justify-center">
              <RefreshCw
                size={25}
                className="animate-spin text-teal-600"
              />
            </div>
          ) : recentEnquiries.length === 0 ? (
            <div className="flex min-h-[250px] items-center justify-center">
              <div className="text-center">
                <MessageSquare
                  size={35}
                  className="mx-auto text-slate-300"
                />

                <p className="mt-3 text-sm font-semibold text-slate-600">
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
                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Name
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Company
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Product
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                      Date
                    </th>

                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
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
                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                      >
                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-slate-800">
                            {name}
                          </p>
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {company}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-600">
                          {product}
                        </td>

                        <td className="px-6 py-4 text-sm text-slate-500">
                          {formatDate(enquiry.createdAt)}
                        </td>

                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
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

        {/* Quick Actions */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Frequently used admin actions
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <a
              href="/products"
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition-all duration-200 hover:border-teal-200 hover:bg-teal-50/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Package size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Products
                  </p>

                  <p className="text-xs text-slate-400">
                    View product catalogue
                  </p>
                </div>
              </div>

              <ArrowUpRight
                size={16}
                className="text-slate-400"
              />
            </a>

            <a
              href="/industries"
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition-all duration-200 hover:border-teal-200 hover:bg-teal-50/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Building2 size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Industries
                  </p>

                  <p className="text-xs text-slate-400">
                    View industries
                  </p>
                </div>
              </div>

              <ArrowUpRight
                size={16}
                className="text-slate-400"
              />
            </a>

            <a
              href="/enquiries"
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition-all duration-200 hover:border-teal-200 hover:bg-teal-50/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <MessageSquare size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    View Enquiries
                  </p>

                  <p className="text-xs text-slate-400">
                    Check customer enquiries
                  </p>
                </div>
              </div>

              <ArrowUpRight
                size={16}
                className="text-slate-400"
              />
            </a>

            <a
              href="/careers"
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition-all duration-200 hover:border-teal-200 hover:bg-teal-50/50"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <BriefcaseBusiness size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Applications
                  </p>

                  <p className="text-xs text-slate-400">
                    View career applications
                  </p>
                </div>
              </div>

              <ArrowUpRight
                size={16}
                className="text-slate-400"
              />
            </a>
          </div>

          {/* System Status */}
          <div className="mt-6 rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />

              <span className="text-sm font-semibold text-slate-700">
                System Online
              </span>
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
              <Clock3 size={13} />
              {loading ? "Checking..." : "Backend connected"}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}