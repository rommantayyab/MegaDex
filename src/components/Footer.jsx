import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-panel">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            MegaDex is your mega catalog of products. Search, compare and add
            your favourites to the cart in seconds.
          </p>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Explore
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>
              <Link to="/" className="transition hover:text-white">
                Shop all products
              </Link>
            </li>
            <li>
              <Link to="/cart" className="transition hover:text-white">
                Your cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
            Built with
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-400">
            <li>React + Vite</li>
            <li>React Router + Context API</li>
            <li>
              Tailwind CSS ·{" "}
              <a
                href="https://dummyjson.com"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 transition hover:text-cyan-300"
              >
                DummyJSON API
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5 py-5 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} MegaDex. All rights reserved.
      </div>
    </footer>
  );
}