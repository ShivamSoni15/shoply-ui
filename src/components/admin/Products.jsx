
import React, { useMemo, useState } from "react";
import {
  Search,
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
  Pencil,
  Trash2,
  X,
  Package,
  ImagePlus,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  Eye,
} from "lucide-react";

const initialProducts = [
  {
    id: 1,
    name: "Classic Sneakers",
    category: "Footwear",
    price: 2499,
    stock: 45,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=160&h=160&fit=crop",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 3999,
    stock: 12,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=160&h=160&fit=crop",
  },
  {
    id: 3,
    name: "Premium Wrist Watch",
    category: "Accessories",
    price: 1899,
    stock: 0,
    status: "Out of Stock",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=160&h=160&fit=crop",
  },
  {
    id: 4,
    name: "Leather Handbag",
    category: "Accessories",
    price: 2799,
    stock: 28,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=160&h=160&fit=crop",
  },
  {
    id: 5,
    name: "Casual Cotton T-Shirt",
    category: "Fashion",
    price: 899,
    stock: 7,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=160&h=160&fit=crop",
  },
  {
    id: 6,
    name: "Running Sports Shoes",
    category: "Footwear",
    price: 3199,
    stock: 0,
    status: "Out of Stock",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=160&h=160&fit=crop",
  },
  {
    id: 7,
    name: "Smart Watch",
    category: "Electronics",
    price: 4599,
    stock: 19,
    status: "Active",
    image:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=160&h=160&fit=crop",
  },
];

const emptyForm = {
  name: "",
  category: "Fashion",
  price: "",
  stock: "",
  image: "",
};

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);

function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [notice, setNotice] = useState("");

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (search.trim()) {
      const query = search.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          String(product.id).includes(query)
      );
    }

    if (categoryFilter !== "All") {
      result = result.filter(
        (product) => product.category === categoryFilter
      );
    }

    if (stockFilter === "In Stock") {
      result = result.filter((product) => product.stock > 0);
    } else if (stockFilter === "Out of Stock") {
      result = result.filter((product) => product.stock === 0);
    } else if (stockFilter === "Low Stock") {
      result = result.filter(
        (product) => product.stock > 0 && product.stock <= 10
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "stock") {
      result.sort((a, b) => a.stock - b.stock);
    } else {
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [products, search, categoryFilter, stockFilter, sortBy]);

  const totalStock = products.reduce(
    (total, product) => total + product.stock,
    0
  );

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      image: product.image,
    });
    setErrors({});
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProduct(null);
    setFormData(emptyForm);
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    const price = Number(formData.price);
    const stock = Number(formData.stock);

    if (formData.name.trim().length < 3) {
      newErrors.name = "Product name must contain at least 3 characters.";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category.";
    }

    if (formData.price === "" || !Number.isFinite(price) || price <= 0) {
      newErrors.price = "Enter a valid price greater than 0.";
    }

    if (
      formData.stock === "" ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      newErrors.stock = "Enter a valid whole number (0 or more).";
    }

    if (
      formData.image.trim() &&
      !/^https?:\/\/\S+$/i.test(formData.image.trim())
    ) {
      newErrors.image = "Enter a valid image URL starting with http or https.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const cleanProduct = {
      name: formData.name.trim(),
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      status: Number(formData.stock) > 0 ? "Active" : "Out of Stock",
      image: formData.image.trim() || "",
    };

    if (editingProduct) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingProduct.id
            ? { ...product, ...cleanProduct }
            : product
        )
      );

      console.log("Product updated:", {
        id: editingProduct.id,
        ...cleanProduct,
      });
      setNotice("Product updated successfully.");
    } else {
      const newProduct = {
        id: Math.max(0, ...products.map((product) => product.id)) + 1,
        ...cleanProduct,
      };

      setProducts((current) => [newProduct, ...current]);

      console.log("Product added:", cleanProduct);
      setNotice("Product added successfully.");
    }

    closeModal();
  };

  const handleDelete = () => {
    if (!deleteProduct) return;

    setProducts((current) =>
      current.filter((product) => product.id !== deleteProduct.id)
    );

    console.log("Product deleted:", {
      id: deleteProduct.id,
      name: deleteProduct.name,
    });

    setNotice("Product deleted successfully.");
    setDeleteProduct(null);
  };

  const clearFilters = () => {
    setSearch("");
    setCategoryFilter("All");
    setStockFilter("All");
    setSortBy("newest");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Store management
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Products
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your store inventory and product details.
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
          >
            <Plus size={18} />
            Add New Product
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Total Products
              </p>
              <span className="rounded-xl bg-violet-100 p-2.5 text-violet-600">
                <Package size={20} />
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">
              {products.length}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Products in your catalogue
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Available Stock
              </p>
              <span className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600">
                <CheckCircle2 size={20} />
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">
              {totalStock}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Total units available
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Out of Stock
              </p>
              <span className="rounded-xl bg-red-100 p-2.5 text-red-600">
                <AlertCircle size={20} />
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">
              {products.filter((product) => product.stock === 0).length}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Products needing restock
            </p>
          </div>
        </div>

        {/* Notification */}
        {notice && (
          <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              {notice}
            </span>
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Filters */}
        <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by product name, category or ID..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:w-auto">
              <div className="relative">
                <SlidersHorizontal
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={categoryFilter}
                  onChange={(event) => setCategoryFilter(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-8 text-sm text-slate-600 outline-none focus:border-violet-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Footwear">Footwear</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <select
                  value={stockFilter}
                  onChange={(event) => setStockFilter(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-3 pr-8 text-sm text-slate-600 outline-none focus:border-violet-500"
                >
                  <option value="All">All Stock</option>
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <ArrowUpDown
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-8 text-sm text-slate-600 outline-none focus:border-violet-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="stock">Stock: Low to High</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredProducts.length}
              </span>{" "}
              of {products.length} products
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-semibold text-violet-600 hover:text-violet-800"
            >
              Clear filters
            </button>
          </div>
        </section>

        {/* Product table */}
        <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <h2 className="font-bold text-slate-900">All Products</h2>
            <p className="mt-1 text-xs text-slate-500">
              View and manage your product catalogue
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <Package size={42} className="text-slate-300" />
              <h3 className="mt-4 font-semibold text-slate-800">
                No products found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm font-semibold text-violet-600"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Product</th>
                    <th className="px-6 py-4 font-semibold">Category</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Stock</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Package
                                size={22}
                                className="text-slate-400"
                              />
                            )}
                          </div>
                          <div>
                            <p className="whitespace-nowrap text-sm font-semibold text-slate-800">
                              {product.name}
                            </p>
                            <p className="mt-1 text-xs text-slate-400">
                              ID: #{String(product.id).padStart(4, "0")}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {product.category}
                      </td>

                      <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                        {formatPrice(product.price)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`text-sm font-semibold ${
                            product.stock === 0
                              ? "text-red-600"
                              : product.stock <= 10
                                ? "text-amber-600"
                                : "text-slate-700"
                          }`}
                        >
                          {product.stock} units
                        </span>
                        {product.stock > 0 && product.stock <= 10 && (
                          <p className="mt-1 text-xs text-amber-600">
                            Low stock
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                            product.stock === 0
                              ? "bg-red-50 text-red-700"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {product.stock === 0 ? "Out of Stock" : "Active"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            title="Edit product"
                            aria-label={`Edit ${product.name}`}
                            onClick={() => openEditModal(product)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-violet-50 hover:text-violet-600"
                          >
                            <Pencil size={17} />
                          </button>
                          <button
                            type="button"
                            title="Delete product"
                            aria-label={`Delete ${product.name}`}
                            onClick={() => setDeleteProduct(product)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* Add / Edit Product Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="product-modal-title"
            className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2
                  id="product-modal-title"
                  className="text-lg font-bold text-slate-900"
                >
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Enter the product information below.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5 sm:p-6">
              <div>
                <label
                  htmlFor="product-name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Product Name *
                </label>
                <input
                  id="product-name"
                  type="text"
                  value={formData.name}
                  onChange={(event) =>
                    setFormData({ ...formData, name: event.target.value })
                  }
                  placeholder="Enter product name"
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-100 ${
                    errors.name
                      ? "border-red-400"
                      : "border-slate-200 focus:border-violet-500"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="product-category"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Category *
                  </label>
                  <select
                    id="product-category"
                    value={formData.category}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        category: event.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  >
                    <option value="Fashion">Fashion</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Footwear">Footwear</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="product-price"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Price (₹) *
                  </label>
                  <input
                    id="product-price"
                    type="number"
                    min="1"
                    step="1"
                    value={formData.price}
                    onChange={(event) =>
                      setFormData({ ...formData, price: event.target.value })
                    }
                    placeholder="2499"
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-100 ${
                      errors.price
                        ? "border-red-400"
                        : "border-slate-200 focus:border-violet-500"
                    }`}
                  />
                  {errors.price && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.price}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="product-stock"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Stock Quantity *
                </label>
                <input
                  id="product-stock"
                  type="number"
                  min="0"
                  step="1"
                  value={formData.stock}
                  onChange={(event) =>
                    setFormData({ ...formData, stock: event.target.value })
                  }
                  placeholder="Enter available quantity"
                  className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-violet-100 ${
                    errors.stock
                      ? "border-red-400"
                      : "border-slate-200 focus:border-violet-500"
                  }`}
                />
                {errors.stock && (
                  <p className="mt-1 text-xs text-red-600">{errors.stock}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="product-image"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Product Image URL
                </label>
                <div className="relative">
                  <ImagePlus
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    id="product-image"
                    type="url"
                    value={formData.image}
                    onChange={(event) =>
                      setFormData({ ...formData, image: event.target.value })
                    }
                    placeholder="https://example.com/product.jpg"
                    className={`w-full rounded-xl border py-3 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-violet-100 ${
                      errors.image
                        ? "border-red-400"
                        : "border-slate-200 focus:border-violet-500"
                    }`}
                  />
                </div>
                {errors.image && (
                  <p className="mt-1 text-xs text-red-600">{errors.image}</p>
                )}
                <p className="mt-1 text-xs text-slate-400">
                  Optional. Use a publicly accessible image URL.
                </p>
              </div>

              {formData.image.trim() &&
                /^https?:\/\/\S+$/i.test(formData.image.trim()) && (
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                    <img
                      src={formData.image}
                      alt="Product preview"
                      className="h-16 w-16 rounded-lg object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                    <p className="text-xs text-slate-500">
                      Image preview
                    </p>
                  </div>
                )}

              <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
                >
                  {editingProduct ? "Save Changes" : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteProduct && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Trash2 size={22} />
            </div>
            <h2
              id="delete-title"
              className="mt-4 text-lg font-bold text-slate-900"
            >
              Delete this product?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-slate-800">
                {deleteProduct.name}
              </span>
              ? This action will remove it from this demo product list.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteProduct(null)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
