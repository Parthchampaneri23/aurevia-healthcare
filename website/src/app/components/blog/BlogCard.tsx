"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, FlaskConical, ShieldCheck, Microscope, Factory } from "lucide-react";
import { BlogPost } from "@/app/data/blogData";

interface BlogCardProps {
  blog: BlogPost;
}

export default function BlogCard({ blog }: BlogCardProps) {
  // Category icon mapping for styled fallback card header when image is blank
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Pharmaceutical Manufacturing":
        return <Factory className="h-10 w-10 text-teal-400 opacity-80" />;
      case "Quality & Compliance":
        return <ShieldCheck className="h-10 w-10 text-teal-400 opacity-80" />;
      case "Research & Development":
        return <Microscope className="h-10 w-10 text-teal-400 opacity-80" />;
      default:
        return <FlaskConical className="h-10 w-10 text-teal-400 opacity-80" />;
    }
  };

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border-2 border-slate-300/90 bg-white shadow-md transition-all duration-500 hover:-translate-y-2.5 hover:border-[#0F766E] hover:shadow-2xl hover:shadow-teal-950/20 cursor-pointer"
    >
      {/* Top Sliding Accent Line */}
      <div className="absolute top-0 left-0 z-20 h-[4px] w-0 bg-gradient-to-r from-[#123B5D] via-[#0F766E] to-[#123B5D] transition-all duration-500 group-hover:w-full" />

      {/* Image Container / Placeholder Header */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
        {blog.image ? (
          <>
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover opacity-95 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Dark Gradient Overlay for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-50" />
          </>
        ) : (
          /* Premium Pharmaceutical Placeholder Banner */
          <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0b1724] via-[#123B5D] to-[#0F766E] p-6 text-white transition-transform duration-700 ease-out group-hover:scale-105">
            {/* Subtle background overlay circles */}
            <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-teal-400/10 blur-xl" />
            <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-slate-900/40 blur-xl" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-200 backdrop-blur-md">
                Aurevia Insight
              </span>
              {getCategoryIcon(blog.category)}
            </div>

            <div className="relative z-10">
              <p className="text-xs font-semibold text-teal-200/90 line-clamp-1">
                {blog.category}
              </p>
              <p className="mt-1 text-sm font-bold text-white line-clamp-2 leading-tight">
                {blog.title}
              </p>
            </div>
          </div>
        )}

        {/* Floating Category Pill Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#123B5D] shadow-sm backdrop-blur-md transition-colors duration-300 group-hover:bg-[#0F766E] group-hover:text-white">
            {blog.category}
          </span>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7 bg-white transition-colors duration-500 group-hover:bg-slate-50/50">
        <div>
          {/* Title */}
          <h3 className="text-lg font-semibold text-slate-900 line-clamp-2 transition-colors duration-300 group-hover:text-[#0F766E]">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2.5 text-[15px] font-normal leading-relaxed text-slate-600 line-clamp-3">
            {blog.excerpt}
          </p>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-3.5">
          {/* Date & Reading Time */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <Calendar size={13} className="text-[#0F766E]" />
              {blog.date}
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <Clock size={13} className="text-[#0F766E]" />
              {blog.readTime}
            </span>
          </div>

          {/* Read Article Link */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#0F766E]">
              Knowledge Base
            </span>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#123B5D] transition-colors duration-300 group-hover:text-[#0F766E]">
              <span>Read Article</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-all duration-300 group-hover:bg-[#0F766E] group-hover:text-white group-hover:translate-x-1">
                <ArrowRight size={15} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
