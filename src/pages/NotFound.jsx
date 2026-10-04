import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-28 text-center">
      <h1 className="text-gradient font-display text-8xl font-bold">404</h1>
      <p className="mt-4 text-lg text-slate-400">
        This page isn't in the MegaDex.
      </p>
      <Link
        to="/"
        className="btn-primary mt-8 inline-block rounded-xl px-8 py-3 font-semibold"
      >
        Back to Shop
      </Link>
    </div>
  );
}
