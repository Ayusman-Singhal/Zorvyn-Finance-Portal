import React from 'react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useTransactions } from '@/hooks/useTransactions';
import {
  getHighestSpendingCategory,
  getMonthOverMonthComparison,
  getAverageDailySpending,
  getSavingsRate,
} from '@/utils/calculations';
import { formatCurrency } from '@/utils/formatters';
import { TrendingUp, AlertTriangle, LightbulbIcon, ArrowUpRight, Target } from 'lucide-react';

export const InsightsPanel: React.FC = () => {
  const { transactions } = useTransactions();
  
  const highestSpending = getHighestSpendingCategory(transactions);
  const momComparison = getMonthOverMonthComparison(transactions);
  const avgDailySpending = getAverageDailySpending(transactions);
  const savingsRate = getSavingsRate(transactions);

  const insights = [
    {
      id: '1',
      title: 'Highest Spending Category',
      description: highestSpending 
        ? `${highestSpending.category}: ${formatCurrency(highestSpending.amount)}`
        : 'No expenses yet',
      type: 'warning'
    },
    {
      id: '2',
      title: 'Month-over-Month Change',
      description: `${momComparison.change >= 0 ? '+' : ''}${Math.abs(momComparison.change).toFixed(1)}% compared to last month`,
      type: momComparison.change > 0 ? 'warning' : momComparison.change < 0 ? 'success' : 'info'
    },
    {
      id: '3',
      title: 'Average Daily Spending',
      description: formatCurrency(avgDailySpending),
      type: 'info'
    },
    {
      id: '4',
      title: 'Savings Rate',
      description: `${savingsRate.toFixed(1)}% of income saved`,
      type: savingsRate > 20 ? 'success' : savingsRate > 0 ? 'info' : 'warning'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={20} className="text-destructive" />;
      case 'success':
        return <ArrowUpRight size={20} className="text-primary" />;
      case 'trend':
        return <TrendingUp size={20} className="text-blue-500" />;
      case 'info':
      default:
        return <LightbulbIcon size={20} className="text-yellow-500" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-destructive/10';
      case 'success':
        return 'bg-primary/10';
      case 'trend':
        return 'bg-blue-50';
      case 'info':
      default:
        return 'bg-yellow-50';
    }
  };

  if (insights.length === 0) {
    return (
      <Card className="animate-fade-in border-border shadow-sm">
        <CardContent className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground h-full min-h-[300px]">
          <Target size={48} className="mb-4 opacity-20" />
          <p>Not enough data to generate insights.</p>
          <p className="text-sm mt-1">Add more transactions to see trends.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-full border-border shadow-sm">
      <CardHeader className="border-b border-border/50 pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <LightbulbIcon size={20} className="text-primary" />
          Key Observations
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          {insights.map((insight, index) => (
            <div
              key={insight.id}
              className="flex items-start p-4 rounded-xl border border-border/50 bg-card hover:bg-muted/50 transition-colors animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`flex-shrink-0 p-2 rounded-full mt-1 ${getBackgroundColor(
                  insight.type
                )}`}
              >
                {getIcon(insight.type)}
              </div>
              <div className="ml-4 flex-1">
                <h4 className="text-sm font-semibold text-foreground">
                  {insight.title}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
