import React from 'react';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { BalanceTrendChart } from '@/components/dashboard/BalanceTrendChart';
import { SpendingCategoryChart } from '@/components/dashboard/SpendingCategoryChart';
import { InsightsPanel } from '@/components/insights/InsightsPanel';

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-2">Here's a snapshot of your financial health.</p>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="animate-fade-in">
            <BalanceTrendChart />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <SpendingCategoryChart />
          </div>
        </div>
        <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-foreground">AI Financial Insights</h2>
          </div>
          <InsightsPanel />
        </div>
      </div>
    </div>
  );
};
