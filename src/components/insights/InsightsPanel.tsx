import React from 'react';
import { Card } from '../common/Card';
import { useTransactions } from '../../hooks/useTransactions';
import {
  getHighestSpendingCategory,
  getMonthOverMonthComparison,
  getAverageDailySpending,
  getSavingsRate,
} from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';

export const InsightsPanel: React.FC = () => {
  const { transactions } = useTransactions();

  const highestSpending = getHighestSpendingCategory(transactions);
  const momComparison = getMonthOverMonthComparison(transactions);
  const avgDailySpending = getAverageDailySpending(transactions);
  const savingsRate = getSavingsRate(transactions);

  const insights = [
    {
      title: 'Highest Spending Category',
      value: highestSpending
        ? `${highestSpending.category}: ${formatCurrency(highestSpending.amount)}`
        : 'No expenses yet',
      description: 'Category with the most spending',
      icon: (
        <svg style={{ width: 24, height: 24 }} className="text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      title: 'Month-over-Month Change',
      value: `${momComparison.change >= 0 ? '+' : ''}${momComparison.change.toFixed(1)}%`,
      description: 'Spending compared to last month',
      trend: momComparison.change > 0 ? 'up' : momComparison.change < 0 ? 'down' : 'neutral',
      icon: (
        <svg style={{ width: 24, height: 24 }} className="text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: 'Average Daily Spending',
      value: formatCurrency(avgDailySpending),
      description: 'Daily average across all transactions',
      icon: (
        <svg style={{ width: 24, height: 24 }} className="text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      description: 'Percentage of income saved',
      trend: savingsRate > 20 ? 'up' : savingsRate > 0 ? 'neutral' : 'down',
      icon: (
        <svg style={{ width: 24, height: 24 }} className="text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-red-600';
      case 'down':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      {insights.map((insight, index) => (
        <Card
          key={insight.title}
          className="hover:shadow-lg transition-all duration-300 animate-slide-up"
        >
          <div className="flex items-start" style={{ animationDelay: `${index * 80}ms` }}>
            <div className="flex-shrink-0 p-2 bg-gray-50 rounded-lg">
              {insight.icon}
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-medium text-gray-600">{insight.title}</p>
              <p className={`text-lg font-bold ${insight.trend ? getTrendColor(insight.trend) : 'text-gray-900'}`}>
                {insight.value}
              </p>
              <p className="text-xs text-gray-500 mt-1">{insight.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
