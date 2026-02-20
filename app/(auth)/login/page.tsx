"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock } from "lucide-react";
import Link from "next/link";

export default function FluidLogin() {
  const [step, setStep] = useState<"login" | "otp" | "success">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ---------- LOGIN ---------- */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important for cookies
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Login failed");

      // if backend requires OTP verification
      if (!data.user.isVerified) {
        setStep("otp");
      } else {
        setStep("success");
      }
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  /* ---------- OTP INPUT ---------- */
  const handleOtp = (v: string, i: number) => {
    if (!/^[0-9]?$/.test(v)) return;
    const copy = [...otp];
    copy[i] = v;
    setOtp(copy);
  };

  /* ---------- VERIFY OTP ---------- */
  const handleVerifyOtp = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email,
          otp: otp.join(""),
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

      setStep("success");
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex items-center justify-center p-6">
      <div className="w-full max-w-6xl rounded-[28px] bg-white shadow-[0_40px_100px_rgba(0,0,0,0.08)] overflow-hidden grid lg:grid-cols-2">
        
        {/* LEFT PANEL */}
        <div className="p-16 flex flex-col justify-center">
          <AnimatePresence mode="wait">

            {/* LOGIN */}
            {step === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-sm"
              >
                <h1 className="text-2xl font-semibold text-gray-900 mb-10">
                  Welcome to WORK SPACE
                </h1>

                <form onSubmit={handleLogin} className="space-y-5">
                  <Input
                    icon={<Mail size={16} />}
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Input
                    icon={<Lock size={16} />}
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                  )}

                  <button
                    disabled={loading}
                    className="w-full h-11 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-50"
                  >
                    {loading ? "Logging in..." : "Login"}
                  </button>
                </form>

                <p className="text-sm text-gray-500 mt-6">
                  Do not have account?{" "}
                  <Link href="/signup" className="text-indigo-600">
                    Sign up
                  </Link>
                </p>
              </motion.div>
            )}

            {/* OTP */}
            {step === "otp" && (
              <motion.div
                key="otp"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-sm"
              >
                <h1 className="text-2xl font-semibold mb-8">
                  Verify Email
                </h1>

                <div className="flex gap-3 mb-8">
                  {otp.map((v, i) => (
                    <input
                      key={i}
                      value={v}
                      onChange={(e) => handleOtp(e.target.value, i)}
                      maxLength={1}
                      className="w-12 h-12 border rounded-lg text-center focus:border-indigo-500 outline-none"
                    />
                  ))}
                </div>

                {error && (
                  <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                <button
                  onClick={handleVerifyOtp}
                  disabled={loading}
                  className="w-full h-11 rounded-lg bg-indigo-600 text-white disabled:opacity-50"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
              </motion.div>
            )}

            {/* SUCCESS */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">🎉</div>
                <h2 className="text-xl font-semibold">
                  Login Successful
                </h2>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative hidden lg:flex items-center justify-center bg-[#f2f4f8]">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="w-[260px] h-[260px] rounded-3xl bg-gradient-to-br from-indigo-400 to-blue-500 shadow-2xl"
          />
          <div className="absolute w-[420px] h-[420px] bg-indigo-300/20 blur-[120px]" />
        </div>
      </div>
    </div>
  );
}

/* ---------- INPUT COMPONENT ---------- */

function Input({
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
}: {
  icon: React.ReactNode;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-3.5 text-gray-400">{icon}</div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 h-11 border rounded-lg focus:border-indigo-500 outline-none transition text-black"
      />
    </div>
  );
}