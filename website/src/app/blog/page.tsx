"use client";

import { useState, useEffect } from "react";
import { SearchX } from "lucide-react";
import BlogHero from "@/app/components/blog/BlogHero";
import FeaturedBlog from "@/app/components/blog/FeaturedBlog";
import CategoryFilter from "@/app/components/blog/CategoryFilter";
import BlogCard from "@/app/components/blog/BlogCard";
import BlogCTA from "@/app/components/blog/BlogCTA";
import BlogFAQ from "@/app/components/blog/BlogFAQ";
import { getDynamicBlogs, getFeaturedBlog, BlogPost } from "@/app/data/blogData";

const categories = [
  "All",
  "Pharmaceutical Manufacturing",
  "Quality & Compliance",
  "Research & Development",
  "Industry Insights",
];

export default function BlogListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    setAllBlogs(getDynamicBlogs());
  }, []);

  const featuredBlog = allBlogs.find((b) => b.featured && b.published) || allBlogs[0] || getFeaturedBlog();

  // Filtered blogs for grid with category and search query matching
  const getDisplayedGridBlogs = () => {
    let list = allBlogs.filter((b) => b.published);

    // When no search query & active category is All, omit featured blog from grid to avoid duplicate
    if (!searchQuery && activeCategory === "All" && featuredBlog) {
      list = list.filter((b) => b.id !== featuredBlog.id);
    } else if (activeCategory !== "All") {
      list = list.filter((b) => b.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.excerpt.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q) ||
          b.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    return list;
  };

  const gridBlogs = getDisplayedGridBlogs();

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveCategory("All");
  };

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Blog Hero */}
      <BlogHero />

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">

        {/* Featured Article (Shown when no search query and "All" or when featured matches category) */}
        {!searchQuery && (activeCategory === "All" || featuredBlog?.category === activeCategory) && featuredBlog && (
          <section className="mb-16">
            <FeaturedBlog blog={featuredBlog} />
          </section>
        )}

        {/* Category Filters & Search */}
        <section className="mt-8">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Grid or Empty State */}
          {gridBlogs.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {gridBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            /* Premium Empty State */
            <div className="rounded-3xl border border-slate-200 bg-white p-12 sm:p-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-teal-50 text-[#0F766E] mb-4">
                <SearchX size={32} />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900">
                No insights found
              </h3>
              <p className="mt-2 text-sm text-slate-600 max-w-md mx-auto">
                We couldn&apos;t find any articles matching your search query or category filter. Try a different keyword or clear filters.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#123B5D] px-6 py-3 text-sm font-bold text-white transition-all hover:bg-[#0F766E] shadow-sm cursor-pointer"
              >
                Clear Search &amp; Filters
              </button>
            </div>
          )}
        </section>

        {/* B2B Manufacturing CTA */}
        <BlogCTA />

        {/* Blog Listing FAQ Section */}
        <BlogFAQ />

      </div>
    </main>
  );
}


