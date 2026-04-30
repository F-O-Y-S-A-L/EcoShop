"use client";

import React, { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  Star,
  Heart,
  X,
  Filter,
  ChevronRight,
  LayoutGrid,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";
import { useCart } from "@/src/contexts/CartContext";
import toast from "react-hot-toast";

function ShopContent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, toggleWishlist } = useAuth();
  const { addToCart } = useCart();
  const [totalPages, setTotalPages] = useState(1);

  const category = searchParams.get("category") || "All";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "newest";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 6;

  useEffect(() => {
    setLoading(true);
    const queryParams = new URLSearchParams();
    if (category !== "All") queryParams.set("category", category);
    if (search) queryParams.set("search", search);
    if (sort !== "newest") queryParams.set("sort", sort);
    if (minPrice) queryParams.set("minPrice", minPrice);
    if (maxPrice) queryParams.set("maxPrice", maxPrice);
    queryParams.set("page", page.toString());
    queryParams.set("limit", limit.toString());

    fetch(`/api/products?${queryParams.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && Array.isArray(data.products)) {
          setProducts(data.products);
          setTotalPages(data.pages || 1);
        } else {
          setProducts([]);
          setTotalPages(1);
        }
        setLoading(false);
      })
      .catch(() => {
        setProducts([]);
        setTotalPages(1);
        setLoading(false);
      });
  }, [category, search, sort, minPrice, maxPrice, page]);

  const categories = [
    "All",
    "Chips",
    "Biscuits",
    "Chocolates",
    "Drinks",
    "Savory",
    "Sweet",
  ];

  const handleUpdateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) params.set(key, value);
    else params.delete(key);
    window.history.pushState(null, "", `?${params.toString()}`);
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent, productId: string) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to use wishlist");
      return;
    }
    toggleWishlist(productId);
    toast.success("Wishlist updated");
  };

  const FiltersContent = () => (
    <div className="space-y-12">
      <section className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-eco-primary">
          Catalog Alpha
        </h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => {
                  handleUpdateParams("category", cat);
                  if (window.innerWidth < 768) setIsFilterOpen(false);
                }}
                className={`w-full group py-3 flex justify-between items-center transition-all px-4 rounded-xl ${category === cat ? "bg-eco-dark text-white shadow-lg" : "text-eco-dark/60 hover:bg-eco-gray hover:text-eco-dark font-medium"}`}
              >
                <span className="text-xs font-black uppercase tracking-widest">
                  {cat}
                </span>
                {category === cat ? (
                  <ChevronRight size={14} className="text-eco-primary" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-eco-bg group-hover:bg-eco-primary/30"></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-6">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-eco-primary">
          Value Filter
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">
                Min
              </label>
              <input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => handleUpdateParams("minPrice", e.target.value)}
                className="w-full bg-eco-gray border-none rounded-xl py-3.5 px-5 text-xs font-bold focus:ring-1 focus:ring-eco-primary outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-1">
                Max
              </label>
              <input
                type="number"
                placeholder="∞"
                value={maxPrice}
                onChange={(e) => handleUpdateParams("maxPrice", e.target.value)}
                className="w-full bg-eco-gray border-none rounded-xl py-3.5 px-5 text-xs font-bold focus:ring-1 focus:ring-eco-primary outline-none"
              />
            </div>
          </div>
          {(minPrice || maxPrice) && (
            <button
              onClick={() => {
                handleUpdateParams("minPrice", "");
                handleUpdateParams("maxPrice", "");
              }}
              className="text-[10px] font-black uppercase tracking-widest text-eco-primary hover:underline px-1"
            >
              Clear Price Range
            </button>
          )}
        </div>
      </section>

      <section className="bg-eco-dark p-8 rounded-[2.5rem] space-y-4 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-eco-primary/20 blur-3xl"></div>
        <h3 className="text-base font-display font-bold italic">
          Curated Drops.
        </h3>
        <p className="text-white/40 text-[9px] uppercase font-bold tracking-widest leading-loose">
          Our logistics team verifies every SKU for ultimate flavor integrity.
        </p>
      </section>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 space-y-12">
      {/* Header Strategy */}
      <div className="flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="bg-eco-primary h-px w-8"></span>
              <span className="text-eco-primary font-black uppercase tracking-[0.4em] text-[9px]">
                Marketplace
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-display font-extrabold italic tracking-tighter leading-none text-eco-dark">
              Products
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden flex items-center gap-3 px-6 py-4 bg-eco-dark text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl"
            >
              <Filter size={14} />
              <span>Menu</span>
            </button>
            <div className="flex bg-eco-gray p-1.5 rounded-full border border-eco-gray shadow-inner">
              <select
                value={sort}
                onChange={(e) => handleUpdateParams("sort", e.target.value)}
                className="bg-transparent text-[9px] font-black uppercase tracking-widest px-5 py-2 outline-none cursor-pointer appearance-none"
              >
                <option value="newest">Latest Arrivals</option>
                <option value="price-asc">Price Index: Low</option>
                <option value="price-desc">Price Index: High</option>
                <option value="rating-desc">Community Choice</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Bar Segment */}
        <div className="relative group">
          <form onSubmit={(e) => e.preventDefault()} className="max-w-lg">
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-eco-primary transition-colors" />
              <input
                type="text"
                placeholder="Scan for specific cravings..."
                defaultValue={search}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleUpdateParams(
                      "search",
                      (e.target as HTMLInputElement).value,
                    );
                  }
                }}
                className="bg-white border border-eco-gray rounded-4xl py-6 pl-14 pr-10 w-full text-sm font-medium focus:ring-1 focus:ring-eco-primary outline-none shadow-sm group-hover:shadow-lg transition-all"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-16 relative">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-72 shrink-0 h-fit sticky top-24">
          <FiltersContent />
        </aside>

        {/* Product Grid */}
        <div className="grow">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="animate-pulse bg-eco-gray rounded-[3rem] h-112.5"
                ></div>
              ))}
            </div>
          ) : Array.isArray(products) && products.length === 0 ? (
            <div className="text-center py-32 space-y-6 bg-white rounded-[4rem] border border-eco-bg shadow-sm">
              <div className="bg-eco-gray w-24 h-24 rounded-full flex items-center justify-center mx-auto opacity-50">
                <LayoutGrid className="h-10 w-10 text-eco-dark" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-display font-bold italic">
                  Zero Hits.
                </h2>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                  Adjust your search parameters or explore other categories.
                </p>
              </div>
              <button
                onClick={() => router.push("/shop")}
                className="bg-eco-dark text-white px-8 py-3.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-eco-primary transition-all"
              >
                Reset Database
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 md:gap-10">
              {Array.isArray(products) &&
                products.map((product: any) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={product._id}
                    className="group flex flex-col my-4 md:my-0"
                  >
                    <Link
                      href={`/product/${product._id}`}
                      className="block relative"
                    >
                      <div className="bg-white border border-eco-bg md:p-4 rounded-2xl md:rounded-[3rem] mb-6 relative overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-500">
                        <div className="aspect-4/5 bg-eco-gray rounded-2xl md:rounded-[2.5rem] flex items-center justify-center overflow-hidden">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000 ease-out"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Price Tag Overlay */}
                        <div className="absolute bottom-2 right-2 md:bottom-6 md:right-6 bg-white text-eco-dark px-4 py-2 rounded-2xl font-black text-xs shadow-xl border border-eco-bg">
                          ৳{product.price.toFixed(2)}
                        </div>

                        <div className="absolute top-4 left-2 md:top-8 md:left-8 bg-black/40 backdrop-blur-md text-white text-[6px] font-black px-1 md:px-3 py-1 rounded-full uppercase tracking-[0.2em]">
                          Verified
                        </div>

                        <button
                          onClick={(e) => handleWishlist(e, product._id)}
                          className={`absolute top-2 right-2 md:top-8 md:right-8 w-10 h-10 rounded-full backdrop-blur-md transition-all flex items-center justify-center shadow-lg ${user?.wishlist?.includes(product._id) ? "bg-red-500 text-white" : "bg-white/90 text-gray-500 hover:bg-eco-primary hover:text-white"}`}
                        >
                          <Heart
                            size={18}
                            className={`${user?.wishlist?.includes(product._id) ? "fill-current" : ""}`}
                          />
                        </button>
                      </div>

                      <div className="md:px-4 space-y-1 md:space-y-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-eco-primary">
                            <span className="text-[8px] font-black uppercase tracking-[0.2em]">
                              {product.category}
                            </span>
                          </div>
                          <h4 className="text-lg font-display font-bold italic tracking-tight group-hover:text-eco-primary transition-colors leading-tight">
                            {product.name}
                          </h4>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="flex text-yellow-500 text-[9px]">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={10}
                                  className={
                                    i < Math.floor(product.averageRating)
                                      ? "fill-current"
                                      : "text-slate-200"
                                  }
                                />
                              ))}
                            </div>
                            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                              {product.reviewsCount} Intels
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-2.5 md:mt-6">
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="w-full bg-eco-dark text-white py-2 rounded-xl md:py-4 md:rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-eco-primary transition-all shadow-lg active:scale-95"
                        >
                          Add to cart
                        </button>
                      </div>
                    </Link>
                  </motion.div>
                ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="mt-20 flex items-center gap-4">
              <div className="flex bg-eco-gray p-1.5 rounded-full border border-eco-gray shadow-sm">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNumber = i + 1;
                  return (
                    <button
                      key={pageNumber}
                      onClick={() =>
                        handleUpdateParams("page", pageNumber.toString())
                      }
                      className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full text-[10px] font-black transition-all flex items-center justify-center ${
                        page === pageNumber
                          ? "bg-eco-primary text-white shadow-lg scale-110"
                          : "text-eco-dark/40 hover:text-eco-dark"
                      }`}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              {page < totalPages && (
                <button
                  onClick={() =>
                    handleUpdateParams("page", (page + 1).toString())
                  }
                  className="w-10 h-10 md:w-14 md:h-14 bg-eco-dark text-white rounded-full flex items-center justify-center hover:bg-eco-primary transition-all shadow-xl hover:translate-x-1"
                >
                  <ArrowRight size={20} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Mobile Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-101 lg:hidden p-8 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-2xl font-display font-bold italic">Menu</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-10 h-10 bg-eco-gray rounded-full flex items-center justify-center"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex overflow-y-auto">
                <FiltersContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center font-display italic text-2xl animate-pulse">
          Initializing Ecosystem...
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
