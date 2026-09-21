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
          <div className="inline-flex items-center gap-3 mb-2.5 justify-center">
            <span className="h-0.5 w-6 rounded-full bg-[#0F766E]" aria-hidden="true" />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
              INSIGHTS &amp; KNOWLEDGE
            </p>
            <span className="h-0.5 w-6 rounded-full bg-[#0F766E]" aria-hidden="true" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#123B5D] leading-tight">
            Latest From <span className="bg-gradient-to-r from-[#123B5D] to-[#0F766E] bg-clip-text text-transparent">Aurevia</span>
          </h2>

          <p className="mt-4 text-base md:text-[17px] font-normal leading-relaxed text-slate-600 max-w-2xl mx-auto">
            Explore our latest insights on pharmaceutical manufacturing, quality, research, and industry practices.
          </p>
        </div>

        {/* 3 Blog Cards Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latestBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* View All Insights Button */}
        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="group/btn inline-flex items-center gap-2 rounded-xl bg-[#123B5D] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/10 transition-all duration-300 hover:bg-[#0F766E] hover:shadow-xl hover:shadow-teal-900/20 hover:translate-x-0.5 active:scale-95"
          >
            View All Insights
            <ArrowRight size={16} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
