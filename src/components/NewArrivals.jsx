
import React, { useMemo, useState } from "react";
import ShoplyHeroVisual from "./ShoplyHeroVisual";

import {
  Heart,
  ShoppingBag,
  SlidersHorizontal,
  ArrowUpDown,
  Star,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";

// Demo products
const products = [
  {
    id: 1,
    name: "Premium Everyday Sneakers",
    category: "Fashion",
    price: 2499,
    oldPrice: 3299,
    rating: 4.8,
    reviews: 124,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=85",
  },
  {
    id: 2,
    name: "Minimalist Smart Watch",
    category: "Electronics",
    price: 3999,
    oldPrice: 4999,
    rating: 4.7,
    reviews: 98,
    badge: "TRENDING",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=85",
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
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&q=85",
  },
  {
    id: 4,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2799,
    oldPrice: 3499,
    rating: 4.6,
    reviews: 152,
    badge: "POPULAR",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&q=85",
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
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700&q=85",
  },
  {
    id: 6,
    name: "Elegant Sunglasses",
    category: "Accessories",
    price: 999,
    oldPrice: 1499,
    rating: 4.5,
    reviews: 63,
    badge: "JUST IN",
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700&q=85",
  },
  {
    id: 7,
    name: "Modern Running Shoes",
    category: "Fashion",
    price: 2999,
    oldPrice: 3799,
    rating: 4.7,
    reviews: 109,
    badge: "NEW",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=700&q=85",
  },
  {
    id: 8,
    name: "Wireless Bluetooth Speaker",
    category: "Electronics",
    price: 1599,
    oldPrice: 2199,
    rating: 4.6,
    reviews: 91,
    badge: "TRENDING",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=700&q=85",
  },
];

const categories = [
  "All",
  "Fashion",
  "Electronics",
  "Accessories",
];

function NewArrivals() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCartMessage, setShowCartMessage] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== "All") {
      result = result.filter(
        (product) => product.category === activeCategory
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [activeCategory, sortBy]);

  // Wishlist
  const toggleWishlist = (productId) => {
    setWishlist((previous) =>
      previous.includes(productId)
        ? previous.filter((id) => id !== productId)
        : [...previous, productId]
    );
  };

  // Add to cart
  const addToCart = (product) => {
    setCart((previous) => [...previous, product]);

    console.log("Added to cart:", product.name);

    setShowCartMessage(true);

    window.setTimeout(() => {
      setShowCartMessage(false);
    }, 2500);
  };

  // Price formatting
  const formatPrice = (price) =>
    `₹${price.toLocaleString("en-IN")}`;

  return (
    <div className="min-h-screen bg-[#fbf9ff]">

      {/* HERO SECTION */}
      <section className="relative mx-2 mt-4 overflow-hidden rounded-[28px] bg-gradient-to-r from-purple-800 via-purple-700 to-indigo-700 px-6 py-12 text-white sm:px-10 lg:px-12 lg:py-14">

        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">

          {/* HERO CONTENT */}
          <div className="relative z-10">

            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase">
              <Sparkles size={15} />
              Fresh Finds Just For You
            </span>

            <h1 className="mt-7 max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl">
              Discover What's

              <span className="block text-purple-200">
                New at Shoply
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-purple-100 sm:text-base">
              Explore our latest arrivals, discover fresh styles,
              and find something special to make every day better.
            </p>

            <a
              href="#new-products"
              className="mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-purple-800 transition hover:-translate-y-1 hover:bg-purple-50"
            >
              Explore New Arrivals
              <ArrowRight size={18} />
            </a>

            {/* HERO STATISTICS */}
            <div className="mt-10 flex flex-wrap gap-8 border-t border-white/20 pt-7">

              <div>
                <h3 className="text-2xl font-extrabold">
                  08+
                </h3>
                <p className="mt-1 text-xs text-purple-200">
                  New products
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold">
                  03
                </h3>
                <p className="mt-1 text-xs text-purple-200">
                  Categories
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold">
                  100%
                </h3>
                <p className="mt-1 text-xs text-purple-200">
                  Fresh collection
                </p>
              </div>

            </div>
          </div>

          {/* ANIMATED PRODUCT VISUAL */}
          <div className="hidden lg:block">
            <ShoplyHeroVisual variant="arrivals" />
          </div>

        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

        {/* FILTERS AND SORTING */}
        <div className="flex flex-col justify-between gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-center">

          {/* CATEGORY FILTER */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-purple-700 text-white shadow-sm"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-purple-300 hover:text-purple-700"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* SORTING */}
          <div className="flex items-center gap-2">

            <SlidersHorizontal
              size={17}
              className="text-slate-500"
            />

            <label
              htmlFor="sort-products"
              className="text-sm text-slate-500"
            >
              Sort by:
            </label>

            <select
              id="sort-products"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-purple-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">
                Price: Low to High
              </option>
              <option value="price-high">
                Price: High to Low
              </option>
              <option value="rating">Top Rated</option>
            </select>

            <ArrowUpDown
              size={15}
              className="text-slate-400"
            />

          </div>
        </div>

        {/* PRODUCT COUNT */}
        <div className="mt-6 flex justify-between text-sm text-slate-500">

          <p>
            Showing{" "}
            <span className="font-semibold text-slate-900">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>

          <p className="hidden sm:block">
            Latest styles. Fresh possibilities.
          </p>

        </div>

        {/* PRODUCT GRID */}
        <div
          id="new-products"
          className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >

          {filteredProducts.map((product) => {
            const isWishlisted = wishlist.includes(product.id);

            const discount = Math.round(
              ((product.oldPrice - product.price) /
                product.oldPrice) *
                100
            );

            return (
              <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                {/* PRODUCT IMAGE */}
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

                  {/* WISHLIST BUTTON */}
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={
                      isWishlisted
                        ? "Remove from wishlist"
                        : "Add to wishlist"
                    }
                    className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-110 ${
                      isWishlisted
                        ? "text-red-500"
                        : "text-slate-600 hover:text-red-500"
                    }`}
                  >
                    <Heart
                      size={19}
                      fill={
                        isWishlisted ? "currentColor" : "none"
                      }
                    />
                  </button>

                </div>

                {/* PRODUCT DETAILS */}
                <div className="p-4">

                  <p className="text-xs font-medium text-purple-700">
                    {product.category}
                  </p>

                  <h3 className="mt-2 min-h-10 text-sm font-bold leading-5 text-slate-900">
                    {product.name}
                  </h3>

                  {/* RATING */}
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

                  {/* PRICE */}
                  <div className="mt-4 flex items-center gap-2">

                    <span className="text-lg font-bold text-slate-900">
                      {formatPrice(product.price)}
                    </span>

                    <span className="text-xs text-slate-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>

                  </div>

                  {/* ADD TO CART */}
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

        {/* EMPTY PRODUCTS MESSAGE */}
        {filteredProducts.length === 0 && (
          <div className="rounded-2xl bg-white py-16 text-center">

            <ShoppingBag
              size={35}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-bold text-slate-800">
              No products found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try selecting another category.
            </p>

          </div>
        )}

      </section>

      {/* CART FEEDBACK */}
      {showCartMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-4 text-sm font-medium text-white shadow-xl animate__animated animate__fadeInUp">

          <Check
            size={19}
            className="text-green-400"
          />

          Product added to your demo cart!

        </div>
      )}

    </div>
  );
}

export default NewArrivals;
