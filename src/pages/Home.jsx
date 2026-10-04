import { useEffect, useMemo, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import ProductCard from "../components/ProductCard";
import ProductSkeleton from "../components/ProductSkeleton";
import useFetch from "../hooks/useFetch";

const BASE_URL = "https://dummyjson.com/products";

export default function Home() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  // Wait 400ms after typing stops before calling the API
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search.trim()), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Build the API url from the current filters
  let url = `${BASE_URL}?limit=100`;
  if (category !== "all") {
    url = `${BASE_URL}/category/${category}?limit=100`;
  } else if (debouncedSearch) {
    url = `${BASE_URL}/search?q=${encodeURIComponent(debouncedSearch)}&limit=100`;
  }

  const { data, loading, error, refetch } = useFetch(url);
  const { data: categories } = useFetch(`${BASE_URL}/categories`);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCategory("all");
  };

  const handleCategory = (slug) => {
    setCategory(slug);
    setSearch("");
  };

  // Sorting is done on the client
  const products = useMemo(() => {
    const list = [...(data?.products || [])];
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [data, sort]);

  const chipClass = (active) =>
    `shrink-0 rounded-full px-4 py-2 text-sm font-medium capitalize transition ${
      active
        ? "btn-primary"
        : "border border-line bg-card text-slate-400 hover:border-violet-500/60 hover:text-white"
    }`;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5">
        <div className="grid-bg absolute inset-0" />
        <div className="float absolute -left-24 top-0 h-96 w-96 rounded-full bg-violet-600/30 blur-3xl" />
        <div className="float absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300 backdrop-blur">
            <span className="h-2 w-2 animate-pulse rounded-full bg-lime-400" />
            100+ products live now
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">
            The Mega Catalog <br className="hidden sm:block" />
            of <span className="text-gradient">Everything</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-slate-400">
            Search, filter and explore products across every category, then
            add your favourites to the cart in one click.
          </p>

          {/* Search */}
          <div className="relative mx-auto mt-10 max-w-xl">
            <svg
              className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={handleSearch}
              placeholder="Search phones, laptops, perfumes..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-4 pl-14 pr-5 text-white shadow-2xl outline-none backdrop-blur transition placeholder:text-slate-500 focus:border-violet-500/70 focus:ring-4 focus:ring-violet-500/20"
            />
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        {/* Category chips */}
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => handleCategory("all")}
            className={chipClass(category === "all")}
          >
            All
          </button>
          {Array.isArray(categories) &&
            categories.map((c) => (
              <button
                key={c.slug}
                onClick={() => handleCategory(c.slug)}
                className={chipClass(category === c.slug)}
              >
                {c.name}
              </button>
            ))}
        </div>

        {/* Toolbar */}
        <div className="mt-6 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
          <p className="text-sm text-slate-400">
            {loading
              ? "Loading products..."
              : error
              ? ""
              : `Showing ${products.length} product${
                  products.length === 1 ? "" : "s"
                }`}
          </p>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-line bg-card px-4 py-2.5 text-sm font-medium text-slate-200 outline-none transition focus:border-violet-500/70 focus:ring-4 focus:ring-violet-500/20"
          >
            <option value="default">Sort: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && <ErrorMessage message={error} onRetry={refetch} />}

        {/* Empty state */}
        {!loading && !error && products.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-5xl">🔍</p>
            <h3 className="mt-4 font-display text-xl font-bold text-white">
              No products found
            </h3>
            <p className="mt-2 text-slate-400">
              Try a different search or category.
            </p>
          </div>
        )}

        {/* Products grid */}
        {!loading && !error && products.length > 0 && (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}