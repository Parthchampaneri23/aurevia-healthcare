import { LucideIcon } from "lucide-react";

type StatCardProps = {
    title: string;
    value: string;
    description: string;
    icon: LucideIcon;
};

export default function StatCard({
    title,
    value,
    description,
    icon: Icon,
}: StatCardProps) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-semibold text-slate-500">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-extrabold text-[#123B5D]">
                        {value}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                        {description}
                    </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-[#0F766E]">
                    <Icon size={21} />
                </div>
            </div>
        </div>
    );
}