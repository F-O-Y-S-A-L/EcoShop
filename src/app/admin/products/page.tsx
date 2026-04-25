"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  Image as ImageIcon,
  Tag,
  Hash,
  DollarSign,
  Layout,
  Save,
  ArrowLeft,
  Edit,
  Trash,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { motion } from "motion/react";
import { useSession } from "next-auth/react";
// import { auth } from "../../api/auth/[...nextauth]/options";

export default function CreateProductPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "Chips",
    stock: "10",
    images: "",
    tags: "",
  });

  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    if (Array.isArray(data.products)) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user || session?.user.role === "user") {
      toast.error("Admin access required");
      router.push("/");
    } else if (session?.user.role === "admin") {
      fetchProducts();
    }
  }, [session, router]);

  const handleEdit = (product: any) => {
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      images: product.images.join(", "),
      tags: product.tags.join(", "),
    });
    setCurrentProductId(product._id);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure? This snack will be removed forever.")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Product eliminated");
        fetchProducts();
      }
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock),
        images: form.images
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== ""),
        tags: form.tags
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== ""),
      };

      const url = isEditing
        ? `/api/products/${currentProductId}`
        : "/api/products/create";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Operation failed");

      toast.success(
        isEditing ? "Essence updated!" : "Product added to the ecosystem!",
      );
      setIsEditing(false);
      setCurrentProductId(null);
      setForm({
        name: "",
        description: "",
        price: "",
        category: "Chips",
        stock: "10",
        images: "",
        tags: "",
      });
      fetchProducts();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (session?.user && session?.user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-eco-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-12">
      <div className="flex items-center justify-between">
        <Link
          href="/profile"
          className="flex items-center gap-2 text-gray-500 hover:text-eco-primary transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-xs font-bold uppercase tracking-widest">
            Back to Profile
          </span>
        </Link>
        <h1 className="text-4xl font-display font-bold italic">
          Curate New Essence
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Form Column */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-10 rounded-[3.5rem] border border-eco-gray shadow-2xl space-y-8 h-fit sticky top-24"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-eco-primary">
              {isEditing ? "Editing Mode" : "New Drop"}
            </h2>
            {isEditing && (
              <button
                onClick={() => {
                  setIsEditing(false);
                  setCurrentProductId(null);
                  setForm({
                    name: "",
                    description: "",
                    price: "",
                    category: "Chips",
                    stock: "10",
                    images: "",
                    tags: "",
                  });
                }}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="sleek-label">Product Name</label>
                <div className="relative">
                  <Layout className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-eco-primary" />
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="bg-eco-gray border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:ring-1 focus:ring-eco-primary outline-none w-full"
                    placeholder="Volcano BBQ Chips"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="sleek-label">Description</label>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  className="w-full bg-eco-gray border-none rounded-3xl py-4 px-6 transition-all focus:ring-1 focus:ring-eco-primary outline-none text-sm"
                  placeholder="Taste notes..."
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="sleek-label">
                    Price (<span className="text-sm font-bold">৳</span>)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/3 -translate-y-1/2 h-4 w-4 text-eco-primary text-2xl">
                      ৳
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={form.price}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      className="bg-eco-gray border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:ring-1 focus:ring-eco-primary outline-none w-full"
                      placeholder="4.99"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="sleek-label">Stock</label>
                  <div className="relative">
                    <Hash className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-eco-primary" />
                    <input
                      type="number"
                      required
                      value={form.stock}
                      onChange={(e) =>
                        setForm({ ...form, stock: e.target.value })
                      }
                      className="bg-eco-gray border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:ring-1 focus:ring-eco-primary outline-none w-full"
                      placeholder="100"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="sleek-label">Category</label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="bg-eco-gray border-none rounded-2xl py-4 px-6 text-sm font-medium focus:ring-1 focus:ring-eco-primary outline-none w-full appearance-none"
                >
                  <option value="Chips">Chips</option>
                  <option value="Biscuits">Biscuits</option>
                  <option value="Chocolates">Chocolates</option>
                  <option value="Drinks">Drinks</option>
                  <option value="Savory">Savory</option>
                  <option value="Sweet">Sweet</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="sleek-label">
                  Images (Comma separated URLs)
                </label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-eco-primary" />
                  <input
                    type="text"
                    value={form.images}
                    onChange={(e) =>
                      setForm({ ...form, images: e.target.value })
                    }
                    className="bg-eco-gray border-none rounded-2xl py-4 pl-12 pr-6 text-xs font-medium focus:ring-1 focus:ring-eco-primary outline-none w-full"
                    placeholder="https://..."
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="sleek-label">Tags (Comma separated)</label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-eco-primary" />
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    className="bg-eco-gray border-none rounded-2xl py-4 pl-12 pr-6 text-xs font-medium focus:ring-1 focus:ring-eco-primary outline-none w-full"
                    placeholder="truffle, potato, gourmet"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-eco-dark text-white py-5 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-eco-primary transition-all flex items-center justify-center space-x-3 group"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>{isEditing ? "Sync Changes" : "Initialize Drop"}</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* List Column */}
        <div className="space-y-8">
          <div className="flex justify-between items-center border-b border-eco-gray pb-6">
            <h2 className="text-3xl font-display font-bold italic">
              Active Inventory
            </h2>
            <p className="text-[10px] font-black uppercase tracking-widest text-eco-primary">
              {products.length} Drops
            </p>
          </div>

          <div className="space-y-4 max-h-200 overflow-y-auto pr-2 custom-scrollbar">
            {products.map((product: any) => (
              <div
                key={product._id}
                className="bg-white p-5 rounded-[2.5rem] border border-eco-gray hover:border-eco-primary/20 transition-all flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 bg-eco-gray rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                    {product.images && product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt=""
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-gray-300" />
                    )}
                  </div>
                  <div className="max-w-37.5">
                    <h3 className="text-sm font-black italic uppercase tracking-tight truncate">
                      {product.name}
                    </h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">
                      {product.category} • ${product.price}
                    </p>
                    <div
                      className={`mt-1 h-1 w-12 rounded-full ${product.stock > 10 ? "bg-green-400" : "bg-red-400"}`}
                    ></div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="w-10 h-10 rounded-full bg-eco-gray flex items-center justify-center text-eco-dark hover:bg-eco-primary hover:text-white transition-all shadow-sm"
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id)}
                    className="w-10 h-10 rounded-full bg-eco-gray flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <Trash className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
