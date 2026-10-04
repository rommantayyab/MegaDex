import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";
import Rating from "../components/Rating";
import { useCart } from "../context/CartContext";
import useFetch from "../hooks/useFetch";

function DetailsSkeleton() {
  return (
    <div className="grid animate-pulse gap-10 lg:grid-cols-2">
      <div className="h-96 rounded-3xl bg-white/5" />
      <div className="space-y-4">
        <div className="h-4 w-1/4 rounded bg-white/10" />
        <div className="h-8 w-3/4 rounded bg-white/10" />
        <div className="h-4 w-1/3 rounded bg-white/10" />
        <div className="h-10 w-1/4 rounded bg-white/10" />
        <div className="h-24 rounded bg-white/10" />
        <div className="h-12 w-1/2 rounded bg-white/10" />
      </div>
    </div>
  );
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const {
    data: product,
    loading,
    error,
    refetch,
  } = useFetch(`https://dummyjson.com/products/${id}`);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const originalPrice = product
    ? product.price / (1 - product.discountPercentage / 100)
    : 0;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <button
        onClick={() => navigate(-1)}
        className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
      >
        ← Back
      </button>

      {loading && <DetailsSkeleton />}

      {error && !loading && <ErrorMessage message={error} onRetry={refetch} />}

      {product && !loading && !error && (
        <>
          <div className="fade-up grid gap-10 lg:grid-cols-2">
            {/* Gallery */}
            <div>
              <div className="flex h-96 items-center justify-center rounded-3xl border border-line bg-card bg-[radial-gradient(circle_at_50%_40%,rgba(124,58,237,0.3),transparent_70%)] p-6">
                <img
                  src={product.images?.[selectedImage] || product.thumbnail}
                  alt={product.title}
                  className="h-full w-full object-contain drop-shadow-2xl"
                />
              </div>

              {product.images?.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-card p-1 transition ${
                        selectedImage === i
                          ? "border-violet-500"
                          : "border-line hover:border-slate-500"
                      }`}
                    >
                      <img
                        src={img}
                        alt=""
                        className="h-full w-full object-contain"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-cyan-400">
                {product.category}
                {product.brand && (
                  <span className="text-slate-500"> • {product.brand}</span>
                )}
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
                {product.title}
              </h1>

              <div className="mt-3 flex items-center gap-3">
                <Rating value={product.rating} />
                <span className="text-sm text-slate-500">
                  ({product.reviews?.length || 0} reviews)
                </span>
              </div>

              <div className="mt-6 flex flex-wrap items-end gap-3">
                <p className="font-display text-5xl font-bold text-white">
                  ${product.price.toFixed(2)}
                </p>
                {product.discountPercentage > 0 && (
                  <>
                    <p className="pb-1.5 text-lg text-slate-500 line-through">
                      ${originalPrice.toFixed(2)}
                    </p>
                    <span className="mb-1.5 rounded-full bg-lime-400 px-3 py-1 text-sm font-bold text-ink">
                      Save {Math.round(product.discountPercentage)}%
                    </span>
                  </>
                )}
              </div>

              <p className="mt-6 leading-relaxed text-slate-400">
                {product.description}
              </p>

              <p
                className={`mt-4 text-sm font-semibold ${
                  product.stock > 0 ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {product.stock > 0
                  ? `● In stock (${product.stock} available)`
                  : "● Out of stock"}
              </p>

              {/* Quantity + Add */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <div className="flex items-center rounded-xl border border-line bg-card">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 py-3 text-lg font-bold text-slate-400 transition hover:text-white"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-semibold text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.min(product.stock || 1, q + 1))
                    }
                    className="px-4 py-3 text-lg font-bold text-slate-400 transition hover:text-white"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  disabled={product.stock === 0}
                  className={`flex-1 rounded-xl px-8 py-3.5 font-semibold text-white active:scale-[0.98] disabled:cursor-not-allowed sm:flex-none ${
                    added ? "bg-emerald-500 transition" : "btn-primary"
                  }`}
                >
                  {added ? "Added to cart ✓" : "Add to Cart"}
                </button>

                <Link
                  to="/cart"
                  className="rounded-xl border border-line bg-card px-6 py-3.5 font-semibold text-slate-200 transition hover:border-violet-500/60 hover:text-white"
                >
                  View Cart
                </Link>
              </div>

              {/* Extra info */}
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: "🚚", text: product.shippingInformation },
                  { icon: "🛡️", text: product.warrantyInformation },
                  { icon: "↩️", text: product.returnPolicy },
                ]
                  .filter((i) => i.text)
                  .map((i) => (
                    <div
                      key={i.icon}
                      className="rounded-2xl border border-line bg-card p-4 text-sm text-slate-400"
                    >
                      <span className="text-xl">{i.icon}</span>
                      <p className="mt-1">{i.text}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Reviews */}
          {product.reviews?.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display text-2xl font-bold text-white">
                Customer Reviews
              </h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {product.reviews.map((r, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-line bg-card p-5"
                  >
                    <Rating value={r.rating} />
                    <p className="mt-3 text-slate-300">"{r.comment}"</p>
                    <p className="mt-4 text-sm font-semibold text-white">
                      {r.reviewerName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}