import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const linkBase =
    "px-3 py-1.5 rounded-full text-xs md:text-sm transition-flex font-medium";

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-gradient-to-r from-slate-900/70 via-slate-800/60 to-indigo-900/60 border-b border-slate-800">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white text-base font-bold shadow-md">
            LF
          </div>
          <div className="hidden sm:block">
            <p className="font-semibold text-white">Lost &amp; Found</p>
            <p className="text-xs text-slate-300">Find what matters, fast</p>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-3">
          <NavLink
            to="/lost"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-blue-500 border border-blue-500 text-white"
                  : "border border-slate-700 text-slate-100 hover:border-blue-400 hover:text-blue-200"
              }`
            }
          >
            Report Lost
          </NavLink>

          <NavLink
            to="/found"
            className={({ isActive }) =>
              `${linkBase} ${
                isActive
                  ? "bg-emerald-500 text-white shadow-md"
                  : "bg-emerald-600/90 text-white hover:bg-emerald-500"
              }`
            }
          >
            Report Found
          </NavLink>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((s) => !s)}
            className="p-2 rounded-md bg-slate-800/30 text-slate-200 hover:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden bg-slate-900/80 border-t border-slate-800 transition-all duration-200 ease-in-out overflow-hidden ${
          open ? "max-h-60" : "max-h-0"
        }`}
      >
        <div className="px-4 pt-3 pb-4 space-y-2">
          <NavLink
            to="/lost"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block w-full text-left px-3 py-2 rounded-md ${
                isActive
                  ? "bg-blue-500 text-white"
                  : "text-slate-100 hover:bg-slate-800/50"
              }`
            }
          >
            Report Lost
          </NavLink>

          <NavLink
            to="/found"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `block w-full text-left px-3 py-2 rounded-md ${
                isActive
                  ? "bg-emerald-500 text-white"
                  : "text-slate-100 hover:bg-slate-800/50"
              }`
            }
          >
            Report Found
          </NavLink>
          <NavLink
  to="/signin"
  className={({ isActive }) =>
    `hidden md:inline-flex items-center px-3 py-1.5 rounded-full text-xs md:text-sm border transition ${
      isActive
        ? "border-blue-400 text-blue-200"
        : "border-slate-600 text-slate-200 hover:border-blue-400 hover:text-blue-300"
    }`
  }
>
  Sign in
</NavLink>

        </div>
      </div>
    </header>
  );
}
