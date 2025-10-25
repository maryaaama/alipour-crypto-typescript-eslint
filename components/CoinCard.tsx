"use client";

import React from "react";
import SignalChip from "@/components/SignalChip";
import MiniTrendChart from "@/components/MiniTrendChart";
import RiskBadge from "@/components/RiskBadge";

interface CryptoData {
  coin: string;
  symbol: string;
  currentPrice: string;
  marketCap: string;
  volume24h: string;
  priceChanges: {
    "24h": string;
    "7d": string;
    "30d": string;
  };
  marketMetrics: {
    volatilityScore: number;
    marketCapToVolumeRatio: number;
    priceToAthRatio: number;
    marketScore: number;
  };
  analysis: {
    priceAction: string;
    signal: string;
    riskRating: string;
    recommendation: string;
    investmentStrategy: string;
  };
  timestamp: string;
}

interface CoinCardProps {
  name: string;
  symbol: string;
  price?: number;      // 🔸 در لحظه اولیه ممکن است نال باشد → موقتاً optional
  change?: number;     // 🔸 برای جلوگیری از خطای undefined
  signal: "low" | "medium" | "high";
  data?: number[];
}

const CoinCard: React.FC<CoinCardProps> = ({
  name,
  symbol,
  price,
  change,
  signal,
  data,
}) => {
  // 🛡 بررسی داده‌های ورودی برای جلوگیری از خطا هنگام رندر اولیه
  const safePrice =
    typeof price === "number" && !isNaN(price) ? price : 0;

  const safeChange =
    typeof change === "number" && !isNaN(change) ? change : 0;

  const safeData =
    Array.isArray(data) && data.length > 0 ? data : [0, 0, 0];

  const changeColor =
    safeChange > 0
      ? "text-green-400"
      : safeChange < 0
        ? "text-red-400"
        : "text-slate-300";

  return (
    <div
      className="bg-slate-800/80 border border-slate-700 rounded-xl 
             p-6 flex flex-col gap-6 
             w-96 sm:w-[480px] 
             hover:bg-slate-700 transition-colors duration-300 
             backdrop-blur font-[Vazirmatn]"
    >


      {/* 🔹 عنوان و سیگنال */}
      <div className="flex items-center justify-between">
        <h4 className="text-indigo-400 text-base sm:text-lg font-bold truncate">
          {name || "—"}
        </h4>
        <SignalChip label={symbol?.toUpperCase() || "UNK"} strength={signal} />
      </div>

      {/* 🔹 قیمت فعلی و تغییر درصدی */}
      <div className="flex items-center justify-between text-sm sm:text-base">
        <span className="text-slate-400">قیمت فعلی:</span>
        <span className={`font-semibold ${changeColor}`}>
          ${safePrice.toLocaleString("en-US")} {`(${safeChange >= 0 ? "+" : ""}${safeChange}%)`}
        </span>
      </div>

      {/* 🔹 نمودار کوتاه‌مدت روند */}
      <div className="h-20 sm:h-24 md:h-28">
        <MiniTrendChart data={safeData} />
      </div>
    </div>
  );
};

export default CoinCard;
