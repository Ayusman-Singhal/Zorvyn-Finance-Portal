import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Card } from '../common/Card';
import { useTransactions } from '../../hooks/useTransactions';
import { getSpendingByCategoryData } from '../../utils/chartDataHelpers';

ChartJS.register(ArcElement, Tooltip, Legend);

export const SpendingCategoryChart: React.FC = () => {
  const { transactions } = useTransactions();
  const data = getSpendingByCategoryData(transactions);

  const options: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 12,
          padding: 16,
          font: {
            size: 11,
            family: 'Inter',
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 13, family: 'Inter' },
        bodyFont: { size: 12, family: 'Inter' },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed;
            const total = (context.dataset.data as number[]).reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <Card title="Spending by Category">
      <div className="h-64">
        <Pie data={data} options={options} />
      </div>
    </Card>
  );
};
