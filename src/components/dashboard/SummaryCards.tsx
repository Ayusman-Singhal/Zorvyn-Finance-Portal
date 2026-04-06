import React from 'react';
import { Card } from '../common/Card';
import { useTransactions } from '../../hooks/useTransactions';
import { calculateTotalBalance, calculateTotalIncome, calculateTotalExpenses } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';

export const SummaryCards: React.FC = () => {
  const { transactions } = useTransactions();

  const totalBalance = calculateTotalBalance(transactions);
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);

  const cards = [
    {
      title: 'Total Balance',
      value: totalBalance,
      color: 'blue',
      icon: (
        <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Total Income',
      value: totalIncome,
      color: 'green',
      icon: (
        <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </svg>
      ),
    },
    {
      title: 'Total Expenses',
      value: totalExpenses,
      color: 'red',
      icon: (
        <svg style={{ width: 24, height: 24 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
        </svg>
      ),
    },
  ];

  const getColorClasses = (color: string) => {
    const classes: Record<string, { bg: string; text: string; icon: string }> = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-900', icon: 'text-blue-600' },
      green: { bg: 'bg-green-50', text: 'text-green-900', icon: 'text-green-600' },
      red: { bg: 'bg-red-50', text: 'text-red-900', icon: 'text-red-600' },
    };
    return classes[color] || classes.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => {
        const colors = getColorClasses(card.color);
        return (
          <Card
            key={card.title}
            className={`${colors.bg} animate-slide-up`}
          >
            <div className="flex items-center" style={{ animationDelay: `${index * 100}ms` }}>
              <div className={`flex-shrink-0 p-3 rounded-full ${colors.bg} ${colors.icon}`}>
                {card.icon}
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className={`text-2xl font-bold ${colors.text}`}>
                  {formatCurrency(card.value)}
                </p>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
