"use client";

import React from "react";
import SignalChip from "@/components/SignalChip";
import RiskBadge from "@/components/RiskBadge";

interface MarketSignal {
  label: string;
  strength: "low" | "medium" | "high";
  riskRating?: string;
  volatilityScore?: number;
}

interface MarketSignalsProps {
  signals: MarketSignal[];
}

const MarketSignals: React.FC<MarketSignalsProps> = ({ signals }) => {
  // Calculate market sentiment summary
  const buySignals = signals.filter(s => s.label === "BUY").length;
  const sellSignals = signals.filter(s => s.label === "SELL").length;
  const neutralSignals = signals.filter(s => s.label === "NEUTRAL").length;
  
  const overallSentiment = buySignals > sellSignals ? "مثبت" : 
                          sellSignals > buySignals ? "منفی" : "خنثی";
  
  const avgVolatility = signals.length > 0 ? 
    signals.reduce((sum, s) => sum + (s.volatilityScore || 0), 0) / signals.length : 0;

  return (
    <section className="bg-slate-800 rounded-xl p-5 border border-slate-700 font-[Vazirmatn]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-indigo-400">
          سیگنال‌های فعال بازار
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">وضعیت کلی:</span>
          <span className={`font-semibold ${
            overallSentiment === "مثبت" ? "text-green-400" :
            overallSentiment === "منفی" ? "text-red-400" : "text-yellow-400"
          }`}>
            {overallSentiment}
          </span>
        </div>
      </div>

      {/* Market Summary */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div className="bg-slate-700 rounded-lg p-3">
          <div className="text-green-400 font-semibold text-lg">{buySignals}</div>
          <div className="text-slate-400 text-sm">خرید</div>
        </div>
        <div className="bg-slate-700 rounded-lg p-3">
          <div className="text-red-400 font-semibold text-lg">{sellSignals}</div>
          <div className="text-slate-400 text-sm">فروش</div>
        </div>
        <div className="bg-slate-700 rounded-lg p-3">
          <div className="text-yellow-400 font-semibold text-lg">{neutralSignals}</div>
          <div className="text-slate-400 text-sm">خنثی</div>
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-slate-400 text-sm">میانگین نوسان بازار:</span>
        <RiskBadge 
          percentage={avgVolatility} 
          label={`${avgVolatility.toFixed(1)}% نوسان`}
        />
      </div>

      {/* Individual Signals */}
      <div className="flex flex-wrap gap-3">
        {signals.length === 0 ? (
          <span className="text-slate-400 text-sm">هیچ سیگنال فعالی وجود ندارد.</span>
        ) : (
          signals.map((sig, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <SignalChip label={sig.label} strength={sig.strength} />
              {sig.riskRating && (
                <span className="text-xs text-slate-500 bg-slate-700 px-2 py-1 rounded">
                  {sig.riskRating}
                </span>
              )}
            </div>
          ))
        )}
      </div>

      {/* Market Insights */}
      <div className="mt-4 p-3 bg-slate-700 rounded-lg">
        <h4 className="text-slate-300 font-medium mb-2">نکات مهم بازار:</h4>
        <ul className="text-slate-400 text-sm space-y-1">
          <li>• تعداد کل سیگنال‌ها: {signals.length}</li>
          <li>• نسبت خرید به فروش: {buySignals}:{sellSignals}</li>
          <li>• سطح ریسک کلی: {avgVolatility > 70 ? "بالا" : avgVolatility > 40 ? "متوسط" : "پایین"}</li>
        </ul>
      </div>
    </section>
  );
};

export default MarketSignals;
