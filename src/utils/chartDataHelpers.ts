import type { Transaction } from '../types';

export const getBalanceTrendData = (transactions: Transaction[]) => {
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toISOString().split('T')[0];
  });

  let runningBalance = 0;
  const data = last30Days.map((dateStr) => {
    const dayTransactions = transactions.filter(
      (t) => new Date(t.date).toISOString().split('T')[0] === dateStr
    );

    dayTransactions.forEach((t) => {
      runningBalance += t.type === 'income' ? t.amount : -t.amount;
    });

    return {
      date: dateStr,
      balance: runningBalance,
    };
  });

  return {
    labels: last30Days.map((d) => {
      const date = new Date(d);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }),
    datasets: [
      {
        label: 'Balance',
        data: data.map((d) => d.balance),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 2,
        pointHoverRadius: 6,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
      },
    ],
  };
};

export const getSpendingByCategoryData = (transactions: Transaction[]) => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  
  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const sortedCategories = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);

  // Diverse, accessible color palette
  const colors = [
    '#6366F1', // Indigo
    '#EC4899', // Pink
    '#F59E0B', // Amber
    '#10B981', // Emerald
    '#3B82F6', // Blue
    '#EF4444', // Red
    '#8B5CF6', // Violet
    '#14B8A6', // Teal
    '#F97316', // Orange
    '#06B6D4', // Cyan
    '#84CC16', // Lime
    '#E11D48', // Rose
  ];

  return {
    labels: sortedCategories.map(([category]) => category),
    datasets: [
      {
        data: sortedCategories.map(([, amount]) => amount),
        backgroundColor: colors.slice(0, sortedCategories.length),
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        hoverOffset: 8,
      },
    ],
  };
};
