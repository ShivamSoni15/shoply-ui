
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";

const defaultProduct = {
  id: 1,
  name: "Premium Urban Sneakers",
  category: "Footwear",
  price: 2499,
  originalPrice: 3999,
  rating: 4.8,
  reviews: 128,
  description:
    "Discover the perfect balance of comfort and style. Designed with premium materials, a cushioned sole and a modern silhouette for everyday adventures.",
  images: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000",
    "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?w=1000",
    "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=1000",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&sat=-50",
  ],
  colors: ["Red", "Black", "White", "Blue"],
  sizes: ["6", "7", "8", "9", "10", "11"],
  stock: 15,
};

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(price) || 0);

function ShopDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  // Product passed from Shop.jsx
  const receivedProduct = location.state?.product;

  const product = {
    ...defaultProduct,
    ...(receivedProduct || {}),
    images:
      receivedProduct?.images?.length > 0
        ? receivedProduct.images
        : receivedProduct?.image
          ? [receivedProduct.image, ...defaultProduct.images.slice(1)]
          : defaultProduct.images,
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors?.[0] || "Red"
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[2] || product.sizes?.[0] || "8"
  );
  const [quantity, setQuantity] = useState(1);
  const [favorite, setFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [notification, setNotification] = useState("");

  const discount =
    product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  const stock = Number(product.stock) || 1;
  const total = Number(product.price) * quantity;

  const showNotification = (message) => {
    setNotification(message);
    window.setTimeout(() => setNotification(""), 3000);
  };

  const handleQuantity = (type) => {
    setQuantity((current) => {
      if (type === "increase") {
        return Math.min(current + 1, stock);
      }
      return Math.max(current - 1, 1);
    });
  };

  const getSelectedProduct = () => ({
    id: product.id,
    name: product.name,
    image: product.images[selectedImage],
    price: Number(product.price),
    quantity,
    color: selectedColor,
    size: selectedSize,
  });

  const handleAddToCart = () => {
    const selectedProduct = getSelectedProduct();

    // Demo cart action. Shared cart integration can be added separately.
    const existingCart = JSON.parse(
      localStorage.getItem("shoply-cart") || "[]"
    );

    const existingIndex = existingCart.findIndex(
      (item) =>
        item.id === selectedProduct.id &&
        item.color === selectedProduct.color &&
        item.size === selectedProduct.size
    );

    if (existingIndex >= 0) {
      existingCart[existingIndex].quantity += quantity;
    } else {
      existingCart.push(selectedProduct);
    }

    localStorage.setItem("shoply-cart", JSON.stringify(existingCart));

    console.log("Added to cart:", selectedProduct);

    showNotification("Product added to your cart!");
  };

  const handleBuyNow = () => {
    const selectedProduct = getSelectedProduct();

    console.log("Buy now:", selectedProduct);

    navigate("/checkout", {
      state: {
        items: [selectedProduct],
      },
    });
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "details", label: "Product Details" },
    { id: "shipping", label: "Shipping & Returns" },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-purple-700"
          >
            <ArrowLeft size={17} />
            Back to shopping
          </button>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-400">
            <button onClick={() => navigate("/")}>Home</button>
            <span>/</span>
            <button onClick={() => navigate("/shop")}>Shop</button>
            <span>/</span>
            <span className="text-purple-700">{product.category}</span>
            <span>/</span>
            <span className="font-semibold text-gray-700">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Main Product Section */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Product Gallery */}
          <div>
            <div className="group relative overflow-hidden rounded-3xl bg-gray-50">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="h-[350px] w-full object-cover transition duration-700 group-hover:scale-105 sm:h-[500px] lg:h-[570px]"
              />

              {discount > 0 && (
                <span className="absolute left-5 top-5 rounded-full bg-purple-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
                  {discount}% OFF
                </span>
              )}

              <button
                type="button"
                onClick={() => setFavorite(!favorite)}
                aria-label="Toggle wishlist"
                aria-pressed={favorite}
                className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
              >
                <Heart
                  size={21}
                  className={
                    favorite
                      ? "fill-red-500 text-red-500"
                      : "text-gray-700"
                  }
                />
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedImage(
                    (selectedImage + product.images.length - 1) %
                      product.images.length
                  )
                }
                aria-label="Previous image"
                className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow opacity-0 transition group-hover:opacity-100"
              >
                <ArrowLeft size={18} />
              </button>

              <button
                type="button"
                onClick={() =>
                  setSelectedImage(
                    (selectedImage + 1) % product.images.length
                  )
                }
                aria-label="Next image"
                className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow opacity-0 transition group-hover:opacity-100"
              >
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Image Thumbnails */}
            <div className="mt-5 grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  onClick={() => setSelectedImage(index)}
                  aria-label={`Select image ${index + 1}`}
                  aria-pressed={selectedImage === index}
                  className={`overflow-hidden rounded-xl border-2 transition ${
                    selectedImage === index
                      ? "border-purple-600 ring-2 ring-purple-100"
                      : "border-gray-100 hover:border-purple-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-20 w-full object-cover sm:h-28"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-purple-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-purple-700">
                {product.category}
              </span>

              <span className="flex items-center gap-1.5 text-sm font-semibold text-green-600">
                <Check size={16} />
                In Stock
              </span>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 rounded-lg bg-green-50 px-3 py-2">
                <Star
                  size={16}
                  className="fill-yellow-400 text-yellow-400"
                />
                <span className="font-bold">{product.rating}</span>
              </div>

              <span className="text-sm text-gray-500">
                {product.reviews || 0} customer reviews
              </span>
            </div>

            {/* Price */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-extrabold text-gray-900">
                {formatPrice(product.price)}
              </span>

              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>

                  <span className="rounded-lg bg-green-50 px-3 py-1.5 text-sm font-bold text-green-700">
                    Save{" "}
                    {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            <p className="mt-6 text-base leading-8 text-gray-500">
              {product.description}
            </p>

            <div className="my-7 border-t border-gray-100" />

            {/* Color Selection */}
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold">Choose Color:</h3>
                <span className="text-sm text-gray-500">
                  {selectedColor}
                </span>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                {product.colors.map((color) => {
                  const colorClasses = {
                    Red: "bg-red-500",
                    Black: "bg-gray-900",
                    White: "bg-white border border-gray-300",
                    Blue: "bg-blue-600",
                    Green: "bg-green-600",
                    Yellow: "bg-yellow-400",
                    Pink: "bg-pink-400",
                  };

                  return (
                    <button
                      type="button"
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Choose ${color}`}
                      aria-pressed={selectedColor === color}
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${
                        colorClasses[color] || "bg-purple-500"
                      } ${
                        selectedColor === color
                          ? "ring-2 ring-purple-600 ring-offset-4"
                          : "hover:ring-2 hover:ring-gray-300 hover:ring-offset-2"
                      }`}
                    >
                      {selectedColor === color && (
                        <Check
                          size={17}
                          className={
                            color === "White" ? "text-gray-900" : "text-white"
                          }
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mt-8">
              <h3 className="font-bold">Choose Size:</h3>

              <div className="mt-4 flex flex-wrap gap-3">
                {product.sizes.map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                    className={`flex h-12 min-w-12 items-center justify-center rounded-xl border px-3 text-sm font-bold transition ${
                      selectedSize === size
                        ? "border-purple-600 bg-purple-600 text-white"
                        : "border-gray-200 text-gray-700 hover:border-purple-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-8">
              <h3 className="font-bold">Quantity:</h3>

              <div className="mt-3 inline-flex items-center overflow-hidden rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => handleQuantity("decrease")}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  className="flex h-12 w-12 items-center justify-center transition hover:bg-purple-50 disabled:opacity-40"
                >
                  <Minus size={17} />
                </button>

                <span className="flex h-12 w-14 items-center justify-center border-x border-gray-200 font-bold">
                  {quantity}
                </span>

                <button
                  type="button"
                  onClick={() => handleQuantity("increase")}
                  disabled={quantity >= stock}
                  aria-label="Increase quantity"
                  className="flex h-12 w-12 items-center justify-center transition hover:bg-purple-50 disabled:opacity-40"
                >
                  <Plus size={17} />
                </button>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                {stock} units available
              </p>
            </div>

            {/* Total Price */}
            <div className="mt-7 flex items-center justify-between rounded-2xl bg-purple-50 p-5">
              <span className="font-semibold text-gray-700">
                Total Price
              </span>

              <span className="text-2xl font-extrabold text-purple-700">
                {formatPrice(total)}
              </span>
            </div>

            {/* Buttons */}
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
                <ShoppingBag size={19} />
              </button>
            </div>

            {/* Notification */}
            {notification && (
              <div
                role="status"
                className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-sm font-semibold text-green-700"
              >
                {notification}
              </div>
            )}

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-1 gap-5 border-t border-gray-100 pt-7 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <Truck size={23} className="shrink-0 text-purple-600" />
                <div>
                  <p className="text-sm font-bold">Free Delivery</p>
                  <p className="text-xs text-gray-500">Above ₹999</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck size={23} className="shrink-0 text-purple-600" />
                <div>
                  <p className="text-sm font-bold">Secure Shopping</p>
                  <p className="text-xs text-gray-500">Safe checkout demo</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <RotateCcw size={23} className="shrink-0 text-purple-600" />
                <div>
                  <p className="text-sm font-bold">Easy Returns</p>
                  <p className="text-xs text-gray-500">Demo policy</p>
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
            {tabs.map((tab) => (
              <button
                type="button"
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 pb-4 text-sm font-bold transition sm:text-base ${
                  activeTab === tab.id
                    ? "border-purple-600 text-purple-700"
                    : "border-transparent text-gray-500 hover:text-purple-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="max-w-3xl py-8">
            {activeTab === "description" && (
              <div>
                <h2 className="text-xl font-bold">Product Description</h2>
                <p className="mt-4 leading-8 text-gray-600">
                  {product.description}
                </p>
              </div>
            )}

            {activeTab === "details" && (
              <div>
                <h2 className="text-xl font-bold">Product Details</h2>

                <div className="mt-5 divide-y divide-gray-200">
                  {[
                    ["Product", product.name],
                    ["Category", product.category],
                    ["Available Colors", product.colors.join(", ")],
                    ["Available Sizes", product.sizes.join(", ")],
                    ["Availability", `${stock} units`],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex flex-col justify-between gap-2 py-4 sm:flex-row"
                    >
                      <span className="font-semibold text-gray-700">
                        {label}
                      </span>
                      <span className="text-gray-500">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div>
                <h2 className="text-xl font-bold">Shipping & Returns</h2>

                <p className="mt-4 leading-8 text-gray-600">
                  Free shipping is available on orders above ₹999. Shipping
                  times and return conditions are sample information and
                  should be replaced with your actual store policy.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

export default ShopDetails;
