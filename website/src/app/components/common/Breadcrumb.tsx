import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = "" }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className={`mt-3.5 ${className}`}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs text-slate-200 sm:text-sm">
        <li>
          <Link href="/" className="transition hover:text-teal-300">
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center gap-1.5">
              <ChevronRight size={14} className="text-teal-400/80 shrink-0" />
              {isLast || !item.href ? (
                <span className="font-semibold text-teal-300 truncate max-w-[200px] sm:max-w-xs md:max-w-md">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="transition hover:text-teal-300">
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
