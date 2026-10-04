import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();
  const [ordered, setOrdered] = useState(false);

  const shipping = totalPrice === 0 || totalPrice >= 100 ? 0 : 10;
  const total = totalPrice + shipping;

  const handleCheckout = () => {
    clearCart();
    setOrdered(true);
  };

  // Order placed
  if (ordered) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-lime-400/15 text-4xl">
          🎉
        </div>
        <h1 className="mt-6 font-display text-3xl font-bold text-white">
          Order placed!
        </h1>
        <p className="mt-3 text-slate-400">
          Thank you for shopping with MegaDex. This is a demo checkout, so no
          real order was created.
        </p>
        <Link
          to="/"
          className="btn-primary mt-8 inline-block rounded-xl px-8 py-3 font-semibold"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <p className="text-6xl">🛒</p>
        <h1 className="mt-6 font-display text-3xl font-bold text-white">
          Your cart is empty
        </h1>
        <p className="mt-3 text-slate-400">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/"
          className="btn-primary mt-8 inline-block rounded-xl px-8 py-3 font-semibold"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-white">
          Shopping Cart{" "}
          <span className="text-lg font-medium text-slate-500">
            ({totalItems} item{totalItems === 1 ? "" : "s"})
          </span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm font-medium text-red-400 transition hover:text-red-300"
        >
          Clear cart
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Items */}
        <div className="space-y-4 lg:col-span-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-line bg-card p-4 sm:flex-row sm:items-center"
            >
              <Link
                to={`/product/${item.id}`}
                className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-[radial-gradient(circle_at_50%_40%,rgba(124,58,237,0.25),transparent_75%)] sm:w-28"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="h-full w-full object-contain p-2"
                />
              </Link>

              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  {item.category}
                </p>
                <Link to={`/product/${item.id}`}>
                  <h3 className="font-display font-bold text-white transition hover:text-violet-300">
                    {item.title}
                  </h3>
                </Link>
                <p className="mt-1 text-slate-400">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center justify-between gap-6 sm:justify-end">
                <div className="flex items-center rounded-xl border border-line bg-panel">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-3 py-2 font-bold text-slate-400 transition hover:text-white"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-3 py-2 font-bold text-slate-400 transition hover:text-white"
                  >
                    +
                  </button>
                </div>

                <p className="w-24 text-right font-display text-lg font-bold text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => removeFromCart(item.id)}
                  aria-label="Remove item"
                  className="rounded-lg p-2 text-slate-500 transition hover:bg-red-500/10 hover:text-red-400"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.87 12.14A2 2 0 0116.14 21H7.86a2 2 0 01-1.99-1.86L5 7m5 4v6m4-6v6M1 7h22M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="h-fit rounded-3xl border border-line bg-panel p-6 shadow-[0_24px_60px_-30px_rgba(124,58,237,0.5)] lg:sticky lg:top-24">
          <h2 className="font-display text-xl font-bold text-white">
            Order Summary
          </h2>

          <div className="mt-6 space-y-3 text-sm text-slate-400">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-slate-200">${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-slate-200">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-cyan-400">
                Add ${(100 - totalPrice).toFixed(2)} more for free shipping
              </p>
            )}
          </div>

          <div className="mt-6 flex justify-between border-t border-white/10 pt-6 font-display text-lg font-bold text-white">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="btn-primary mt-6 w-full rounded-xl py-3.5 font-semibold active:scale-[0.98]"
          >
            Checkout
          </button>
          <Link
            to="/"
            className="mt-3 block text-center text-sm text-slate-400 transition hover:text-white"
          >
            ← Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}