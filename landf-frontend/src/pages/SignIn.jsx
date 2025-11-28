import { useState } from "react";

const API_BASE = "http://localhost:4000";

export default function SignIn() {
  const [step, setStep] = useState("phone"); // "phone" | "otp" | "done"
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRequestOtp(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/request-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to request OTP");

      setStep("otp");
      setMessage("OTP sent. Check server console for now 🤫");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyOtp(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, otp }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to verify OTP");

      // store token = user logged in
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userPhone", data.user.phone);

      setStep("done");
      setMessage("Logged in successfully 🎉");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (step === "done") {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">You’re signed in ✅</h1>
        <p className="text-slate-300 text-sm">
          Phone: <span className="font-mono">{phone}</span>
        </p>
        <p className="text-xs text-slate-500">
          Token is saved in localStorage. Later we’ll use it to call protected APIs.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Sign in to Lost &amp; Found
        </h1>
        <p className="text-sm text-slate-300 mt-1">
          Use your phone number. We’ll send you a one-time OTP to verify.
        </p>
      </div>

      {step === "phone" && (
        <form onSubmit={handleRequestOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Phone number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="e.g. 9876543210"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500"
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              Later we’ll add proper validation (country code, etc.).
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600 disabled:opacity-60"
          >
            {loading ? "Sending OTP..." : "Get OTP"}
          </button>
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleVerifyOtp} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-1">
              Enter OTP
            </label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="6-digit code"
              className="w-full rounded-lg border border-slate-700 bg-slate-900/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500"
              required
            />
            <p className="text-xs text-slate-500 mt-1">
              For now, OTP is printed in the backend console.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify & Sign in"}
          </button>
        </form>
      )}

      {message && <p className="text-sm text-amber-300">{message}</p>}
    </div>
  );
}
