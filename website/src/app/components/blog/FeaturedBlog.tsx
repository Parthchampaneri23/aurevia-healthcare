"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock, Sparkles, Factory } from "lucide-react";
import { BlogPost } from "@/app/data/blogData";

interface FeaturedBlogProps {
  blog: BlogPost;
}

export default function FeaturedBlog({ blog }: FeaturedBlogProps) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group block overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-lg transition-all duration-300 hover:border-teal-400/60 hover:shadow-2xl hover:shadow-teal-900/10 cursor-pointer"
    >
      <div className="flex flex-col lg:flex-row">

        {/* Left: Image / Visual (55% on desktop) */}
        <div className="relative aspect-[16/10] w-full bg-[#0b1724] lg:aspect-auto lg:w-[55%] min-h-[280px] lg:min-h-[360px]">
          {blog.image ? (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              priority
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 55vw"
            />
          ) : (
            /* Fallback Styled Visual for Featured Article */
            <div className="relative flex h-full min-h-[280px] w-full flex-col justify-between overflow-hidden bg-gradient-to-br from-[#0b1724] via-[#123B5D] to-[#0F766E] p-8 text-white lg:min-h-[380px]">
              <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-teal-400/15 blur-2xl" />
              <div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-slate-900/50 blur-2xl" />

              {/* Background Tech Pattern */}
              <div className="absolute inset-0 bg-[radial-gradient(#2dd4bf_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />

              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-300 backdrop-blur-md">
                  <Sparkles size={14} />
                  <span>Featured Article</span>
                </div>
                <Factory className="h-12 w-12 text-teal-300 opacity-80" />
              </div>

              <div className="relative z-10 my-auto py-6">
                <span className="text-xs font-bold uppercase tracking-widest text-teal-300">
                  {blog.category}
                </span>
                <h3 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl leading-snug">
                  {blog.title}
                </h3>
              </div>

              <div className="relative z-10 text-xs text-teal-200/80">
                Aurevia Healthcare Manufacturing &amp; Quality Series
              </div>
            </div>
          )}
        </div>

        {/* Right: Content (45% on desktop) */}
        <div className="flex flex-1 flex-col justify-between p-6 sm:p-8 lg:w-[45%] lg:p-10">
          <div>
            {/* Featured Badge & Category */}
            <div className="flex items-center gap-3">
              <span className="rounded-md bg-teal-50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#0F766E]">
                FEATURED ARTICLE
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                • {blog.category}
              </span>
            </div>

            {/* Title */}
            <h2 className="mt-4 text-2xl font-extrabold text-slate-900 sm:text-3xl leading-snug transition-colors duration-200 group-hover:text-[#0F766E]">
              {blog.title}
            </h2>

            {/* Description */}
            <p className="mt-4 text-base leading-relaxed text-slate-600 line-clamp-4">
              {blog.excerpt}
            </p>
          </div>

          <div className="mt-8 border-t border-slate-100 pt-6">
            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar size={14} className="text-slate-400" />
                {blog.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} className="text-slate-400" />
                {blog.readTime}
              </span>
            </div>

            {/* Read Button */}
            <span className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#123B5D] px-6 py-3.5 text-sm font-bold text-white transition-all duration-200 group-hover:bg-[#0F766E] group-hover:shadow-md">
              Read Article
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}
