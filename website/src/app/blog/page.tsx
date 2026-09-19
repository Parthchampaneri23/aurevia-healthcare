"use client";

import { useState } from "react";
import BlogHero from "@/app/components/blog/BlogHero";
import FeaturedBlog from "@/app/components/blog/FeaturedBlog";
import CategoryFilter from "@/app/components/blog/CategoryFilter";
import BlogCard from "@/app/components/blog/BlogCard";
import BlogCTA from "@/app/components/blog/BlogCTA";
import { getDynamicBlogs, getFeaturedBlog, BlogPost } from "@/app/data/blogData";
import { useEffect } from "react";

const categories = [
  "All",
  "Pharmaceutical Manufacturing",
  "Quality & Compliance",
  "Research & Development",
  "Industry Insights",
];

export default function BlogListingPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [allBlogs, setAllBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    setAllBlogs(getDynamicBlogs());
  }, []);

  const featuredBlog = allBlogs.find((b) => b.featured && b.published) || allBlogs[0] || getFeaturedBlog();

  // Filtered blogs for grid
  const getDisplayedGridBlogs = () => {
    if (!featuredBlog) return [];
    if (activeCategory === "All") {
      return allBlogs.filter((b) => b.id !== featuredBlog.id && b.published);
    }
    return allBlogs.filter((b) => b.category === activeCategory && b.published);
  };

  const gridBlogs = getDisplayedGridBlogs();

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Blog Hero */}
      <BlogHero />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-12">

        {/* Featured Article (Shown when "All" or when featured blog matches category) */}
        {(activeCategory === "All" || featuredBlog.category === activeCategory) && (
          <section className="mb-16">
            <FeaturedBlog blog={featuredBlog} />
          </section>
        )}

        {/* Category Filters & Latest Insights Header */}
        <section className="mt-12">
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />

          <div className="mt-8 mb-6">
            <h3 className="text-xl font-bold tracking-tight text-slate-900">
              Latest Insights
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Explore practical insights and perspectives across pharmaceutical manufacturing, quality, research and healthcare.
            </p>
          </div>

          {/* Blog Cards Grid */}
          {gridBlogs.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {gridBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
              <p className="text-base text-slate-500">
                No articles found in this category.
              </p>
            </div>
          )}
        </section>

        {/* Business CTA */}
        <BlogCTA />

      </div>
    </main>
  );
}
