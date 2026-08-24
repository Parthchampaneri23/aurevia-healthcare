import {
  Package,
  Building2,
  MessageSquare,
  BriefcaseBusiness,
  ArrowUpRight,
  Clock3,
} from "lucide-react";

const stats = [
  {
    title: "Total Products",
    value: "25",
    description: "Products in catalogue",
    icon: Package,
  },
  {
    title: "Industries",
    value: "10",
    description: "Industries served",
    icon: Building2,
  },
  {
    title: "Enquiries",
    value: "12",
    description: "Total enquiries received",
    icon: MessageSquare,
  },
  {
    title: "Applications",
    value: "8",
    description: "Career applications",
    icon: BriefcaseBusiness,
  },
];

const recentEnquiries = [
  {
    name: "Rahul Mehta",
    company: "Medicare Pharma",
    product: "Tablets",
    date: "24 Aug 2026",
    status: "New",
  },
  {
    name: "Priya Shah",
    company: "HealthPlus Ltd.",
    product: "Capsules",
    date: "23 Aug 2026",
    status: "Contacted",
  },
  {
    name: "Amit Patel",
    company: "WellCare Healthcare",
    product: "Syrups",
    date: "22 Aug 2026",
    status: "New",
  },
  {
    name: "Neha Desai",
    company: "Nova Medics",
    product: "Nutraceuticals",
    date: "21 Aug 2026",
    status: "Completed",
  },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-slate-50 p-6 lg:p-8">
      {/* Page Heading */}
      <div className="mb-8">
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
                    {stat.value}
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

            <button className="inline-flex items-center gap-1 text-sm font-semibold text-teal-600 transition-colors hover:text-teal-700">
              View all
              <ArrowUpRight size={15} />
            </button>
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
                {recentEnquiries.map((enquiry) => (
                  <tr
                    key={`${enquiry.name}-${enquiry.date}`}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                  >
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-slate-800">
                        {enquiry.name}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {enquiry.company}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {enquiry.product}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-500">
                      {enquiry.date}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${enquiry.status === "New"
                            ? "bg-blue-50 text-blue-700"
                            : enquiry.status ===
                              "Contacted"
                              ? "bg-amber-50 text-amber-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                      >
                        {enquiry.status}
                      </span>
                    </td>
                  </tr>
                ))}
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
            <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition-all duration-200 hover:border-teal-200 hover:bg-teal-50/50">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Package size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Add Product
                  </p>

                  <p className="text-xs text-slate-400">
                    Add a new product
                  </p>
                </div>
              </div>

              <ArrowUpRight
                size={16}
                className="text-slate-400"
              />
            </button>

            <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition-all duration-200 hover:border-teal-200 hover:bg-teal-50/50">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  <Building2 size={18} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Add Industry
                  </p>

                  <p className="text-xs text-slate-400">
                    Add a new industry
                  </p>
                </div>
              </div>

              <ArrowUpRight
                size={16}
                className="text-slate-400"
              />
            </button>

            <button className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-4 text-left transition-all duration-200 hover:border-teal-200 hover:bg-teal-50/50">
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
            </button>
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
              Last checked just now
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}