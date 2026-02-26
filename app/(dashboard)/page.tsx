"use client";

import { useState, useEffect } from "react";
import { SpinnerFullscreen } from "@/components/ui/spinner";

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading dashboard data
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SpinnerFullscreen text="Loading dashboard..." />;
  }

  return <div className="text-2xl font-bold">Dashboard</div>;
}
