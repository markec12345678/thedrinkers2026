"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Package, Mail } from "lucide-react";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      // Verify session with backend
      fetch(`/api/verify-session?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setValid(data.valid);
          setSessionData(data.session);
          setLoading(false);

          // Clear cart after successful purchase
          if (data.valid) {
            localStorage.removeItem("cart");
          }
        })
        .catch((error) => {
          console.error("Verification error:", error);
          setLoading(false);
        });
    }
  }, [sessionId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-xl">Verifying your order...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 md:p-12"
        >
          {/* Success Icon */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-16 h-16 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Thank you for your purchase
            </p>
          </div>

          {/* Order Details */}
          {valid && sessionData && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Order Details
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Order ID:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {sessionData.id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Total Paid:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    €{(sessionData.amount_total / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Payment Method:
                  </span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">
                    {sessionData.payment_status === "paid"
                      ? "Card (Paid)"
                      : "Card"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-4">
              <Package className="w-6 h-6 text-purple-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Shipping Confirmation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  You&apos;ll receive a shipping confirmation email with
                  tracking information within 2-3 business days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-purple-500 mt-1" />
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  Order Confirmation
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  A confirmation email has been sent to your email address with
                  all order details.
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push("/merch")}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors"
            >
              Continue Shopping
            </button>
            <button
              onClick={() => router.push("/orders")}
              className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold py-4 px-6 rounded-xl transition-colors"
            >
              View My Orders
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
