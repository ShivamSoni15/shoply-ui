
import React, { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ShoppingBag,
  Clock3,
  Truck,
  CheckCircle2,
  XCircle,
  Eye,
  Pencil,
  Trash2,
  X,
  ChevronDown,
  CalendarDays,
  IndianRupee,
  Package,
  MapPin,
  Phone,
  Mail,
  User,
  ArrowUpDown,
} from "lucide-react";

const initialOrders = [
  {
    id: "SH-2045",
    customer: "Aarav Sharma",
    email: "aarav@example.com",
    phone: "9876543210",
    date: "2026-11-16",
    status: "Delivered",
    payment: "Paid",
    method: "UPI",
    total: 2499,
    items: [
      {
        name: "Classic Sneakers",
        quantity: 1,
        price: 2499,
        image:
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&h=120&fit=crop",
      },
    ],
    address: "House 24, Main Road, Bilaspur, Chhattisgarh - 495001",
  },
  {
    id: "SH-2044",
    customer: "Priya Verma",
    email: "priya@example.com",
    phone: "9876543211",
    date: "2026-11-16",
    status: "Processing",
    payment: "Paid",
    method: "Card",
    total: 3999,
    items: [
      {
        name: "Wireless Headphones",
        quantity: 1,
        price: 3999,
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&h=120&fit=crop",
      },
    ],
    address: "Sector 5, Raipur, Chhattisgarh - 492001",
  },
  {
    id: "SH-2043",
    customer: "Rahul Patel",
    email: "rahul@example.com",
    phone: "9876543212",
    date: "2026-11-15",
    status: "Shipped",
    payment: "Paid",
    method: "UPI",
    total: 1899,
    items: [
      {
        name: "Premium Wrist Watch",
        quantity: 1,
        price: 1899,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=120&h=120&fit=crop",
      },
    ],
    address: "MG Road, Durg, Chhattisgarh - 491001",
  },
  {
    id: "SH-2042",
    customer: "Ananya Singh",
    email: "ananya@example.com",
    phone: "9876543213",
    date: "2026-11-15",
    status: "Pending",
    payment: "Pending",
    method: "COD",
    total: 2799,
    items: [
      {
        name: "Leather Handbag",
        quantity: 1,
        price: 2799,
        image:
          "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=120&h=120&fit=crop",
      },
    ],
    address: "Civil Lines, Bilaspur, Chhattisgarh - 495001",
  },
  {
    id: "SH-2041",
    customer: "Vivaan Gupta",
    email: "vivaan@example.com",
    phone: "9876543214",
    date: "2026-11-14",
    status: "Cancelled",
    payment: "Refunded",
    method: "Card",
    total: 899,
    items: [
      {
        name: "Casual Cotton T-Shirt",
        quantity: 1,
        price: 899,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=120&h=120&fit=crop",
      },
    ],
    address: "Shankar Nagar, Raipur, Chhattisgarh - 492007",
  },
  {
    id: "SH-2040",
    customer: "Meera Joshi",
    email: "meera@example.com",
    phone: "9876543215",
    date: "2026-11-13",
    status: "Delivered",
    payment: "Paid",
    method: "UPI",
    total: 4599,
    items: [
      {
        name: "Smart Watch",
        quantity: 1,
        price: 4599,
        image:
          "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=120&h=120&fit=crop",
      },
    ],
    address: "Nehru Nagar, Bilaspur, Chhattisgarh - 495004",
  },
];

const statusStyles = {
  Pending: "bg-amber-50 text-amber-700",
  Processing: "bg-blue-50 text-blue-700",
  Shipped: "bg-violet-50 text-violet-700",
  Delivered: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-700",
};

const paymentStyles = {
  Paid: "bg-emerald-50 text-emerald-700",
  Pending: "bg-amber-50 text-amber-700",
  Refunded: "bg-slate-100 text-slate-600",
};

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function Orders() {
  const [orders, setOrders] = useState(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [paymentFilter, setPaymentFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [deleteOrder, setDeleteOrder] = useState(null);
  const [notice, setNotice] = useState("");

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(query) ||
          order.customer.toLowerCase().includes(query) ||
          order.email.toLowerCase().includes(query) ||
          order.phone.includes(query)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((order) => order.status === statusFilter);
    }

    if (paymentFilter !== "All") {
      result = result.filter((order) => order.payment === paymentFilter);
    }

    if (sortBy === "oldest") {
      result.sort((a, b) => a.date.localeCompare(b.date));
    } else if (sortBy === "amount-high") {
      result.sort((a, b) => b.total - a.total);
    } else if (sortBy === "amount-low") {
      result.sort((a, b) => a.total - b.total);
    } else {
      result.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
    }

    return result;
  }, [orders, search, statusFilter, paymentFilter, sortBy]);

  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter((order) => order.status === "Pending").length,
      processing: orders.filter((order) => order.status === "Processing").length,
      shipped: orders.filter((order) => order.status === "Shipped").length,
      delivered: orders.filter((order) => order.status === "Delivered").length,
      revenue: orders
        .filter(
          (order) =>
            order.payment === "Paid" && order.status !== "Cancelled"
        )
        .reduce((sum, order) => sum + order.total, 0),
    };
  }, [orders]);

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setPaymentFilter("All");
    setSortBy("newest");
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((current) =>
      current.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status: newStatus,
              payment:
                newStatus === "Cancelled" && order.payment === "Paid"
                  ? "Refunded"
                  : order.payment,
            }
          : order
      )
    );

    console.log("Order status updated:", {
      orderId,
      status: newStatus,
    });

    setNotice(`Order ${orderId} status updated.`);
    setEditingOrder(null);

    setSelectedOrder((current) =>
      current?.id === orderId
        ? {
            ...current,
            status: newStatus,
            payment:
              newStatus === "Cancelled" && current.payment === "Paid"
                ? "Refunded"
                : current.payment,
          }
        : current
    );
  };

  const handleDelete = () => {
    if (!deleteOrder) return;

    setOrders((current) =>
      current.filter((order) => order.id !== deleteOrder.id)
    );

    console.log("Order deleted:", { orderId: deleteOrder.id });

    setNotice(`Order ${deleteOrder.id} removed from this demo list.`);
    setDeleteOrder(null);

    if (selectedOrder?.id === deleteOrder.id) {
      setSelectedOrder(null);
    }
  };

  const exportOrders = () => {
    const rows = [
      [
        "Order ID",
        "Customer",
        "Date",
        "Status",
        "Payment",
        "Payment Method",
        "Total",
      ],
      ...filteredOrders.map((order) => [
        order.id,
        order.customer,
        order.date,
        order.status,
        order.payment,
        order.method,
        order.total,
      ]),
    ];

    const csv = rows
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "shoply-orders.csv";
    link.click();

      setTimeout(() => {
        URL.revokeObjectURL(url);
      }, 1000);
   
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Store management
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
              Orders
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Track, manage and update your customer orders.
            </p>
          </div>

          <button
            type="button"
            onClick={exportOrders}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-violet-700"
          >
            <Package size={18} />
            Export Orders
          </button>
        </div>

        {/* Notification */}
        {notice && (
          <div className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              {notice}
            </span>
            <button
              type="button"
              onClick={() => setNotice("")}
              aria-label="Dismiss notification"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Total Orders</p>
              <span className="rounded-xl bg-violet-100 p-2.5 text-violet-600">
                <ShoppingBag size={20} />
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">
              {stats.total}
            </p>
            <p className="mt-1 text-xs text-slate-400">Orders in this demo</p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">
                Paid Order Revenue
              </p>
              <span className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600">
                <IndianRupee size={20} />
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">
              {formatPrice(stats.revenue)}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Paid, non-cancelled orders
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Pending</p>
              <span className="rounded-xl bg-amber-100 p-2.5 text-amber-600">
                <Clock3 size={20} />
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">
              {stats.pending}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Orders awaiting action
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Processing</p>
              <span className="rounded-xl bg-blue-100 p-2.5 text-blue-600">
                <Package size={20} />
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">
              {stats.processing}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Orders being prepared
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Shipped</p>
              <span className="rounded-xl bg-violet-100 p-2.5 text-violet-600">
                <Truck size={20} />
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">
              {stats.shipped}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Orders on the way
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-slate-500">Delivered</p>
              <span className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600">
                <CheckCircle2 size={20} />
              </span>
            </div>
            <p className="mt-4 text-2xl font-bold text-slate-900">
              {stats.delivered}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Successfully delivered
            </p>
          </div>
        </div>

        {/* Filters */}
        <section className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search order ID, customer, email or phone..."
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:w-auto">
              <div className="relative">
                <SlidersHorizontal
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-8 text-sm text-slate-600 outline-none focus:border-violet-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <select
                  value={paymentFilter}
                  onChange={(event) => setPaymentFilter(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-3 pr-8 text-sm text-slate-600 outline-none focus:border-violet-500"
                >
                  <option value="All">All Payments</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                  <option value="Refunded">Refunded</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>

              <div className="relative">
                <ArrowUpDown
                  size={15}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-9 pr-8 text-sm text-slate-600 outline-none focus:border-violet-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="amount-high">Amount: High to Low</option>
                  <option value="amount-low">Amount: Low to High</option>
                </select>
                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-semibold text-slate-800">
                {filteredOrders.length}
              </span>{" "}
              of {orders.length} orders
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-semibold text-violet-600 hover:text-violet-800"
            >
              Clear filters
            </button>
          </div>
        </section>

        {/* Orders table */}
        <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
            <h2 className="font-bold text-slate-900">All Orders</h2>
            <p className="mt-1 text-xs text-slate-500">
              View order details and manage order status
            </p>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <ShoppingBag size={42} className="text-slate-300" />
              <h3 className="mt-4 font-semibold text-slate-800">
                No orders found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try changing your search or filters.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-4 text-sm font-semibold text-violet-600"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px] text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Order ID</th>
                    <th className="px-6 py-4 font-semibold">Customer</th>
                    <th className="px-6 py-4 font-semibold">Date</th>
                    <th className="px-6 py-4 font-semibold">Total</th>
                    <th className="px-6 py-4 font-semibold">Payment</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition hover:bg-slate-50/70"
                    >
                      <td className="px-6 py-4 text-sm font-bold text-violet-600">
                        #{order.id}
                      </td>

                      <td className="px-6 py-4">
                        <p className="whitespace-nowrap text-sm font-semibold text-slate-800">
                          {order.customer}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {order.email}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-500">
                        {formatDate(order.date)}
                      </td>

                      <td className="px-6 py-4 text-sm font-bold text-slate-800">
                        {formatPrice(order.total)}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1.5 text-xs font-semibold ${paymentStyles[order.payment]}`}
                        >
                          {order.payment}
                        </span>
                        <p className="mt-1 text-xs text-slate-400">
                          {order.method}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[order.status]}`}
                        >
                          {order.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            title="View order"
                            aria-label={`View order ${order.id}`}
                            onClick={() => setSelectedOrder(order)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-violet-50 hover:text-violet-600"
                          >
                            <Eye size={17} />
                          </button>
                          <button
                            type="button"
                            title="Update status"
                            aria-label={`Update order ${order.id}`}
                            onClick={() => setEditingOrder(order)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Pencil size={17} />
                          </button>
                          <button
                            type="button"
                            title="Delete order"
                            aria-label={`Delete order ${order.id}`}
                            onClick={() => setDeleteOrder(order)}
                            className="rounded-lg p-2 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      {/* Order details modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-details-title"
            className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
              <div>
                <h2
                  id="order-details-title"
                  className="text-lg font-bold text-slate-900"
                >
                  Order Details
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  Order #{selectedOrder.id}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                aria-label="Close order details"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[75vh] space-y-6 overflow-y-auto p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm text-slate-500">
                  Placed on {formatDate(selectedOrder.date)}
                </span>
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[selectedOrder.status]}`}
                >
                  {selectedOrder.status}
                </span>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-bold text-slate-900">
                  Customer Information
                </h3>
                <div className="grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <User size={16} className="text-violet-500" />
                    {selectedOrder.customer}
                  </p>
                  <p className="flex items-center gap-2 break-all text-sm text-slate-600">
                    <Mail size={16} className="shrink-0 text-violet-500" />
                    {selectedOrder.email}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-slate-600">
                    <Phone size={16} className="text-violet-500" />
                    {selectedOrder.phone}
                  </p>
                  <p className="flex items-start gap-2 text-sm text-slate-600 sm:col-span-2">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-violet-500" />
                    {selectedOrder.address}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 text-sm font-bold text-slate-900">
                  Ordered Products
                </h3>
                <div className="space-y-3">
                  {selectedOrder.items.map((item, index) => (
                    <div
                      key={`${item.name}-${index}`}
                      className="flex items-center gap-3 rounded-xl border border-slate-100 p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-14 w-14 rounded-lg object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-800">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="whitespace-nowrap text-sm font-bold text-slate-800">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Payment method</span>
                  <span className="font-semibold text-slate-800">
                    {selectedOrder.method}
                  </span>
                </div>
                <div className="mt-3 flex justify-between text-sm text-slate-600">
                  <span>Payment status</span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${paymentStyles[selectedOrder.payment]}`}
                  >
                    {selectedOrder.payment}
                  </span>
                </div>
                <div className="mt-4 flex justify-between border-t border-slate-200 pt-4">
                  <span className="font-bold text-slate-900">Order Total</span>
                  <span className="text-lg font-bold text-violet-700">
                    {formatPrice(selectedOrder.total)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedOrder(null)}
                  className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingOrder(selectedOrder);
                    setSelectedOrder(null);
                  }}
                  className="rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white hover:bg-violet-700"
                >
                  Update Status
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Update status modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-[55] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="update-status-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <h2
                id="update-status-title"
                className="text-lg font-bold text-slate-900"
              >
                Update Order Status
              </h2>
              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                aria-label="Close status modal"
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <p className="mt-2 text-sm text-slate-500">
              Select a new status for order{" "}
              <span className="font-semibold text-slate-800">
                #{editingOrder.id}
              </span>
              .
            </p>

            <div className="mt-5 space-y-2">
              {["Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(
                (status) => (
                  <button
                    key={status}
                    type="button"
                    disabled={editingOrder.status === status}
                    onClick={() => updateOrderStatus(editingOrder.id, status)}
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      editingOrder.status === status
                        ? "cursor-not-allowed border-violet-200 bg-violet-50 text-violet-700"
                        : "border-slate-200 text-slate-600 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
                    }`}
                  >
                    {status}
                    {editingOrder.status === status && (
                      <CheckCircle2 size={17} />
                    )}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              onClick={() => setEditingOrder(null)}
              className="mt-5 w-full rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteOrder && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-order-title"
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Trash2 size={22} />
            </div>
            <h2
              id="delete-order-title"
              className="mt-4 text-lg font-bold text-slate-900"
            >
              Delete this order?
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Are you sure you want to remove order{" "}
              <span className="font-semibold text-slate-800">
                #{deleteOrder.id}
              </span>{" "}
              from this demo list?
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeleteOrder(null)}
                className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
