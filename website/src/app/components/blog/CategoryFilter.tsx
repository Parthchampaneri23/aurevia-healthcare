"use client";

import { Search, X } from "lucide-react";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-10">
      {/* Section Header with Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Explore Our Insights
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Search across our pharmaceutical manufacturing, quality assurance, and industry perspective articles.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search insights..."
            aria-label="Search pharmaceutical insights"
            className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm font-medium text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-[#0F766E] focus:outline-none focus:ring-2 focus:ring-[#0F766E]/20 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange("")}
              aria-label="Clear search query"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onSelectCategory(category)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#0F766E] text-white shadow-md shadow-teal-700/20"
                  : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}

