import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useTransactions } from '@/hooks/useTransactions';
import { getSpendingByCategoryData } from '@/utils/chartDataHelpers';
import { PieChart } from 'lucide-react';

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
            family: 'Atkinson Hyperlegible, sans-serif',
          },
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#1f2937',
        bodyColor: '#4b5563',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        titleFont: { size: 13, family: 'Atkinson Hyperlegible, sans-serif' },
        bodyFont: { size: 12, family: 'Atkinson Hyperlegible, sans-serif' },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
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
    <Card className="h-full flex flex-col border-border shadow-sm">
      <CardHeader className="border-b border-border/50 pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <PieChart size={20} className="text-primary" />
          Spending by Category
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-6 relative">
        <div className="h-[300px]">
          <Pie data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};
