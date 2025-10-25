"use client";

import React from "react";
import CoinCard from "@/components/CoinCard";
import RiskBadge from "@/components/RiskBadge";

interface PortfolioOverviewProps {
  portfolioValue: number;
  profitPercent: number;
  assets: Array<{
    name: string;
    symbol: string;
    price: number;
    change: number;
    signal: "low" | "medium" | "high";
    data: number[];
  }>;
  totalCoins?: number;
  avgVolatility?: number;
  marketScore?: number;
}

const PortfolioOverview: React.FC<PortfolioOverviewProps> = ({
  portfolioValue,
  profitPercent,
  assets,
  totalCoins = 0,
  avgVolatility = 0,
  marketScore = 0,
}) => {
  // Calculate additional metrics
  const totalVolume = assets.reduce((sum, asset) => sum + (asset.price * 1000), 0); // Simplified calculation
  const positiveAssets = assets.filter(asset => asset.change > 0).length;
  const negativeAssets = assets.filter(asset => asset.change < 0).length;
  const avgChange = assets.length > 0 ? assets.reduce((sum, asset) => sum + asset.change, 0) / assets.length : 0;

  return (
    <section className="bg-slate-900 rounded-xl p-6 border border-slate-700 font-[Vazirmatn] flex flex-col gap-6 w-full">
      {/* عنوان بخش */}
      <header className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-indigo-400 font-semibold text-lg">خلاصه سبد دارایی</h2>
          <p className="text-slate-400 text-sm mt-1">آخرین وضعیت سرمایه شما</p>
        </div>
        <RiskBadge percentage={Math.abs(avgVolatility)} label="نوسان کلی" />
      </header>

      {/* بخش ارزش کلی */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <div className="flex items-center justify-between mb-3">
          <span className="text-slate-300">ارزش فعلی کل:</span>
          <span
            className={`text-xl font-bold ${
              profitPercent > 0 ? "text-green-400" : profitPercent < 0 ? "text-red-400" : "text-slate-300"
            }`}
          >
            ${portfolioValue.toLocaleString()} ({profitPercent > 0 ? "+" : ""}{profitPercent.toFixed(2)}%)
          </span>
        </div>
        
        {/* Additional metrics */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-400">تعداد کوین‌ها:</span>
            <span className="text-slate-300">{totalCoins}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">حجم کل:</span>
            <span className="text-slate-300">${totalVolume.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Market Performance Summary */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 className="text-indigo-300 font-medium mb-3">عملکرد بازار</h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="text-green-400 font-semibold text-lg">{positiveAssets}</div>
            <div className="text-slate-400 text-sm">صعودی</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-3">
            <div className="text-red-400 font-semibold text-lg">{negativeAssets}</div>
            <div className="text-slate-400 text-sm">نزولی</div>
          </div>
          <div className="bg-slate-700 rounded-lg p-3">
            <div className={`font-semibold text-lg ${avgChange > 0 ? "text-green-400" : "text-red-400"}`}>
              {avgChange > 0 ? "+" : ""}{avgChange.toFixed(2)}%
            </div>
            <div className="text-slate-400 text-sm">میانگین</div>
          </div>
        </div>
      </div>

      {/* Market Metrics */}
      <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
        <h3 className="text-indigo-300 font-medium mb-3">معیارهای بازار</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="text-slate-400">امتیاز بازار:</span>
            <span className="text-slate-300">{marketScore.toFixed(1)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">نوسان متوسط:</span>
            <span className="text-slate-300">{avgVolatility.toFixed(1)}%</span>
          </div>
        </div>
      </div>

      {/* فهرست کوین‌ها */}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {assets.map((coin, index) => (
          <div key={index} className="bg-slate-800 rounded-lg p-4 border border-slate-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-indigo-400 font-semibold">{coin.name}</h4>
              <span className="text-slate-400 text-sm">{coin.symbol}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">قیمت:</span>
              <span className="text-slate-300 font-medium">${coin.price.toLocaleString()}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm">تغییر:</span>
              <span className={`font-medium ${
                coin.change > 0 ? "text-green-400" : coin.change < 0 ? "text-red-400" : "text-slate-300"
              }`}>
                {coin.change > 0 ? "+" : ""}{coin.change.toFixed(2)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioOverview;
