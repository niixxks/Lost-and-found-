import React, { useMemo, useState } from "react";

const mockResults = [
  {
    id: "1",
    type: "lost", // or "found"
    title: "Black iPhone 12 with blue cover",
    location: "Near Connaught Place Metro, New Delhi",
    date: "2025-11-20",
    status: "Looking for owner",
    badge: "High priority",
  },
  {
    id: "2",
    type: "found",
    title: "Brown leather wallet (Axis Bank card inside)",
    location: "Phoenix Mall, Bengaluru",
    date: "2025-11-22",
    status: "Found – waiting for claim",
    badge: "Found item",
  },
  {
    id: "3",
    type: "lost",
    title: "Black laptop bag with stickers",
    location: "College canteen, Patna",
    date: "2025-11-18",
    status: "Lost report created",
    badge: "Recently lost",
  },
];

export default function Home() {
  const [itemQuery, setItemQuery] = useState("");
  const [area, setArea] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredResults = useMemo(() => {
    const q = itemQuery.trim().toLowerCase();
    const a = area.trim().toLowerCase();

    return mockResults.filter((item) => {
      // filter by type
      if (typeFilter === "Lost only" && item.type !== "lost") return false;
      if (typeFilter === "Found only" && item.type !== "found") return false;

      // filter by item query (title, badge)
      if (q) {
        const inTitle = item.title && item.title.toLowerCase().includes(q);
        const inBadge = item.badge && item.badge.toLowerCase().includes(q);
        if (!inTitle && !inBadge) return false;
      }

      // filter by area / location
      if (a) {
        if (!item.location || !item.location.toLowerCase().includes(a)) return false;
      }

      return true;
    });
  }, [itemQuery, area, typeFilter]);

  return (
    <div className="space-y-8">
      {/* Hero + Search */}
      <section className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Find lost things faster.
        </h1>
        <p className="text-sm md:text-base text-slate-300 max-w-xl">
          Search reports from people around you. You can filter by item type,
          city and whether it&apos;s marked as lost or found.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-4 flex flex-col md:flex-row gap-3"
        >
          <input
            type="text"
            value={itemQuery}
            onChange={(e) => setItemQuery(e.target.value)}
            placeholder="What are you searching? (phone, wallet, bag...)"
            className="flex-1 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500"
          />

          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Where was it lost/found? (area or city)"
            className="md:w-72 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500"
          />

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="md:w-40 rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option>All</option>
            <option>Lost only</option>
            <option>Found only</option>
          </select>

          <button
            type="button"
            onClick={() => {
              setItemQuery("");
              setArea("");
              setTypeFilter("All");
            }}
            className="px-4 py-2 rounded-lg bg-slate-700 text-sm text-slate-200 hover:bg-slate-600"
          >
            Clear
          </button>
        </form>
      </section>

      {/* Search Results */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Search results</h2>
          <p className="text-xs text-slate-400">
            Showing {filteredResults.length} of {mockResults.length} example items (static data)
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredResults.map((item) => (
            <article
              key={item.id}
              className="rounded-xl border border-slate-700 bg-slate-900/70 p-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    {item.type === "lost" ? "Lost item" : "Found item"}
                  </p>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium ${
                      item.type === "lost"
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-sm md:text-base font-semibold text-slate-50">
                  {item.title}
                </h3>

                <p className="text-xs text-slate-400">
                  {item.location}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <p>
                  Date:{" "}
                  <span className="text-slate-200">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-[11px] text-slate-300">{item.status}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
