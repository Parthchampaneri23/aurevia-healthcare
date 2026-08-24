"use client";

import { useEffect, useMemo, useState } from "react";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Package,
    RefreshCw,
    X,
    Upload,
} from "lucide-react";

type Product = {
    _id: string;
    slug: string;
    name: string;
    category: string;
    image: string;
    shortDescription: string;
    description: string;
    applications?: string[];
    specifications?: {
        label: string;
        value: string;
    }[];
    isActive: boolean;
};

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://aurevia-healthcare.onrender.com";

const CATEGORY_OPTIONS = [
    "Tablets",
    "Capsules",
    "Syrups",
    "Injectables",
    "Ointments & Creams",
    "Nutraceuticals",
];

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [status, setStatus] = useState("All");

    // Add product modal
    const [showAddModal, setShowAddModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [formError, setFormError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        slug: "",
        category: "Tablets",
        shortDescription: "",
        description: "",
        applications: "",
        isActive: true,
    });

    const [imageFile, setImageFile] = useState<File | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                `${API_URL}/api/products/admin`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch products");
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
                "Unable to load products. Please check that the backend is running."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(
            new Set(products.map((product) => product.category))
        );

        return ["All", ...uniqueCategories];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const searchTerm = search.toLowerCase();

            const matchesSearch =
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm);

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

    const activeProducts = products.filter(
        (product) => product.isActive
    ).length;

    const inactiveProducts = products.filter(
        (product) => !product.isActive
    ).length;

    const getImageUrl = (image: string) => {
        if (!image) {
            return "";
        }

        if (
            image.startsWith("http://") ||
            image.startsWith("https://")
        ) {
            return image;
        }

        let cleanImage = image.trim();

        cleanImage = cleanImage.replace(/^\/+/, "");

        if (cleanImage.startsWith("uploads/products/")) {
            return `${API_URL}/${cleanImage}`;
        }

        if (cleanImage.startsWith("products/")) {
            return `${API_URL}/uploads/${cleanImage}`;
        }

        return `${API_URL}/uploads/products/${cleanImage}`;
    };

    const handleFormChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const generateSlug = (name: string) => {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "");
    };

    const handleNameChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const name = event.target.value;

        setFormData((previous) => ({
            ...previous,
            name,
            slug: generateSlug(name),
        }));
    };

    const resetForm = () => {
        setFormData({
            name: "",
            slug: "",
            category: "Tablets",
            shortDescription: "",
            description: "",
            applications: "",
            isActive: true,
        });

        setImageFile(null);
        setFormError("");
    };

    const closeAddModal = () => {
        if (submitting) return;

        setShowAddModal(false);
        resetForm();
    };

    const handleCreateProduct = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        try {
            setSubmitting(true);
            setFormError("");

            if (!formData.name.trim()) {
                throw new Error("Product name is required.");
            }

            if (!formData.slug.trim()) {
                throw new Error("Product slug is required.");
            }

            if (!formData.shortDescription.trim()) {
                throw new Error(
                    "Short description is required."
                );
            }

            if (!formData.description.trim()) {
                throw new Error(
                    "Product description is required."
                );
            }

            const applications = formData.applications
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);

            // 1. Create product
            const createResponse = await fetch(
                `${API_URL}/api/products`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: formData.name.trim(),
                        slug: formData.slug.trim(),
                        category: formData.category,
                        shortDescription:
                            formData.shortDescription.trim(),
                        description:
                            formData.description.trim(),
                        applications,
                        specifications: [],
                        isActive: formData.isActive,
                    }),
                }
            );

            const createData = await createResponse.json();

            if (!createResponse.ok || !createData.success) {
                throw new Error(
                    createData.message ||
                    "Failed to create product."
                );
            }

            const createdProduct = createData.product;

            // 2. Upload image if selected
            if (imageFile && createdProduct?._id) {
                const uploadData = new FormData();

                uploadData.append("image", imageFile);

                const uploadResponse = await fetch(
                    `${API_URL}/api/products/${createdProduct._id}/image`,
                    {
                        method: "POST",
                        body: uploadData,
                    }
                );

                const uploadResult =
                    await uploadResponse.json();

                if (
                    !uploadResponse.ok ||
                    !uploadResult.success
                ) {
                    throw new Error(
                        uploadResult.message ||
                        "Product created but image upload failed."
                    );
                }
            }

            // 3. Close modal
            setShowAddModal(false);
            resetForm();

            // 4. Reload products
            await fetchProducts();
        } catch (err) {
            console.error("Create product error:", err);

            setFormError(
                err instanceof Error
                    ? err.message
                    : "Failed to create product."
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-teal-600">
                        Management
                    </p>

                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                        Products
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Manage Aurevia Healthcare products and
                        catalogue information.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        resetForm();
                        setShowAddModal(true);
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123B5D] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#0d304b] hover:shadow-md"
                >
                    <Plus size={18} />
                    Add Product
                </button>
            </div>

            {/* Summary Cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Total Products
                            </p>

                            <p className="mt-2 text-3xl font-bold text-slate-900">
                                {products.length}
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
                            <Package size={21} />
                        </div>
                    </div>
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

            {/* Filters */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search products..."
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                        />
                    </div>

                    <select
                        value={category}
                        onChange={(event) =>
                            setCategory(event.target.value)
                        }
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-500"
                    >
                        {categories.map((item) => (
                            <option key={item} value={item}>
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
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-500"
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    <button
                        type="button"
                        onClick={fetchProducts}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <RefreshCw
                            size={17}
                            className={
                                loading ? "animate-spin" : ""
                            }
                        />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5">
                    <p className="text-sm font-semibold text-red-700">
                        {error}
                    </p>

                    <button
                        type="button"
                        onClick={fetchProducts}
                        className="mt-3 text-sm font-semibold text-red-700 underline"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Products Table */}
            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-6 py-5">
                    <h2 className="text-lg font-bold text-slate-900">
                        Product Catalogue
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                        Showing {filteredProducts.length} of{" "}
                        {products.length} products
                    </p>
                </div>

                {loading ? (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <div className="text-center">
                            <RefreshCw
                                size={28}
                                className="mx-auto animate-spin text-teal-600"
                            />

                            <p className="mt-3 text-sm text-slate-500">
                                Loading products...
                            </p>
                        </div>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="flex min-h-[300px] items-center justify-center px-6">
                        <div className="text-center">
                            <Package
                                size={40}
                                className="mx-auto text-slate-300"
                            />

                            <h3 className="mt-4 text-base font-semibold text-slate-700">
                                No products found
                            </h3>

                            <p className="mt-1 text-sm text-slate-400">
                                Try changing your search or filters.
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
                                {filteredProducts.map((product) => {
                                    const imageUrl =
                                        getImageUrl(product.image);

                                    return (
                                        <tr
                                            key={product._id}
                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                                                        {imageUrl ? (
                                                            <img
                                                                src={imageUrl}
                                                                alt={
                                                                    product.name
                                                                }
                                                                className="h-full w-full object-contain p-1"
                                                            />
                                                        ) : (
                                                            <Package
                                                                size={20}
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
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                                                        title="Edit product"
                                                    >
                                                        <Pencil
                                                            size={16}
                                                        />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                        title="Delete product"
                                                    >
                                                        <Trash2
                                                            size={16}
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* =====================================================
                ADD PRODUCT MODAL
            ====================================================== */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
                    <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-6 py-5">
                            <div>
                                <h2 className="text-xl font-bold text-slate-900">
                                    Add New Product
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Add a new product to the Aurevia catalogue.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeAddModal}
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Form */}
                        <form
                            onSubmit={handleCreateProduct}
                            className="space-y-5 p-6"
                        >
                            {formError && (
                                <div className="rounded-xl border border-red-200 bg-red-50 p-4">
                                    <p className="text-sm font-semibold text-red-700">
                                        {formError}
                                    </p>
                                </div>
                            )}

                            {/* Name */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Product Name *
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleNameChange}
                                    placeholder="e.g. Paracetamol 500mg"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                                    required
                                />
                            </div>

                            {/* Slug */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Slug *
                                </label>

                                <input
                                    type="text"
                                    name="slug"
                                    value={formData.slug}
                                    onChange={handleFormChange}
                                    placeholder="paracetamol-500mg"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                                    required
                                />

                                <p className="mt-1 text-xs text-slate-400">
                                    Automatically generated from the product name.
                                </p>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Category *
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleFormChange}
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500 focus:bg-white"
                                >
                                    {CATEGORY_OPTIONS.map(
                                        (item) => (
                                            <option
                                                key={item}
                                                value={item}
                                            >
                                                {item}
                                            </option>
                                        )
                                    )}
                                </select>
                            </div>

                            {/* Short Description */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Short Description *
                                </label>

                                <textarea
                                    name="shortDescription"
                                    value={
                                        formData.shortDescription
                                    }
                                    onChange={handleFormChange}
                                    rows={3}
                                    placeholder="Short product description..."
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Full Description *
                                </label>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleFormChange}
                                    rows={5}
                                    placeholder="Detailed product description..."
                                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                                    required
                                />
                            </div>

                            {/* Applications */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Applications
                                </label>

                                <input
                                    type="text"
                                    name="applications"
                                    value={formData.applications}
                                    onChange={handleFormChange}
                                    placeholder="Pain relief, Fever, Inflammation"
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-teal-500 focus:bg-white focus:ring-2 focus:ring-teal-500/10"
                                />

                                <p className="mt-1 text-xs text-slate-400">
                                    Separate multiple applications with commas.
                                </p>
                            </div>

                            {/* Image */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-slate-700">
                                    Product Image
                                </label>

                                <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 px-6 py-8 text-center transition hover:border-teal-300 hover:bg-teal-50/30">
                                    <Upload
                                        size={28}
                                        className="text-teal-600"
                                    />

                                    <p className="mt-3 text-sm font-semibold text-slate-700">
                                        {imageFile
                                            ? imageFile.name
                                            : "Choose product image"}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        JPG, JPEG, PNG or WEBP
                                    </p>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(event) => {
                                            const file =
                                                event.target
                                                    .files?.[0];

                                            if (file) {
                                                setImageFile(file);
                                            }
                                        }}
                                    />
                                </label>
                            </div>

                            {/* Active */}
                            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                                <input
                                    type="checkbox"
                                    checked={formData.isActive}
                                    onChange={(event) =>
                                        setFormData(
                                            (previous) => ({
                                                ...previous,
                                                isActive:
                                                    event.target
                                                        .checked,
                                            })
                                        )
                                    }
                                    className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                                />

                                <div>
                                    <p className="text-sm font-semibold text-slate-700">
                                        Active Product
                                    </p>

                                    <p className="text-xs text-slate-400">
                                        Product will be visible on the website.
                                    </p>
                                </div>
                            </label>

                            {/* Buttons */}
                            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={closeAddModal}
                                    disabled={submitting}
                                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#123B5D] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#0d304b] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {submitting ? (
                                        <>
                                            <RefreshCw
                                                size={17}
                                                className="animate-spin"
                                            />
                                            Creating...
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