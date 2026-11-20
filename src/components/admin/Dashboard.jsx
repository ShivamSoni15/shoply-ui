
import React from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Download,
  Ellipsis,
  Eye,
  IndianRupee,
  Package,
  ShoppingBag,
  ShoppingCart,
  Users,
  Wallet,
  ArrowRight,
  Clock3,
  CircleCheck,
  Truck,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹2,45,890",
    change: "+12.8%",
    positive: true,
    description: "Compared to last month",
    icon: Wallet,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    title: "Total Orders",
    value: "1,284",
    change: "+8.2%",
    positive: true,
    description: "Compared to last month",
    icon: ShoppingBag,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Total Customers",
    value: "8,549",
    change: "+5.4%",
    positive: true,
    description: "Compared to last month",
    icon: Users,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Total Products",
    value: "456",
    change: "-2.1%",
    positive: false,
    description: "Compared to last month",
    icon: Package,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

const revenueData = [
  { month: "Jan", value: 42 },
  { month: "Feb", value: 58 },
  { month: "Mar", value: 48 },
  { month: "Apr", value: 72 },
  { month: "May", value: 60 },
  { month: "Jun", value: 85 },
  { month: "Jul", value: 68 },
  { month: "Aug", value: 92 },
  { month: "Sep", value: 74 },
  { month: "Oct", value: 88 },
  { month: "Nov", value: 65 },
  { month: "Dec", value: 100 },
];

const orders = [
  {
    id: "#SH-2045",
    customer: "Aarav Sharma",
    initials: "AS",
    product: "Classic Sneakers",
    date: "16 Nov 2026",
    amount: "₹2,499",
    status: "Delivered",
  },
  {
    id: "#SH-2044",
    customer: "Priya Verma",
    initials: "PV",
    product: "Wireless Headphones",
    date: "16 Nov 2026",
    amount: "₹3,999",
    status: "Processing",
  },
  {
    id: "#SH-2043",
    customer: "Rahul Patel",
    initials: "RP",
    product: "Premium Wrist Watch",
    date: "15 Nov 2026",
    amount: "₹1,899",
    status: "Shipped",
  },
  {
    id: "#SH-2042",
    customer: "Ananya Singh",
    initials: "AS",
    product: "Leather Handbag",
    date: "15 Nov 2026",
    amount: "₹2,799",
    status: "Pending",
  },
  {
    id: "#SH-2041",
    customer: "Vivaan Gupta",
    initials: "VG",
    product: "Casual T-Shirt",
    date: "14 Nov 2026",
    amount: "₹899",
    status: "Delivered",
  },
];

const products = [
  {
    name: "Classic Sneakers",
    category: "Footwear",
    sold: 245,
    revenue: "₹6,12,255",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop",
  },
  {
    name: "Wireless Headphones",
    category: "Electronics",
    sold: 189,
    revenue: "₹5,67,000",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop",
  },
  {
    name: "Premium Wrist Watch",
    category: "Accessories",
    sold: 156,
    revenue: "₹4,68,000",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop",
  },
];

const statusStyles = {
  Delivered: "bg-emerald-50 text-emerald-700",
  Processing: "bg-blue-50 text-blue-700",
  Shipped: "bg-violet-50 text-violet-700",
  Pending: "bg-amber-50 text-amber-700",
};

function Dashboard() {
  const handleExport = () => {
    const csvRows = [
      ["Order ID", "Customer", "Product", "Date", "Amount", "Status"],
      ...orders.map((order) => [
        order.id,
        order.customer,
        order.product,
        order.date,
        order.amount,
        order.status,
      ]),
    ];

    const csvContent = csvRows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "shoply-orders.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Welcome back, Admin
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Dashboard Overview
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Here's what's happening with your store today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 shadow-sm">
              <CalendarDays size={17} />
              <span>November 2026</span>
            </div>
            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
            >
              <Download size={17} />
              Export Orders
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}
                  >
                    <Icon size={23} />
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${
                      stat.positive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {stat.positive ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}
                    {stat.change}
                  </span>
                </div>

                <p className="mt-5 text-sm font-medium text-slate-500">
                  {stat.title}
                </p>
                <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                  {stat.value}
                </h2>
                <p className="mt-2 text-xs text-slate-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Revenue and order summary */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Revenue Overview
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Monthly revenue performance
                </p>
              </div>
              <button
                type="button"
                className="flex w-fit items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
              >
                This year
                <Ellipsis size={17} />
              </button>
            </div>

            <div className="mt-7 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">Total revenue</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">
                  ₹24,58,900
                </p>
              </div>
              <p className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
                <ArrowUpRight size={17} />
                12.8% growth
              </p>
            </div>

            <div className="mt-8 flex h-56 items-end gap-2 sm:gap-4">
              {revenueData.map((item) => (
                <div
                  key={item.month}
                  className="group flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                >
                  <div className="relative flex h-full w-full items-end">
                    <div
                      title={`${item.month}: ${item.value}%`}
                      style={{ height: `${item.value}%` }}
                      className="w-full rounded-t-md bg-violet-200 transition-all duration-300 group-hover:bg-violet-600"
                    />
                  </div>
                  <span className="text-[10px] font-medium text-slate-400 sm:text-xs">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Order Summary
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Current order status
                </p>
              </div>
              <ShoppingCart className="text-violet-600" size={22} />
            </div>

            <div className="mt-7 space-y-6">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <CircleCheck size={16} className="text-emerald-500" />
                    Delivered
                  </span>
                  <span className="font-semibold text-slate-900">685</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[78%] rounded-full bg-emerald-500" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Package size={16} className="text-blue-500" />
                    Processing
                  </span>
                  <span className="font-semibold text-slate-900">245</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[45%] rounded-full bg-blue-500" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Truck size={16} className="text-violet-500" />
                    Shipped
                  </span>
                  <span className="font-semibold text-slate-900">189</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[35%] rounded-full bg-violet-500" />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Clock3 size={16} className="text-amber-500" />
                    Pending
                  </span>
                  <span className="font-semibold text-slate-900">165</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[25%] rounded-full bg-amber-400" />
                </div>
              </div>
            </div>

            <div className="mt-7 rounded-xl bg-violet-50 p-4">
              <p className="text-sm font-semibold text-violet-900">
                Total orders
              </p>
              <p className="mt-1 text-2xl font-bold text-violet-700">1,284</p>
              <p className="mt-1 text-xs text-violet-600">
                Orders received this month
              </p>
            </div>
          </section>
        </div>

        {/* Recent orders */}
        <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Recent Orders
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Latest customer orders from your store
              </p>
            </div>
            <button
              type="button"
              onClick={() => console.log("View all orders clicked")}
              className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-800"
            >
              View all orders
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Product</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-violet-600">
                      {order.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
                          {order.initials}
                        </div>
                        <span className="whitespace-nowrap text-sm font-medium text-slate-700">
                          {order.customer}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {order.product}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        aria-label={`View ${order.id}`}
                        onClick={() => console.log("View order:", order.id)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-violet-50 hover:text-violet-600"
                      >
                        <Eye size={17} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Top products */}
        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Top Selling Products
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your best-performing products
              </p>
            </div>
            <button
              type="button"
              onClick={() => console.log("View all products clicked")}
              className="text-sm font-semibold text-violet-600 hover:text-violet-800"
            >
              View all
            </button>
          </div>

          <div className="mt-5 divide-y divide-slate-100">
            {products.map((product, index) => (
              <div
                key={product.name}
                className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="w-5 text-sm font-bold text-slate-400">
                    {index + 1}
                  </span>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-14 w-14 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {product.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {product.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-6 pl-8 sm:justify-end sm:pl-0">
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-semibold text-slate-800">
                      {product.sold} sold
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Units sold</p>
                  </div>
                  <div className="min-w-24 text-right">
                    <p className="text-sm font-bold text-violet-700">
                      {product.revenue}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Revenue</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
