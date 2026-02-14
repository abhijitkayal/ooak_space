'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Layout, Search, Users, FileText, Plus, Zap, Star, Columns } from 'lucide-react';

// Mock Data matching the image but with unique colors
const mockTemplates = [
      {
            id: 1,
            name: 'SaaS Launch Checklist',
            description: 'Everything you need to launch a software product.',
            type: 'Project',
            users: 5,
            rating: 4.8,
            themeColor: '#008f7a', // Teal
            icon: Layout
      },
      {
            id: 2,
            name: 'Daily Standup Agenda',
            description: 'Simple template for daily team meetings.',
            type: 'Task',
            users: 12,
            rating: 4.5,
            themeColor: '#4f46e5', // Indigo
            icon: FileText
      },
      {
            id: 3,
            name: 'Marketing Campaign Planner',
            description: 'Kanban board template for managing campaigns.',
            type: 'Project',
            users: 8,
            rating: 4.9,
            themeColor: '#f59e0b', // Amber/Orange
            icon: Columns
      },
];

const TemplateCard: React.FC<{ template: any; isDark: boolean }> = ({ template, isDark }) => {
      const Icon = template.icon;
      const themeColor = template.themeColor;

      // Keep background color logic as requested
      const cardBg = isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-white border-rose-100';
      const textColor = isDark ? 'text-white' : 'text-gray-900';
      const descColor = isDark ? 'text-gray-400' : 'text-gray-600';

      // Dynamic Styles based on themeColor
      const iconContainerStyle = { backgroundColor: themeColor };
      const badgeStyle = { backgroundColor: themeColor };
      const buttonStyle = { backgroundColor: themeColor };

      const buttonClass = "w-full py-3.5 rounded-2xl text-[13px] font-bold transition-all transform active:scale-[0.98] text-white hover:opacity-90";
      const badgeClass = "flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-white";

      return (
            <div className={`p-8 rounded-[32px] border transition-all hover:shadow-2xl group cursor-pointer flex flex-col h-full ${cardBg}`}>
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-6 text-white" style={iconContainerStyle}>
                        <Icon size={24} />
                  </div>

                  <h4 className={`text-[22px] font-bold mb-3 leading-tight ${textColor}`}>{template.name}</h4>
                  <p className={`text-[14px] leading-relaxed mb-8 flex-grow font-medium ${descColor}`}>
                        {template.description}
                  </p>

                  <div className={`space-y-6 pt-6 border-t border-dotted ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                        {/* First row: Stats */}
                        <div className="flex items-center gap-5">
                              <div className={badgeClass} style={badgeStyle}>
                                    <Users size={14} />
                                    <span>{template.users} Used</span>
                              </div>
                              <div className="flex items-center gap-1.5 text-amber-500 font-bold text-[13px]">
                                    <Star size={16} className="fill-amber-500" />
                                    <span>{template.rating}</span>
                              </div>
                        </div>

                        {/* Second row: Action Button */}
                        <button className={buttonClass} style={buttonStyle}>
                              Use Template
                        </button>
                  </div>
            </div>
      );
};

import { motion } from 'framer-motion';

export default function TemplateView() {
      const { resolvedTheme } = useTheme();
      const isDark = resolvedTheme === 'dark';

      const pageBg = isDark ? 'bg-slate-950' : 'bg-rose-50';

      return (
            <div className={`flex-1 p-10 min-h-screen transition-colors duration-700 ${pageBg}`}>
                  {/* Title Section */}
                  <div className="flex items-center justify-between mb-10">
                        <motion.h1
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className={`text-3xl font-bold flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}
                        >
                              <div className="w-10 h-10 rounded-xl bg-[#008f7a] flex items-center justify-center">
                                    <Layout size={24} className="text-white" />
                              </div>
                              Template Library
                        </motion.h1>
                        <motion.button
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#008f7a] text-white font-bold text-sm shadow-lg shadow-teal-900/20 hover:opacity-90 transition-all"
                        >
                              <Plus size={18} />
                              Create Template
                        </motion.button>
                  </div>

                  {/* Search and Filters */}
                  <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className={`p-5 rounded-2xl mb-12 flex items-center gap-4 border ${isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-white border-rose-100'}`}
                  >
                        <div className="relative flex-grow">
                              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 ${isDark ? 'text-gray-500' : 'text-gray-600'}`} />
                              <input
                                    type="text"
                                    placeholder="Search project or task templates..."
                                    className={`w-full text-sm pl-12 pr-4 py-3 rounded-xl outline-none transition-all
                                          ${isDark ? 'bg-gray-800/50 text-white placeholder:text-gray-600 focus:ring-1 focus:ring-[#008f7a]' : 'bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:ring-1 focus:ring-teal-500'}
                                    `}
                              />
                        </div>
                        <div className="flex gap-2">
                              {['Recent', 'Popular', 'All'].map((filter, i) => (
                                    <motion.button
                                          key={filter}
                                          initial={{ opacity: 0, scale: 0.8 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: 0.3 + i * 0.1 }}
                                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all 
                                                ${filter === 'All'
                                                      ? 'bg-[#008f7a] text-white'
                                                      : isDark ? 'bg-gray-800 text-gray-400 hover:text-white' : 'bg-gray-100 text-gray-600 hover:text-gray-900'}
                                          `}
                                    >
                                          {filter}
                                    </motion.button>
                              ))}
                        </div>
                  </motion.div>

                  {/* Template Grid */}
                  <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                        {mockTemplates.map(template => (
                              <TemplateCard key={template.id} template={template} isDark={isDark} />
                        ))}
                  </motion.div>
            </div>
      );
}
