"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  User as UserIcon,
  Package,
  Heart,
  LogOut,
  History,
  ChevronRight,
  ShoppingBag,
  Globe,
  Trash2,
} from "lucide-react";
import { useAuth } from "@/src/contexts/AuthContext";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "motion/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { logout } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    if (session?.user?.wishlist && Array.isArray(productsData)) {
      const wishlistIds = session?.user?.wishlist.map((id) => id.toString());
      const filtered = productsData.filter((p) =>
        wishlistIds.includes(p._id.toString()),
      );
      setWishlistProducts(filtered);
    }
  }, [session?.user?.wishlist, productsData]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, productsRes] = await Promise.all([
        fetch("/api/orders/my-orders"),
        fetch("/api/products"),
      ]);

      const ordersData = await ordersRes.json();
      const productsData = await productsRes.json();

      if (Array.isArray(ordersData)) {
        setOrders(ordersData);
      }

      if (Array.isArray(productsData.products)) {
        setProductsData(productsData.products);
      }
    } catch (err) {
      toast.error("Failed to load profile data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user) {
      router.push("/login");
      return;
    }
    fetchData();
  }, [session, status, router]);

  const handleDeleteOrder = async (e: React.MouseEvent, orderId: string) => {
    e.stopPropagation();
    if (
      !confirm(
        "Are you sure you want to remove this order from your archive? This cannot be undone.",
      )
    )
      return;

    try {
      const res = await fetch(`/api/orders/${orderId}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Order removed from archive");
        fetchData();
      } else {
        const data = await res.json();
        throw new Error(data.message || "Failed to delete");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out from ecosystem");
    router.push("/");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      <div className="bg-eco-accent p-12 rounded-[4rem] border border-eco-bg flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          <div className="w-24 h-24 rounded-full bg-white border-4 border-eco-bg flex items-center justify-center text-4xl shadow-sm">
            🌿
          </div>
          <div className="space-y-1">
            <h1 className="text-5xl font-display font-bold italic leading-tight">
              {session?.user?.name}
            </h1>
            <p className="text-sm font-bold uppercase tracking-widest text-eco-primary/60">
              Verified Eco-Citizen
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          {session?.user?.role === "admin" && (
            <Link
              href="/admin/products"
              className="flex items-center gap-2 bg-eco-dark text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-black transition-all shadow-lg"
            >
              <ShoppingBag className="h-4 w-4" />
              Manage Products
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white text-red-500 px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-red-50 transition-all border border-eco-bg"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Orders */}
        <div className="lg:col-span-2 space-y-10">
          <div className="flex justify-between items-end border-b border-eco-bg pb-4">
            <h2 className="text-xl md:text-3xl font-display italic">
              Order History
            </h2>
            <p className="text-[8px] md:text-[10px] md:font-bold uppercase tracking-widest md:text-slate-400">
              Your sustainable footprints.
            </p>
          </div>

          {loading ? (
            <div className="space-y-4 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-white rounded-3xl border border-eco-bg"
                ></div>
              ))}
            </div>
          ) : orders.length === 0 ? (
            <div className="bg-white p-16 rounded-[3rem] border border-eco-bg text-center space-y-4">
              <div className="w-16 h-16 bg-eco-gray rounded-full flex items-center justify-center mx-auto">
                <Package className="h-8 w-8 text-slate-300" />
              </div>
              <h3 className="font-bold">No orders yet</h3>
              <p className="text-gray-400 text-sm">
                Every journey begins with a single sustainable step.
              </p>
              <Link
                href="/shop"
                className="text-eco-primary font-bold underline"
              >
                Explore Marketplace
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order: any) => (
                <div
                  key={order._id}
                  className={`bg-white rounded-3xl md:rounded-[3rem] border border-eco-gray transition-all overflow-hidden ${expandedOrderId === order._id ? "border-eco-primary ring-1 ring-eco-primary/10 shadow-2xl" : "hover:border-eco-primary/30 hover:shadow-xl"}`}
                >
                  <button
                    onClick={() =>
                      setExpandedOrderId(
                        expandedOrderId === order._id ? null : order._id,
                      )
                    }
                    className="w-full p-4 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left"
                  >
                    <div className="flex items-center gap-6">
                      <div
                        className={`w-10 h-10 md:w-16 md:h-16 rounded-3xl flex items-center justify-center transition-colors ${expandedOrderId === order._id ? "bg-eco-primary text-white" : "bg-eco-gray text-eco-dark"}`}
                      >
                        <History className="h-5 w-5 md:h-7 md:w-7" />
                      </div>
                      <div className="md:space-y-1">
                        <p
                          className={`text-[10px] font-black uppercase tracking-[0.2em] ${expandedOrderId === order._id ? "text-eco-primary" : "text-gray-400"}`}
                        >
                          Drop ID: {String(order._id).slice(-8)}
                        </p>
                        <p className="font-bold text-xs md:text-lg italic">
                          {new Date(order.createdAt).toLocaleDateString(
                            undefined,
                            { month: "long", day: "numeric", year: "numeric" },
                          )}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                          {order.items.length} items collected
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-12">
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                          Total Damage
                        </p>
                        <p className="text-2xl font-bold italic text-eco-dark">
                          ${order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                          Status
                        </p>
                        <span
                          className={`inline-block mt-1 text-[8px] px-3 py-1 rounded-full font-black uppercase tracking-widest ${order.paymentStatus === "paid" ? "bg-green-100 text-green-600" : "bg-orange-100 text-orange-600"}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>
                      <div
                        onClick={(e) => handleDeleteOrder(e, order._id)}
                        className="w-10 h-10 rounded-full bg-eco-gray flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      >
                        <Trash2 className="h-4 w-4" />
                      </div>
                      <div
                        className={`w-10 h-10 rounded-full bg-eco-gray flex items-center justify-center transition-all ${expandedOrderId === order._id ? "rotate-90 bg-eco-primary text-white" : ""}`}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedOrderId === order._id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-eco-gray/30 border-t border-eco-gray"
                      >
                        <div className="p-8 space-y-6">
                          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-eco-primary px-2">
                            Payload Contents
                          </h4>
                          <div className="space-y-3">
                            {order.items.map((item: any, idx: number) => (
                              <div
                                key={idx}
                                className="bg-white p-5 rounded-2xl flex items-center justify-between shadow-sm border border-eco-gray/50"
                              >
                                <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-eco-gray rounded-lg flex items-center justify-center font-display font-black italic text-eco-dark/20 text-xs">
                                    {idx + 1}
                                  </div>
                                  <div>
                                    <p className="text-xs font-black uppercase tracking-tight text-eco-dark">
                                      {item.name}
                                    </p>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <p className="text-sm font-black italic text-eco-primary">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="pt-6 border-t border-eco-gray flex justify-between items-center px-2">
                            <div className="space-y-1">
                              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                                Payment Channel
                              </p>
                              <p className="text-xs font-bold uppercase tracking-tight text-eco-dark">
                                {order.paymentMethod || "Credit Card"}
                              </p>
                            </div>
                            <div className="text-right space-y-1 text-eco-dark/40">
                              <p className="text-[10px] font-black uppercase tracking-widest">
                                Signed & Verified
                              </p>
                              <p className="text-[8px] font-bold uppercase tracking-tighter">
                                AUTHENTIC_SNACK_DROP_
                                {String(order._id).slice(-4).toUpperCase()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Favorites & Meta */}
        <div className="space-y-12">
          <div className="space-y-6">
            <h3 className="sleek-label">Eco-Favorites</h3>
            {wishlistProducts.length === 0 ? (
              <div className="p-8 bg-eco-gray rounded-[2.5rem] border border-eco-bg border-dashed text-center space-y-4">
                <Heart className="h-6 w-6 text-slate-300 mx-auto" />
                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">
                  Your wishlist is empty
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {wishlistProducts.map((p: any) => (
                  <Link
                    href={`/product/${p._id}`}
                    key={p._id}
                    className="flex items-center gap-4 bg-white border border-eco-bg p-3 rounded-2xl hover:border-eco-primary transition-all group"
                  >
                    {/* ছোট image */}
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                      />
                    </div>
                    {/* নাম */}
                    <p className="text-xs font-bold uppercase tracking-widest truncate">
                      {p.name}
                    </p>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="bg-eco-dark text-white p-8 rounded-[3rem] space-y-6 shadow-xl relative overflow-hidden">
            <Globe className="absolute -right-8 -bottom-8 h-32 w-32 text-white/5" />
            <h3 className="font-display text-2xl font-bold italic">
              Your Impact
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-1">
                  Carbon Offset
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-display font-bold">128</span>
                  <span className="text-xs font-bold uppercase tracking-widest text-eco-accent mb-1.5">
                    KG CO2
                  </span>
                </div>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mb-1">
                  Items Saved
                </p>
                <p className="text-xl font-bold">14 High-Quality Essentials</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
