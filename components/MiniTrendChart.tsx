"use client";

import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip);

interface MiniTrendChartProps {
  data: number[];
  label?: string;
}

const MiniTrendChart: React.FC<MiniTrendChartProps> = ({ data, label = "روند" }) => {
  const chartData = useMemo(
    () => ({
      labels: data.map((_, i) => i.toString()),
      datasets: [
        {
          label,
          data,
          borderColor: "#6366F1", // Indigo
          backgroundColor: "rgba(99, 102, 241, 0.15)",
          tension: 0.4,
          borderWidth: 2,
          pointRadius: 0,
        },
      ],
    }),
    [data, label]
  );

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: "#1E293B",
        titleColor: "#F1F5F9",
        bodyColor: "#E2E8F0",
        borderColor: "#475569",
        borderWidth: 1,
        padding: 8,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  return (
    <div className="w-full h-24 bg-slate-800 rounded-lg border border-slate-700 p-2">
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default MiniTrendChart;
