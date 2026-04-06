import React from 'react';
import { InsightsPanel } from '@/components/insights/InsightsPanel';

export const InsightsPage: React.FC = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Deep Insights</h1>
        <p className="text-muted-foreground mt-1">AI-generated analysis of your financial health and spending patterns.</p>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border p-8 max-w-4xl mx-auto animate-slide-up">
        <InsightsPanel />
      </div>
    </div>
  );
};
