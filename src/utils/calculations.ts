import type { Transaction } from '../types';

export const calculateTotalBalance = (transactions: Transaction[]): number => {
  return transactions.reduce((acc, t) => {
    return t.type === 'income' ? acc + t.amount : acc - t.amount;
  }, 0);
};

export const calculateTotalIncome = (transactions: Transaction[]): number => {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
};

export const calculateTotalExpenses = (transactions: Transaction[]): number => {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
};

export const getHighestSpendingCategory = (
  transactions: Transaction[]
): { category: string; amount: number } | null => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  if (expenses.length === 0) return null;

  const categoryTotals = expenses.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + t.amount;
    return acc;
  }, {} as Record<string, number>);

  const sorted = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1]);
  return sorted.length > 0 ? { category: sorted[0][0], amount: sorted[0][1] } : null;
};

export const getMonthOverMonthComparison = (
  transactions: Transaction[]
): { currentMonth: number; previousMonth: number; change: number } => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

  const currentMonthExpenses = transactions
    .filter(
      (t) =>
        t.type === 'expense' &&
        new Date(t.date).getMonth() === currentMonth &&
        new Date(t.date).getFullYear() === currentYear
    )
    .reduce((acc, t) => acc + t.amount, 0);

  const previousMonthExpenses = transactions
    .filter(
      (t) =>
        t.type === 'expense' &&
        new Date(t.date).getMonth() === previousMonth &&
        new Date(t.date).getFullYear() === previousYear
    )
    .reduce((acc, t) => acc + t.amount, 0);

  const change =
    previousMonthExpenses === 0
      ? 0
      : ((currentMonthExpenses - previousMonthExpenses) / previousMonthExpenses) * 100;

  return {
    currentMonth: currentMonthExpenses,
    previousMonth: previousMonthExpenses,
    change,
  };
};

export const getAverageDailySpending = (transactions: Transaction[]): number => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  if (expenses.length === 0) return 0;

  const dates = expenses.map((t) => new Date(t.date).getTime());
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);
  const days = Math.max(1, Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24)));

  const totalExpenses = expenses.reduce((acc, t) => acc + t.amount, 0);
  return totalExpenses / days;
};

export const getSavingsRate = (transactions: Transaction[]): number => {
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);
  
  if (income === 0) return 0;
  return ((income - expenses) / income) * 100;
};
