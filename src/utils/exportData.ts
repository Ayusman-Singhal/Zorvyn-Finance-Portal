import type { Transaction } from '../types';
import { formatDate } from './formatters';

export const exportToCSV = (transactions: Transaction[]): void => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
  const rows = transactions.map((t) => [
    formatDate(t.date),
    `"${t.description.replace(/"/g, '""')}"`,
    t.category,
    t.type,
    t.type === 'income' ? t.amount.toFixed(2) : `-${t.amount.toFixed(2)}`,
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  downloadFile(csvContent, 'transactions.csv', 'text/csv');
};

export const exportToJSON = (transactions: Transaction[]): void => {
  const data = transactions.map((t) => ({
    date: new Date(t.date).toISOString().split('T')[0],
    description: t.description,
    category: t.category,
    type: t.type,
    amount: t.amount,
  }));

  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, 'transactions.json', 'application/json');
};

const downloadFile = (content: string, filename: string, mimeType: string): void => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
