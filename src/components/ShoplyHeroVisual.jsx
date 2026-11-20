
import React from "react";
import { ShoppingBag, Sparkles, Star, Tag } from "lucide-react";

const visualSets = {
  home: [
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
      className: "top-4 left-4 w-40 sm:w-48",
      rotation: "-rotate-6",
    },
    {
      name: "Accessories",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=85",
      className: "top-12 right-2 w-36 sm:w-44",
      rotation: "rotate-6",
    },
    {
      name: "Technology",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=85",
      className: "bottom-2 left-12 w-40 sm:w-48",
      rotation: "rotate-3",
    },
  ],

  categories: [
    {
      name: "Fashion",
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=85",
      className: "top-2 left-2 w-40 sm:w-48",
      rotation: "-rotate-6",
    },
    {
      name: "Electronics",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=85",
      className: "top-10 right-2 w-36 sm:w-44",
      rotation: "rotate-6",
    },
    {
      name: "Watches",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=85",
      className: "bottom-2 left-12 w-40 sm:w-48",
      rotation: "rotate-3",
    },
  ],

  arrivals: [
    {
      name: "New Sneakers",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=85",
      className: "top-4 left-4 w-40 sm:w-48",
      rotation: "-rotate-6",
    },
    {
      name: "Latest Watch",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=85",
      className: "top-12 right-2 w-36 sm:w-44",
      rotation: "rotate-6",
    },
    {
      name: "Headphones",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=85",
      className: "bottom-2 left-12 w-40 sm:w-48",
      rotation: "rotate-3",
    },
  ],
};

function ShoplyHeroVisual({ variant = "home" }) {
  const products = visualSets[variant] || visualSets.home;

  return (
    <div className="relative mx-auto h-[390px] w-full max-w-[520px] sm:h-[460px]">

      {/* Decorative glow */}
      <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 blur-3xl animate-pulse" />

      {/* Decorative circles */}
      <div className="absolute right-10 top-4 h-16 w-16 rounded-full border border-white/30 animate-pulse" />
      <div className="absolute bottom-8 left-4 h-10 w-10 rounded-full bg-white/10 animate-bounce" />

      {/* Floating product cards */}
      {products.map((product, index) => (
        <div
          key={product.name}
          className={`absolute ${product.className} ${product.rotation} group overflow-hidden rounded-2xl border border-white/40 bg-white p-2 shadow-2xl transition duration-500 hover:z-20 hover:scale-110 hover:rotate-0 ${
            index === 1 ? "animate__animated animate__fadeInRight animate__slow" :
            index === 2 ? "animate__animated animate__fadeInUp animate__slower" :
            "animate__animated animate__fadeInLeft animate__slow"
          }`}
          style={{ zIndex: index + 1 }}
        >
          <div className="relative overflow-hidden rounded-xl">
            <img
              src={product.image}
              alt={product.name}
              className="h-32 w-full object-cover sm:h-40"
              loading="lazy"
            />

            <span className="absolute left-2 top-2 rounded-full bg-purple-700 px-2.5 py-1 text-[10px] font-bold text-white">
              SHOPLY
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 px-2 py-3">
            <span className="text-xs font-bold text-gray-800 sm:text-sm">
              {product.name}
            </span>
            <ShoppingBag
              size={16}
              className="shrink-0 text-purple-700"
            />
          </div>
        </div>
      ))}

      {/* Floating offer card */}
      <div className="absolute bottom-5 right-0 z-20 flex items-center gap-3 rounded-2xl border border-white/40 bg-white/95 p-3 shadow-xl animate__animated animate__fadeInUp animate__slower sm:right-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-purple-700">
          <Tag size={21} />
        </div>

        <div>
          <p className="text-xs font-bold text-gray-900">
            Discover More
          </p>
          <p className="text-[10px] text-gray-500">
            Find something you love
          </p>
        </div>

        <Sparkles size={17} className="text-purple-600" />
      </div>

      {/* Rating badge */}
      <div className="absolute left-0 top-1/2 z-20 flex items-center gap-2 rounded-xl bg-white px-3 py-2 shadow-xl sm:left-2">
        <Star size={17} className="fill-yellow-400 text-yellow-400" />
        <div>
          <p className="text-xs font-bold text-gray-900">Shoply Picks</p>
          <p className="text-[10px] text-gray-500">Made for you</p>
        </div>
      </div>
    </div>
  );
}

export default ShoplyHeroVisual;
