"use client";

import { useState, useEffect } from "react";
import { upgradePlan } from "@/lib/auth";

type Props = {
  onClose: () => void;
  onUpgrade: () => void;
};

const plans = [
  {
    id: "single",
    name: "Single Report",
    price: "$4.99",
    period: "one-time",
    reports: "1 additional report",
    features: ["Full 5-pillar breakdown", "Media coverage analysis", "Score calculation detail", "PDF export"],
    accent: "border-blue-500",
    btn: "bg-blue-600 hover:bg-blue-700",
  },
  {
    id: "starter",
    name: "Starter",
    price: "$9.99",
    period: "/month",
    reports: "5 reports per month",
    features: ["Everything in Single", "5 reports per month", "Priority processing", "Compare companies"],
    popular: true,
    accent: "border-green-500",
    btn: "bg-green-600 hover:bg-green-700",
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19.99",
    period: "/month",
    reports: "20 reports per month",
    features: ["Everything in Starter", "20 reports per month", "API access", "Custom alerts", "Dedicated support"],
    accent: "border-purple-500",
    btn: "bg-purple-600 hover:bg-purple-700",
  },
];

export default function PricingModal({ onClose, onUpgrade }: Props) {
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", handleEsc); };
  }, [onClose]);

  async function handlePurchase(planId: string) {
    setLoading(planId);
    try {
      await upgradePlan(planId);
      onUpgrade();
    } catch {
      // handle error
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-4 overflow-hidden max-h-[90vh] overflow-y-auto">
        <div className="bg-[#0a0a0a] px-6 py-5 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold">Upgrade Your Plan</h2>
              <p className="text-sm text-gray-400 mt-0.5">Choose a plan to continue generating reports.</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div key={plan.id} className={`relative border-2 rounded-xl p-5 flex flex-col ${plan.accent} ${plan.popular ? "shadow-lg" : ""}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-green-600 text-white text-xs font-bold rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-lg font-bold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black">{plan.price}</span>
                  <span className="text-sm text-gray-500">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500 mb-4">{plan.reports}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                      <svg className="w-4 h-4 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePurchase(plan.id)}
                  disabled={loading === plan.id}
                  className={`w-full py-2.5 text-white font-bold rounded-lg transition-colors text-sm disabled:opacity-50 ${plan.btn}`}
                >
                  {loading === plan.id ? "Processing..." : plan.id === "single" ? "Buy Report" : "Subscribe"}
                </button>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-6">
            Payments are simulated for demo. Connect Stripe for real payments.
          </p>
        </div>
      </div>
    </div>
  );
}
