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
  date?: string;
  status?: string;
};

type DashboardData = {
  products: number;
  industries: number;
  enquiries: number;
  applications: number;
};

const getArrayFromResponse = (data: any, possibleKeys: string[]) => {
  if (Array.isArray(data)) {
    return data;
  }

  for (const key of possibleKeys) {
    if (Array.isArray(data?.[key])) {
      return data[key];
    }
  }

  return [];
};

const getCountFromResponse = (
  data: any,
  possibleKeys: string[]
) => {
  if (typeof data?.count === "number") {
    return data.count;
  }

  for (const key of possibleKeys) {
    if (Array.isArray(data?.[key])) {
      return data[key].length;
    }
  }

  if (Array.isArray(data)) {
    return data.length;
  }

  return 0;
};

const formatDate = (date?: string) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData>({
    products: 0,
    industries: 0,
    enquiries: 0,
    applications: 0,
  });

  const [recentEnquiries, setRecentEnquiries] = useState<Enquiry[]>(
    []
  );

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
        fetch(`${API_URL}/api/products`),
        fetch(`${API_URL}/api/industries`),
        fetch(`${API_URL}/api/enquiries`),
        fetch(`${API_URL}/api/applications`),
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

      const enquiries = getArrayFromResponse(
        enquiriesData,
        ["enquiries", "data", "results"]
      );

      setDashboard({
        products: getCountFromResponse(
          productsData,
          ["products", "data", "results"]
        ),

        industries: getCountFromResponse(
          industriesData,
          ["industries", "data", "results"]
        ),

        enquiries: getCountFromResponse(
          enquiriesData,
          ["enquiries", "data", "results"]
        ),

        applications: getCountFromResponse(
          applicationsData,
          [
            "applications",
            "careerApplications",
            "data",
            "results",
          ]
        ),
      });

      const sortedEnquiries = [...enquiries]
        .sort((a: Enquiry, b: Enquiry) => {
          const dateA = a.createdAt || a.date || "";
          const dateB = b.createdAt || b.date || "";

          return (
            new Date(dateB).getTime() -
            new Date(dateA).getTime()
          );
        })
        .slice(0, 4);

      setRecentEnquiries(sortedEnquiries);
    } catch (err) {
      console.error("Dashboard fetch error:", err);

      setError(
        "Unable to load dashboard data. Please check that the backend is running."
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
      value: dashboard.products,
      description: "Products in catalogue",
      icon: Package,
    },
    {
      title: "Industries",
      value: dashboard.industries,
      description: "Industries served",
      icon: Building2,
    },
    {
      title: "Enquiries",
      value: dashboard.enquiries,
      description: "Total enquiries received",
      icon: MessageSquare,
    },
    {
      title: "Applications",
      value: dashboard.applications,
      description: "Career applications",
      icon: BriefcaseBusiness,
    },
  ];

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
            Here's an overview of your Aurevia Healthcare
            website.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchDashboardData}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto"
        >
          <RefreshCw
            size={16}
            className={
              loading ? "animate-spin" : ""
            }
          />
          Refresh
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm font-semibold text-red-700">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchDashboardData}
            className="mt-2 text-sm font-semibold text-red-700 underline"
          >
            Try again
          </button>
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
                Latest enquiries received from website
                visitors
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
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center"
                    >
                      <RefreshCw
                        size={22}
                        className="mx-auto animate-spin text-teal-600"
                      />

                      <p className="mt-2 text-sm text-slate-500">
                        Loading enquiries...
                      </p>
                    </td>
                  </tr>
                ) : recentEnquiries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-sm text-slate-400"
                    >
                      No enquiries found.
                    </td>
                  </tr>
                ) : (
                  recentEnquiries.map(
                    (enquiry) => {
                      const name =
                        enquiry.name ||
                        enquiry.fullName ||
                        "—";

                      const company =
                        enquiry.company ||
                        enquiry.companyName ||
                        "—";

                      const product =
                        enquiry.product ||
                        enquiry.productName ||
                        "—";

                      const status =
                        enquiry.status ||
                        "New";

                      return (
                        <tr
                          key={
                            enquiry._id
                          }
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
                            {formatDate(
                              enquiry.createdAt ||
                              enquiry.date
                            )}
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${status.toLowerCase() ===
                                  "new"
                                  ? "bg-blue-50 text-blue-700"
                                  : status
                                    .toLowerCase()
                                    .includes(
                                      "contact"
                                    )
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-emerald-50 text-emerald-700"
                                }`}
                            >
                              {status}
                            </span>
                          </td>
                        </tr>
                      );
                    }
                  )
                )}
              </tbody>
            </table>
          </div>
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
                    Enquiries
                  </p>

                  <p className="text-xs text-slate-400">
                    View customer enquiries
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
              Backend data loaded successfully
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}