// 'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Search, Mic, Bell, Inbox, ChevronDown } from 'lucide-react';

export default function Header() {
  const { resolvedTheme } = useTheme();

  const isDark = resolvedTheme === 'dark';

  return (
    <div className={`px-6 py-4 transition-colors duration-400 border-b
      ${isDark ? 'bg-[#0F1014] border-gray-800' : 'bg-teal-50 border-teal-200'}`}>
      <div className="flex items-center justify-between flex-wrap gap-4">

        {/* Left Section - Project Info */}
        <div className="flex flex-col ml-14 gap-1">
          <div className="flex items-center   gap-3">
            <div className="w-4 h-4 rounded-full border-2 border-[#6366f1]"></div>
            <div className={`font-semibold  text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>Team Project</div>

            {/* Avatars */}
            <div className="flex -space-x-2 ml-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`w-6 h-6 rounded-full bg-gray-${i * 100 + 400} border-2 
                  ${isDark ? 'border-[#0F1014]' : 'border-rose-50'}`}></div>
              ))}
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[8px] 
                ${isDark ? 'bg-[#1F2125] border-[#0F1014] text-gray-400' : 'bg-gray-200 border-rose-50 text-gray-600'}`}>+4</div>
            </div>

            <button className={`w-6 h-6 rounded-full border border-dashed flex items-center justify-center text-xs ml-1 transition-colors
              ${isDark ? 'border-gray-600 text-gray-400 hover:text-white' : 'border-gray-400 text-gray-500 hover:text-gray-900'}`}>
              +
            </button>
          </div>

          <div className="relative pl-2 flex items-center">
            <div className={`absolute left-[7px] -top-3 w-4 h-6 border-b border-l rounded-bl-lg ${isDark ? 'border-gray-600' : 'border-gray-400'}`}></div>
            <div className={`text-sm ml-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Website / Apps / Dribbble Shot
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors
            ${isDark ? 'bg-[#18191d] border-transparent' : 'bg-white border-rose-200'}`}>
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Type to search"
              className={`bg-transparent text-sm flex-1 outline-none ${isDark ? 'text-gray-200' : 'text-gray-900'}`}
            />
            <Mic size={16} className="text-gray-400" />
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 text-gray-400">
            <button className={`cursor-pointer transition p-2 rounded-full relative
              ${isDark ? 'hover:bg-white/5 hover:text-white' : 'hover:bg-rose-200/50 hover:text-gray-900'}`}>
              <Bell size={20} />
              <div className={`absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border 
                ${isDark ? 'border-[#0F1014]' : 'border-white'}`}></div>
            </button>
            <button className={`cursor-pointer transition p-2 rounded-lg border 
              ${isDark ? 'border-gray-700 hover:bg-white/5 hover:text-white' : 'border-rose-200 hover:bg-rose-200/50 hover:text-gray-900'}`}>
              <Inbox size={20} />
            </button>

            <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border 
              ${isDark ? 'bg-[#1F2125] hover:bg-[#2a2c30] text-gray-300 border-transparent' : 'bg-white hover:bg-rose-50 text-gray-700 border-rose-200'}`}>
              Share
            </button>

            <div className={`flex items-center rounded-lg border ${isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-white border-rose-200'}`}>
              <button className={`px-3 py-2 text-sm border-r transition-colors
                ${isDark ? 'text-gray-300 hover:text-white border-gray-800' : 'text-gray-700 hover:text-gray-900 border-rose-200'}`}>Link</button>
              <button className={`px-2 py-2 transition-colors
                ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-900'}`}>
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}