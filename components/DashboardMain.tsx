"use client";

import { useEffect, useState } from "react";
import CoinCard from "./CoinCard";
import LoadingState from "./LoadingState";
import MarketSignals from "./MarketSignals";
import PortfolioOverview from "./PortfolioOverview";
import PerformanceTimeline from "./PerformanceTimeline";
import { CryptoData, ApiResponse } from "./types";

export default function DashboardMain() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 🌀 واکشی خودکار داده‌ها از API با Polling
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const res = await fetch("/api/crypto", { method: "POST" });
        const result: ApiResponse = await res.json();
        if (result.status === "success" && Array.isArray(result.data)) {
          setCryptoData(result.data);
        } else {
          setCryptoData([]);
          setError("❌ داده‌ای دریافت نشد.");
        }
        setLoading(false);
      } catch (e) {
        console.error("API Fetch Error:", e);
        setError("🚫 خطا در دریافت داده‌ها.");
        setLoading(false);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  // 🎛 توابع کمکی
  const parsePrice = (price: string): number =>
    parseFloat(price?.replace(/[$,]/g, "") || "0");

  const parsePercentage = (percent: string): number =>
    parseFloat(percent?.replace(/[+%]/g, "") || "0");

  const getPortfolioMetrics = () => {
    const totalMarketCap = cryptoData.reduce(
      (sum, c) => sum + parsePrice(c.marketCap),
      0
    );
    const avgVolatility =
      cryptoData.reduce(
        (sum, c) => sum + c.marketMetrics.volatilityScore,
        0
      ) / (cryptoData.length || 1);
    const avgMarketScore =
      cryptoData.reduce((sum, c) => sum + c.marketMetrics.marketScore, 0) /
      (cryptoData.length || 1);
    return { totalMarketCap, avgVolatility, avgMarketScore, coinCount: cryptoData.length };
  };

  const getPerformanceData = () => {
    if (!cryptoData[0]) return { labels: ["24h", "7d", "30d"], values: [0, 0, 0] };
    return {
      labels: ["24h", "7d", "30d"],
      values: [
        parsePercentage(cryptoData[0].priceChanges["24h"]),
        parsePercentage(cryptoData[0].priceChanges["7d"]),
        parsePercentage(cryptoData[0].priceChanges["30d"]),
      ],
    };
  };

  const metrics = getPortfolioMetrics();

  // 🌌 رابط کاربری
  return (
    <main
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
                 text-slate-100 px-6 py-8 space-y-8 font-[Vazirmatn] overflow-x-hidden
                 animate-fadeIn"
    >
      {/* ===== عنوان داشبورد ===== */}
      <header className="space-y-1 text-center ">
        <h1 className="text-3xl font-bold text-indigo-400 tracking-wide drop-shadow-lg">
          داشبورد رمزارزها
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          داده‌های زنده از بازار جهانی، هر ۳۰ ثانیه به‌روزرسانی می‌شود.
        </p>
      </header>

      {/* ===== وضعیت بارگذاری ===== */}
      {loading && <LoadingState message="در حال دریافت داده‌های بازار..." />}

      {/* ===== خطا ===== */}
      {error && (
        <div className="bg-red-800/30 border border-red-500 rounded-xl p-4 text-red-300 animate-pulse">
          <p className="font-semibold">خطا:</p>
          <p>{error}</p>
        </div>
      )}

      {/* ===== اجزای داشبورد ===== */}
      {!loading && !error && cryptoData.length > 0 && (
        <>
          {/* سیگنال‌های بازار */}
          <MarketSignals
            signals={cryptoData.map((coin) => ({
              label: coin.coin,
              strength:
                coin.analysis.signal === "BUY"
                  ? "high"
                  : coin.analysis.signal === "SELL"
                    ? "low"
                    : "medium",
              riskRating: coin.analysis.riskRating,
              volatilityScore: coin.marketMetrics.volatilityScore,
            }))}
          />

          {/* نمای کلی سبد */}
          <PortfolioOverview
            portfolioValue={metrics.totalMarketCap}
            profitPercent={metrics.avgMarketScore}
            totalCoins={metrics.coinCount}
            avgVolatility={metrics.avgVolatility}
            marketScore={metrics.avgMarketScore}
            assets={cryptoData.map((c) => ({
              name: c.coin,
              symbol: c.symbol,
              price: parsePrice(c.currentPrice),
              change: parsePercentage(c.priceChanges["24h"]),
              signal:
                c.analysis.signal === "BUY"
                  ? "high"
                  : c.analysis.signal === "SELL"
                    ? "low"
                    : "medium",
              data: [
                parsePercentage(c.priceChanges["24h"]),
                parsePercentage(c.priceChanges["7d"]),
                parsePercentage(c.priceChanges["30d"]),
              ],
            }))}
          />

          {/* عملکرد کلی بازار */}
          <PerformanceTimeline
            labels={getPerformanceData().labels}
            values={getPerformanceData().values}
          />
        </>
      )}

      {/* ===== کارت‌های کوین‌ها ===== */}
      <section
        className="
    grid 
    grid-cols-1 
    sm:grid-cols-2 
    xl:grid-cols-[auto-fit,minmax(280px,1fr)] 
    gap-6 
    pt-6 
    transition-all duration-500 ease-out
    justify-items-center
  "
      >
        {loading ? (
          <div className="col-span-full text-center text-slate-400">
            در حال واکشی داده‌ها...
          </div>
        ) : cryptoData.length > 0 ? (
          cryptoData.map((coin) => (
            <div
              key={coin.symbol}
              className="animate-slideUp"
            >
              <CoinCard
                name={coin.coin}
                symbol={coin.symbol}
                price={parsePrice(coin.currentPrice)}
                change={parsePercentage(coin.priceChanges["24h"])}
                signal={
                  coin.analysis.signal === "BUY"
                    ? "high"
                    : coin.analysis.signal === "SELL"
                      ? "low"
                      : "medium"
                }
                data={[
                  parsePercentage(coin.priceChanges["24h"]),
                  parsePercentage(coin.priceChanges["7d"]),
                  parsePercentage(coin.priceChanges["30d"]),
                ]}
              />
              {coin.symbol.toUpperCase() === "BTC" && (
                <div className="mt-3">
                  {/* MiniTrendChart */}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-slate-400">
            هیچ داده‌ای موجود نیست.
          </div>
        )}
      </section>

    </main>
  );
}

/* 🔮 انیمیشن‌های Tailwind سفارشی */
<style jsx>{`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn { animation: fadeIn .8s ease-out both; }
  .animate-slideUp { animation: slideUp 0.7s ease-in-out both; }
`}</style>
