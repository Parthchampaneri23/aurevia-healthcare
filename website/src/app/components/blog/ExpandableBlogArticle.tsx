"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown, ChevronUp, BookOpen, Tag } from "lucide-react";

interface ExpandableBlogArticleProps {
    htmlContent: string;
    tags?: string[];
}

export default function ExpandableBlogArticle({
    htmlContent,
    tags,
}: ExpandableBlogArticleProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 1. Auto expand if URL already has a hash on initial load
        if (typeof window !== "undefined" && window.location.hash) {
            setIsExpanded(true);
        }

        // 2. Event listener for custom expand event (e.g. from Table of Contents or internal links)
        const handleExpandEvent = (e: Event) => {
            setIsExpanded(true);
            const customEvent = e as CustomEvent<{ targetId?: string }>;
            if (customEvent.detail?.targetId) {
                const targetId = customEvent.detail.targetId;
                setTimeout(() => {
                    const el = document.getElementById(targetId);
                    if (el) {
                        const yOffset = -100;
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: "smooth" });
                    }
                }, 60);
            }
        };

        // 3. Hash change listener (e.g. navigating to #section-...)
        const handleHashChange = () => {
            if (window.location.hash) {
                setIsExpanded(true);
                const targetId = window.location.hash.substring(1);
                setTimeout(() => {
                    const el = document.getElementById(targetId);
                    if (el) {
                        const yOffset = -100;
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: "smooth" });
                    }
                }, 60);
            }
        };

        // 4. Intercept internal anchor link clicks within document
        const handleAnchorClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest("a");
            if (target && target.hash) {
                setIsExpanded(true);
                const targetId = target.hash.substring(1);
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    e.preventDefault();
                    setTimeout(() => {
                        const yOffset = -100;
                        const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: "smooth" });
                    }, 50);
                }
            }
        };

        window.addEventListener("expand-blog-article", handleExpandEvent);
        window.addEventListener("hashchange", handleHashChange);
        document.addEventListener("click", handleAnchorClick);

        return () => {
            window.removeEventListener("expand-blog-article", handleExpandEvent);
            window.removeEventListener("hashchange", handleHashChange);
            document.removeEventListener("click", handleAnchorClick);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative">
            {/* Article Content Container */}
            <div
                className={`transition-all duration-700 ease-in-out ${
                    !isExpanded ? "max-h-[560px] overflow-hidden" : "max-h-none"
                }`}
            >
                <div
                    className="prose max-w-none text-slate-900
                        prose-headings:font-extrabold prose-headings:text-[#123B5D] prose-headings:tracking-tight
                        prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3 prose-h2:scroll-mt-24
                        prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-h3:text-[#123B5D] prose-h3:scroll-mt-24
                        prose-p:text-[17px] prose-p:leading-[1.8] prose-p:text-slate-800 prose-p:my-5 prose-p:font-normal
                        prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 
                        prose-li:my-2.5 prose-li:text-slate-800 prose-li:leading-relaxed prose-li:font-normal
                        prose-strong:text-slate-900 prose-strong:font-bold"
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                />

                {/* Article Tags */}
                {tags && tags.length > 0 && (
                    <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-6">
                        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 mr-2">
                            <Tag size={14} className="text-[#0F766E]" />
                            Keywords &amp; Tags:
                        </span>
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-lg border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Gradient Overlay & Aurevia-Themed Read More Button when collapsed */}
            {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end pt-36 pb-4 bg-gradient-to-t from-white via-white/95 to-transparent rounded-b-3xl z-20">
                    <button
                        type="button"
                        onClick={() => setIsExpanded(true)}
                        className="group cursor-pointer inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#0F766E] to-[#123B5D] px-8 py-4 text-sm font-extrabold text-white shadow-xl shadow-teal-950/20 transition-all duration-300 hover:from-[#123B5D] hover:to-[#0F766E] hover:shadow-2xl hover:scale-105 active:scale-95 border border-teal-400/30"
                    >
                        <BookOpen size={18} className="text-teal-200" />
                        <span>Read More</span>
                        <ChevronDown size={18} className="transition-transform duration-300 group-hover:translate-y-1 text-teal-200" />
                    </button>
                </div>
            )}

            {/* Show Less Button when expanded */}
            {isExpanded && (
                <div className="mt-8 flex justify-center border-t border-slate-100 pt-6">
                    <button
                        type="button"
                        onClick={() => setIsExpanded(false)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-2.5 text-xs font-bold text-slate-700 hover:border-[#0F766E] hover:text-[#0F766E] transition-all cursor-pointer active:scale-95 shadow-2xs"
                    >
                        <span>Show Less</span>
                        <ChevronUp size={16} />
                    </button>
                </div>
            )}
        </div>
    );
}
