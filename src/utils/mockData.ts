import type { Transaction } from '../types';

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Bonus',
  'Investment',
  'Other Income',
];

export const EXPENSE_CATEGORIES = [
  'Groceries',
  'Transportation',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Dining Out',
  'Shopping',
  'Other',
];

export const ALL_CATEGORIES = [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

export const generateMockTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [
    {
      id: '1',
      date: new Date('2026-03-01'),
      amount: 5000,
      category: 'Salary',
      type: 'income',
      description: 'Monthly salary',
    },
    {
      id: '2',
      date: new Date('2026-03-03'),
      amount: 150,
      category: 'Groceries',
      type: 'expense',
      description: 'Weekly groceries',
    },
    {
      id: '3',
      date: new Date('2026-03-05'),
      amount: 50,
      category: 'Transportation',
      type: 'expense',
      description: 'Gas refill',
    },
    {
      id: '4',
      date: new Date('2026-03-08'),
      amount: 120,
      category: 'Utilities',
      type: 'expense',
      description: 'Electric bill',
    },
    {
      id: '5',
      date: new Date('2026-03-10'),
      amount: 800,
      category: 'Freelance',
      type: 'income',
      description: 'Freelance project payment',
    },
    {
      id: '6',
      date: new Date('2026-03-12'),
      amount: 85,
      category: 'Dining Out',
      type: 'expense',
      description: 'Dinner with friends',
    },
    {
      id: '7',
      date: new Date('2026-03-15'),
      amount: 200,
      category: 'Shopping',
      type: 'expense',
      description: 'Clothing purchase',
    },
    {
      id: '8',
      date: new Date('2026-03-18'),
      category: 'Entertainment',
      type: 'expense',
      amount: 45,
      description: 'Movie tickets',
    },
    {
      id: '9',
      date: new Date('2026-03-20'),
      category: 'Investment',
      type: 'income',
      amount: 150,
      description: 'Stock dividends',
    },
    {
      id: '10',
      date: new Date('2026-03-22'),
      category: 'Healthcare',
      type: 'expense',
      amount: 75,
      description: 'Pharmacy visit',
    },
    {
      id: '11',
      date: new Date('2026-03-25'),
      category: 'Groceries',
      type: 'expense',
      amount: 180,
      description: 'Monthly grocery run',
    },
    {
      id: '12',
      date: new Date('2026-03-28'),
      category: 'Utilities',
      type: 'expense',
      amount: 60,
      description: 'Internet bill',
    },
    {
      id: '13',
      date: new Date('2026-03-30'),
      category: 'Bonus',
      type: 'income',
      amount: 500,
      description: 'Performance bonus',
    },
    {
      id: '14',
      date: new Date('2026-04-01'),
      category: 'Salary',
      type: 'income',
      amount: 5000,
      description: 'Monthly salary',
    },
    {
      id: '15',
      date: new Date('2026-04-02'),
      category: 'Groceries',
      type: 'expense',
      amount: 95,
      description: 'Weekly groceries',
    },
    {
      id: '16',
      date: new Date('2026-04-04'),
      category: 'Transportation',
      type: 'expense',
      amount: 40,
      description: 'Uber rides',
    },
    {
      id: '17',
      date: new Date('2026-04-05'),
      category: 'Dining Out',
      type: 'expense',
      amount: 65,
      description: 'Lunch meeting',
    },
  ];

  return transactions;
};
