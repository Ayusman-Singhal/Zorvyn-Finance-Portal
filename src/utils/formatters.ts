export const formatCurrency = (amount: number, locale: string = 'en-US'): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('en-US', options);
};

export const formatShortDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  });
};

export const getCategoryColor = (category: string): string => {
  const colors: Record<string, string> = {
    'Salary': '#10B981',
    'Freelance': '#34D399',
    'Bonus': '#6EE7B7',
    'Investment': '#059669',
    'Other Income': '#047857',
    'Groceries': '#6366F1',
    'Transportation': '#EC4899',
    'Utilities': '#F59E0B',
    'Entertainment': '#3B82F6',
    'Healthcare': '#EF4444',
    'Dining Out': '#8B5CF6',
    'Shopping': '#14B8A6',
    'Other': '#6B7280',
  };
  return colors[category] || '#6B7280';
};

export const generateId = (): string => {
  return crypto.randomUUID();
};
