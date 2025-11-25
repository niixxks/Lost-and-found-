export default function LostItem() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Report Lost Item
        </h1>
        <p className="text-sm md:text-base text-slate-300 mt-1">
          Add as many details as possible so people can recognise your item.
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
              placeholder="e.g. Black iPhone 12 with blue cover"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Category
            </label>
            <select className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Phone</option>
              <option>Wallet</option>
              <option>Bag</option>
              <option>Documents</option>
              <option>Electronics</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1">
            Where did you lose it?
          </label>
          <input
            type="text"
            placeholder="Metro, college campus, mall, street, etc."
            className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              City
            </label>
            <input
              type="text"
              placeholder="e.g. Delhi, Bangalore, Patna"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Date lost
            </label>
            <input
              type="date"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-200 mb-1">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="Describe unique marks, stickers, cover colour, contents inside the bag, etc."
            className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500"
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
            Upload clear photos if you have any (before it was lost).
          </p>
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600 transition"
        >
          Submit lost report
        </button>
      </form>
    </div>
  );
}
