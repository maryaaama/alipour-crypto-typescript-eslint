"use client";

import React from "react";
import RiskBadge from "@/components/RiskBadge";
import SignalChip from "@/components/SignalChip";

interface AnalyticsCardProps {
  title: string;
  riskLevel: number; // درصد ریسک بین 0 تا 100
  signal: "low" | "medium" | "high";
  change: number; // درصد تغییر اخیر
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({
  title,
  riskLevel,
  signal,
  change,
}) => {
  return (
    <div className="w-full md:w-80 bg-slate-800 border border-slate-700 rounded-xl p-5 flex flex-col gap-4 transition-colors duration-300 hover:bg-slate-700">
      {/* عنوان کریپتو */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-indigo-400 font-[Vazirmatn]">
          {title}
        </h3>
        <SignalChip
          label={signal === "high" ? "قوی" : signal === "medium" ? "متوسط" : "ضعیف"}
          strength={signal}
        />
      </div>

      {/* درصد تغییر */}
      <div className="flex items-center justify-between">
        <span className="text-slate-400 text-sm font-[Vazirmatn]">٪ تغییر اخیر:</span>
        <span
          className={`text-sm font-bold font-[Vazirmatn] ${
            change > 0 ? "text-green-400" : change < 0 ? "text-red-400" : "text-slate-300"
          }`}
        >
          {change > 0 ? "+" : ""}
          {change.toFixed(2)}%
        </span>
      </div>

      {/* نمایش ریسک */}
      <div className="flex justify-center">
        <RiskBadge percentage={riskLevel} />
      </div>
    </div>
  );
};

export default AnalyticsCard;
