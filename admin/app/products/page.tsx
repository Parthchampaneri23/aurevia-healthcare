"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Package,
    RefreshCw,
    X,
    Upload,
    Loader2,
} from "lucide-react";

type Specification = {
    label: string;
    value: string;
};

type Product = {
    _id: string;
    slug: string;
    name: string;
    category: string;
    image: string;
    shortDescription: string;
    description: string;
    applications?: string[];
    specifications?: Specification[];
    isActive: boolean;
};

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://aurevia-healthcare.onrender.com";

const emptyForm = {
    name: "",
    slug: "",
    category: "",
    shortDescription: "",
    description: "",
    applications: "",
    specifications: "",
    isActive: true,
};

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [status, setStatus] = useState("All");

    const [modalOpen, setModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] =
        useState<Product | null>(null);

    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);

    const [selectedImage, setSelectedImage] =
        useState<File | null>(null);

    // ======================================================
    // TOKEN
    // ======================================================

    const getToken = () => {
        if (typeof window === "undefined") return "";

        return localStorage.getItem("aurevia_admin_token") || "";
    };

    // ======================================================
    // FETCH PRODUCTS
    // ======================================================

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const token = getToken();

            const response = await fetch(
                `${API_URL}/api/products/admin`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    cache: "no-store",
                }
            );

            if (response.status === 401) {
                window.location.href = "/login";
                return;
            }

            if (!response.ok) {
                throw new Error(
                    `Failed to fetch products (${response.status})`
                );
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(
                    data.message || "Failed to fetch products"
                );
            }

            setProducts(data.products || []);
        } catch (err) {
            console.error("Products fetch error:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to load products."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // ======================================================
    // CATEGORIES
    // ======================================================

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(
            new Set(
                products
                    .map((product) => product.category)
                    .filter(Boolean)
            )
        );

        return ["All", ...uniqueCategories];
    }, [products]);

    // ======================================================
    // FILTER
    // ======================================================

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const searchTerm = search.toLowerCase().trim();

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchTerm) ||
                product.category
                    .toLowerCase()
                    .includes(searchTerm);

            const matchesCategory =
                category === "All" ||
                product.category === category;

            const matchesStatus =
                status === "All" ||
                (status === "Active" && product.isActive) ||
                (status === "Inactive" && !product.isActive);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus
            );
        });
    }, [products, search, category, status]);

    // ======================================================
    // SUMMARY
    // ======================================================

    const activeProducts = products.filter(
        (product) => product.isActive
    ).length;

    const inactiveProducts = products.filter(
        (product) => !product.isActive
    ).length;

    // ======================================================
    // IMAGE URL
    // ======================================================

    const getImageUrl = (image: string) => {
        if (!image) return "";

        if (
            image.startsWith("http://") ||
            image.startsWith("https://")
        ) {
            return image;
        }

        let cleanImage = image.trim().replace(/^\/+/, "");

        if (cleanImage.startsWith("uploads/products/")) {
            return `${API_URL}/${cleanImage}`;
        }

        if (cleanImage.startsWith("products/")) {
            return `${API_URL}/uploads/${cleanImage}`;
        }

        return `${API_URL}/uploads/products/${cleanImage}`;
    };

    // ======================================================
    // OPEN ADD MODAL
    // ======================================================

    const openAddModal = () => {
        setEditingProduct(null);
        setForm(emptyForm);
        setSelectedImage(null);
        setError("");
        setModalOpen(true);
    };

    // ======================================================
    // OPEN EDIT MODAL
    // ======================================================

    const openEditModal = (product: Product) => {
        setEditingProduct(product);

        setForm({
            name: product.name || "",
            slug: product.slug || "",
            category: product.category || "",
            shortDescription:
                product.shortDescription || "",
            description: product.description || "",
            applications:
                product.applications?.join("\n") || "",
            specifications:
                product.specifications
                    ?.map(
                        (item) =>
                            `${item.label}: ${item.value}`
                    )
                    .join("\n") || "",
            isActive: product.isActive,
        });

        setSelectedImage(null);
        setError("");
        setModalOpen(true);
    };

    // ======================================================
    // CLOSE MODAL
    // ======================================================

    const closeModal = () => {
        if (saving) return;

        setModalOpen(false);
        setEditingProduct(null);
        setSelectedImage(null);
        setForm(emptyForm);
    };

    // ======================================================
    // SLUG GENERATOR
    // ======================================================

    const generateSlug = (value: string) => {
        return value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    // ======================================================
    // CREATE / UPDATE PRODUCT
    // ======================================================

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setSaving(true);
            setError("");

            const token = getToken();

            if (!token) {
                window.location.href = "/login";
                return;
            }

            const applications = form.applications
                .split("\n")
                .map((item) => item.trim())
                .filter(Boolean);

            const specifications = form.specifications
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean)
                .map((line) => {
                    const separatorIndex = line.indexOf(":");

                    if (separatorIndex === -1) {
                        return {
                            label: line,
                            value: "",
                        };
                    }

                    return {
                        label: line
                            .slice(0, separatorIndex)
                            .trim(),
                        value: line
                            .slice(separatorIndex + 1)
                            .trim(),
                    };
                })
                .filter(
                    (item) => item.label && item.value
                );

            const payload = {
                name: form.name.trim(),
                slug: form.slug.trim(),
                category: form.category.trim(),
                shortDescription:
                    form.shortDescription.trim(),
                description: form.description.trim(),
                applications,
                specifications,
                isActive: form.isActive,
            };

            const url = editingProduct
                ? `${API_URL}/api/products/${editingProduct._id}`
                : `${API_URL}/api/products`;

            const response = await fetch(url, {
                method: editingProduct ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 401) {
                window.location.href = "/login";
                return;
            }

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                    "Failed to save product"
                );
            }

            const savedProduct: Product = data.product;

            // ==================================================
            // IMAGE UPLOAD
            // ==================================================

            if (selectedImage && savedProduct?._id) {
                const imageFormData = new FormData();

                imageFormData.append(
                    "image",
                    selectedImage
                );

                const imageResponse = await fetch(
                    `${API_URL}/api/products/${savedProduct._id}/image`,
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        body: imageFormData,
                    }
                );

                if (imageResponse.status === 401) {
                    window.location.href = "/login";
                    return;
                }

                const imageData =
                    await imageResponse.json();

                if (
                    !imageResponse.ok ||
                    !imageData.success
                ) {
                    throw new Error(
                        imageData.message ||
                        "Product saved but image upload failed"
                    );
                }
            }

            closeModal();
            await fetchProducts();
        } catch (err) {
            console.error("Save product error:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to save product"
            );
        } finally {
            setSaving(false);
        }
    };

    // ======================================================
    // DELETE PRODUCT
    // ======================================================

    const handleDelete = async (product: Product) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${product.name}"?`
        );

        if (!confirmed) return;

        try {
            setError("");

            const token = getToken();

            const response = await fetch(
                `${API_URL}/api/products/${product._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 401) {
                window.location.href = "/login";
                return;
            }

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(
                    data.message ||
                    "Failed to delete product"
                );
            }

            setProducts((current) =>
                current.filter(
                    (item) =>
                        item._id !== product._id
                )
            );
        } catch (err) {
            console.error("Delete product error:", err);

            setError(
                err instanceof Error
                    ? err.message
                    : "Failed to delete product"
            );
        }
    };

    // ======================================================
    // COMMON FORM INPUT CLASS
    // ======================================================

    const inputClass =
        "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10";

    const textareaClass =
        "mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10";

    return (
        <main className="min-h-screen bg-slate-50 p-6 lg:p-8">
            {/* HEADER */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
                        Management
                    </p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Products
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Manage the Aurevia Healthcare product catalogue.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={openAddModal}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123B5D] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0d304b] hover:shadow-md"
                >
                    <Plus size={18} />
                    Add Product
                </button>
            </div>

            {/* SUMMARY */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Total Products
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-900">
                        {products.length}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Active Products
                    </p>

                    <p className="mt-2 text-3xl font-bold text-emerald-600">
                        {activeProducts}
                    </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                        Inactive Products
                    </p>

                    <p className="mt-2 text-3xl font-bold text-slate-500">
                        {inactiveProducts}
                    </p>
                </div>
            </div>

            {/* FILTERS */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search products..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                        />
                    </div>

                    <select
                        value={category}
                        onChange={(event) =>
                            setCategory(event.target.value)
                        }
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-teal-500"
                    >
                        {categories.map((item) => (
                            <option
                                key={item}
                                value={item}
                            >
                                {item === "All"
                                    ? "All Categories"
                                    : item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={status}
                        onChange={(event) =>
                            setStatus(event.target.value)
                        }
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none focus:border-teal-500"
                    >
                        <option value="All">
                            All Status
                        </option>

                        <option value="Active">
                            Active
                        </option>

                        <option value="Inactive">
                            Inactive
                        </option>
                    </select>

                    <button
                        type="button"
                        onClick={fetchProducts}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                        <RefreshCw
                            size={17}
                            className={
                                loading
                                    ? "animate-spin"
                                    : ""
                            }
                        />

                        Refresh
                    </button>
                </div>
            </div>

            {/* ERROR */}
            {error && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                    <p className="text-sm font-semibold text-red-700">
                        {error}
                    </p>
                </div>
            )}

            {/* TABLE */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                    <div>
                        <h2 className="text-lg font-bold text-slate-900">
                            Product Catalogue
                        </h2>

                        <p className="mt-1 text-xs text-slate-500">
                            Showing {filteredProducts.length} of{" "}
                            {products.length} products
                        </p>
                    </div>
                </div>

                {loading ? (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <RefreshCw
                            size={28}
                            className="animate-spin text-teal-600"
                        />
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <div className="text-center">
                            <Package
                                size={40}
                                className="mx-auto text-slate-300"
                            />

                            <h3 className="mt-4 font-semibold text-slate-700">
                                No products found
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                                Try changing your filters or add a new product.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] text-left">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/70">
                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Product
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Category
                                    </th>

                                    <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {filteredProducts.map(
                                    (product) => {
                                        const imageUrl =
                                            getImageUrl(
                                                product.image
                                            );

                                        return (
                                            <tr
                                                key={
                                                    product._id
                                                }
                                                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                                                            {imageUrl ? (
                                                                <img
                                                                    src={
                                                                        imageUrl
                                                                    }
                                                                    alt={
                                                                        product.name
                                                                    }
                                                                    className="h-full w-full object-contain p-1"
                                                                />
                                                            ) : (
                                                                <Package
                                                                    size={
                                                                        20
                                                                    }
                                                                    className="text-slate-300"
                                                                />
                                                            )}
                                                        </div>

                                                        <div>
                                                            <p className="text-sm font-bold text-slate-800">
                                                                {
                                                                    product.name
                                                                }
                                                            </p>

                                                            <p className="mt-1 max-w-md truncate text-xs text-slate-400">
                                                                {
                                                                    product.shortDescription
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                                                        {
                                                            product.category
                                                        }
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${product.isActive
                                                                ? "bg-emerald-50 text-emerald-700"
                                                                : "bg-slate-100 text-slate-500"
                                                            }`}
                                                    >
                                                        <span
                                                            className={`h-1.5 w-1.5 rounded-full ${product.isActive
                                                                    ? "bg-emerald-500"
                                                                    : "bg-slate-400"
                                                                }`}
                                                        />

                                                        {product.isActive
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openEditModal(
                                                                    product
                                                                )
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                                                            title="Edit product"
                                                        >
                                                            <Pencil
                                                                size={
                                                                    16
                                                                }
                                                            />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    product
                                                                )
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                            title="Delete product"
                                                        >
                                                            <Trash2
                                                                size={
                                                                    16
                                                                }
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* ======================================================
                ADD / EDIT MODAL
            ====================================================== */}

            {modalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
                    <div className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    {editingProduct
                                        ? "Edit Product"
                                        : "Add Product"}
                                </h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    {editingProduct
                                        ? "Update product information"
                                        : "Add a new product to the catalogue"}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                disabled={saving}
                                className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form
                            onSubmit={handleSubmit}
                            className="overflow-y-auto"
                        >
                            <div className="grid gap-5 p-6 sm:grid-cols-2">
                                {/* Name */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-900">
                                        Product Name *
                                    </label>

                                    <input
                                        required
                                        value={form.name}
                                        onChange={(event) => {
                                            const value =
                                                event.target.value;

                                            setForm(
                                                (current) => ({
                                                    ...current,
                                                    name: value,
                                                    slug: editingProduct
                                                        ? current.slug
                                                        : generateSlug(
                                                            value
                                                        ),
                                                })
                                            );
                                        }}
                                        placeholder="e.g. Aurevia Paracetamol 500mg"
                                        className={inputClass}
                                    />
                                </div>

                                {/* Slug */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-900">
                                        Slug *
                                    </label>

                                    <input
                                        required
                                        value={form.slug}
                                        onChange={(event) =>
                                            setForm(
                                                (current) => ({
                                                    ...current,
                                                    slug: generateSlug(
                                                        event.target
                                                            .value
                                                    ),
                                                })
                                            )
                                        }
                                        placeholder="product-slug"
                                        className={inputClass}
                                    />
                                </div>

                                {/* Category */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-900">
                                        Category *
                                    </label>

                                    <input
                                        required
                                        value={form.category}
                                        onChange={(event) =>
                                            setForm(
                                                (current) => ({
                                                    ...current,
                                                    category:
                                                        event.target
                                                            .value,
                                                })
                                            )
                                        }
                                        placeholder="Tablets"
                                        className={inputClass}
                                    />
                                </div>

                                {/* Status */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-900">
                                        Status
                                    </label>

                                    <select
                                        value={
                                            form.isActive
                                                ? "active"
                                                : "inactive"
                                        }
                                        onChange={(event) =>
                                            setForm(
                                                (current) => ({
                                                    ...current,
                                                    isActive:
                                                        event.target
                                                            .value ===
                                                        "active",
                                                })
                                            )
                                        }
                                        className={inputClass}
                                    >
                                        <option value="active">
                                            Active
                                        </option>

                                        <option value="inactive">
                                            Inactive
                                        </option>
                                    </select>
                                </div>

                                {/* Short Description */}
                                <div className="sm:col-span-2">
                                    <label className="text-sm font-semibold text-slate-900">
                                        Short Description *
                                    </label>

                                    <input
                                        required
                                        value={
                                            form.shortDescription
                                        }
                                        onChange={(event) =>
                                            setForm(
                                                (current) => ({
                                                    ...current,
                                                    shortDescription:
                                                        event.target
                                                            .value,
                                                })
                                            )
                                        }
                                        placeholder="Short product description"
                                        className={inputClass}
                                    />
                                </div>

                                {/* Description */}
                                <div className="sm:col-span-2">
                                    <label className="text-sm font-semibold text-slate-900">
                                        Description *
                                    </label>

                                    <textarea
                                        required
                                        rows={5}
                                        value={form.description}
                                        onChange={(event) =>
                                            setForm(
                                                (current) => ({
                                                    ...current,
                                                    description:
                                                        event.target
                                                            .value,
                                                })
                                            )
                                        }
                                        placeholder="Detailed product description..."
                                        className={textareaClass}
                                    />
                                </div>

                                {/* Applications */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-900">
                                        Applications
                                    </label>

                                    <textarea
                                        rows={5}
                                        value={form.applications}
                                        onChange={(event) =>
                                            setForm(
                                                (current) => ({
                                                    ...current,
                                                    applications:
                                                        event.target
                                                            .value,
                                                })
                                            )
                                        }
                                        placeholder={
                                            "Pain relief\nFever reduction\nInflammation"
                                        }
                                        className={textareaClass}
                                    />

                                    <p className="mt-1 text-[11px] text-slate-500">
                                        Enter one application per line.
                                    </p>
                                </div>

                                {/* Specifications */}
                                <div>
                                    <label className="text-sm font-semibold text-slate-900">
                                        Specifications
                                    </label>

                                    <textarea
                                        rows={5}
                                        value={
                                            form.specifications
                                        }
                                        onChange={(event) =>
                                            setForm(
                                                (current) => ({
                                                    ...current,
                                                    specifications:
                                                        event.target
                                                            .value,
                                                })
                                            )
                                        }
                                        placeholder={
                                            "Dosage: 500mg\nForm: Tablet\nPack Size: 10 x 10"
                                        }
                                        className={textareaClass}
                                    />

                                    <p className="mt-1 text-[11px] text-slate-500">
                                        Use Label: Value, one per line.
                                    </p>
                                </div>

                                {/* Image */}
                                <div className="sm:col-span-2">
                                    <label className="text-sm font-semibold text-slate-900">
                                        Product Image
                                    </label>

                                    <label className="mt-2 flex cursor-pointer items-center gap-4 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-5 transition hover:border-teal-300 hover:bg-teal-50/30">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">
                                            <Upload size={20} />
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-slate-900">
                                                {selectedImage
                                                    ? selectedImage.name
                                                    : "Choose product image"}
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                JPG, JPEG, PNG or WEBP · Max 5MB
                                            </p>
                                        </div>

                                        <input
                                            type="file"
                                            accept="image/jpeg,image/jpg,image/png,image/webp"
                                            className="hidden"
                                            onChange={(event) =>
                                                setSelectedImage(
                                                    event.target
                                                        .files?.[0] ||
                                                    null
                                                )
                                            }
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={saving}
                                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123B5D] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0d304b] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {saving ? (
                                        <>
                                            <Loader2
                                                size={17}
                                                className="animate-spin"
                                            />
                                            Saving...
                                        </>
                                    ) : editingProduct ? (
                                        <>
                                            <Pencil size={17} />
                                            Update Product
                                        </>
                                    ) : (
                                        <>
                                            <Plus size={17} />
                                            Create Product
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
}