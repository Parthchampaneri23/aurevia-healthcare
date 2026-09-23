import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag,
  User,
  Bookmark,
  Building2,
  Mail,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { getBlogBySlug, getRelatedBlogs, blogs } from "@/app/data/blogData";
import BlogCard from "@/app/components/blog/BlogCard";
import BlogCTA from "@/app/components/blog/BlogCTA";
import BlogFAQ, { defaultBlogDetailFAQs } from "@/app/components/blog/BlogFAQ";
import Breadcrumb from "@/app/components/common/Breadcrumb";
import ArticleInteractive, { PrevNextNav } from "@/app/components/blog/ArticleInteractive";

interface BlogArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found | Aurevia Healthcare",
    };
  }

  return {
    title: `${blog.title} | Aurevia Healthcare`,
    description: blog.seo.metaDescription,
    keywords: blog.seo.keywords,
    openGraph: {
      title: blog.seo.metaTitle,
      description: blog.seo.metaDescription,
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author.name],
    },
  };
}

function processArticleHtml(html: string) {
  const headings: { id: string; text: string; level: number }[] = [];
  let index = 0;

  const processedHtml = html.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (match, levelStr, attrs, content) => {
    const level = parseInt(levelStr, 10);
    const text = content.replace(/<[^>]+>/g, "").trim();
    const slug = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    const id = `section-${slug || index++}`;

    headings.push({ id, text, level });

    if (attrs.includes("id=")) {
      return match;
    }
    return `<h${level} id="${id}" ${attrs}>${content}</h${level}>`;
  });

  return { processedHtml, headings };
}

function getBlogKeyTakeaways(slug: string) {
  switch (slug) {
    case "understanding-modern-pharmaceutical-manufacturing-processes":
      return [
        { title: "Continuous Dosage Processing", desc: "Granulation kinetics and automated rotary compression exceeding 200,000 units/hr", link: "/blog/how-technology-is-shaping-pharmaceutical-manufacturing#section-step-by-step-smart-manufacturing-workflow", linkLabel: "Smart Workflow Section" },
        { title: "Cleanroom HVAC Sterility", desc: "ISO 5 to ISO 8 positive pressure air cascades preventing cross-contamination", link: "/blog/importance-of-gmp-practices-in-pharmaceutical-manufacturing#section-2-facility-engineering-hvac-environmental-controls", linkLabel: "Cleanroom Controls Section" },
        { title: "Analytical Quality Verification", desc: "In-process checks (IPQC) and batch release monograph assay testing", link: "/blog/why-quality-control-matters-in-pharmaceutical-manufacturing#section-step-by-step-in-process-quality-check-ipqc-sequence", linkLabel: "IPQC Testing Sequence" },
        { title: "Commercial Formulations Catalog", desc: "WHO-GMP solid oral tablets, capsules, and liquid suspensions", link: "/products#explore", linkLabel: "View Formulations Catalog" },
      ];
    case "why-quality-control-matters-in-pharmaceutical-manufacturing":
      return [
        { title: "Analytical Assay Purity", desc: "HPLC, GC, and spectrophotometric testing verifying active drug potency", link: "/blog/role-of-rd-in-pharmaceutical-formulation-development#section-advanced-drug-delivery-considerations", linkLabel: "Analytical Validation Section" },
        { title: "Microbiological Assurance", desc: "TAMC, TYMC limit testing and pyrogen-free LAL water loop monitoring", link: "/blog/importance-of-gmp-practices-in-pharmaceutical-manufacturing#section-1-people-cleanroom-hygiene-standards", linkLabel: "Hygiene Standards Section" },
        { title: "In-Process Check Sequence", desc: "Weight variation, hardness, friability, and dissolution profiling every 30-60 mins", link: "/blog/understanding-modern-pharmaceutical-manufacturing-processes#section-sequential-stages-in-modern-pharmaceutical-processing", linkLabel: "Processing Stages Section" },
        { title: "Accredited Plant Governance", desc: "WHO-GMP & ISO certified manufacturing facilities with full dossier support", link: "/about#quality-certifications", linkLabel: "Aurevia Plant Certifications" },
      ];
    case "role-of-rd-in-pharmaceutical-formulation-development":
      return [
        { title: "Pre-Formulation Characterization", desc: "pH-solubility profiling, DSC thermal analysis, and excipient compatibility", link: "/blog/why-quality-control-matters-in-pharmaceutical-manufacturing#section-1-instrumental-analytical-verification", linkLabel: "Analytical Verification Section" },
        { title: "Statistical DoE Optimization", desc: "Screening binders, disintegrants, and film coatings for targeted drug release", link: "/blog/understanding-modern-pharmaceutical-manufacturing-processes#section-core-processing-considerations-for-technical-integrity", linkLabel: "Processing Integrity Section" },
        { title: "Bio-Availability Engineering", desc: "Solid dispersions and SEDDS for poorly soluble BCS Class II & IV compounds", link: "/blog/how-technology-is-shaping-pharmaceutical-manufacturing#section-2-process-analytical-technology-pat-real-time-monitoring", linkLabel: "PAT Real-Time Section" },
        { title: "In-House Scientific Consultation", desc: "Tailored formulation development, stability testing, and CTD dossiers", link: "/contact#contact-form", linkLabel: "Formulation R&D Consultation" },
      ];
    case "choosing-the-right-pharmaceutical-manufacturing-partner":
      return [
        { title: "5-Step CDMO Audit Roadmap", desc: "Technical site inspection, cGMP verification, and API supply chain audit", link: "/blog/importance-of-gmp-practices-in-pharmaceutical-manufacturing#section-key-considerations-for-total-quality-governance", linkLabel: "Quality Governance Section" },
        { title: "High-Capacity Infrastructure", desc: "Class 100,000 cleanrooms and high-speed automated packaging machinery", link: "/blog/understanding-modern-pharmaceutical-manufacturing-processes#section-environmental-sterility-cleanroom-engineering", linkLabel: "Cleanroom Engineering Section" },
        { title: "Smart Serialization & Security", desc: "2D DataMatrix track-and-trace printing and 21 CFR Part 11 batch records", link: "/blog/how-technology-is-shaping-pharmaceutical-manufacturing#section-data-integrity-smart-manufacturing-compliance", linkLabel: "Data Integrity Section" },
        { title: "B2B Contract Manufacturing", desc: "Flexible batch capacity and turnkey manufacturing for healthcare brand owners", link: "/industries#industry-segments", linkLabel: "B2B Industry Segments" },
      ];
    case "importance-of-gmp-practices-in-pharmaceutical-manufacturing":
      return [
        { title: "Aseptic Cleanroom Cascades", desc: "Positive pressure differentials, air showers, and strict operator gowning", link: "/blog/understanding-modern-pharmaceutical-manufacturing-processes#section-environmental-sterility-cleanroom-engineering", linkLabel: "Sterility & Cleanrooms Section" },
        { title: "Equipment Qualification Lifecycle", desc: "Design, Installation, Operational, and Performance Qualification (DQ/IQ/OQ/PQ)", link: "/blog/why-quality-control-matters-in-pharmaceutical-manufacturing#section-step-by-step-in-process-quality-check-ipqc-sequence", linkLabel: "IPQC Sequence Section" },
        { title: "Digital Batch Integrity", desc: "SCADA automated data logging and Corrective & Preventive Action (CAPA) tracking", link: "/blog/choosing-the-right-pharmaceutical-manufacturing-partner#section-critical-evaluation-factors-for-cdmo-cmo-selection", linkLabel: "CDMO Evaluation Section" },
        { title: "WHO-GMP & ISO Facilities", desc: "State-of-the-art accredited plant delivering safe, pure, and effective medicines", link: "/about#quality-certifications", linkLabel: "Certified Plant Section" },
      ];
    case "how-technology-is-shaping-pharmaceutical-manufacturing":
      return [
        { title: "Automated Visual Inspection", desc: "AI-driven high-speed optical cameras evaluating 100% of dosage units", link: "/blog/understanding-modern-pharmaceutical-manufacturing-processes#section-sequential-stages-in-modern-pharmaceutical-processing", linkLabel: "Processing Sequence Section" },
        { title: "Process Analytical Technology (PAT)", desc: "Inline Near-Infrared (NIR) spectroscopy monitoring powder blend uniformity", link: "/blog/why-quality-control-matters-in-pharmaceutical-manufacturing#section-1-instrumental-analytical-verification", linkLabel: "Analytical Verification Section" },
        { title: "Smart Packaging & Serialization", desc: "Integrated cartoning, leaflet insertion, and 2D DataMatrix barcode security", link: "/blog/role-of-rd-in-pharmaceutical-formulation-development#section-advanced-drug-delivery-considerations", linkLabel: "Drug Delivery Section" },
        { title: "Product Formulations Portfolio", desc: "High-potency solid oral tablets, capsules, and syrups manufactured under cGMP", link: "/products#explore", linkLabel: "View Products Section" },
      ];
    default:
      return [
        { title: "Pharmaceutical Manufacturing", desc: "Advanced continuous processing and cleanroom dosage engineering", link: "/blog/understanding-modern-pharmaceutical-manufacturing-processes#section-sequential-stages-in-modern-pharmaceutical-processing", linkLabel: "Manufacturing Section" },
        { title: "Quality Control & Compliance", desc: "HPLC analytical verification, microbial limit testing, and WHO-GMP standards", link: "/blog/why-quality-control-matters-in-pharmaceutical-manufacturing#section-the-pillars-of-pharmaceutical-quality-control", linkLabel: "Quality Control Section" },
        { title: "Formulation R&D Services", desc: "Pre-formulation characterization, stability studies, and bio-equivalence", link: "/blog/role-of-rd-in-pharmaceutical-formulation-development#section-structured-phases-of-formulation-rd", linkLabel: "Formulation R&D Section" },
        { title: "CDMO Partnering", desc: "Turnkey contract manufacturing solutions for global healthcare brands", link: "/industries#industry-segments", linkLabel: "Industry Segments Section" },
      ];
  }
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = getRelatedBlogs(blog.slug, 3);
  const currentIndex = blogs.findIndex((b) => b.slug === blog.slug);
  const prevBlog = currentIndex > 0 ? blogs[currentIndex - 1] : undefined;
  const nextBlog = currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : undefined;

  const { processedHtml, headings } = processArticleHtml(blog.content);

  // Schema.org Article JSON-LD for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.excerpt,
    "image": blog.image ? [blog.image] : ["/blogs/Blog-banner.png"],
    "author": {
      "@type": "Person",
      "name": blog.author.name,
      "jobTitle": blog.author.role,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Aurevia Healthcare",
      "url": "https://aurevia-healthcare-one.vercel.app/",
    },
    "datePublished": blog.date,
    "articleSection": blog.category,
    "keywords": blog.tags.join(", "),
  };

  const displayBannerImage = blog.image || "/blogs/Blog-banner.png";

  return (
    <>
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 min-h-screen">

        {/* Minimal Height Top Hero Banner */}
        <section className="relative w-full overflow-hidden bg-slate-950 min-h-[240px] sm:min-h-[280px] lg:min-h-[310px] flex items-center py-8 sm:py-10">
          <Image
            src="/blogs/Blog-banner.png"
            alt={blog.title}
            fill
            priority
            unoptimized={true}
            className="object-cover object-center sm:object-[center_35%]"
            sizes="100vw"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#071E33]/90 via-[#071E33]/75 to-[#123B5D]/40" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl text-left text-white">

              {/* Eyebrow Pill */}
              <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-3.5 py-1 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" aria-hidden="true" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300">
                  Aurevia Healthcare Insights
                </span>
              </div>

              {/* Banner Heading */}
              <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
                Blogs &amp; Insights
              </h1>

              {/* Breadcrumb Navigation */}
              <div className="mt-3">
                <Breadcrumb
                  items={[
                    { name: "Blogs & Insights", href: "/blog" },
                    { name: blog.title },
                  ]}
                />
              </div>

            </div>
          </div>
        </section>

        {/* Main Article Reading Container */}
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-12">

          {/* Back to Blog link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#123B5D] transition-colors duration-200 hover:text-[#0F766E]"
            >
              <ArrowLeft size={16} />
              <span>Back to All Insights</span>
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-12">

            {/* Left Content Area (8 Cols) */}
            <article className="lg:col-span-8">

              {/* Article Main Header Block */}
              <header className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-block rounded-full bg-teal-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0F766E] border border-teal-200/60">
                    {blog.category}
                  </span>
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
                  {blog.title}
                </h1>

                {/* Article Metadata Row */}
                <div className="mt-5 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 border-y border-slate-200 py-3.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <User size={14} className="text-[#0F766E]" />
                    <span>{blog.author.name}</span>
                    <span className="font-normal text-slate-500">({blog.author.role})</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <Calendar size={14} className="text-[#0F766E]" />
                    <span>{blog.date}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <Clock size={14} className="text-[#0F766E]" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </header>

              {/* Featured Article Image */}
              <div className="relative mb-10 overflow-hidden rounded-3xl border border-slate-200/90 bg-slate-900 shadow-xl aspect-[16/9] w-full">
                <Image
                  src={displayBannerImage}
                  alt={blog.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 820px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-white">
                  <span className="rounded-md bg-[#0F766E]/90 backdrop-blur-md px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                    Pharmaceutical Knowledge Base
                  </span>
                  <span className="text-xs font-medium text-slate-200 hidden sm:inline-block">
                    WHO-GMP Compliant Manufacturing Insight
                  </span>
                </div>
              </div>

              {/* Lead Excerpt & Key Takeaways Box with Internal Links & Bullet Points */}
              <div className="mb-10 overflow-hidden rounded-3xl border border-teal-200/80 bg-gradient-to-br from-white via-teal-50/40 to-slate-50 p-6 sm:p-8 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#0F766E] text-white">
                    <CheckCircle2 size={16} />
                  </span>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#123B5D]">
                    Article Overview &amp; Executive Summary
                  </h3>
                </div>

                <p className="text-base sm:text-lg font-semibold leading-relaxed text-slate-900 border-b border-teal-100 pb-5">
                  {blog.excerpt}
                </p>

                {/* Key Takeaways & Internal Resource Bullet Points */}
                <div className="mt-5">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#0F766E] mb-3">
                    Key Article Takeaways &amp; Quick Links:
                  </h4>
                  <ul className="grid gap-3 sm:grid-cols-2 text-xs sm:text-sm">
                    {getBlogKeyTakeaways(blog.slug).map((item, idx) => (
                      <li
                        key={idx}
                        className="flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-4 shadow-2xs hover:border-[#0F766E] hover:shadow-md transition-all"
                      >
                        <div>
                          <span className="font-bold text-[#123B5D] flex items-center gap-1.5 mb-1.5">
                            <span className="h-2 w-2 rounded-full bg-[#0F766E]" />
                            {item.title}
                          </span>
                          <p className="text-slate-600 text-xs leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                        <Link
                          href={item.link}
                          className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#0F766E] hover:text-[#123B5D] hover:underline"
                        >
                          <span>🔗 {item.linkLabel}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Article Content Container */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm">
                <div
                  className="prose max-w-none text-slate-900
                    prose-headings:font-extrabold prose-headings:text-[#123B5D] prose-headings:tracking-tight
                    prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3 prose-h2:scroll-mt-24
                    prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-h3:text-[#123B5D] prose-h3:scroll-mt-24
                    prose-p:text-[17px] prose-p:leading-[1.8] prose-p:text-slate-800 prose-p:my-5 prose-p:font-normal
                    prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 
                    prose-li:my-2.5 prose-li:text-slate-800 prose-li:leading-relaxed prose-li:font-normal
                    prose-strong:text-slate-900 prose-strong:font-bold"
                  dangerouslySetInnerHTML={{ __html: processedHtml }}
                />

                {/* Article Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-6">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 mr-2">
                      <Tag size={14} className="text-[#0F766E]" />
                      Keywords &amp; Tags:
                    </span>
                    {blog.tags.map((tag) => (
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

              {/* Previous / Next Article Navigation */}
              <PrevNextNav prevBlog={prevBlog} nextBlog={nextBlog} />

            </article>

            {/* Right Sidebar (4 Cols) */}
            <aside className="space-y-8 lg:col-span-4">

              {/* Interactive Features: Scroll Progress, Dynamic TOC, Share Controls */}
              <ArticleInteractive
                headings={headings}
                articleTitle={blog.title}
                prevBlog={prevBlog}
                nextBlog={nextBlog}
              />

              {/* Article Overview / Specifications Card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#123B5D] border-b border-slate-100 pb-3">
                  <Bookmark size={16} className="text-[#0F766E]" />
                  Article Overview
                </h3>

                <ul className="mt-4 space-y-3.5 text-xs sm:text-sm">
                  <li className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-600 font-medium">Category</span>
                    <span className="font-bold text-[#0F766E]">{blog.category}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-600 font-medium">Published Date</span>
                    <span className="font-bold text-slate-900">{blog.date}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-slate-600 font-medium">Estimated Read</span>
                    <span className="font-bold text-slate-900">{blog.readTime}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-600 font-medium">Compliance</span>
                    <span className="font-bold text-teal-700 flex items-center gap-1">
                      <ShieldCheck size={14} /> WHO-GMP
                    </span>
                  </li>
                </ul>
              </div>

              {/* Author Profile Card */}
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-[#071E33] to-[#123B5D] p-6 text-white shadow-md">
                <span className="rounded-full bg-teal-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-teal-300 border border-teal-400/30">
                  AUTHOR PROFILE
                </span>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0F766E] font-bold text-white text-base">
                    {blog.author.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">
                      {blog.author.name}
                    </h4>
                    <p className="text-xs text-teal-200">
                      {blog.author.role}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-slate-300 border-t border-white/10 pt-3">
                  Key contributor in pharmaceutical manufacturing processes, quality compliance, and technical research at Aurevia Healthcare.
                </p>
              </div>

              {/* Contract Manufacturing Inquiry Box */}
              <div className="rounded-3xl border border-teal-200 bg-teal-50/70 p-6 text-slate-900 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  <Building2 size={16} />
                  Contract Manufacturing
                </div>

                <h4 className="mt-2 text-base font-bold text-[#123B5D]">
                  Need Custom Pharmaceutical Formulations?
                </h4>

                <p className="mt-2 text-xs text-slate-700 leading-relaxed">
                  Aurevia Healthcare provides high-capacity tablet, capsule, and oral liquid contract manufacturing under strict WHO-GMP compliance.
                </p>

                <Link
                  href="/contact#contact-form"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#123B5D] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#0F766E]"
                >
                  <Mail size={15} />
                  Contact Manufacturing Team
                </Link>
              </div>

            </aside>

          </div>

          {/* Related Articles Section */}
          {relatedBlogs.length > 0 && (
            <section className="mt-20 border-t border-slate-200 pt-14">
              <div className="mb-10 text-center">
                <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0F766E]">
                  CONTINUE READING
                </span>
                <h2 className="mt-2 text-2xl font-extrabold text-slate-900 sm:text-3xl">
                  Related Insights
                </h2>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedBlogs.map((relatedBlog) => (
                  <BlogCard key={relatedBlog.id} blog={relatedBlog} />
                ))}
              </div>
            </section>
          )}

          {/* Business CTA */}
          <BlogCTA />

          {/* Article Specific FAQ Section */}
          <BlogFAQ
            faqs={defaultBlogDetailFAQs}
            title="Article FAQs &amp; Technical Insights"
            subtitle="Common questions regarding pharmaceutical standards, compliance, and formulation specifications discussed in this article."
          />

        </div>
      </div>
    </>
  );
}
