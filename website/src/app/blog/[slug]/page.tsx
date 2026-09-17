import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
  ChevronRight,
  Calendar,
  Clock,
  ArrowLeft,
  Factory,
  ShieldCheck,
  Microscope,
  FlaskConical,
  Share2,
  Tag,
  User,
  CheckCircle2,
  Bookmark,
  Building2,
  Mail
} from "lucide-react";
import { getBlogBySlug, getRelatedBlogs, blogs } from "@/app/data/blogData";
import BlogCard from "@/app/components/blog/BlogCard";
import BlogCTA from "@/app/components/blog/BlogCTA";
import Breadcrumb from "@/app/components/common/Breadcrumb";

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

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = getRelatedBlogs(blog.slug, 3);

  // Schema.org Article JSON-LD for rich snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.excerpt,
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

  // Determine effective article image (using provided Blog-banner.png if blog.image is blank)
  const displayBannerImage = blog.image || "/blogs/Blog-banner.png";

  return (
    <>
      {/* Schema.org Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 min-h-screen">

        {/* Top Hero Banner with Blog-banner.png */}
        <section className="relative h-[240px] w-full overflow-hidden sm:h-[280px] lg:h-[320px] flex items-center">
          {/* Background Banner Image (Bright, crisp, no dulling opacity or mix-blend) */}
          <Image
            src="/blogs/Blog-banner.png"
            alt={blog.title}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />

          {/* Subtle Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-900/50 to-transparent" />

          <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="max-w-3xl">

              {/* Eyebrow Pill */}
              <div className="mb-2.5 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-950/60 px-3.5 py-1 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
                <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-teal-300">
                  INSIGHTS &amp; KNOWLEDGE
                </span>
              </div>

              {/* Standard Banner Heading */}
              <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-4xl lg:text-5xl">
                Blogs &amp; Insights
              </h1>

              {/* Breadcrumb Navigation */}
              <Breadcrumb
                items={[
                  { name: "Blogs & Insights", href: "/blog" },
                  { name: blog.title },
                ]}
              />

            </div>
          </div>
        </section>

        {/* Article Body Section */}
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-12">

          {/* Back to Blog link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#123B5D] transition hover:text-[#0F766E]"
            >
              <ArrowLeft size={16} />
              Back to All Insights
            </Link>
          </div>

          <div className="grid gap-12 lg:grid-cols-12">

            {/* Left Content Area (8 Cols) */}
            <article className="lg:col-span-8">

              {/* Article Main Title & Category Header */}
              <div className="mb-8">
                <span className="inline-block rounded-full bg-teal-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#0F766E] mb-3">
                  {blog.category}
                </span>

                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
                  {blog.title}
                </h1>

                {/* Meta Row */}
                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-500 border-y border-slate-200 py-3">
                  <div className="flex items-center gap-1.5 font-bold text-slate-800">
                    <User size={14} className="text-[#0F766E]" />
                    <span>{blog.author.name}</span>
                    <span className="font-normal text-slate-400">({blog.author.role})</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} className="text-slate-400" />
                    <span>{blog.date}</span>
                  </div>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-slate-400" />
                    <span>{blog.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Featured Banner Image */}
              <div className="relative mb-10 overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-xl aspect-[16/9] w-full">
                <Image
                  src={displayBannerImage}
                  alt={blog.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 800px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                  <span className="rounded-md bg-[#0F766E] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                    Aurevia Healthcare Insights
                  </span>
                  <span className="text-xs font-medium text-slate-200">
                    Pharmaceutical Excellence
                  </span>
                </div>
              </div>

              {/* Short Excerpt / Lead Paragraph in Dark Bold Text */}
              <div className="mb-8 rounded-2xl border-l-4 border-[#0F766E] bg-white p-6 shadow-sm">
                <p className="text-lg font-semibold leading-relaxed text-slate-900">
                  {blog.excerpt}
                </p>
              </div>

              {/* Main Article Body with Pure Black/Dark Text */}
              <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-10 shadow-sm">
                <div
                  className="prose max-w-none 
                    text-black
                    prose-headings:font-bold prose-headings:text-[#123B5D] prose-headings:tracking-tight
                    prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-2xl prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3
                    prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-xl prose-h3:text-[#123B5D]
                    prose-p:text-base prose-p:leading-relaxed prose-p:text-black prose-p:my-5 prose-p:font-normal
                    prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6 
                    prose-li:my-2.5 prose-li:text-black prose-li:leading-relaxed prose-li:font-normal
                    prose-strong:text-black prose-strong:font-bold"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                {/* Article Tags */}
                {blog.tags && blog.tags.length > 0 && (
                  <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-6">
                    <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-700 mr-2">
                      <Tag size={14} className="text-[#0F766E]" />
                      Category Tags:
                    </span>
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-lg border border-slate-200 bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-900"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </article>

            {/* Right Sidebar (4 Cols) */}
            <aside className="space-y-8 lg:col-span-4">

              {/* Article Overview Card */}
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
                  <Bookmark size={18} className="text-[#0F766E]" />
                  Article Specifications
                </h3>

                <ul className="mt-4 space-y-4 text-xs sm:text-sm">
                  <li className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-slate-700 font-medium">Category</span>
                    <span className="font-bold text-[#0F766E]">{blog.category}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-slate-700 font-medium">Published Date</span>
                    <span className="font-bold text-slate-900">{blog.date}</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-slate-700 font-medium">Reading Time</span>
                    <span className="font-bold text-slate-900">{blog.readTime}</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-slate-700 font-medium">Compliance Standard</span>
                    <span className="font-bold text-teal-700">WHO-GMP &amp; ISO</span>
                  </li>
                </ul>
              </div>

              {/* Author Info Box */}
              <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-[#0b1724] to-[#123B5D] p-6 text-white shadow-md">
                <span className="rounded-full bg-teal-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-teal-300">
                  WRITTEN BY
                </span>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 font-bold text-white text-lg">
                    {blog.author.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">
                      {blog.author.name}
                    </h4>
                    <p className="text-xs text-teal-200">
                      {blog.author.role}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-slate-300 border-t border-white/10 pt-3">
                  Expert contributor in pharmaceutical manufacturing operations, analytical quality control, and WHO-GMP compliance at Aurevia Healthcare.
                </p>
              </div>

              {/* Manufacturing Inquiry Widget */}
              <div className="rounded-3xl border border-teal-200 bg-teal-50/70 p-6 text-slate-900 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  <Building2 size={16} />
                  Contract Manufacturing
                </div>

                <h4 className="mt-2 text-lg font-bold text-[#123B5D]">
                  Need Custom Formulation or Third-Party Manufacturing?
                </h4>

                <p className="mt-2 text-xs text-slate-800 leading-relaxed">
                  Aurevia Healthcare provides high-capacity tablet, capsule, syrup, and injectable contract manufacturing services under strict cGMP protocols.
                </p>

                <Link
                  href="/contact#contact-form"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#123B5D] px-4 py-3 text-xs font-bold text-white transition hover:bg-[#0F766E]"
                >
                  <Mail size={15} />
                  Request Manufacturing Quote
                </Link>
              </div>

            </aside>

          </div>

          {/* Related Articles Section */}
          {relatedBlogs.length > 0 && (
            <section className="mt-20 border-t border-slate-200 pt-16">
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

          {/* Final Business CTA */}
          <BlogCTA />

        </div>
      </div>
    </>
  );
}
