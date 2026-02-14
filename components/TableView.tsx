'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { MoreHorizontal, ChevronDown, CheckCircle2, Circle, AlertCircle } from 'lucide-react';

// --- Type Definitions ---
interface TableTask {
      id: string;
      title: string;
      status: 'Done' | 'In Progress' | 'Todo' | 'Backlog';
      priority: 'High' | 'Medium' | 'Low';
      dueDate: string;
      assignee: string;
      assigneeAvatar: string;
}

const tasks: TableTask[] = [
      {
            id: '1',
            title: 'Design System Team Meeting',
            status: 'Done',
            priority: 'High',
            dueDate: 'Oct 24, 2023',
            assignee: 'Sarah',
            assigneeAvatar: 'bg-pink-500'
      },
      {
            id: '2',
            title: 'Wireframe SmartHome App',
            status: 'In Progress',
            priority: 'High',
            dueDate: 'Oct 25, 2023',
            assignee: 'Mike',
            assigneeAvatar: 'bg-blue-500'
      },
      {
            id: '3',
            title: '3d Design Orzano Cotton',
            status: 'Todo',
            priority: 'Medium',
            dueDate: 'Oct 26, 2023',
            assignee: 'Anna',
            assigneeAvatar: 'bg-purple-500'
      },
      {
            id: '4',
            title: 'Redesign Edu Web',
            status: 'Backlog',
            priority: 'Low',
            dueDate: 'Oct 28, 2023',
            assignee: 'Tom',
            assigneeAvatar: 'bg-green-500'
      },
      {
            id: '5',
            title: 'Competitor Analysis',
            status: 'In Progress',
            priority: 'Medium',
            dueDate: 'Nov 01, 2023',
            assignee: 'Sarah',
            assigneeAvatar: 'bg-pink-500'
      },
      {
            id: '6',
            title: 'User Testing Session',
            status: 'Todo',
            priority: 'High',
            dueDate: 'Nov 05, 2023',
            assignee: 'Mike',
            assigneeAvatar: 'bg-blue-500'
      }
];

export default function TableView() {
      const { resolvedTheme } = useTheme();
      const isDark = resolvedTheme === 'dark';

      const getStatusColor = (status: string) => {
            switch (status) {
                  case 'Done': return isDark ? 'bg-green-500/20 text-green-400' : 'bg-green-100 text-green-700';
                  case 'In Progress': return isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-100 text-blue-700';
                  case 'Todo': return isDark ? 'bg-yellow-500/20 text-yellow-400' : 'bg-yellow-100 text-yellow-700';
                  case 'Backlog': return isDark ? 'bg-gray-500/20 text-gray-400' : 'bg-gray-100 text-gray-700';
                  default: return 'bg-gray-100 text-gray-700';
            }
      };

      const getPriorityColor = (priority: string) => {
            switch (priority) {
                  case 'High': return isDark ? 'text-red-400' : 'text-red-600';
                  case 'Medium': return isDark ? 'text-yellow-400' : 'text-yellow-600';
                  case 'Low': return isDark ? 'text-blue-400' : 'text-blue-600';
                  default: return 'text-gray-500';
            }
      };

      const getPriorityIcon = (priority: string) => {
            switch (priority) {
                  case 'High': return <AlertCircle size={14} />;
                  case 'Medium': return <Circle size={14} className="fill-current" />;
                  case 'Low': return <ChevronDown size={14} />;
                  default: return null;
            }
      };

      return (
            <div className="flex-1 overflow-hidden flex flex-col h-full p-6">
                  <div className={`rounded-2xl border overflow-hidden flex-1 flex flex-col ${isDark ? 'bg-[#1F2125] border-gray-800' : 'bg-white border-rose-100'}`}>
                        {/* Table Header */}
                        <div className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr_50px] gap-4 px-6 py-3 border-b text-xs font-medium ${isDark ? 'bg-[#2C2E33] border-gray-800 text-gray-400' : 'bg-rose-50/50 border-rose-100 text-gray-500'}`}>
                              <div>Task Name</div>
                              <div>Status</div>
                              <div>Due Date</div>
                              <div>Priority</div>
                              <div>Assignee</div>
                              <div></div>
                        </div>

                        {/* Table Body */}
                        <div className="overflow-y-auto flex-1">
                              {tasks.map((task) => (
                                    <div
                                          key={task.id}
                                          className={`grid grid-cols-[2fr_1fr_1fr_1fr_1fr_50px] gap-4 px-6 py-4 border-b last:border-b-0 items-center text-sm transition-colors hover:bg-opacity-50
                                ${isDark ? 'border-gray-800 hover:bg-gray-800/30' : 'border-rose-50 hover:bg-rose-50/30'}
                            `}
                                    >
                                          <div className={`font-medium ${isDark ? 'text-gray-200' : 'text-gray-900'}`}>{task.title}</div>

                                          <div>
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1.5 ${getStatusColor(task.status)}`}>
                                                      {task.status === 'Done' && <CheckCircle2 size={12} />}
                                                      {task.status === 'In Progress' && <Circle size={12} className="fill-current opacity-50" />}
                                                      {task.status === 'Todo' && <Circle size={12} />}
                                                      {task.status === 'Backlog' && <Circle size={12} className="border-dashed" />}
                                                      {task.status}
                                                </span>
                                          </div>

                                          <div className={isDark ? 'text-gray-400' : 'text-gray-600'}>{task.dueDate}</div>

                                          <div className={`flex items-center gap-1.5 ${getPriorityColor(task.priority)}`}>
                                                {getPriorityIcon(task.priority)}
                                                <span>{task.priority}</span>
                                          </div>

                                          <div className="flex items-center gap-2">
                                                <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] text-white ${task.assigneeAvatar} ${isDark ? 'border-[#1F2125]' : 'border-white'}`}>
                                                      {task.assignee.charAt(0)}
                                                </div>
                                                <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{task.assignee}</span>
                                          </div>

                                          <div className="flex justify-end">
                                                <button className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-gray-700 text-gray-500' : 'hover:bg-gray-100 text-gray-400'}`}>
                                                      <MoreHorizontal size={16} />
                                                </button>
                                          </div>
                                    </div>
                              ))}
                        </div>
                  </div>
            </div>
      );
}
