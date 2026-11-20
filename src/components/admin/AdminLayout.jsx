
import React, { useState } from "react";
import {
  Outlet,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Search,
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  LogOut,
  UserCircle,
  Store,
} from "lucide-react";

import ShoplyLogo from "../Logo";

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard, end: true },
  { name: "Products", path: "/admin/products", icon: Package },
  { name: "Orders", path: "/admin/orders", icon: ShoppingCart },
  { name: "Users", path: "/admin/users", icon: Users },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const currentPage =
    menuItems.find((item) =>
      item.end
        ? location.pathname === item.path
        : location.pathname.startsWith(item.path)
    )?.name || "Admin";

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(
        `/admin/products?search=${encodeURIComponent(search.trim())}`
      );
    }
  };

  const handleLogout = () => navigate("/login");

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <button
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 flex flex-col
          border-r border-[#39324f]
          bg-[#211d35] text-white
          transition-[width,transform] duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        
        {/* Logo Area */}
        <div className="flex h-20 items-center justify-between border-b border-[#39324f] px-5">
          {!collapsed ? (
            <ShoplyLogo
              size="md"
              variant="light"
              showIcon={true}
              showTagline={true}
            />
          ) : (
            <div className="mx-auto text-white">
              <Store size={25} />
            </div>
          )}

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 text-violet-200 hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-7">
          {!collapsed && (
            <p className="mb-4 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-[#a99fbd]">
              Workspace
            </p>
          )}

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={() => setSidebarOpen(false)}
                  title={collapsed ? item.name : ""}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors duration-200 ${
                      collapsed ? "justify-center" : ""
                    } ${
                      isActive
                        ? "bg-violet-500/20 text-white ring-1 ring-inset ring-violet-400/30"
                        : "text-[#c1b8d0] hover:bg-white/[0.07] hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-violet-400" />
                      )}

                      <Icon
                        size={20}
                        className={`shrink-0 ${
                          isActive
                            ? "text-violet-300"
                            : "text-[#a99fbd] group-hover:text-violet-200"
                        }`}
                      />

                      {!collapsed && <span>{item.name}</span>}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {!collapsed && (
            <div className="mt-12 rounded-2xl border border-violet-300/10 bg-gradient-to-br from-violet-500/15 to-indigo-500/5 p-4">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/15 text-violet-300">
                <Store size={21} />
              </div>

              <p className="text-sm font-semibold text-white">
                Shoply Store
              </p>

              <p className="mt-1 text-xs leading-5 text-[#b9afca]">
                Manage your products, orders and customers.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar Bottom */}
        <div className="border-t border-[#39324f] p-3">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden w-full items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm text-[#b9afca] transition hover:bg-white/[0.07] hover:text-white lg:flex"
          >
            {collapsed ? (
              <ChevronRight size={19} />
            ) : (
              <>
                <ChevronLeft size={19} />
                <span>Collapse Sidebar</span>
              </>
            )}
          </button>

          <button
            onClick={handleLogout}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-rose-300 transition hover:bg-rose-400/10 ${
              collapsed ? "justify-center" : ""
            }`}
            title={collapsed ? "Logout" : ""}
          >
            <LogOut size={19} />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div
        className={`min-h-screen transition-[margin] duration-300 ${
          collapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-[#39324f] bg-[#302943] text-white shadow-md shadow-slate-900/10">
          <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

            {/* Page Title */}
            <div className="flex min-w-0 items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-xl p-2 text-violet-100 transition hover:bg-white/10 lg:hidden"
                aria-label="Open sidebar"
              >
                <Menu size={22} />
              </button>

              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold text-white sm:text-xl">
                  {currentPage}
                </h1>
                <p className="hidden text-xs text-[#b9afca] sm:block">
                  Welcome back to your workspace
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2 sm:gap-4">

              {/* Search */}
              <form
                onSubmit={handleSearch}
                className="hidden items-center gap-2 rounded-xl border border-white/10 bg-[#211d35] px-3 py-2.5 transition focus-within:border-violet-400/60 md:flex"
              >
                <Search size={17} className="text-violet-300" />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search products..."
                  className="w-36 bg-transparent text-sm text-white outline-none placeholder:text-[#a99fbd] lg:w-48"
                />
              </form>

              {/* Notification */}
              <button
                aria-label="Notifications"
                className="relative rounded-xl p-2.5 text-violet-100 transition hover:bg-white/10"
              >
                <Bell size={20} />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-400 ring-2 ring-[#302943]" />
              </button>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-white/10 sm:px-3 sm:py-2"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-300/30 bg-violet-500/20 text-sm font-bold text-violet-100">
                    A
                  </div>

                  <div className="hidden text-left sm:block">
                    <p className="text-sm font-semibold text-white">
                      Admin
                    </p>
                    <p className="text-xs text-[#b9afca]">
                      Administrator
                    </p>
                  </div>

                  <ChevronDown
                    size={16}
                    className="hidden text-violet-200 sm:block"
                  />
                </button>

                {profileOpen && (
                  <>
                    <button
                      aria-label="Close profile menu"
                      onClick={() => setProfileOpen(false)}
                      className="fixed inset-0 z-40 cursor-default"
                    />

                    <div className="absolute right-0 top-full z-50 mt-3 w-52 overflow-hidden rounded-xl border border-[#49405e] bg-[#211d35] py-2 shadow-xl">
                      <div className="border-b border-[#39324f] px-4 py-3">
                        <p className="text-sm font-semibold text-white">
                          Admin
                        </p>
                        <p className="text-xs text-[#b9afca]">
                          Shoply Administrator
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          navigate("/admin");
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-[#ddd5e8] transition hover:bg-white/10"
                      >
                        <UserCircle size={17} />
                        Dashboard
                      </button>

                      <button
                        onClick={() => {
                          setProfileOpen(false);
                          handleLogout();
                        }}
                        className="flex w-full items-center gap-3 px-4 py-3 text-sm text-rose-300 transition hover:bg-rose-400/10"
                      >
                        <LogOut size={17} />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-80px)] bg-slate-100 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
