"use client";

import React, { useEffect, useState, use } from "react";
import { motion } from "motion/react";
import {
  Star,
  ShieldCheck,
  Truck,
  RefreshCcw,
  Heart,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/src/contexts/AuthContext";
import { useCart } from "@/src/contexts/CartContext";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { data: session, status } = useSession();
  const { toggleWishlist } = useAuth();
  const { addToCart } = useCart();
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    setLoading(true);
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((result) => {
        if (result && result.product && Array.isArray(result.reviews)) {
          setData(result);
        } else if (result && result.product) {
          setData({ ...result, reviews: [] });
        } else {
          setData(null);
        }
        setLoading(false);
      })
      .catch(() => {
        setData(null);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    if (!data?.product) return;
    for (let i = 0; i < qty; i++) {
      addToCart(data.product);
    }
    toast.success(`Added ${qty} ${data.product.name} to cart`);
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !session?.user) return toast.error("Login to review");
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...newReview, productId: id }),
    });
    if (res.ok) {
      const review = await res.json();
      setData({ ...data, reviews: [review, ...(data?.reviews || [])] });
      setNewReview({ rating: 5, comment: "" });
      toast.success("Review submitted!");
    }
  };

  if (loading)
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 animate-pulse space-y-8">
        <div className="h-10 bg-white w-1/4 rounded-full"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="aspect-square bg-white rounded-3xl"></div>
          <div className="space-y-6">
            <div className="h-12 bg-white w-3/4 rounded-xl"></div>
            <div className="h-4 bg-white w-1/2 rounded-xl"></div>
            <div className="h-32 bg-white w-full rounded-xl"></div>
          </div>
        </div>
      </div>
    );

  if (!data?.product)
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-display font-bold">Sustainability Gap</h1>
        <p className="text-gray-500 italic">
          This item is currently out of our ecosystem.
        </p>
        <Link href="/shop" className="text-eco-primary font-bold underline">
          Back to Marketplace
        </Link>
      </div>
    );

  const { product, reviews = [] } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
      <Link
        href="/shop"
        className="flex items-center text-eco-primary font-bold group mb-4 text-xs uppercase tracking-widest"
      >
        <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />{" "}
        Back to Collection
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Gallery */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="aspect-4/5 rounded-[3rem] overflow-hidden bg-eco-gray border border-eco-bg md:p-8 flex items-center justify-center">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="max-w-full max-h-full object-contain rounded-2xl mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-4 gap-4 mt-6">
            {Array.isArray(product.images) &&
              product.images.map((img: string, i: number) => (
                <div
                  key={i}
                  className="aspect-square rounded-2xl border border-eco-bg overflow-hidden cursor-pointer bg-white p-2"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-contain mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <span className="bg-eco-accent text-eco-primary px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              Selected {product.category}
            </span>
            <h1 className="text-5xl font-display font-bold italic leading-tight text-eco-dark">
              {product.name}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="flex text-yellow-500 gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-xs">
                    {i < Math.floor(product.averageRating) ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                {reviews.length} Verified Reviews
              </span>
            </div>
          </div>

          <p className="text-4xl font-display text-eco-primary font-bold">
            ৳{product.price?.toFixed(2)}
          </p>

          <div className="bg-white p-6 rounded-3xl border border-eco-bg shadow-sm">
            <p className="text-gray-500 leading-relaxed text-sm italic">
              {product.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {Array.isArray(product.tags) &&
              product.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400"
                >
                  #{tag}
                </span>
              ))}
          </div>

          <div className="pt-8 border-t border-eco-bg space-y-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-eco-bg rounded-full p-1 bg-white">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-eco-gray rounded-full transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm">
                  {qty}
                </span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-eco-gray rounded-full transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="grow bg-eco-dark text-white py-3 md:py-4 rounded-full font-bold flex items-center justify-center space-x-2 hover:bg-eco-primary transition-all shadow-md active:scale-95"
              >
                <ShoppingBag className="h-4 w-4 md:h-5 md:w-5" />
                <span className="text-[10px] font-bold uppercase tracking-widest md:text-sm">
                  Add to Cart
                </span>
              </button>
              <button
                onClick={() =>
                  session?.user
                    ? toggleWishlist(product._id)
                    : toast.error("Please login")
                }
                className={`p-4 rounded-full border border-eco-bg transition-all ${session?.user?.wishlist?.includes(product._id) ? "bg-red-500 text-white border-red-500" : "bg-white hover:border-red-500 hover:text-red-500"}`}
              >
                <Heart
                  className={`h-6 w-6 ${session?.user?.wishlist.includes(product._id) ? "fill-current" : ""}`}
                />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: Truck, label: "Fast Delivery" },
              { icon: ShieldCheck, label: "Verified Origins" },
              { icon: RefreshCcw, label: "Circular Program" },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white p-4 rounded-2xl border border-eco-bg flex items-center gap-3"
              >
                <item.icon className="h-4 w-4 text-eco-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-eco-dark">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <section className="pt-20 border-t border-eco-bg space-y-12">
        <div className="flex justify-between items-end">
          <div className="space-y-2">
            <h2 className="text-3xl font-display font-bold italic">
              Member Reviews
            </h2>
            <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
              Authentic community feedback.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Review Form */}
          <div className="lg:col-span-1 bg-white p-8 rounded-3xl border border-eco-bg h-fit space-y-6 shadow-sm">
            <h3 className="font-bold text-sm uppercase tracking-widest text-eco-dark">
              Rate this product
            </h3>
            <form onSubmit={handleReviewSubmit} className="space-y-6">
              <div>
                <label className="sleek-label block mb-2">Rating</label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setNewReview({ ...newReview, rating: star })
                      }
                      className={`text-2xl transition-all ${star <= newReview.rating ? "text-yellow-500 scale-110" : "text-gray-200 hover:text-yellow-200"}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="sleek-label block mb-2">
                  Detailed Feedback
                </label>
                <textarea
                  rows={4}
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  placeholder="Your eco-experience matters..."
                  className="w-full bg-eco-gray border border-transparent rounded-2xl p-4 outline-none focus:border-eco-primary text-sm transition-all shadow-inner"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-eco-dark text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-eco-primary transition-all"
              >
                Submit Review
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {reviews.length === 0 ? (
              <div className="text-center py-10 text-gray-400 italic text-sm">
                No feedback yet. Share your sustainable journey!
              </div>
            ) : (
              reviews.map((review: any) => (
                <div
                  key={review._id}
                  className="bg-white p-8 rounded-3xl border border-eco-bg space-y-4 hover:border-eco-primary/30 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-eco-dark">
                        {review.userName}
                      </h4>
                      <div className="flex text-yellow-500 mt-1 gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="text-[10px]">
                            {i < review.rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-300">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed italic">
                    "{review.comment}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
