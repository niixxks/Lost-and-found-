import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-20">
      <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-blue-500 flex items-center justify-center text-sm font-bold shadow-lg">
            LF
          </div>
          <div>
            <p className="font-semibold leading-tight">Lost &amp; Found</p>
            <p className="text-xs text-slate-400">Find what matters, fast</p>
          </div>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-3 text-sm">
          <NavLink
            to="/lost"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full border text-xs md:text-sm transition ${
                isActive
                  ? "bg-blue-500 border-blue-500 text-white"
                  : "border-slate-600 text-slate-200 hover:border-blue-400 hover:text-blue-300"
              }`
            }
          >
            Report Lost
          </NavLink>

          <NavLink
            to="/found"
            className={({ isActive }) =>
              `px-3 py-1.5 rounded-full text-xs md:text-sm font-medium transition ${
                isActive
                  ? "bg-emerald-500 text-white shadow-md"
                  : "bg-emerald-600/80 text-white hover:bg-emerald-500"
              }`
            }
          >
            Report Found
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
