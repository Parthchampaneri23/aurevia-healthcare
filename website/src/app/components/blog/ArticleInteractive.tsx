"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Copy, Check, Mail, ArrowLeft, ArrowRight, List, Share2 } from "lucide-react";
import { BlogPost } from "@/app/data/blogData";

interface ArticleHeading {
  id: string;
  text: string;
  level: number;
}

interface ArticleInteractiveProps {
  headings: ArticleHeading[];
  articleTitle: string;
  prevBlog?: BlogPost;
  nextBlog?: BlogPost;
}

export default function ArticleInteractive({
  headings,
  articleTitle,
  prevBlog,
  nextBlog,
}: ArticleInteractiveProps) {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeHeadingId, setActiveHeadingId] = useState<string>("");

  // Reading progress indicator & active TOC highlight
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }

      // Active heading highlight
      if (headings.length > 0) {
        for (let i = headings.length - 1; i >= 0; i--) {
          const el = document.getElementById(headings[i].id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 140) {
              setActiveHeadingId(headings[i].id);
              break;
            }
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleLinkedInShare = () => {
    if (typeof window !== "undefined") {
      const url = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(articleTitle);
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${url}&title=${title}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  const handleEmailShare = () => {
    if (typeof window !== "undefined") {
      const subject = encodeURIComponent(`Aurevia Insights: ${articleTitle}`);
      const body = encodeURIComponent(
        `I thought you might find this pharmaceutical insight from Aurevia Healthcare relevant:\n\n${articleTitle}\n${window.location.href}`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -100;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-slate-200/50">
        <div
          className="h-full bg-gradient-to-r from-[#123B5D] via-[#0F766E] to-teal-400 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Interactive Sidebar Sections: TOC & Share */}
      <div className="space-y-6">

        {/* Table of Contents */}
        {headings.length > 1 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#123B5D] border-b border-slate-100 pb-3">
              <List size={16} className="text-[#0F766E]" />
              Table of Contents
            </h3>
            <nav className="mt-4">
              <ul className="space-y-2.5 text-xs font-medium text-slate-600">
                {headings.map((h, idx) => {
                  const isActive = activeHeadingId === h.id;
                  return (
                    <li key={h.id} style={{ paddingLeft: h.level === 3 ? "0.85rem" : "0" }}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(h.id)}
                        className={`text-left transition-all duration-200 cursor-pointer hover:text-[#0F766E] flex items-start gap-2 ${
                          isActive
                            ? "font-bold text-[#0F766E] translate-x-1"
                            : "text-slate-600"
                        }`}
                      >
                        <span className="text-[10px] font-bold text-slate-400 mt-0.5">
                          0{idx + 1}
                        </span>
                        <span className="line-clamp-2">{h.text}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}

        {/* Article Share Component */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#123B5D] border-b border-slate-100 pb-3">
            <Share2 size={16} className="text-[#0F766E]" />
            Share Article
          </h3>
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 py-2.5 px-3 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-teal-600" />
                  <span className="text-teal-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleLinkedInShare}
              aria-label="Share on LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#0A66C2] text-white hover:bg-[#084e96] transition-all cursor-pointer"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.64a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24Z" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleEmailShare}
              aria-label="Share via Email"
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#123B5D] text-white hover:bg-[#0F766E] transition-all cursor-pointer"
            >
              <Mail size={15} />
            </button>
          </div>
        </div>

      </div>
    </>
  );
}

export function PrevNextNav({ prevBlog, nextBlog }: { prevBlog?: BlogPost; nextBlog?: BlogPost }) {
  if (!prevBlog && !nextBlog) return null;

  return (
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-200 pt-8">
      {prevBlog ? (
        <Link
          href={`/blog/${prevBlog.slug}`}
          className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-[#0F766E] hover:shadow-md"
        >
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#0F766E]">
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Previous Article
          </span>
          <span className="mt-2 text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-[#0F766E]">
            {prevBlog.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {nextBlog ? (
        <Link
          href={`/blog/${nextBlog.slug}`}
          className="group flex flex-col items-end text-right rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-[#0F766E] hover:shadow-md sm:col-start-2"
        >
          <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#0F766E]">
            Next Article
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
          </span>
          <span className="mt-2 text-sm font-bold text-slate-900 line-clamp-2 group-hover:text-[#0F766E]">
            {nextBlog.title}
          </span>
        </Link>
      ) : null}
    </div>
  );
}
