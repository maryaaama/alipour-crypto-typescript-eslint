"use client";

import React, { useEffect, useState } from "react";

interface RiskBadgeProps {
  percentage: number; // مثال: 74%
  label?: string; // مثال: "High Risk"
}

const RiskBadge: React.FC<RiskBadgeProps> = ({ percentage, label }) => {
  const [progress, setProgress] = useState(0);

  // انیمیشن نرم از 0 تا مقدار واقعی
  useEffect(() => {
    const duration = 800;
    const step = percentage / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= percentage) {
        current = percentage;
        clearInterval(timer);
      }
      setProgress(current);
    }, 16);
    return () => clearInterval(timer);
  }, [percentage]);

  const radius = 46;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4">
      {/* دایره اصلی */}
      <div className="relative w-28 h-28 md:w-32 md:h-32">
        <svg
          viewBox="0 0 120 120"
          className="w-full h-full transform -rotate-90"
        >
          {/* پس زمینه‌ی دایره */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            strokeWidth={strokeWidth}
            stroke="var(--circle-bg)"
            fill="none"
          />
          {/* حلقه‌ی انیمیشنی */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            strokeWidth={strokeWidth}
            stroke="url(#gradient)"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="none"
            style={{
              transition: "stroke-dashoffset 0.6s ease-out",
            }}
          />
          <defs>
            <linearGradient
              id="gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#6366F1" /> {/* primary */}
              <stop offset="100%" stopColor="#4F46E5" /> {/* secondary */}
            </linearGradient>
          </defs>
        </svg>

        {/* عدد وسط دایره */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-lg md:text-xl font-[Vazirmatn] font-semibold text-gray-900 dark:text-slate-100">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      {/* برچسب زیر دایره */}
      {label && (
        <span className="mt-3 text-sm md:text-base font-[Vazirmatn] text-gray-600 dark:text-slate-400">
          {label}
        </span>
      )}
    </div>
  );
};

export default RiskBadge;
