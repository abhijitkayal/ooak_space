'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import AppShell from '@/components/AppShell';
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    Plus,
    Clock,
    User,
    MapPin,
    ListChecks
} from 'lucide-react';

// --- Mock Data ---
const mockEvents = [
    { time: '09:00', title: 'Daily Standup', location: 'Zoom', color: 'bg-teal-500' },
    { time: '11:00', title: 'Design Review: V3 Mockups', location: 'Office Room 101', color: 'bg-rose-500' },
    { time: '14:30', title: 'Client Sync-Up (High Priority)', location: 'Google Meet', color: 'bg-indigo-500' },
    { time: '16:00', title: 'Focus Time (No interruptions)', location: 'Home', color: 'bg-gray-500' },
];

const mockDays = [
    { day: 'Mon', date: 2, isCurrent: false },
    { day: 'Tue', date: 3, isCurrent: false },
    { day: 'Wed', date: 4, isCurrent: false },
    { day: 'Thu', date: 5, isCurrent: true }, // Today
    { day: 'Fri', date: 6, isCurrent: false },
    { day: 'Sat', date: 7, isCurrent: false },
    { day: 'Sun', date: 8, isCurrent: false },
];

// --- Event Card Component ---
const EventCard: React.FC<any> = ({ event, isDark }) => {
    const cardBg = isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-white border-rose-100';
    const textMuted = isDark ? 'text-gray-400' : 'text-gray-600';

    return (
        <div className={`p-4 rounded-xl border-l-4 ${event.color} ${cardBg} transition-shadow hover:shadow-lg`}>
            <div className="flex justify-between items-start">
                <h4 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{event.title}</h4>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full text-white`} style={{ backgroundColor: event.color.replace('bg-', '') }}>
                    {event.time}
                </span>
            </div>
            
            <div className={`flex items-center gap-3 mt-2 text-xs ${textMuted}`}>
                <div className="flex items-center gap-1">
                    <MapPin size={14} />
                    <span>{event.location}</span>
                </div>
            </div>
        </div>
    );
};

// --- Calendar Sidebar Component (Upcoming Events) ---
const CalendarSidebar: React.FC<any> = ({ isDark }) => {
    const cardBg = isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-white border-rose-100';
    const textPrimary = isDark ? 'text-white' : 'text-gray-900';
    const textMuted = isDark ? 'text-gray-400' : 'text-gray-600';

    return (
        <div className={`w-[300px] shrink-0 p-6 rounded-3xl border ${cardBg} h-full sticky top-8 space-y-6`}>
            <h3 className={`text-xl font-bold ${textPrimary}`}>Today's Agenda</h3>

            {/* Events List */}
            <div className="space-y-4">
                {mockEvents.map((event, index) => (
                    <div key={index} className="flex gap-3 items-start">
                        <span className={`text-sm font-semibold mt-1 ${textMuted}`}>{event.time}</span>
                        <div className="flex-1">
                            <h4 className={`text-sm font-semibold ${textPrimary}`}>{event.title}</h4>
                            <p className={`text-xs ${textMuted}`}>{event.location}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-dashed">
                <h4 className={`font-semibold mb-3 ${textPrimary}`}>Quick Actions</h4>
                <button className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm rounded-xl text-white font-semibold bg-rose-600 hover:bg-rose-500 transition-colors shadow-md">
                    <Plus size={16} /> New Event
                </button>
            </div>
        </div>
    );
};

// --- Main Schedule View Component ---
export function ScheduleView() {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === 'dark';
    const containerBg = isDark ? 'bg-slate-950' : 'bg-teal-50';
    const weekDayBg = isDark ? 'bg-[#1F2125]' : 'bg-white';
    const timeLineColor = isDark ? 'border-gray-800' : 'border-rose-100';
    const hourLineColor = isDark ? 'border-gray-700' : 'border-gray-200';

    // Generate time slots (8 AM to 6 PM)
    const timeSlots = [];
    for (let i = 8; i <= 18; i++) {
        timeSlots.push(`${i.toString().padStart(2, '0')}:00`);
    }

    return (
        <div className={`flex-1 p-8 transition-colors ${containerBg} flex gap-8`}>
            {/* Main Calendar Content (Day/Week View Simulation) */}
            <div className="grow">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className={`text-3xl font-bold flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        <Calendar size={32} className="text-teal-500" /> My Schedule
                    </h1>
                    
                    {/* Navigation */}
                    <div className={`flex items-center border rounded-xl p-1 shadow-sm ${isDark ? 'border-gray-800' : 'border-rose-100'}`}>
                        <button className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                            <ChevronLeft size={20} />
                        </button>
                        <span className={`px-4 text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            December 2025
                        </span>
                        <button className={`p-2 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Weekday Headers */}
                <div className={`grid grid-cols-8 sticky top-0 z-10 ${weekDayBg} border-b ${timeLineColor} rounded-t-xl shadow-md`}>
                    {/* Empty corner for Time Column */}
                    <div className={`h-12 border-r ${timeLineColor}`}></div> 
                    {/* Days of the Week */}
                    {mockDays.map((d, index) => (
                        <div key={index} className={`flex flex-col items-center justify-center p-2 h-12 border-r ${timeLineColor} last:border-r-0`}>
                            <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{d.day}</span>
                            <span className={`text-sm font-bold ${d.isCurrent ? 'text-rose-600 bg-rose-100 dark:bg-rose-800/50 p-1 rounded-full' : (isDark ? 'text-white' : 'text-gray-900')}`}>{d.date}</span>
                        </div>
                    ))}
                </div>

                {/* Calendar Grid - Time & Events */}
                <div className="relative border-x border-b rounded-b-xl overflow-hidden" style={{ height: 'calc(100vh - 250px)' }}>
                    {timeSlots.map((time, index) => (
                        <div key={index} className={`grid grid-cols-8 h-20 border-b ${hourLineColor} last:border-b-0`}>
                            {/* Time Column */}
                            <div className={`flex justify-end pr-3 pt-1 text-xs font-semibold ${isDark ? 'text-gray-500' : 'text-gray-700'} border-r ${timeLineColor}`}>
                                {time.slice(0, 5)}
                            </div>
                            {/* Daily Columns */}
                            <div className={`col-span-7 grid grid-cols-7`}>
                                {mockDays.map((d, dayIndex) => (
                                    <div key={dayIndex} className={`h-full border-r ${timeLineColor} transition-colors ${d.isCurrent ? (isDark ? 'bg-gray-900/10' : 'bg-rose-50') : ''}`}>
                                        {/* Placeholder for events. A more complex system would absolutely position events here. */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Simulation of a Today Marker Line */}
                    <div className="absolute left-0 right-0 h-0.5 bg-red-500 z-20" style={{ top: 'calc(100% * 0.25)' }}>
                        <div className="absolute -left-1.5 -top-1.5 w-3 h-3 rounded-full bg-red-500"></div>
                    </div>
                </div>
            </div>

            {/* Sidebar for Today's Events and Quick Actions */}
            <CalendarSidebar isDark={isDark} />
        </div>
    );
}

// Default export for the /schedule route
export default function Page() {
    return (
        <AppShell defaultView="Schedule" activeMenu="schedule">
            <ScheduleView />
        </AppShell>
    );
}