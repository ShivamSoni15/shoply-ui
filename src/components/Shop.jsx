
import React, { useMemo, useState } from "react";
import ShoplyHeroVisual from "./ShoplyHeroVisual";

import {
  Search,
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  Star,
  X,
  ArrowUpDown,
  ShoppingCart,
  CheckCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from "lucide-react";
const products = [
  {
    id: 1,
    name: "Premium Everyday Sneakers",
    category: "Fashion",
    price: 2499,
    oldPrice: 3299,
    rating: 4.8,
    reviews: 124,
    badge: "BESTSELLER",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=85",
  },
  {
    id: 2,
    name: "Minimalist Smart Watch",
    category: "Electronics",
    price: 3999,
    oldPrice: 4999,
    rating: 4.7,
    reviews: 98,
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=85",
  },
  {
    id: 3,
    name: "Classic Leather Handbag",
    category: "Accessories",
    price: 1899,
    oldPrice: 2499,
    rating: 4.9,
    reviews: 86,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&q=85",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2799,
    oldPrice: 3499,
    rating: 4.6,
    reviews: 152,
    badge: "TRENDING",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=85",
  },
  {
    id: 5,
    name: "Modern Casual Jacket",
    category: "Fashion",
    price: 2199,
    oldPrice: 2899,
    rating: 4.8,
    reviews: 76,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700&q=85",
  },
  {
    id: 6,
    name: "Elegant Sunglasses",
    category: "Accessories",
    price: 999,
    oldPrice: 1499,
    rating: 4.5,
    reviews: 63,
    badge: "SALE",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&q=85",
  },
  {
    id: 7,
    name: "Modern Running Shoes",
    category: "Fashion",
    price: 2999,
    oldPrice: 3799,
    rating: 4.7,
    reviews: 109,
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=700&q=85",
  },
  {
    id: 8,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 1599,
    oldPrice: 2199,
    rating: 4.6,
    reviews: 91,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700&q=85",
  },
  {
    id: 9,
    name: "Stylish Wrist Watch",
    category: "Accessories",
    price: 1799,
    oldPrice: 2299,
    rating: 4.7,
    reviews: 72,
    badge: "NEW",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700&q=85",
  },
  {
    id: 10,
    name: "Comfort Casual T-Shirt",
    category: "Fashion",
    price: 799,
    oldPrice: 1099,
    rating: 4.5,
    reviews: 58,
    badge: "SALE",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=700&q=85",
  },
  {
    id: 11,
    name: "Premium Backpack",
    category: "Accessories",
    price: 1499,
    oldPrice: 1999,
    rating: 4.8,
    reviews: 83,
    badge: "POPULAR",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&q=85",
  },
  {
    id: 12,
    name: "Wireless Earbuds",
    category: "Electronics",
    price: 1299,
    oldPrice: 1799,
    rating: 4.6,
    reviews: 117,
    badge: "TRENDING",
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=700&q=85",
  },
];

const categories = [
  "All",
  "Fashion",
  "Electronics",
  "Accessories",
];

function Shop() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || product.category === category;

      const matchesPrice = product.price <= maxPrice;

      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, category, sortBy, maxPrice]);

  const toggleWishlist = (id) => {
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const addToCart = (product) => {
    setCart((previous) => [...previous, product]);
    console.log("Added to cart:", product.name);
    setCartMessage(`${product.name} added to your demo cart!`);
    window.setTimeout(() => setCartMessage(""), 2500);
  };

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSortBy("featured");
    setMaxPrice(5000);
  };

  const formatPrice = (price) =>
    `₹${price.toLocaleString("en-IN")}`;

  return (
    <div className="min-h-screen bg-[#fbf9ff]">

      {/* Shop Hero */}
     
{/* SHOP HERO SECTION */}
        <section className="relative mx-2 mt-4 overflow-hidden rounded-[28px] bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-700 px-6 py-12 text-white sm:px-10 lg:px-12 lg:py-14">

          <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">

            <div className="relative z-10">

              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase">
                <Sparkles size={15} />
                Discover Your Style
              </span>

              <h1 className="mt-7 text-4xl font-extrabold leading-tight sm:text-5xl">
                Explore Our
                <span className="block text-purple-200">
                  Amazing Products
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-purple-100 sm:text-base">
                Discover quality products, explore exciting collections
                and find everything you need in one shopping destination.
              </p>

              <a
                href="#shop-products"
                className="mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-purple-800 transition hover:-translate-y-1 hover:bg-purple-50"
              >
                Start Shopping
                <ArrowRight size={18} />
              </a>

              <div className="mt-10 flex flex-wrap gap-8 border-t border-white/20 pt-7">
                <div>
                  <h3 className="text-2xl font-extrabold">12+</h3>
                  <p className="mt-1 text-xs text-purple-200">Products</p>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold">03</h3>
                  <p className="mt-1 text-xs text-purple-200">Collections</p>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold">100%</h3>
                  <p className="mt-1 text-xs text-purple-200">Shopping inspiration</p>
                </div>
              </div>

            </div>

            {/* ANIMATED PRODUCT VISUAL */}
            <div className="hidden lg:block">
              <ShoplyHeroVisual variant="home" />
            </div>

          </div>
        </section>


      {/* Products */}
      <section id="products" className="mx-auto max-w-7xl px-4 pb-16">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-700">
              Discover Your Favourites
            </span>
            <h2 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
              Explore All Products
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Find something special for every day.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500">
            <ShoppingCart size={18} />
            Cart: {cart.length} items
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="mt-8 flex flex-col gap-3 lg:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 focus-within:border-purple-400 focus-within:ring-4 focus-within:ring-purple-100">
            <Search size={19} className="shrink-0 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products or categories..."
              className="w-full bg-transparent text-sm outline-none"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                <X size={17} className="text-slate-400" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-purple-300 hover:text-purple-700"
          >
            <SlidersHorizontal size={18} />
            {showFilters ? "Hide Filters" : "Filters"}
          </button>

          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4">
            <ArrowUpDown size={17} className="text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort products"
              className="w-full bg-transparent py-3 text-sm text-slate-700 outline-none"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 grid grid-cols-1 gap-6 rounded-2xl border border-slate-100 bg-white p-6 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-bold text-slate-800">
                Filter by Category
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                      category === item
                        ? "bg-purple-700 text-white"
                        : "border border-slate-200 text-slate-600 hover:border-purple-300"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <h3 className="text-sm font-bold text-slate-800">
                  Maximum Price
                </h3>
                <span className="text-sm font-semibold text-purple-700">
                  {formatPrice(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-5 w-full accent-purple-700"
              />
              <div className="mt-2 flex justify-between text-xs text-slate-400">
                <span>₹500</span>
                <span>₹5,000</span>
              </div>
            </div>
          </div>
        )}

        {/* Category Quick Filters */}
        <div className="mt-6 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                category === item
                  ? "bg-purple-700 text-white"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-purple-300 hover:text-purple-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Product Count */}
        <div className="mt-7 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-bold text-slate-900">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          <button
            type="button"
            onClick={resetFilters}
            className="flex items-center gap-1.5 text-xs font-semibold text-purple-700 hover:text-purple-900"
          >
            <RotateCcw size={14} />
            Reset Filters
          </button>
        </div>

        {/* Product Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => {
            const isFavorite = wishlist.includes(product.id);
            const discount = Math.round(
              ((product.oldPrice - product.price) / product.oldPrice) * 100
            );

            return (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[4/4.2] overflow-hidden bg-slate-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-3 top-3 rounded-lg bg-purple-700 px-3 py-1.5 text-[10px] font-bold tracking-wide text-white">
                    {product.badge}
                  </span>

                  <span className="absolute bottom-3 left-3 rounded-lg bg-white px-2.5 py-1.5 text-xs font-bold text-green-700 shadow-sm">
                    {discount}% OFF
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={
                      isFavorite ? "Remove from wishlist" : "Add to wishlist"
                    }
                    className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110 ${
                      isFavorite ? "text-red-500" : "text-slate-600 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      size={19}
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  </button>
                </div>

                <div className="p-4">
                  <p className="text-xs font-medium text-purple-700">
                    {product.category}
                  </p>

                  <h3 className="mt-2 min-h-10 text-sm font-bold leading-5 text-slate-900">
                    {product.name}
                  </h3>

                  <div className="mt-3 flex items-center gap-1.5">
                    <Star
                      size={15}
                      fill="#FBBF24"
                      className="text-amber-400"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      {product.rating}
                    </span>
                    <span className="text-xs text-slate-400">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-lg font-bold text-slate-900">
                      {formatPrice(product.price)}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 py-3 text-sm font-semibold text-white transition hover:bg-purple-800"
                  >
                    <ShoppingBag size={17} />
                    Add to Cart
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="mt-8 rounded-2xl border border-slate-100 bg-white px-6 py-16 text-center">
            <Search size={38} className="mx-auto text-slate-300" />
            <h3 className="mt-4 text-lg font-bold text-slate-800">
              No products found
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or filters.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-xl bg-purple-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-purple-800"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </section>

      {/* Cart Notification */}
      {cartMessage && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-50 flex max-w-sm items-center gap-3 rounded-xl bg-slate-900 px-5 py-4 text-sm font-medium text-white shadow-xl"
        >
          <CheckCircle size={19} className="shrink-0 text-green-400" />
          {cartMessage}
        </div>
      )}

    </div>
  );
}

export default Shop;
