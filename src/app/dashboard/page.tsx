"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { RevenueChart } from "@/components/dashboard/charts/revenue-chart";
import { ServicesChart } from "@/components/dashboard/charts/services-chart";
import { OrdersChart } from "@/components/dashboard/charts/orders-chart";
import { WeeklyChart } from "@/components/dashboard/charts/weekly-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Onboarding } from "@/components/dashboard/onboarding";

export default function DashboardPage() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem("onboarding-done");
    if (!done) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem("onboarding-done", "true");
    setShowOnboarding(false);
  };

  return (
    <>
      <AnimatePresence>
        {showOnboarding && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
      </AnimatePresence>

      <motion.div
        className="space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Title */}
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Visão geral do seu gabinete e indicadores principais.
          </p>
        </div>

        {/* Stats */}
        <StatsCards />

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
          <RevenueChart />
          <ServicesChart />
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
          <OrdersChart />
          <WeeklyChart />
        </div>

        {/* Recent Activity */}
        <RecentActivity />
      </motion.div>
    </>
  );
}
