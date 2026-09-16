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
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-200 hover:shadow-xl cursor-pointer"
    >
      {/* Image Container / Placeholder Header */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
        {blog.image ? (
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          /* Premium Pharmaceutical Placeholder Banner */
          <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0b1724] via-[#123B5D] to-[#0F766E] p-6 text-white transition-transform duration-500 group-hover:scale-105">
            {/* Subtle background overlay circles */}
            <div className="absolute -right-8 -top-8 h-36 w-36 rounded-full bg-teal-400/10 blur-xl" />
            <div className="absolute -bottom-8 -left-8 h-36 w-36 rounded-full bg-slate-900/40 blur-xl" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="rounded-md bg-white/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal-200 backdrop-blur-md">
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
      </div>

      {/* Content Container */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          {/* Category */}
          <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
            {blog.category}
          </span>

          {/* Title */}
          <h3 className="mt-2 text-lg font-bold text-slate-900 line-clamp-2 transition-colors duration-200 group-hover:text-[#0F766E]">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="mt-2 text-sm leading-relaxed text-slate-600 line-clamp-3">
            {blog.excerpt}
          </p>
        </div>

        <div className="mt-6 border-t border-slate-100 pt-4">
          {/* Date & Reading Time */}
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-slate-400" />
              {blog.date}
            </span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Clock size={13} className="text-slate-400" />
              {blog.readTime}
            </span>
          </div>

          {/* Read Article Link */}
          <span className="inline-flex items-center gap-2 text-sm font-bold text-[#123B5D] transition-colors duration-200 group-hover:text-[#0F766E]">
            Read Article
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </span>
        </div>
      </div>
    </Link>
  );
}
