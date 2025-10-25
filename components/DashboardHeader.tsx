"use client";

import React from "react";
import { MoonIcon } from "@heroicons/react/24/solid";

const DashboardHeader: React.FC = () => {
  return (
    <header className="w-full flex items-center justify-between px-4 md:px-8 py-4 border-b border-slate-700 bg-slate-900 text-slate-100 transition-colors duration-300">
      {/* عنوان داشبورد */}
      <h1 className="text-lg md:text-xl font-[Vazirmatn] font-semibold text-slate-100">
        داشبورد تحلیل بازار کریپتو
      </h1>

      {/* آیکون ثابت حالت شب */}
      <div className="flex items-center justify-center w-10 h-10 rounded-md bg-slate-700 text-slate-100 border border-slate-600">
        <MoonIcon className="w-6 h-6 text-indigo-400" />
      </div>
    </header>
  );
};

export default DashboardHeader;
