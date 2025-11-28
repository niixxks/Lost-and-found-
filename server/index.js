const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

// in-memory stores (for now, no DB)
const users = {};      // { phone: { phone } }
const otpStore = {};   // { phone: { otp, expiresAt } }

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("Auth server is running");
});

// request OTP
app.post("/api/auth/request-otp", (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({ message: "Phone is required" });
  }

  // generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // store OTP with 5 min expiry
  otpStore[phone] = {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000,
  };

  // create user if doesn’t exist
  if (!users[phone]) {
    users[phone] = { phone };
  }

  console.log(`OTP for ${phone}: ${otp}`); // ❗ in real app, send via SMS

  return res.json({ message: "OTP generated and sent (check server console in dev)" });
});

// verify OTP
app.post("/api/auth/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ message: "Phone and OTP are required" });
  }

  const record = otpStore[phone];
  if (!record) {
    return res.status(400).json({ message: "No OTP found for this phone. Request again." });
  }

  if (Date.now() > record.expiresAt) {
    return res.status(400).json({ message: "OTP expired. Request a new one." });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ message: "Incorrect OTP" });
  }

  // success – in real life generate JWT, here just a fake token
  const fakeToken = `fake-token-${phone}-${Date.now()}`;

  // cleanup OTP so it can't be reused
  delete otpStore[phone];

  return res.json({
    message: "Logged in successfully",
    token: fakeToken,
    user: users[phone],
  });
});

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});
