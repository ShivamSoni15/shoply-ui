import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  Heart,
  ShoppingCart,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  ChevronRight,
  ChevronDown,
  UserRound,
  Package,
  LogOut,
  User,
} from "lucide-react";
import ShoplyLogo from "./Logo";

export default function Layout() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("shoply-user") || "null");
    } catch {
      return null;
    }
  });

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "New Arrivals", path: "/new-arrivals" },
    { name: "Contact", path: "/contact" },
    ];

  useEffect(() => {
    const updateCartCount = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("shoply-cart") || "[]");
        const total = Array.isArray(cart)
          ? cart.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0)
          : 0;
        setCartCount(total);
      } catch {
        setCartCount(0);
      }
    };

    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    window.addEventListener("shoply-cart-updated", updateCartCount);
    return () => {
      window.removeEventListener("storage", updateCartCount);
      window.removeEventListener("shoply-cart-updated", updateCartCount);
    };
  }, []);

  useEffect(() => {
    const updateUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("shoply-user") || "null"));
      } catch {
        setUser(null);
      }
    };

    updateUser();
    window.addEventListener("storage", updateUser);
    window.addEventListener("shoply-user-updated", updateUser);
    return () => {
      window.removeEventListener("storage", updateUser);
      window.removeEventListener("shoply-user-updated", updateUser);
    };
  }, []);

  const userName = user?.fullName || user?.name || user?.username || "Guest User";
  const userEmail = user?.email || "Welcome to Shoply";
  const userInitial = userName.charAt(0).toUpperCase();

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setProfileOpen(false);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    navigate(`/shop?search=${encodeURIComponent(query)}`);
    setSearchQuery("");
    setMobileMenuOpen(false);
  };

  const handleNewsletter = (event) => {
    event.preventDefault();
    const email = newsletterEmail.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setNewsletterMessage("Please enter a valid email address.");
      return;
    }
    console.log("Newsletter subscription:", { email });
    setNewsletterMessage("Thank you for subscribing!");
    setNewsletterEmail("");
  };

  const handleLogout = () => {
    localStorage.removeItem("shoply-user");
    setUser(null);
    closeMenus();
    window.dispatchEvent(new Event("shoply-user-updated"));
    navigate("/login");
  };

  const renderSearch = (mobile = false) => (
    <form onSubmit={handleSearch} className={mobile ? "pb-4 lg:hidden" : "hidden max-w-xs flex-1 lg:flex"}>
      <div className="flex w-full items-center rounded-full border border-slate-200 bg-slate-50 px-4 transition focus-within:border-purple-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-purple-100">
        <Search size={18} className="shrink-0 text-slate-400" />
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search products..."
          aria-label="Search products"
          className="w-full bg-transparent px-3 py-2.5 text-sm outline-none"
        />
        <button type="submit" className="text-sm font-bold text-purple-700 hover:text-purple-900">
          Search
        </button>
      </div>
    </form>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Announcement Bar */}
      <div className="bg-purple-800 px-4 py-2 text-center text-xs font-medium text-white sm:text-sm">
        <span className="font-bold">Special Offer!</span> Free shipping on orders above ₹999.
        <Link to="/shop" className="ml-2 inline-flex items-center gap-1 font-bold underline underline-offset-4 hover:text-purple-200">
          Shop Now <ArrowRight size={13} />
        </Link>
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-3">
            <Link to="/" onClick={closeMenus} className="shrink-0" aria-label="Shoply home">
              <ShoplyLogo size="md" variant="dark" showIcon showTagline={false} />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-5 xl:flex">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="whitespace-nowrap text-sm font-semibold text-slate-600 transition hover:text-purple-700">
                  {link.name}
                </Link>
              ))}
            </nav>

            {renderSearch(false)}

            {/* Header Actions */}
            <div className="flex shrink-0 items-center gap-1 sm:gap-2">
              <Link to="/wishlist" aria-label="Wishlist" className="group flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-purple-50 hover:text-purple-700">
                <Heart size={22} strokeWidth={1.8} className="transition duration-300 group-hover:scale-125 group-hover:fill-purple-600 group-hover:text-purple-600" />
              </Link>

              <Link to="/cart" aria-label={`Shopping cart, ${cartCount} items`} className="group relative flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-purple-50 hover:text-purple-700">
                <ShoppingCart size={22} strokeWidth={1.8} className="transition duration-300 group-hover:scale-110" />
                {cartCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 min-w-5 animate__animated animate__bounceIn items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>

              {/* Profile Dropdown */}
              <div className="relative hidden sm:block">
                <button type="button" onClick={() => setProfileOpen((previous) => !previous)} aria-expanded={profileOpen} aria-label="User profile menu" className="flex items-center gap-2 rounded-full p-1.5 transition hover:bg-purple-50">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 font-bold text-purple-700">
                    {user ? userInitial : <UserRound size={20} />}
                  </div>
                  <div className="hidden text-left lg:block">
                    <p className="max-w-24 truncate text-xs font-bold text-slate-800">{userName}</p>
                    <p className="text-[10px] text-slate-500">{user ? "My Account" : "Guest"}</p>
                  </div>
                  <ChevronDown size={15} className={`text-slate-500 transition ${profileOpen ? "rotate-180" : ""}`} />
                </button>

                {profileOpen && (
                  <div className="animate__animated animate__fadeInDown absolute right-0 top-14 z-50 w-72 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl">
                    <div className="bg-purple-50 p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-purple-700 text-lg font-bold text-white">
                          {user ? userInitial : <UserRound size={24} />}
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate font-bold text-slate-900">{userName}</h3>
                          <p className="truncate text-xs text-slate-500">{userEmail}</p>
                        </div>
                      </div>
                      {!user && (
                        <Link to="/login" onClick={closeMenus} className="mt-4 block rounded-xl bg-purple-700 py-2.5 text-center text-sm font-bold text-white transition hover:bg-purple-800">
                          Login to Your Account
                        </Link>
                      )}
                    </div>

                    <div className="p-2">
                      <Link to="/track-order" onClick={closeMenus} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-purple-50 hover:text-purple-700">
                        <Package size={19} /> Track My Orders
                      </Link>
                      <Link to="/cart" onClick={closeMenus} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-purple-50 hover:text-purple-700">
                        <ShoppingCart size={19} /> My Shopping Cart
                      </Link>
                      <Link to="/wishlist" onClick={closeMenus} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-purple-50 hover:text-purple-700">
                        <Heart size={19} /> My Wishlist
                      </Link>
                      {user && (
                        <Link to="/profile" onClick={closeMenus} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-purple-50 hover:text-purple-700">
                          <User size={19} /> My Profile
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-slate-100 p-2">
                      {user ? (
                        <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50">
                          <LogOut size={19} /> Logout
                        </button>
                      ) : (
                        <Link to="/signup" onClick={closeMenus} className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-purple-700 transition hover:bg-purple-50">
                          <User size={19} /> Create Account
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Menu Toggle */}
              <button type="button" onClick={() => setMobileMenuOpen((previous) => !previous)} className="ml-1 flex h-10 w-10 items-center justify-center rounded-full text-slate-700 transition hover:bg-purple-50 hover:text-purple-700 xl:hidden" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} aria-expanded={mobileMenuOpen}>
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {renderSearch(true)}

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="animate__animated animate__fadeInDown border-t border-slate-100 py-4 xl:hidden">
              <div className="mb-3 flex items-center gap-3 rounded-2xl bg-purple-50 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-700 font-bold text-white">
                  {user ? userInitial : <UserRound size={22} />}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-slate-900">{userName}</p>
                  <p className="truncate text-xs text-slate-500">{userEmail}</p>
                </div>
                {user && (
                  <button type="button" onClick={handleLogout} aria-label="Logout" className="rounded-lg p-2 text-red-600 hover:bg-red-100">
                    <LogOut size={19} />
                  </button>
                )}
              </div>

              <nav className="flex flex-col">
                {navLinks.map((link) => (
                  <Link key={link.path} to={link.path} onClick={closeMenus} className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-purple-50 hover:text-purple-700">
                    {link.name}<ChevronRight size={17} />
                  </Link>
                ))}
              </nav>

              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                {!user ? (
                  <>
                    <Link to="/login" onClick={closeMenus} className="rounded-xl border border-purple-200 py-3 text-center text-sm font-bold text-purple-700 hover:bg-purple-50">Login</Link>
                    <Link to="/signup" onClick={closeMenus} className="rounded-xl bg-purple-700 py-3 text-center text-sm font-bold text-white hover:bg-purple-800">Sign Up</Link>
                  </>
                ) : (
                  <button type="button" onClick={handleLogout} className="col-span-2 flex items-center justify-center gap-2 rounded-xl bg-red-50 py-3 text-sm font-bold text-red-600 hover:bg-red-100">
                    <LogOut size={17} /> Logout
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main className="min-h-[60vh]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-300">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <Link to="/" className="inline-block">
              <ShoplyLogo size="lg" variant="light" showIcon showTagline />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-400">
              Discover quality products at great prices. Shop smart, enjoy convenient shopping, and find everything you love in one place.
            </p>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              {navLinks.map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="inline-flex items-center gap-2 transition hover:translate-x-1 hover:text-purple-400">
                    <ChevronRight size={14} />{item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-bold text-white">Customer Service</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/contact" className="hover:text-purple-400">Help &amp; Support</Link></li>
              <li><Link to="/track-order" className="hover:text-purple-400">Order Tracking</Link></li>
              <li><Link to="/privacy" className="hover:text-purple-400">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-purple-400">Terms &amp; Conditions</Link></li>
            </ul>
            <div className="mt-6 space-y-3 text-sm text-slate-400">
              <p className="flex items-center gap-3"><Mail size={17} className="text-purple-400" />support@shoply.com</p>
              <p className="flex items-center gap-3"><Phone size={17} className="text-purple-400" />+91 00000 00000</p>
              <p className="flex items-center gap-3"><MapPin size={17} className="text-purple-400" />India</p>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-lg font-bold text-white">Join Our Newsletter</h3>
            <p className="mb-5 text-sm leading-6 text-slate-400">
              Subscribe to receive updates about new arrivals, special offers, and exclusive deals.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-3">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(event) => {
                  setNewsletterEmail(event.target.value);
                  setNewsletterMessage("");
                }}
                placeholder="Enter your email"
                aria-label="Newsletter email"
                className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-purple-400"
              />
              <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-700 px-4 py-3 text-sm font-bold text-white transition hover:bg-purple-600">
                Subscribe<ArrowRight size={17} />
              </button>
              {newsletterMessage && <p className="text-xs text-purple-300" role="status">{newsletterMessage}</p>}
            </form>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-center text-xs text-slate-500 sm:px-6 md:flex-row lg:px-8">
            <p>© {new Date().getFullYear()} Shoply. All rights reserved.</p>
            <p>Designed with care for a better shopping experience.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
