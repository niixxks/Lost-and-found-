export default function FoundItem() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Report Found Item
        </h1>
        <p className="text-sm md:text-base text-slate-300 mt-1">
          Share details about what you found so the real owner can recognise it
          and contact you safely.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Item title
            </label>
            <input
              type="text"
              placeholder="e.g. Brown leather wallet"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Category
            </label>
            <select className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              <option>Wallet</option>
              <option>Phone</option>
              <option>Bag</option>
              <option>Keys</option>
              <option>Documents</option>
              <option>Electronics</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1">
            Where did you find it?
          </label>
          <input
            type="text"
            placeholder="Metro, bus, college, mall, street, etc."
            className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-slate-500"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              City
            </label>
            <input
              type="text"
              placeholder="e.g. Delhi, Mumbai, Patna"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Date found
            </label>
            <input
              type="date"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Describe unique marks, contents inside, brand, colour, etc."
            className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-slate-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1">
            Photos
          </label>
          <input
            type="file"
            multiple
            className="w-full rounded-lg border border-dashed border-slate-600 bg-slate-900/40 px-3 py-6 text-sm text-slate-400 cursor-pointer focus:outline-none"
          />
          <p className="text-xs text-slate-500 mt-1">
            Upload clear photos of the item (avoid showing sensitive personal info).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              How can the owner contact you?
            </label>
            <input
              type="text"
              placeholder="Phone / email (will be protected later via app)"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Optional note
            </label>
            <input
              type="text"
              placeholder="Any condition to return (ID proof, etc.)"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 placeholder:text-slate-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition"
        >
          Submit found report
        </button>
      </form>
    </div>
  );
}
