"use client";

import React from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const LoadingState: React.FC<{ message?: string }> = ({ message = "در حال بارگذاری..." }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-10 text-slate-300">
      <ArrowPathIcon className="w-8 h-8 text-indigo-400 animate-spin mb-3" />
      <p className="font-[Vazirmatn] text-sm">{message}</p>
    </div>
  );
};

export default LoadingState;
