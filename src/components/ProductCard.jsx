import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Rating from "./Rating";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fade-up group flex flex-col overflow-hidden rounded-3xl border border-line bg-card transition duration-300 hover:-translate-y-1 hover:border-violet-500/50 hover:shadow-[0_24px_60px_-24px_rgba(124,58,237,0.55)]">
      <Link
        to={`/product/${product.id}`}
        className="relative block bg-[radial-gradient(circle_at_50%_35%,rgba(124,58,237,0.28),transparent_70%)]"
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="h-56 w-full object-contain p-4 drop-shadow-2xl transition duration-300 group-hover:scale-110"
        />
        {product.discountPercentage > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-lime-400 px-3 py-1 text-xs font-bold text-ink">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
          {product.category}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="mt-1 line-clamp-1 font-display text-lg font-bold text-white transition hover:text-violet-300">
            {product.title}
          </h3>
        </Link>
        <div className="mt-2">
          <Rating value={product.rating} />
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <p className="font-display text-2xl font-bold text-white">
            ${product.price.toFixed(2)}
          </p>
          <button
            onClick={handleAdd}
            className={`rounded-xl px-4 py-2 text-sm font-semibold text-white active:scale-95 ${
              added ? "bg-emerald-500 transition" : "btn-primary"
            }`}
          >
            {added ? "Added ✓" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}