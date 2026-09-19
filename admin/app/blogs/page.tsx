"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  FileText,
  RefreshCw,
  X,
  Upload,
  Loader2,
  ArrowLeft,
  Globe,
  ExternalLink,
  LogOut,
} from "lucide-react";
import {
  getAdminBlogs,
  saveAdminBlogs,
  BlogArticle,
  initialBlogsData,
} from "../lib/adminBlogsStorage";
import AdminShell from "@/components/AdminShell";

const inputStyle = "w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/10 focus:outline-none";

const emptyForm = {
  title: "",
  slug: "",
  category: "Pharmaceutical Manufacturing",
  image: "",
  excerpt: "",
  content: "",
  authorName: "Aurevia Editorial Team",
  authorRole: "Healthcare Insights",
  date: "September 19, 2026",
  readTime: "5 min read",
  tags: "Pharmaceutical, Healthcare, WHO-GMP",
  featured: false,
  published: true,
  metaTitle: "",
  metaDescription: "",
  metaKeywords: "",
  canonicalUrl: "",
  schema: "",
};

export default function AdminBlogsPage() {
  const router = useRouter();

  const [blogs, setBlogs] = useState<BlogArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogArticle | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("aurevia_admin_token");
    if (!token) {
      router.replace("/login");
      return;
    }
    setBlogs(getAdminBlogs());
    setLoading(false);
  }, [router]);

  const categories = [
    "All",
    "Pharmaceutical Manufacturing",
    "Quality & Compliance",
    "Research & Development",
    "Industry Insights",
  ];

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(search.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(search.toLowerCase()) ||
        blog.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || blog.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [blogs, search, category]);

  const handleCreateNew = () => {
    setEditingBlog(null);
    setForm(emptyForm);
    setSelectedImage(null);
    setImagePreview("");
    setModalOpen(true);
  };

  const handleEditBlog = (blog: BlogArticle) => {
    setEditingBlog(blog);
    setSelectedImage(null);
    setImagePreview(blog.image || "");
    setForm({
      title: blog.title || "",
      slug: blog.slug || "",
      category: blog.category || "Pharmaceutical Manufacturing",
      image: blog.image || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      authorName: blog.authorName || "Aurevia Editorial Team",
      authorRole: blog.authorRole || "Healthcare Insights",
      date: blog.date || "September 19, 2026",
      readTime: blog.readTime || "5 min read",
      tags: blog.tags ? blog.tags.join(", ") : "",
      featured: blog.featured || false,
      published: blog.published !== false,
      metaTitle:
        blog.seo?.metaTitle ||
        `${blog.title || "Blog Article"} | Aurevia Healthcare`,
      metaDescription:
        blog.seo?.metaDescription ||
        (blog.excerpt || `Latest article by Aurevia Healthcare on ${blog.title}`).slice(0, 160),
      metaKeywords:
        blog.seo?.metaKeywords ||
        [blog.title, blog.category, "Aurevia Healthcare", "Pharmaceutical"]
          .filter(Boolean)
          .join(", "),
      canonicalUrl:
        blog.seo?.canonicalUrl ||
        `https://aureviahealthcare.com/blog/${blog.slug || ""}`,
      schema: blog.seo?.schema || "",
    });
    setModalOpen(true);
  };

  const handleDeleteBlog = (id: string) => {
    if (confirm("Are you sure you want to delete this blog article?")) {
      const updated = blogs.filter((b) => b.id !== id);
      setBlogs(updated);
      saveAdminBlogs(updated);
    }
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setForm((prev) => ({ ...prev, image: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const tagsArray = form.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const finalImage = imagePreview || form.image || "/blogs/blog-pharmaceutical-manufacturing.jpg";

    const updatedBlog: BlogArticle = {
      id: editingBlog ? editingBlog.id : `blog-${Date.now()}`,
      title: form.title.trim(),
      slug:
        form.slug.trim() ||
        form.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
      category: form.category,
      image: finalImage,
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      authorName: form.authorName.trim(),
      authorRole: form.authorRole.trim(),
      date: form.date.trim(),
      readTime: form.readTime.trim(),
      tags: tagsArray,
      featured: form.featured,
      published: form.published,
      seo: {
        metaTitle: form.metaTitle.trim(),
        metaDescription: form.metaDescription.trim(),
        metaKeywords: form.metaKeywords.trim(),
        canonicalUrl: form.canonicalUrl.trim(),
        schema: form.schema.trim(),
      },
    };

    let updatedList: BlogArticle[];
    if (editingBlog) {
      updatedList = blogs.map((b) => (b.id === editingBlog.id ? updatedBlog : b));
    } else {
      updatedList = [updatedBlog, ...blogs];
    }

    setBlogs(updatedList);
    saveAdminBlogs(updatedList);
    setSaving(false);
    setModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("aurevia_admin_token");
    localStorage.removeItem("aurevia_admin_user");
    router.replace("/login");
  };

  return (
    <AdminShell>
      <div className="space-y-6">
        {/* HEADER TOP BAR */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 mb-2">
              <FileText size={13} className="text-teal-700" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700">
                Insights & Articles
              </span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Blogs & Articles Management
            </h1>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Create, edit, and publish blogs, research articles, and industry insights on the website.
            </p>
          </div>

          <button
            type="button"
            onClick={handleCreateNew}
            className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-teal-700"
          >
            <Plus size={16} />
            Add Blog Article
          </button>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              size={17}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search blog articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-10 pr-4 text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:border-teal-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-900 focus:border-teal-600 focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ARTICLES GRID */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <RefreshCw className="animate-spin text-teal-600" size={24} />
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-slate-300" />
            <p className="mt-4 text-base font-bold text-slate-800">
              No blog articles found
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Try adjusting your search or category filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                onClick={() => handleEditBlog(blog)}
                className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_2px_10px_rgba(15,23,42,0.03)] transition duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg"
              >
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="rounded-full bg-slate-900/80 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
                      {blog.category}
                    </span>
                    {blog.featured && (
                      <span className="rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-bold text-white">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <p className="text-[11px] font-medium text-slate-500">
                    {blog.date} • {blog.readTime}
                  </p>

                  <h3 className="mt-2 text-base font-bold text-slate-900 line-clamp-2 group-hover:text-teal-700 transition">
                    {blog.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-700">
                      By {blog.authorName}
                    </span>

                    <span className="text-xs font-bold text-teal-600 group-hover:underline">
                      Edit Article →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* EDIT / CREATE MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-lg font-bold text-slate-900">
                  {editingBlog ? "Edit Blog Article" : "Add New Blog Article"}
                </h3>

                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-5 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Article Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      placeholder="e.g. Understanding Modern Pharmaceutical Manufacturing"
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Category *
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value })}
                      className={inputStyle}
                    >
                      {categories.filter((c) => c !== "All").map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Author Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.authorName}
                      onChange={(e) => setForm({ ...form, authorName: e.target.value })}
                      className={inputStyle}
                    />
                  </div>

                  {/* IMAGE UPLOAD FILE INPUT */}
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Blog Featured Image *
                    </label>

                    {imagePreview && (
                      <div className="mb-3 relative h-44 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center">
                        <img
                          src={imagePreview}
                          alt="Blog preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}

                    <label className="flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-4 transition hover:border-teal-400 hover:bg-teal-50/30">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-teal-700 shadow-sm">
                        <Upload size={18} />
                      </div>

                      <div className="flex-1">
                        <p className="text-xs font-bold text-slate-900">
                          {selectedImage ? selectedImage.name : "Choose blog image file"}
                        </p>
                        <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                          PNG, JPG, JPEG or WEBP · Max 5MB
                        </p>
                      </div>

                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp"
                        className="hidden"
                        onChange={handleImageFileChange}
                      />
                    </label>

                    <div className="mt-2">
                      <input
                        type="text"
                        value={form.image}
                        onChange={(e) => {
                          setForm({ ...form, image: e.target.value });
                          setImagePreview(e.target.value);
                        }}
                        placeholder="Or paste relative image path e.g. /blogs/blog-pharmaceutical-manufacturing.jpg"
                        className={inputStyle}
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Short Excerpt *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={form.excerpt}
                      onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                      placeholder="Brief overview of the article..."
                      className={inputStyle}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Full Article Description / Content *
                    </label>
                    <textarea
                      rows={8}
                      required
                      value={form.content}
                      onChange={(e) => setForm({ ...form, content: e.target.value })}
                      placeholder="Detailed content of the article..."
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Author Role
                    </label>
                    <input
                      type="text"
                      value={form.authorRole}
                      onChange={(e) => setForm({ ...form, authorRole: e.target.value })}
                      className={inputStyle}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-bold text-slate-900">
                      Read Time
                    </label>
                    <input
                      type="text"
                      value={form.readTime}
                      onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                      className={inputStyle}
                    />
                  </div>
                </div>

                {/* SEO SETTINGS */}
                <div className="border-t border-slate-200 pt-4">
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-teal-700">
                    SEO & Metadata
                  </h4>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        value={form.metaTitle}
                        onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                        className={inputStyle}
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        Meta Description
                      </label>
                      <input
                        type="text"
                        value={form.metaDescription}
                        onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                        className={inputStyle}
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        Meta Keywords
                      </label>
                      <input
                        type="text"
                        value={form.metaKeywords}
                        onChange={(e) => setForm({ ...form, metaKeywords: e.target.value })}
                        className={inputStyle}
                      />
                    </div>

                    <div>
                      <label className="mb-1 block text-xs font-bold text-slate-900">
                        Canonical URL
                      </label>
                      <input
                        type="text"
                        value={form.canonicalUrl}
                        onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
                        className={inputStyle}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    {editingBlog && (
                      <button
                        type="button"
                        onClick={() => {
                          handleDeleteBlog(editingBlog.id);
                          setModalOpen(false);
                        }}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-100 transition"
                      >
                        <Trash2 size={15} />
                        Delete Article
                      </button>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setModalOpen(false)}
                      className="rounded-xl border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-teal-700 disabled:opacity-50"
                    >
                      {saving && <Loader2 size={14} className="animate-spin" />}
                      {editingBlog ? "Save Article" : "Create Article"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}

