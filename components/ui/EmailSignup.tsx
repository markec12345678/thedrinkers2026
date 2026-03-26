"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, CheckCircle, AlertCircle } from "lucide-react";

export function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={status === "loading" || status === "success"}
            className="w-full pl-12 pr-4 py-4 bg-gray-800 text-white border border-gray-700 rounded-xl focus:border-purple-500 focus:outline-none disabled:opacity-50"
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`w-full py-4 px-8 rounded-xl font-bold transition-all ${
            status === "success"
              ? "bg-gradient-to-r from-green-600 to-emerald-600"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          } text-white disabled:opacity-50`}
        >
          {status === "loading" ? (
            <div className="flex items-center justify-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>Subscribing...</span>
            </div>
          ) : status === "success" ? (
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Subscribed!</span>
            </div>
          ) : (
            "Notify Me"
          )}
        </button>

        {status === "error" && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Failed to subscribe. Please try again.</span>
          </div>
        )}

        {status === "success" && (
          <div className="flex items-center gap-2 text-green-500 text-sm">
            <CheckCircle className="w-4 h-4" />
            <span>Thanks! We&apos;ll notify you when drops launch.</span>
          </div>
        )}
      </form>
    </motion.div>
  );
}
