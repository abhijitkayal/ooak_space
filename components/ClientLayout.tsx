'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import CoolLoader from '@/components/Loader';
import { SpinnerFullscreen } from './ui/spinner';

interface LayoutContextType {
      view: string;
      setView: (view: string) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export function useLayout() {
      const context = useContext(LayoutContext);
      if (!context) {
            throw new Error('useLayout must be used within a ClientLayout');
      }
      return context;
}

interface ClientLayoutProps {
      children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
      const { resolvedTheme } = useTheme();
      const pathname = usePathname();
      const [mounted, setMounted] = useState(false);
      const [view, setView] = useState('Dashboard');
      const [isLoading, setIsLoading] = useState(false);

      useEffect(() => {
            setMounted(true);
      }, []);

      useEffect(() => {
            if (mounted) {
                  setIsLoading(true);
                  const timer = setTimeout(() => setIsLoading(false), 1500);
                  return () => clearTimeout(timer);
            }
      }, [pathname, mounted]);

      if (!mounted) {
            return null;
      }

      const isDark = resolvedTheme === 'dark';

      return (
            <LayoutContext.Provider value={{ view, setView }}>
                  <div className="flex h-screen bg-background text-foreground overflow-hidden">
                        <Sidebar view={view} setView={setView} />

                        <div className="flex-1 flex flex-col overflow-hidden">
                              <Header />

                              <div className={`flex-1 overflow-y-auto transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-teal-50'}`}>
                                    <AnimatePresence mode="wait">
                                          {isLoading ? (
                                                <motion.div
                                                      key="global-loader"
                                                      initial={{ opacity: 0 }}
                                                      animate={{ opacity: 1 }}
                                                      exit={{ opacity: 0 }}
                                                      transition={{ duration: 0.3 }}
                                                >
                                                      <SpinnerFullscreen />
                                                </motion.div>
                                          ) : (
                                                <motion.div
                                                      key={pathname}
                                                      initial={{ opacity: 0, y: 10 }}
                                                      animate={{ opacity: 1, y: 0 }}
                                                      transition={{ duration: 0.5 }}
                                                      className="h-full"
                                                >
                                                      {children}
                                                </motion.div>
                                          )}
                                    </AnimatePresence>
                              </div>
                        </div>
                  </div>
            </LayoutContext.Provider>
      );
}
