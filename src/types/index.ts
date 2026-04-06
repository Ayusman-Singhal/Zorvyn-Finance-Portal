export type Transaction = {
  id: string;
  date: Date;
  amount: number;
  category: string;
  type: 'income' | 'expense';
  description: string;
};

export type Role = 'viewer' | 'admin';

export type FilterState = {
  searchTerm: string;
  categoryFilter: string[];
  typeFilter: 'all' | 'income' | 'expense';
  dateRange: { from: Date; to: Date } | null;
};

export type SortConfig = {
  key: keyof Transaction | null;
  direction: 'asc' | 'desc';
};

export type Insight = {
  title: string;
  value: string;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
};
