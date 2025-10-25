"use client";

import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Filler,
  ChartOptions,
  ChartData,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

interface PerformanceTimelineProps {
  labels: string[];
  values: number[];
  title?: string;
}

const PerformanceTimeline: React.FC<PerformanceTimelineProps> = ({ 
  labels, 
  values, 
  title = "روند عملکرد بازار" 
}) => {
  // Calculate additional metrics
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);
  const avgValue = values.reduce((sum, val) => sum + val, 0) / values.length;
  const isPositiveTrend = values[values.length - 1] > values[0];

  // 🟢 تعریف نوع دقیق برای داده‌ها
  const data: ChartData<"line"> = {
    labels,
    datasets: [
      {
        label: "تغییر قیمت %",
        data: values,
        borderColor: isPositiveTrend ? "#10B981" : "#EF4444", // Green for positive, red for negative
        backgroundColor: isPositiveTrend ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: isPositiveTrend ? "#10B981" : "#EF4444",
        borderWidth: 2,
      },
    ],
  };

  // 🟢 تعریف نوع دقیق برای options
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#E2E8F0",
          font: {
            family: "Vazirmatn",
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: "#1E293B",
        titleColor: "#F1F5F9",
        bodyColor: "#CBD5E1",
        callbacks: {
          label: function(context) {
            const value = context.parsed.y;
            return `تغییر: ${value && value > 0 ? '+' : ''}${value?.toFixed(2) || '0'}%`;
          }
        }
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#94A3B8",
          font: { family: "Vazirmatn", size: 11 },
        },
        grid: { color: "#334155" },
      },
      y: {
        ticks: {
          color: "#94A3B8",
          font: { family: "Vazirmatn", size: 11 },
          callback: (value: any) => `${value}%`,
        },
        grid: { color: "#334155" },
      },
    },
  };

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 font-[Vazirmatn]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-indigo-400 font-semibold">{title}</h3>
        <div className={`text-sm font-medium ${
          isPositiveTrend ? "text-green-400" : "text-red-400"
        }`}>
          {isPositiveTrend ? "روند صعودی" : "روند نزولی"}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-4 text-center">
        <div className="bg-slate-700 rounded-lg p-3">
          <div className="text-slate-400 text-xs">حداکثر</div>
          <div className={`font-semibold ${maxValue > 0 ? "text-green-400" : "text-red-400"}`}>
            {maxValue > 0 ? '+' : ''}{maxValue.toFixed(2)}%
          </div>
        </div>
        <div className="bg-slate-700 rounded-lg p-3">
          <div className="text-slate-400 text-xs">میانگین</div>
          <div className={`font-semibold ${avgValue > 0 ? "text-green-400" : "text-red-400"}`}>
            {avgValue > 0 ? '+' : ''}{avgValue.toFixed(2)}%
          </div>
        </div>
        <div className="bg-slate-700 rounded-lg p-3">
          <div className="text-slate-400 text-xs">حداقل</div>
          <div className={`font-semibold ${minValue > 0 ? "text-green-400" : "text-red-400"}`}>
            {minValue > 0 ? '+' : ''}{minValue.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <Line data={data} options={options} />
      </div>

      {/* Trend Analysis */}
      <div className="mt-4 p-3 bg-slate-700 rounded-lg">
        <h4 className="text-slate-300 font-medium mb-2">تحلیل روند:</h4>
        <div className="text-slate-400 text-sm">
          <p>• تغییر کلی: {values[values.length - 1] > 0 ? '+' : ''}{values[values.length - 1].toFixed(2)}%</p>
          <p>• دامنه نوسان: {(maxValue - minValue).toFixed(2)}%</p>
          <p>• وضعیت: {isPositiveTrend ? "بهبود عملکرد" : "کاهش عملکرد"}</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceTimeline;
