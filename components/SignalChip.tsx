"use client";

import React from "react";
import clsx from "clsx";

interface SignalChipProps {
  label: string;
  strength?: "low" | "medium" | "high";
}

const SignalChip: React.FC<SignalChipProps> = ({ label, strength = "medium" }) => {
  const baseStyle =
    "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-[Vazirmatn] transition-all duration-500 border select-none";
  
  const strengthStyles = {
    low: "text-slate-400 border-slate-600 bg-slate-800 hover:bg-slate-700",
    medium: "text-indigo-300 border-indigo-500 bg-slate-800 hover:bg-slate-700",
    high: "text-indigo-100 border-indigo-400 bg-indigo-600 hover:bg-indigo-500",
  };

  return (
    <span className={clsx(baseStyle, strengthStyles[strength])}>
      <div
        className={clsx(
          "w-2.5 h-2.5 rounded-full mr-2 transition-transform duration-700",
          strength === "low" && "bg-slate-500 scale-90",
          strength === "medium" && "bg-indigo-400 scale-100",
          strength === "high" && "bg-indigo-300 scale-110 animate-pulse"
        )}
      ></div>
      {label}
    </span>
  );
};

export default SignalChip;
