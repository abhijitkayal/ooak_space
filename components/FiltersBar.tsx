'use client';

import React, { useState, useEffect } from 'react';
import { SlidersHorizontal, Pencil, Upload, Type, Settings, Image, Trash2, Plus } from 'lucide-react';
import { useTheme } from 'next-themes';

export default function FiltersBar() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="px-6 py-4">
        <div className="animate-pulse h-16 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>
      </div>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <div className="px-6 py-4 ">
      <div className={`flex items-center justify-between rounded-2xl p-2 border transition-colors duration-300
        ${isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-white border-rose-200'}`}>
        {/* Left Section */}
        <div className="flex items-center gap-6 pl-2">
          <button className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-colors
            ${isDark ? 'bg-[#1F2125] text-gray-300 hover:text-white' : 'bg-rose-100 text-gray-700 hover:text-gray-900'}`}>
            <SlidersHorizontal size={16} />
            <span className="text-sm font-medium">Filters</span>
            <span className={`text-xs px-2 py-0.5 rounded-full
              ${isDark ? 'bg-[#2C2E33] text-blue-400' : 'bg-blue-100 text-blue-600'}`}>6</span>
          </button>

          <div className="flex items-center gap-3">
            <span className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Color:</span>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-pink-500 cursor-pointer hover:scale-110 transition-transform"></div>
              <div className="w-6 h-6 rounded-full bg-yellow-400 cursor-pointer hover:scale-110 transition-transform"></div>
              <div className="w-6 h-6 rounded-full bg-blue-400 cursor-pointer hover:scale-110 transition-transform"></div>
              <div className="w-6 h-6 rounded-full bg-purple-500 cursor-pointer hover:scale-110 transition-transform"></div>
              <div className="w-6 h-6 rounded-full bg-green-500 cursor-pointer hover:scale-110 transition-transform"></div>
              <button className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors
                ${isDark ? 'border-gray-700 text-gray-400 hover:text-white hover:border-gray-500' : 'border-gray-400 text-gray-500 hover:text-gray-900 hover:border-gray-600'}`}>
                <Plus size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Center Section - Tools */}
        <div className={`flex items-center gap-1 p-1 rounded-xl border transition-colors
          ${isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-rose-100 border-rose-200'}`}>
          <button className={`p-2 rounded-lg transition-colors
            ${isDark ? 'text-white bg-[#2C2E33] hover:bg-gray-700' : 'text-gray-900 bg-rose-200 hover:bg-rose-300'}`}>
            <Pencil size={18} />
          </button>
          <button className={`p-2 rounded-lg transition-colors
            ${isDark ? 'text-gray-400 hover:text-white hover:bg-[#2C2E33]' : 'text-gray-600 hover:text-gray-900 hover:bg-rose-200'}`}>
            <Upload size={18} />
          </button>
          <button className={`p-2 rounded-lg transition-colors
            ${isDark ? 'text-gray-400 hover:text-white hover:bg-[#2C2E33]' : 'text-gray-400 hover:text-gray-900 hover:bg-rose-200'}`}>
            <Type size={18} />
          </button>
          <button className={`p-2 rounded-lg transition-colors
            ${isDark ? 'text-gray-400 hover:text-white hover:bg-[#2C2E33]' : 'text-gray-400 hover:text-gray-900 hover:bg-rose-200'}`}>
            <Settings size={18} />
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 pr-4">
          <button className={`flex items-center gap-2 transition-colors
            ${isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
            <Image size={18} />
            <span className="text-sm">Add Image</span>
          </button>

          <div className={`w-px h-6 ${isDark ? 'bg-gray-800' : 'bg-rose-300'}`}></div>

          <button className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors">
            <Trash2 size={18} />
            <span className="text-sm">Deleted</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ml-1
              ${isDark ? 'bg-[#2C2E33] text-red-400' : 'bg-red-100 text-red-600'}`}>4</span>
          </button>
        </div>
      </div>
    </div>
  );
}
