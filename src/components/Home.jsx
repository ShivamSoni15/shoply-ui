
import React from "react";
import ShoplyHeroVisual from "./ShoplyHeroVisual";
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  ShieldCheck,
  Headphones,
  Star,
  Sparkles,
  Heart,
} from "lucide-react";

const categories = [
  {
    name: "Fashion",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600",
    description: "Style that speaks",
  },
  {
    name: "Electronics",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
    description: "Upgrade your lifestyle",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    description: "Complete your look",
  },
  {
    name: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    description: "Step into comfort",
  },
];

const products = [
  {
    id: 1,
    name: "Premium Casual Sneakers",
    category: "Footwear",
    price: 1299,
    oldPrice: 1999,
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "Classic Wrist Watch",
    category: "Accessories",
    price: 1899,
    oldPrice: 2499,
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    badge: "Popular",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 2499,
    oldPrice: 3299,
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    badge: "Trending",
  },
  {
    id: 4,
    name: "Modern Fashion Bag",
    category: "Fashion",
    price: 1599,
    oldPrice: 2199,
    rating: 4.6,
    image:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
    badge: "New",
  },
];

function Home() {
  const handleAddToCart = (product) => {
    console.log("Added to cart:", product.name);
  };

  return (
    <div className="bg-[#fbfaff] text-slate-900">

      {/* Hero Section */}
        <section className="relative mx-2 mt-4 overflow-hidden rounded-[28px] bg-gradient-to-r from-purple-900 via-purple-700 to-indigo-700 px-6 py-12 text-white sm:px-10 lg:px-12 lg:py-16">
           <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">

            <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase">
                <ShoppingBag size={15} />
                The Shoply Collection
            </span>

            <h1 className="mt-7 max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl">
                Find Everything
                <span className="block text-purple-200">You Love.</span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-7 text-purple-100 sm:text-base">
                Explore our collection of carefully selected products.
                Discover great styles, useful technology, and everyday
                essentials in one place.
            </p>

            <a
                href="/shop"
                className="mt-7 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-purple-800 transition hover:-translate-y-1 hover:bg-purple-50"
            >
                Start Shopping
                <ShoppingBag size={18} />
            </a>

            <div className="mt-10 flex flex-wrap gap-8 border-t border-white/20 pt-7">
                <div>
                <h3 className="text-2xl font-extrabold">12+</h3>
                <p className="mt-1 text-xs text-purple-200">Products</p>
                </div>
                <div>
                <h3 className="text-2xl font-extrabold">03</h3>
                <p className="mt-1 text-xs text-purple-200">Categories</p>
                </div>
                <div>
                <h3 className="text-2xl font-extrabold">100%</h3>
                <p className="mt-1 text-xs text-purple-200">Shopping inspiration</p>
                </div>
            </div>
            </div>

            <div className="hidden lg:block">
            <ShoplyHeroVisual variant="home" />
            </div>

        </div>
      </section>

      {/* Benefits */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              icon: Truck,
              title: "Free Shipping",
              desc: "On orders above ₹999",
            },
            {
              icon: ShieldCheck,
              title: "Secure Shopping",
              desc: "Safe and secure checkout",
            },
            {
              icon: Headphones,
              title: "24/7 Support",
              desc: "We're here to help",
            },
            {
              icon: ShoppingBag,
              title: "Easy Shopping",
              desc: "A smooth shopping experience",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-white border border-slate-100 rounded-2xl p-5 hover:shadow-md transition"
            >
              <div className="bg-purple-100 text-purple-700 p-3 rounded-xl">
                <item.icon size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-7">
            <div>
              <p className="text-purple-600 font-semibold text-sm">
                EXPLORE COLLECTIONS
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                Shop by Category
              </h2>
              <p className="text-slate-500 text-sm mt-2">
                Find everything you love in one place.
              </p>
            </div>

            <a
              href="/categories"
              className="hidden sm:flex items-center gap-2 text-purple-700 font-semibold text-sm hover:gap-3 transition-all"
            >
              View All <ArrowRight size={17} />
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => (
              <a
                href="/categories"
                key={category.name}
                className="group relative overflow-hidden rounded-2xl h-48 sm:h-64"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 sm:p-6 text-white">
                  <h3 className="text-lg sm:text-xl font-bold">
                    {category.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/80 mt-1">
                    {category.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 sm:px-6 lg:px-8 py-14 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-purple-600 font-semibold text-sm">
                HANDPICKED FOR YOU
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mt-2">
                Featured Products
              </h2>
              <p className="text-slate-500 text-sm mt-2">
                Discover some of our customer favourites.
              </p>
            </div>

            <a
              href="/shop"
              className="hidden sm:flex items-center gap-2 text-purple-700 font-semibold text-sm"
            >
              View All <ArrowRight size={17} />
            </a>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="group border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl transition duration-300"
              >
                <div className="relative overflow-hidden bg-slate-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-44 sm:h-60 object-cover group-hover:scale-105 transition duration-500"
                  />

                  <span className="absolute top-3 left-3 bg-purple-100 text-purple-700 text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full">
                    {product.badge}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      console.log("Wishlist:", product.name)
                    }
                    aria-label={`Add ${product.name} to wishlist`}
                    className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:text-purple-700 transition"
                  >
                    <Heart size={17} />
                  </button>
                </div>

                <div className="p-3 sm:p-4">
                  <p className="text-xs text-slate-400">
                    {product.category}
                  </p>

                  <h3 className="font-semibold text-sm sm:text-base mt-1 truncate">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mt-2">
                    <Star
                      size={14}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-xs font-semibold">
                      {product.rating}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-3">
                    <span className="font-bold text-purple-700">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs text-slate-400 line-through">
                      ₹{product.oldPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    className="w-full mt-4 bg-purple-700 text-white rounded-xl py-2.5 text-xs sm:text-sm font-semibold hover:bg-purple-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="px-4 sm:px-6 lg:px-8 py-14">
        <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-r from-purple-100 to-indigo-100 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <span className="inline-flex items-center gap-2 text-purple-700 text-sm font-semibold">
              <Sparkles size={17} />
              YOUR NEXT FAVOURITE IS WAITING
            </span>

            <h2 className="text-3xl sm:text-4xl font-bold mt-4 max-w-xl">
              Make Every Purchase Feel Special.
            </h2>

            <p className="text-slate-600 mt-4 text-sm leading-6 max-w-lg">
              Explore our latest collections and find products
              that match your lifestyle.
            </p>

            <a
              href="/new-arrivals"
              className="inline-flex items-center gap-2 mt-7 bg-purple-700 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-purple-800 transition"
            >
              Explore New Arrivals
              <ArrowRight size={18} />
            </a>
          </div>

          <div className="hidden sm:flex w-48 h-48 rounded-full bg-white/70 items-center justify-center">
            <ShoppingBag size={90} className="text-purple-600" />
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
