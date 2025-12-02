import { useState } from "react";

const API_BASE = "http://localhost:4000";

export default function SignIn() {
  const [step, setStep] = useState("details"); // "details" | "otp" | "done"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
        // we send name & email too, backend currently only uses phone
        body: JSON.stringify({ name, email, phone }),
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

      // ✅ user "logged in" – store token + basic profile locally
      localStorage.setItem("authToken", data.token);
      localStorage.setItem(
        "userProfile",
        JSON.stringify({
          phone: data.user?.phone || phone,
          name: name || data.user?.name || "",
          email: email || data.user?.email || "",
        })
      );

      setStep("done");
      setMessage("Account verified & signed in 🎉");
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ✅ After login success screen
  if (step === "done") {
    return (
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
          You&apos;re signed in ✅
        </h1>
        <p className="text-sm text-slate-300">
          Welcome,{" "}
          <span className="font-semibold">
            {name || "citizen"}
          </span>
          . Your phone number is now verified.
        </p>
        <p className="text-xs text-slate-500">
          In the next steps, we&apos;ll use this account to create and track your Lost &amp; Found
          reports.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
      {/* Left side intro */}
      <div className="hidden md:block space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">
          Create your Lost &amp; Found account
        </h1>
        <p className="text-sm text-slate-300">
          Save your reports, track responses and claim items safely. We verify every account with a
          one-time OTP to keep things secure.
        </p>
        <ul className="space-y-2 text-sm text-slate-300">
          <li>• Track all your lost &amp; found reports in one place</li>
          <li>• Get faster responses from people who find your items</li>
          <li>• Build trust with verified profile and history</li>
        </ul>
      </div>

      {/* Right side card */}
      <div className="bg-slate-900/70 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-6">
        <div>
          <h2 className="text-xl font-semibold">
            {step === "details" ? "Sign up / Sign in" : "Verify OTP"}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {step === "details"
              ? "Enter your details to receive a one-time OTP."
              : "We sent an OTP to your phone. Enter it to complete sign in."}
          </p>
        </div>

        {step === "details" && (
          <form onSubmit={handleRequestOtp} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Nitesh Kumar Singh"
                className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Email (optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. you@example.com"
                className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Phone number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. 9876543210"
                className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500"
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                We&apos;ll send a one-time OTP to this number for verification.
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/30 hover:bg-blue-600 disabled:opacity-60"
            >
              {loading ? "Sending OTP..." : "Get OTP"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            {/* OTP input */}
            <div>
              <label className="block text-sm font-medium text-slate-200 mb-1">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit code"
                className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-500"
                required
              />
              <p className="text-xs text-slate-500 mt-1">
                For now, check the backend terminal to see the OTP (in dev mode).
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>

            <button
              type="button"
              onClick={() => setStep("details")}
              className="w-full text-xs text-slate-400 hover:text-slate-200 mt-1"
            >
              Change phone / details
            </button>
          </form>
        )}

        {message && (
          <p className="text-xs text-amber-300 border border-amber-500/30 rounded-md px-3 py-2 bg-amber-950/30">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
