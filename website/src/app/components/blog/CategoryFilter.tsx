"use client";

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          Explore Our Insights
        </h2>
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
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
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
