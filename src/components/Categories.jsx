
import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  Heart,
  Search,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

import ShoplyHeroVisual from "./ShoplyHeroVisual";

const categories = [
  {
    id: 1,
    name: "Fashion",
    description: "Discover your everyday style",
    products: 120,
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700",
    color: "from-pink-100 to-rose-50",
  },
  {
    id: 2,
    name: "Electronics",
    description: "Technology that inspires",
    products: 85,
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=700",
    color: "from-blue-100 to-indigo-50",
  },
  {
    id: 3,
    name: "Accessories",
    description: "Complete your perfect look",
    products: 95,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=700",
    color: "from-purple-100 to-violet-50",
  },
  {
    id: 4,
    name: "Footwear",
    description: "Step into something amazing",
    products: 76,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700",
    color: "from-orange-100 to-amber-50",
  },
  {
    id: 5,
    name: "Watches",
    description: "Make every second count",
    products: 54,
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=700",
    color: "from-slate-200 to-gray-50",
  },
  {
    id: 6,
    name: "Bags",
    description: "Carry your world in style",
    products: 68,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=700",
    color: "from-amber-100 to-yellow-50",
  },
  {
    id: 7,
    name: "Home & Living",
    description: "Bring comfort into your home",
    products: 110,
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=700",
    color: "from-emerald-100 to-green-50",
  },
  {
    id: 8,
    name: "Beauty",
    description: "Feel confident every day",
    products: 92,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700",
    color: "from-fuchsia-100 to-pink-50",
  },
];

function Categories() {
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const toggleFavorite = (categoryId) => {
    setFavorites((previousFavorites) =>
      previousFavorites.includes(categoryId)
        ? previousFavorites.filter((id) => id !== categoryId)
        : [...previousFavorites, categoryId]
    );
  };

  const handleExplore = (categoryName) => {
    console.log("Selected category:", categoryName);

    window.location.href = `/shop?search=${encodeURIComponent(categoryName)}`;
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
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


      {/* Categories Section */}
      <section
        id="category-list"
        className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:px-10 lg:py-20"
      >
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-purple-600">
              <Sparkles size={16} />
              Shop by collection
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Explore Categories
            </h2>

            <p className="mt-3 max-w-xl text-gray-500">
              Browse our collections and discover products that match your
              lifestyle.
            </p>
          </div>

          <div className="text-sm font-medium text-gray-500">
            Showing{" "}
            <span className="font-bold text-purple-600">
              {filteredCategories.length}
            </span>{" "}
            of {categories.length} categories
          </div>
        </div>

        {/* Search */}
        <div className="mb-9">
          <div className="relative max-w-md">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search categories..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-12 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-purple-500 focus:ring-4 focus:ring-purple-100"
            />
          </div>
        </div>

        {/* Category Cards */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredCategories.map((category, index) => {
              const isFavorite = favorites.includes(category.id);

              return (
                <article
                  key={category.id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:border-purple-100 hover:shadow-xl hover:shadow-purple-100/60 animate__animated animate__fadeInUp"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {/* Image */}
                  <div
                    className={`relative h-56 overflow-hidden bg-gradient-to-br ${category.color}`}
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Favorite Button */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(category.id)}
                      aria-label={
                        isFavorite
                          ? `Remove ${category.name} from favorites`
                          : `Add ${category.name} to favorites`
                      }
                      aria-pressed={isFavorite}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-600 shadow-md transition hover:scale-110 hover:text-red-500"
                    >
                      <Heart
                        size={19}
                        className={
                          isFavorite
                            ? "fill-red-500 text-red-500"
                            : ""
                        }
                      />
                    </button>

                    {/* Product Count */}
                    <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-gray-800 shadow-sm">
                      {category.products} Products
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 transition group-hover:text-purple-700">
                      {category.name}
                    </h3>

                    <p className="mt-2 min-h-6 text-sm text-gray-500">
                      {category.description}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleExplore(category.name)}
                      className="mt-5 flex w-full items-center justify-between rounded-xl border border-purple-100 bg-purple-50 px-4 py-3 text-sm font-bold text-purple-700 transition hover:border-purple-600 hover:bg-purple-600 hover:text-white"
                    >
                      Explore Collection
                      <ArrowRight
                        size={18}
                        className="transition group-hover:translate-x-1"
                      />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-300 px-5 py-16 text-center">
            <Search size={35} className="mx-auto text-gray-300" />

            <h3 className="mt-4 text-xl font-bold text-gray-800">
              No categories found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Try searching with a different category name.
            </p>

            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="mt-5 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-700"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* Bottom Promotional Section */}
      <section className="px-5 pb-16 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 overflow-hidden rounded-3xl bg-gradient-to-r from-purple-700 to-indigo-700 px-7 py-10 text-center text-white sm:px-12 md:flex-row md:text-left">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">
              Ready to find your next favourite?
            </h2>

            <p className="mt-2 text-sm leading-6 text-purple-100 sm:text-base">
              Explore our collections and discover something special.
            </p>
          </div>

          <a
            href="/shop"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-purple-700 transition hover:-translate-y-1 hover:bg-purple-50"
          >
            Shop Now
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </div>
  );
}

export default Categories;
