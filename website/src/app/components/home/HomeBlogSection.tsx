"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLatestBlogs } from "@/app/data/blogData";
import BlogCard from "@/app/components/blog/BlogCard";

export default function HomeBlogSection() {
  const latestBlogs = getLatestBlogs(3);

  return (
    <section className="bg-slate-50 py-12 lg:py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0F766E]">
            INSIGHTS &amp; KNOWLEDGE
          </p>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Latest From Aurevia
          </h2>

          <p className="mt-4 text-base text-slate-600 sm:text-lg">
            Explore our latest insights on pharmaceutical manufacturing, quality, research, and industry practices.
          </p>
        </div>

        {/* 3 Blog Cards Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {latestBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* View All Insights Button */}
        <div className="mt-14 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-[#123B5D] px-8 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:bg-[#0F766E] hover:shadow-md hover:scale-[1.02] active:scale-[0.98]"
          >
            View All Insights
            <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </section>
  );
}
