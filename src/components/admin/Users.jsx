
import React, { useMemo, useState } from "react";

import {
  Search,
  Users as UsersIcon,
  UserCheck,
  UserX,
  UserPlus,
  Eye,
  Pencil,
  Trash2,
  X,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ShieldCheck,
  ShieldBan,
  Download,
  ChevronDown,
  CheckCircle,
  Clock,
  ShoppingBag,
  IndianRupee,
  Filter,
} from "lucide-react";

// Demo customer data
const initialUsers = [
  {
    id: "USR-1001",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 9876543210",
    city: "Mumbai",
    state: "Maharashtra",
    joined: "2026-10-12",
    orders: 12,
    spent: 24500,
    status: "Active",
    role: "Customer",
  },
  {
    id: "USR-1002",
    name: "Priya Verma",
    email: "priya.verma@example.com",
    phone: "+91 9876543211",
    city: "Delhi",
    state: "Delhi",
    joined: "2026-10-15",
    orders: 8,
    spent: 18750,
    status: "Active",
    role: "Customer",
  },
  {
    id: "USR-1003",
    name: "Rahul Patel",
    email: "rahul.patel@example.com",
    phone: "+91 9876543212",
    city: "Ahmedabad",
    state: "Gujarat",
    joined: "2026-10-18",
    orders: 0,
    spent: 0,
    status: "Blocked",
    role: "Customer",
  },
  {
    id: "USR-1004",
    name: "Sneha Singh",
    email: "sneha.singh@example.com",
    phone: "+91 9876543213",
    city: "Lucknow",
    state: "Uttar Pradesh",
    joined: "2026-10-20",
    orders: 5,
    spent: 9200,
    status: "Active",
    role: "Customer",
  },
  {
    id: "USR-1005",
    name: "Vikram Mehta",
    email: "vikram.mehta@example.com",
    phone: "+91 9876543214",
    city: "Pune",
    state: "Maharashtra",
    joined: "2026-10-25",
    orders: 3,
    spent: 6400,
    status: "Inactive",
    role: "Customer",
  },
  {
    id: "USR-1006",
    name: "Ananya Gupta",
    email: "ananya.gupta@example.com",
    phone: "+91 9876543215",
    city: "Jaipur",
    state: "Rajasthan",
    joined: "2026-10-29",
    orders: 16,
    spent: 38500,
    status: "Active",
    role: "Customer",
  },
  {
    id: "USR-1007",
    name: "Rohan Das",
    email: "rohan.das@example.com",
    phone: "+91 9876543216",
    city: "Kolkata",
    state: "West Bengal",
    joined: "2026-11-02",
    orders: 2,
    spent: 2100,
    status: "Active",
    role: "Customer",
  },
  {
    id: "USR-1008",
    name: "Neha Joshi",
    email: "neha.joshi@example.com",
    phone: "+91 9876543217",
    city: "Bhopal",
    state: "Madhya Pradesh",
    joined: "2026-11-05",
    orders: 0,
    spent: 0,
    status: "Inactive",
    role: "Customer",
  },
];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  status: "Active",
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

export default function Users() {
  const [users, setUsers] = useState(initialUsers);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const [selectedUser, setSelectedUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState("");

  // Notification
  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3000);
  };

  // Customer statistics
  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter((user) => user.status === "Active").length,
      inactive: users.filter((user) => user.status === "Inactive").length,
      blocked: users.filter((user) => user.status === "Blocked").length,
      revenue: users.reduce((total, user) => total + user.spent, 0),
    };
  }, [users]);

  // Search, filter and sorting
  const filteredUsers = useMemo(() => {
    let result = users.filter((user) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(searchText) ||
        user.email.toLowerCase().includes(searchText) ||
        user.phone.toLowerCase().includes(searchText) ||
        user.id.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || user.status === statusFilter;

      return matchesSearch && matchesStatus;
    });

    if (sortBy === "newest") {
      result.sort(
        (a, b) => new Date(b.joined) - new Date(a.joined)
      );
    } else if (sortBy === "oldest") {
      result.sort(
        (a, b) => new Date(a.joined) - new Date(b.joined)
      );
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "spent") {
      result.sort((a, b) => b.spent - a.spent);
    }

    return result;
  }, [users, search, statusFilter, sortBy]);

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (formData.name.trim().length < 3) {
      newErrors.name = "Name must contain at least 3 characters.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Enter a valid 10-digit Indian mobile number.";
    }

    if (formData.city.trim().length < 2) {
      newErrors.city = "Enter a valid city.";
    }

    if (formData.state.trim().length < 2) {
      newErrors.state = "Enter a valid state.";
    }

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() === formData.email.trim().toLowerCase() &&
        user.id !== editingUser?.id
    );

    if (emailExists) {
      newErrors.email = "This email address is already registered.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  // Add or update customer
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    if (editingUser) {
      const updatedUser = {
        ...editingUser,
        ...formData,
        phone: `+91 ${formData.phone.replace(/\s/g, "")}`,
      };

      setUsers((previous) =>
        previous.map((user) =>
          user.id === editingUser.id ? updatedUser : user
        )
      );

      console.log("Customer updated:", {
        userId: editingUser.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        status: formData.status,
      });

      if (selectedUser?.id === editingUser.id) {
        setSelectedUser(updatedUser);
      }

      showToast("Customer updated successfully.");
    } else {
      const newUser = {
        id: `USR-${Date.now().toString().slice(-6)}`,
        ...formData,
        phone: `+91 ${formData.phone.replace(/\s/g, "")}`,
        joined: new Date().toISOString().slice(0, 10),
        orders: 0,
        spent: 0,
        role: "Customer",
      };

      setUsers((previous) => [newUser, ...previous]);

      console.log("New customer added:", {
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        city: newUser.city,
        state: newUser.state,
        status: newUser.status,
      });

      showToast("New customer added successfully.");
    }

    closeForm();
  };

  // Open edit modal
  const openEditModal = (user) => {
    setEditingUser(user);

    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone.replace("+91 ", ""),
      city: user.city,
      state: user.state,
      status: user.status,
    });

    setErrors({});
    setShowAddModal(true);
  };

  // Open add modal
  const openAddModal = () => {
    setEditingUser(null);
    setFormData(emptyForm);
    setErrors({});
    setShowAddModal(true);
  };

  // Close add/edit modal
  const closeForm = () => {
    setShowAddModal(false);
    setEditingUser(null);
    setFormData(emptyForm);
    setErrors({});
  };

  // Block or unblock customer
  const toggleBlockUser = (user) => {
    const nextStatus =
      user.status === "Blocked" ? "Active" : "Blocked";

    const updatedUser = {
      ...user,
      status: nextStatus,
    };

    setUsers((previous) =>
      previous.map((item) =>
        item.id === user.id ? updatedUser : item
      )
    );

    if (selectedUser?.id === user.id) {
      setSelectedUser(updatedUser);
    }

    console.log("Customer status changed:", {
      userId: user.id,
      status: nextStatus,
    });

    showToast(
      nextStatus === "Blocked"
        ? "Customer blocked successfully."
        : "Customer unblocked successfully."
    );
  };

  // Delete customer
  const confirmDelete = () => {
    if (!deleteUser) return;

    const deletedUser = deleteUser;

    setUsers((previous) =>
      previous.filter((user) => user.id !== deletedUser.id)
    );

    if (selectedUser?.id === deletedUser.id) {
      setSelectedUser(null);
    }

    console.log("Customer deleted:", {
      userId: deletedUser.id,
      name: deletedUser.name,
    });

    setDeleteUser(null);
    showToast("Customer deleted successfully.");
  };

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "User ID",
      "Name",
      "Email",
      "Phone",
      "City",
      "State",
      "Joined",
      "Orders",
      "Total Spent",
      "Status",
      "Role",
    ];

    const rows = filteredUsers.map((user) => [
      user.id,
      user.name,
      user.email,
      user.phone,
      user.city,
      user.state,
      user.joined,
      user.orders,
      user.spent,
      user.status,
      user.role,
    ]);

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "shoply-customers.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.setTimeout(() => URL.revokeObjectURL(url), 1000);

    showToast("Customer CSV exported.");
  };

  // Status styles
  const statusStyle = (status) => {
    if (status === "Active") {
      return "bg-green-50 text-green-700";
    }

    if (status === "Blocked") {
      return "bg-red-50 text-red-700";
    }

    return "bg-gray-100 text-gray-600";
  };

  // Customer initials
  const initials = (name) =>
    name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* Page Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-1 text-sm font-medium text-purple-600">
              Administration / Customers
            </p>

            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Customers Management
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Manage customer accounts and monitor customer activity.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={exportCSV}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              <Download size={18} />
              Export CSV
            </button>

            <button
              onClick={openAddModal}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-purple-700"
            >
              <UserPlus size={18} />
              Add Customer
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total Customers",
              value: stats.total,
              icon: UsersIcon,
              color: "bg-purple-100 text-purple-600",
              description: "Registered accounts",
            },
            {
              label: "Active Customers",
              value: stats.active,
              icon: UserCheck,
              color: "bg-green-100 text-green-600",
              description: "Currently active",
            },
            {
              label: "Inactive Customers",
              value: stats.inactive,
              icon: Clock,
              color: "bg-orange-100 text-orange-600",
              description: "Inactive accounts",
            },
            {
              label: "Blocked Customers",
              value: stats.blocked,
              icon: UserX,
              color: "bg-red-100 text-red-600",
              description: "Blocked accounts",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      {item.label}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-900">
                      {item.value}
                    </h2>
                  </div>

                  <div className={`rounded-xl p-3 ${item.color}`}>
                    <Icon size={23} />
                  </div>
                </div>

                <p className="mt-3 text-xs text-gray-400">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Total Customer Spending */}
        <div className="flex flex-col justify-between gap-3 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-600 p-5 text-white sm:flex-row sm:items-center sm:p-6">
          <div>
            <p className="text-sm text-purple-100">
              Total Customer Spending
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {formatPrice(stats.revenue)}
            </h2>

            <p className="mt-1 text-xs text-purple-100">
              Combined spending recorded in demo customer data
            </p>
          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
            <IndianRupee size={28} />
          </div>
        </div>

        {/* Search and Filters */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, email, phone or customer ID..."
                className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Filter
                  size={16}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-9 text-sm outline-none focus:border-purple-500 sm:w-40"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blocked">Blocked</option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(event) => setSortBy(event.target.value)}
                  className="w-full appearance-none rounded-xl border border-gray-200 bg-white px-4 py-3 pr-9 text-sm outline-none focus:border-purple-500 sm:w-48"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Name A-Z</option>
                  <option value="spent">Highest Spending</option>
                </select>

                <ChevronDown
                  size={15}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredUsers.length}
              </span>{" "}
              of {users.length} customers
            </p>

            <button
              onClick={() => {
                setSearch("");
                setStatusFilter("All");
                setSortBy("newest");
              }}
              className="text-sm font-semibold text-purple-600 hover:text-purple-800"
            >
              Reset filters
            </button>
          </div>
        </div>

        {/* All Customers Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5">
            <div>
              <h2 className="font-bold text-gray-900">
                All Customers
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Customer account information and activity
              </p>
            </div>

            <UsersIcon size={22} className="text-purple-500" />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px] text-left">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Customer</th>
                  <th className="px-5 py-4 font-semibold">Contact</th>
                  <th className="px-5 py-4 font-semibold">Location</th>
                  <th className="px-5 py-4 font-semibold">Orders</th>
                  <th className="px-5 py-4 font-semibold">Total Spent</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="transition hover:bg-purple-50/40"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-100 text-sm font-bold text-purple-700">
                          {initials(user.name)}
                        </div>

                        <div>
                          <p className="font-semibold text-gray-900">
                            {user.name}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {user.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-700">
                        {user.email}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {user.phone}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-gray-700">
                        {user.city}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        {user.state}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-semibold text-gray-800">
                        {user.orders}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-semibold text-gray-800">
                      {formatPrice(user.spent)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyle(user.status)}`}
                      >
                        {user.status}
                      </span>
                    </td>

                    {/* Customer Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1">

                        {/* View */}
                        <button
                          onClick={() => setSelectedUser(user)}
                          title="View customer"
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-purple-100 hover:text-purple-700"
                        >
                          <Eye size={17} />
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() => openEditModal(user)}
                          title="Edit customer"
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-blue-100 hover:text-blue-700"
                        >
                          <Pencil size={17} />
                        </button>

                        {/* Block / Unblock */}
                        <button
                          onClick={() => toggleBlockUser(user)}
                          title={
                            user.status === "Blocked"
                              ? "Unblock customer"
                              : "Block customer"
                          }
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-100 hover:text-orange-700"
                        >
                          {user.status === "Blocked" ? (
                            <ShieldCheck size={17} />
                          ) : (
                            <ShieldBan size={17} />
                          )}
                        </button>

                        {/* Delete Customer */}
                        <button
                          onClick={() => setDeleteUser(user)}
                          title="Delete customer"
                          aria-label={`Delete ${user.name}`}
                          className="rounded-lg p-2 text-red-500 transition hover:bg-red-100 hover:text-red-700"
                        >
                          <Trash2 size={17} />
                        </button>

                      </div>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-5 py-16 text-center">
                      <UsersIcon
                        size={35}
                        className="mx-auto mb-3 text-gray-300"
                      />

                      <p className="font-semibold text-gray-700">
                        No customers found
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        Try changing your search or filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add / Edit Customer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {editingUser ? "Edit Customer" : "Add New Customer"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Enter the customer information below.
                </p>
              </div>

              <button
                onClick={closeForm}
                aria-label="Close form"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5">
              {[
                {
                  name: "name",
                  label: "Full Name",
                  placeholder: "Enter full name",
                },
                {
                  name: "email",
                  label: "Email Address",
                  placeholder: "example@email.com",
                },
                {
                  name: "phone",
                  label: "Mobile Number",
                  placeholder: "10-digit mobile number",
                },
                {
                  name: "city",
                  label: "City",
                  placeholder: "Enter city",
                },
                {
                  name: "state",
                  label: "State",
                  placeholder: "Enter state",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="mb-1.5 block text-sm font-semibold text-gray-700"
                  >
                    {field.label}
                  </label>

                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-purple-100 ${
                      errors[field.name]
                        ? "border-red-400"
                        : "border-gray-200 focus:border-purple-500"
                    }`}
                  />

                  {errors[field.name] && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors[field.name]}
                    </p>
                  )}
                </div>
              ))}

              <div>
                <label
                  htmlFor="status"
                  className="mb-1.5 block text-sm font-semibold text-gray-700"
                >
                  Account Status
                </label>

                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  {editingUser ? "Save Changes" : "Add Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Customer Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-100 p-5">
              <h2 className="text-xl font-bold text-gray-900">
                Customer Details
              </h2>

              <button
                onClick={() => setSelectedUser(null)}
                aria-label="Close customer details"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-purple-100 text-2xl font-bold text-purple-700">
                  {initials(selectedUser.name)}
                </div>

                <h3 className="mt-3 text-xl font-bold text-gray-900">
                  {selectedUser.name}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedUser.id}
                </p>

                <span
                  className={`mt-3 rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(selectedUser.status)}`}
                >
                  {selectedUser.status}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: selectedUser.email,
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: selectedUser.phone,
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: `${selectedUser.city}, ${selectedUser.state}`,
                  },
                  {
                    icon: CalendarDays,
                    label: "Joined",
                    value: formatDate(selectedUser.joined),
                  },
                  {
                    icon: ShoppingBag,
                    label: "Total Orders",
                    value: selectedUser.orders,
                  },
                  {
                    icon: IndianRupee,
                    label: "Total Spent",
                    value: formatPrice(selectedUser.spent),
                  },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 border-b border-gray-100 pb-3 last:border-0"
                    >
                      <div className="rounded-lg bg-purple-50 p-2 text-purple-600">
                        <Icon size={17} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-400">
                          {item.label}
                        </p>

                        <p className="break-words text-sm font-semibold text-gray-800">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => {
                    const user = selectedUser;
                    setSelectedUser(null);
                    openEditModal(user);
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-700"
                >
                  <Pencil size={16} />
                  Edit Customer
                </button>

                <button
                  onClick={() => toggleBlockUser(selectedUser)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  {selectedUser.status === "Blocked" ? (
                    <ShieldCheck size={16} />
                  ) : (
                    <ShieldBan size={16} />
                  )}

                  {selectedUser.status === "Blocked" ? "Unblock" : "Block"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Customer Confirmation */}
      {deleteUser && (
        <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Trash2 size={25} />
            </div>

            <h2 className="mt-4 text-center text-xl font-bold text-gray-900">
              Delete Customer?
            </h2>

            <p className="mt-2 text-center text-sm leading-6 text-gray-500">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-800">
                {deleteUser.name}
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setDeleteUser(null)}
                className="flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <Trash2 size={16} />
                  Delete Customer
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[60] flex items-center gap-3 rounded-xl bg-gray-900 px-5 py-4 text-sm font-medium text-white shadow-xl">
          <CheckCircle size={19} className="text-green-400" />
          {toast}
        </div>
      )}
    </div>
  );
}
