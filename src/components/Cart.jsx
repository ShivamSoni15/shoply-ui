
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Trash2,
  Truck,
  ShieldCheck,
  Package,
} from "lucide-react";

const initialCartItems = [
  {
    id: 1,
    name: "Premium Urban Sneakers",
    category: "Footwear",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    price: 2499,
    originalPrice: 3999,
    color: "Red",
    size: "8",
    quantity: 1,
  },
  {
    id: 2,
    name: "Classic Luxury Watch",
    category: "Accessories",
    image:
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600",
    price: 3299,
    originalPrice: 4499,
    color: "Black",
    size: "Standard",
    quantity: 1,
  },
  {
    id: 3,
    name: "Wireless Headphones",
    category: "Electronics",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    price: 1799,
    originalPrice: 2499,
    color: "Black",
    size: "Standard",
    quantity: 2,
  },
];

const SHIPPING_CHARGE = 79;
const FREE_SHIPPING_LIMIT = 999;

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState(initialCartItems);
  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponMessage, setCouponMessage] = useState("");

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const totalOriginalPrice = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.originalPrice * item.quantity,
        0
      ),
    [cartItems]
  );

  const discount = totalOriginalPrice - subtotal;
  const couponDiscount = couponApplied ? Math.round(subtotal * 0.1) : 0;

  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_LIMIT
      ? 0
      : SHIPPING_CHARGE;

  const total = Math.max(0, subtotal - couponDiscount + shipping);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const updateQuantity = (id, action) => {
    setCartItems((previousItems) =>
      previousItems.map((item) => {
        if (item.id !== id) return item;

        const newQuantity =
          action === "increase"
            ? item.quantity + 1
            : item.quantity - 1;

        return {
          ...item,
          quantity: Math.max(1, newQuantity),
        };
      })
    );
  };

  const removeItem = (id) => {
    setCartItems((previousItems) =>
      previousItems.filter((item) => item.id !== id)
    );
  };

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SHOPLY10") {
      setCouponApplied(true);
      setCouponMessage("Coupon applied! You saved 10%.");
      setCoupon("SHOPLY10");
    } else {
      setCouponApplied(false);
      setCouponMessage("Invalid coupon. Try SHOPLY10.");
    }
  };

  const removeCoupon = () => {
    setCouponApplied(false);
    setCoupon("");
    setCouponMessage("");
  };

  const handleCheckout = () => {
    console.log("Cart checkout items:", cartItems);
    console.log("Order total:", total);

    navigate("/checkout", {
      state: {
        items: cartItems,
      },
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="mb-5 flex items-center gap-2 text-sm font-semibold text-gray-500 transition hover:text-purple-700"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </button>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Shopping Cart
              </h1>
              <p className="mt-2 text-gray-500">
                Review your selected products before checkout.
              </p>
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-purple-700">
              <ShoppingCart size={27} />
            </div>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        {cartItems.length > 0 ? (
          <div className="grid items-start gap-8 lg:grid-cols-3">

            {/* Product List */}
            <div className="space-y-5 lg:col-span-2">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Cart Items
                </h2>

                <span className="rounded-full bg-purple-100 px-4 py-2 text-sm font-bold text-purple-700">
                  {cartItems.length} Products
                </span>
              </div>

              {cartItems.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row">

                    {/* Product Image */}
                    <div className="relative h-44 overflow-hidden rounded-xl bg-gray-100 sm:h-36 sm:w-36 sm:shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-bold uppercase tracking-wider text-purple-600">
                              {item.category}
                            </p>

                            <h3 className="mt-1 text-lg font-bold text-gray-900">
                              {item.name}
                            </h3>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.name}`}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-gray-400 transition hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={19} />
                          </button>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-3 text-sm text-gray-500">
                          <span>
                            Color:{" "}
                            <strong className="text-gray-800">
                              {item.color}
                            </strong>
                          </span>

                          <span>
                            Size:{" "}
                            <strong className="text-gray-800">
                              {item.size}
                            </strong>
                          </span>
                        </div>
                      </div>

                      {/* Quantity and Price */}
                      <div className="mt-5 flex flex-wrap items-end justify-between gap-4">
                        <div>
                          <p className="text-xs font-medium text-gray-400">
                            Quantity
                          </p>

                          <div className="mt-2 inline-flex items-center overflow-hidden rounded-lg border border-gray-200">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, "decrease")
                              }
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
                              className="flex h-9 w-10 items-center justify-center text-gray-600 transition hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-40"
                            >
                              <Minus size={15} />
                            </button>

                            <span className="flex h-9 min-w-10 items-center justify-center border-x border-gray-200 text-sm font-bold">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(item.id, "increase")
                              }
                              aria-label="Increase quantity"
                              className="flex h-9 w-10 items-center justify-center text-gray-600 transition hover:bg-purple-50"
                            >
                              <Plus size={15} />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-gray-400">
                            {formatPrice(item.originalPrice)}
                          </p>

                          <p className="text-xl font-extrabold text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              {/* Continue Shopping */}
              <button
                type="button"
                onClick={() => navigate("/shop")}
                className="inline-flex items-center gap-2 rounded-xl border border-purple-200 bg-white px-5 py-3 text-sm font-bold text-purple-700 transition hover:bg-purple-50"
              >
                <ArrowLeft size={17} />
                Continue Shopping
              </button>
            </div>

            {/* Order Summary */}
            <aside className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-extrabold text-gray-900">
                Order Summary
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your purchase details
              </p>

              {/* Coupon */}
              <div className="mt-7">
                <label className="mb-2 block text-sm font-bold text-gray-700">
                  Coupon Code
                </label>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(event) => {
                      setCoupon(event.target.value);
                      setCouponMessage("");
                    }}
                    disabled={couponApplied}
                    placeholder="Enter coupon code"
                    className="min-w-0 flex-1 rounded-xl border border-gray-200 px-3 py-3 text-sm uppercase outline-none transition focus:border-purple-500 focus:ring-4 focus:ring-purple-100 disabled:bg-gray-50"
                  />

                  {couponApplied ? (
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="rounded-xl bg-red-50 px-4 text-sm font-bold text-red-600 hover:bg-red-100"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="rounded-xl bg-purple-600 px-4 text-sm font-bold text-white transition hover:bg-purple-700"
                    >
                      Apply
                    </button>
                  )}
                </div>

                <p
                  role="status"
                  className={`mt-2 text-xs ${
                    couponApplied ? "text-green-600" : "text-gray-500"
                  }`}
                >
                  {couponMessage || "Try SHOPLY10 to save 10%"}
                </p>
              </div>

              {/* Price Details */}
              <div className="mt-7 space-y-4 border-t border-gray-100 pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold text-gray-900">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Product Discount</span>
                  <span className="font-bold text-green-600">
                    -{formatPrice(discount)}
                  </span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Coupon Discount</span>
                    <span className="font-bold text-green-600">
                      -{formatPrice(couponDiscount)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span
                    className={`font-bold ${
                      shipping === 0 ? "text-green-600" : "text-gray-900"
                    }`}
                  >
                    {shipping === 0 ? "FREE" : formatPrice(shipping)}
                  </span>
                </div>
              </div>

              {/* Total */}
              <div className="mt-6 flex items-center justify-between border-t border-dashed border-gray-200 pt-6">
                <span className="text-base font-bold text-gray-900">
                  Total Amount
                </span>

                <span className="text-2xl font-extrabold text-purple-700">
                  {formatPrice(total)}
                </span>
              </div>

              {/* Checkout */}
              <button
                type="button"
                onClick={handleCheckout}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-4 font-bold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-1 hover:bg-purple-700"
              >
                Proceed to Checkout
                <ArrowRight size={19} />
              </button>

              <p className="mt-4 text-center text-xs leading-6 text-gray-400">
                Secure checkout experience. This is a frontend demo.
              </p>

              {/* Trust Information */}
              <div className="mt-7 space-y-4 border-t border-gray-100 pt-6">
                <div className="flex items-center gap-3">
                  <Truck size={20} className="text-purple-600" />
                  <p className="text-sm text-gray-600">
                    Free shipping above ₹999
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} className="text-purple-600" />
                  <p className="text-sm text-gray-600">
                    Safe and secure checkout
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Package size={20} className="text-purple-600" />
                  <p className="text-sm text-gray-600">
                    Easy returns and support
                  </p>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          /* Empty Cart */
          <div className="mx-auto max-w-xl rounded-3xl border border-gray-100 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-purple-50 text-purple-600">
              <ShoppingBag size={42} />
            </div>

            <h2 className="mt-7 text-2xl font-extrabold text-gray-900">
              Your cart is empty
            </h2>

            <p className="mt-3 leading-7 text-gray-500">
              Looks like you haven't added anything to your cart yet.
              Explore our collections and find something you love.
            </p>

            <button
              type="button"
              onClick={() => navigate("/shop")}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-7 py-4 font-bold text-white transition hover:bg-purple-700"
            >
              Start Shopping
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Cart;
