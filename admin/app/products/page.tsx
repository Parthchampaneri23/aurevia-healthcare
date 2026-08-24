"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
    Search,
    Plus,
    Pencil,
    Trash2,
    Package,
    RefreshCw,
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

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [status, setStatus] = useState("All");

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch(`${API_URL}/api/products`);

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.message || "Failed to fetch products");
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
            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                product.category
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =
                category === "All" || product.category === category;

            const matchesStatus =
                status === "All" ||
                (status === "Active" && product.isActive) ||
                (status === "Inactive" && !product.isActive);

            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [products, search, category, status]);

    const activeProducts = products.filter(
        (product) => product.isActive
    ).length;

    const inactiveProducts = products.filter(
        (product) => !product.isActive
    ).length;

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
                        Manage Aurevia Healthcare products and catalogue
                        information.
                    </p>
                </div>

                <button
                    type="button"
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
                    {/* Search */}
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

                    {/* Category */}
                    <select
                        value={category}
                        onChange={(event) => setCategory(event.target.value)}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                    >
                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item === "All"
                                    ? "All Categories"
                                    : item}
                            </option>
                        ))}
                    </select>

                    {/* Status */}
                    <select
                        value={status}
                        onChange={(event) => setStatus(event.target.value)}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10"
                    >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>

                    {/* Refresh */}
                    <button
                        type="button"
                        onClick={fetchProducts}
                        disabled={loading}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <RefreshCw
                            size={17}
                            className={loading ? "animate-spin" : ""}
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
                        className="mt-3 text-sm font-semibold text-red-700 underline underline-offset-2"
                    >
                        Try again
                    </button>
                </div>
            )}

            {/* Products Table */}
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
                                {filteredProducts.map((product) => (
                                    <tr
                                        key={product._id}
                                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                                    >
                                        {/* Product */}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                                                    {product.image ? (
                                                        <Image
                                                            src={product.image}
                                                            alt={product.name}
                                                            fill
                                                            className="object-contain p-1"
                                                            sizes="56px"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center">
                                                            <Package
                                                                size={20}
                                                                className="text-slate-300"
                                                            />
                                                        </div>
                                                    )}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">
                                                        {product.name}
                                                    </p>

                                                    <p className="mt-1 max-w-md truncate text-xs text-slate-400">
                                                        {product.shortDescription}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Category */}
                                        <td className="px-6 py-4">
                                            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600">
                                                {product.category}
                                            </span>
                                        </td>

                                        {/* Status */}
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

                                        {/* Actions */}
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    type="button"
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
                                                    title="Edit product"
                                                >
                                                    <Pencil size={16} />
                                                </button>

                                                <button
                                                    type="button"
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                                                    title="Delete product"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    );
}