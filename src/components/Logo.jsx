import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="btn-primary flex h-9 w-9 items-center justify-center rounded-xl font-display text-lg font-bold transition duration-300 group-hover:rotate-6">
        M
      </span>
      <span className="font-display text-xl font-bold tracking-tight text-white">
        Mega<span className="text-gradient">Dex</span>
      </span>
    </Link>
  );
}