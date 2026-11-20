
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Star,
  Minus,
  Plus,
  Check,
  ArrowLeft,
  Share2,
  Package,
} from "lucide-react";

const product = {
  id: 1,
  name: "Premium Urban Running Sneakers",
  category: "Footwear",
  price: 2499,
  originalPrice: 3999,
  discount: 38,
  rating: 4.8,
  reviews: 128,
  stock: 15,
  description:
    "Experience the perfect combination of comfort, style, and performance. These premium sneakers are designed for everyday wear, casual outings, and active lifestyles.",
  images: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&sat=-50",
    "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=1000",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1000",
  ],
  colors: [
    { name: "Red", value: "bg-red-500" },
    { name: "Black", value: "bg-gray-900" },
    { name: "White", value: "bg-white border border-gray-300" },
    { name: "Blue", value: "bg-blue-600" },
  ],
  sizes: ["6", "7", "8", "9", "10", "11"],
  highlights: [
    "Premium breathable upper material",
    "Lightweight and comfortable design",
    "Cushioned sole for everyday comfort",
    "Durable non-slip rubber outsole",
    "Suitable for casual and active wear",
  ],
};

function ShopDetails() {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("Red");
  const [selectedSize, setSelectedSize] = useState("8");
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [message, setMessage] = useState("");

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity((previous) => previous + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((previous) => previous - 1);
    }
  };

  const handleAddToCart = () => {
    console.log("Product added to cart:", {
      productId: product.id,
      productName: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });

    setMessage("Product added to cart successfully!");

    window.setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleBuyNow = () => {
    console.log("Buy now selected:", {
      productId: product.id,
      productName: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      quantity,
    });

    navigate("/checkout");
  };

  const handleWishlist = () => {
    setIsFavorite((previous) => !previous);
  };

  const subtotal = product.price * quantity;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-purple-700"
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-400">
            <button onClick={() => navigate("/")}>Home</button>
            <span>/</span>
            <button onClick={() => navigate("/shop")}>Shop</button>
            <span>/</span>
            <span className="font-semibold text-purple-700">
              {product.category}
            </span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Product Images */}
          <div>
            <div className="relative overflow-hidden rounded-3xl bg-gray-50">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-[350px] w-full object-cover sm:h-[480px] lg:h-[560px]"
              />

              <span className="absolute left-5 top-5 rounded-full bg-purple-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
                {product.discount}% OFF
              </span>

              <button
                type="button"
                onClick={handleWishlist}
                aria-label={
                  isFavorite ? "Remove from wishlist" : "Add to wishlist"
                }
                aria-pressed={isFavorite}
                className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
              >
                <Heart
                  size={21}
                  className={
                    isFavorite
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600"
                  }
                />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="mt-5 grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`View product image ${index + 1}`}
                  className={`overflow-hidden rounded-xl border-2 transition ${
                    selectedImage === index
                      ? "border-purple-600 ring-2 ring-purple-100"
                      : "border-gray-100 hover:border-purple-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="h-20 w-full object-cover sm:h-28"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col">
            <div className="mb-4 flex items-center gap-2">
              <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-purple-700">
                {product.category}
              </span>

              <span className="flex items-center gap-1 text-xs font-semibold text-green-600">
                <Check size={14} />
                In Stock
              </span>
            </div>

            <h1 className="text-3xl font-extrabold leading-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 rounded-lg bg-green-50 px-3 py-2">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-gray-800">
                  {product.rating}
                </span>
              </div>

              <span className="text-sm text-gray-500">
                {product.reviews} customer reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-extrabold text-gray-900">
                {formatPrice(product.price)}
              </span>

              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>

              <span className="rounded-lg bg-green-50 px-3 py-1.5 text-sm font-bold text-green-700">
                Save {formatPrice(product.originalPrice - product.price)}
              </span>
            </div>

            <p className="mt-5 leading-8 text-gray-500">
              {product.description}
            </p>

            <div className="my-7 border-t border-gray-100" />

            {/* Color Selection */}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900">Select Color:</h3>
                <span className="text-sm text-gray-500">
                  {selectedColor}
                </span>
              </div>

              <div className="mt-4 flex items-center gap-3">
                {product.colors.map((color) => (
                  <button
                    type="button"
                    key={color.name}
                    onClick={() => setSelectedColor(color.name)}
                    aria-label={`Select ${color.name} color`}
                    aria-pressed={selectedColor === color.name}
                    className={`flex h-10 w-10 items-center justify-center rounded-full ${color.value} ${
                      selectedColor === color.name
                        ? "ring-2 ring-purple-600 ring-offset-4"
                        : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
                    }`}
                  >
                    {selectedColor === color.name && (
                      <Check
                        size={17}
                        className={
                          color.name === "White"
                            ? "text-gray-900"
                            : "text-white"
                        }
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Select Size:</h3>
                <span className="text-sm text-purple-700">
                  Size Guide
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                    className={`flex h-11 w-12 items-center justify-center rounded-xl border text-sm font-bold transition ${
                      selectedSize === size
                        ? "border-purple-600 bg-purple-600 text-white shadow-lg shadow-purple-100"
                        : "border-gray-200 text-gray-700 hover:border-purple-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-7">
              <h3 className="font-bold text-gray-900">Quantity:</h3>

              <div className="mt-3 inline-flex items-center overflow-hidden rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-12 w-12 items-center justify-center text-gray-600 transition hover:bg-purple-50 disabled:opacity-40"
                >
                  <Minus size={17} />
                </button>

                <span className="flex h-12 w-14 items-center justify-center border-x border-gray-200 font-bold text-gray-900">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                  aria-label="Increase quantity"
                  className="flex h-12 w-12 items-center justify-center text-gray-600 transition hover:bg-purple-50 disabled:opacity-40"
                >
                  <Plus size={17} />
                </button>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                {product.stock} units available
              </p>
            </div>

            {/* Total */}
            <div className="mt-6 flex items-center justify-between rounded-xl bg-purple-50 p-4">
              <span className="font-semibold text-gray-700">
                Total Price
              </span>
              <span className="text-xl font-extrabold text-purple-700">
                {formatPrice(subtotal)}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 rounded-xl border-2 border-purple-600 px-5 py-4 font-bold text-purple-700 transition hover:bg-purple-50"
              >
                <ShoppingCart size={19} />
                Add to Cart
              </button>

              <button
                type="button"
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-4 font-bold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-1 hover:bg-purple-700"
              >
                Buy Now
                <ShoppingCart size={19} />
              </button>
            </div>

            {/* Success Message */}
            {message && (
              <div
                role="status"
                className="mt-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700 animate__animated animate__fadeIn"
              >
                <Check size={19} />
                {message}
              </div>
            )}

            {/* Delivery Benefits */}
            <div className="mt-8 grid grid-cols-1 gap-4 border-t border-gray-100 pt-7 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <Truck size={23} className="shrink-0 text-purple-600" />
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Free Delivery
                  </p>
                  <p className="text-xs text-gray-500">On orders above ₹999</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck
                  size={23}
                  className="shrink-0 text-purple-600"
                />
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Secure Shopping
                  </p>
                  <p className="text-xs text-gray-500">Safe checkout demo</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <RotateCcw size={23} className="shrink-0 text-purple-600" />
                <div>
                  <p className="text-sm font-bold text-gray-800">
                    Easy Returns
                  </p>
                  <p className="text-xs text-gray-500">Demo return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Information Tabs */}
      <section className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
          <div className="flex flex-wrap gap-6 border-b border-gray-200">
            {[
              { id: "description", label: "Description" },
              { id: "highlights", label: "Product Highlights" },
              { id: "shipping", label: "Shipping & Returns" },
            ].map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 pb-4 text-sm font-bold transition sm:text-base ${
                  activeTab === tab.id
                    ? "border-purple-600 text-purple-700"
                    : "border-transparent text-gray-500 hover:text-purple-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="max-w-3xl py-8">
            {activeTab === "description" && (
              <div className="animate__animated animate__fadeIn">
                <h2 className="text-xl font-bold text-gray-900">
                  Product Description
                </h2>
                <p className="mt-4 leading-8 text-gray-600">
                  {product.description}
                </p>
                <p className="mt-3 leading-8 text-gray-600">
                  Designed to complement your daily lifestyle, these sneakers
                  combine a modern look with practical comfort. Pair them with
                  your favourite casual outfits.
                </p>
              </div>
            )}

            {activeTab === "highlights" && (
              <div className="animate__animated animate__fadeIn">
                <h2 className="text-xl font-bold text-gray-900">
                  Product Highlights
                </h2>

                <ul className="mt-5 space-y-4">
                  {product.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-600"
                    >
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-purple-100 text-purple-700">
                        <Check size={15} />
                      </span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="animate__animated animate__fadeIn">
                <h2 className="text-xl font-bold text-gray-900">
                  Shipping & Returns
                </h2>

                <div className="mt-5 space-y-5">
                  <div className="flex gap-4">
                    <Truck className="shrink-0 text-purple-600" size={23} />
                    <div>
                      <h3 className="font-bold text-gray-800">
                        Shipping Information
                      </h3>
                      <p className="mt-1 text-sm leading-7 text-gray-500">
                        Free shipping is available on orders above ₹999.
                        Delivery details are currently demonstration content.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Package className="shrink-0 text-purple-600" size={23} />
                    <div>
                      <h3 className="font-bold text-gray-800">
                        Returns Policy
                      </h3>
                      <p className="mt-1 text-sm leading-7 text-gray-500">
                        Return and exchange information is a sample policy.
                        Actual return services are not connected.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default ShopDetails;
