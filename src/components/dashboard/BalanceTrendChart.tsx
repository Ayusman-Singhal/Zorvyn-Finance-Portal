import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTransactions } from '@/hooks/useTransactions';
import { getBalanceTrendData } from '@/utils/chartDataHelpers';
import { TrendingUp } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const BalanceTrendChart: React.FC = () => {
  const { transactions } = useTransactions();
  const data = getBalanceTrendData(transactions);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: 'index',
    },
    plugins: {
      legend: {
        display: false,
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
            const val = context.parsed.y ?? 0;
            return `Balance: $${val.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0,0,0,0.05)',
        },
        ticks: {
          font: { family: 'Atkinson Hyperlegible, sans-serif', size: 11 },
          callback: (value) => `$${Number(value).toLocaleString()}`,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { family: 'Atkinson Hyperlegible, sans-serif', size: 11 },
          maxTicksLimit: 10,
        },
      },
    },
  };

  return (
    <Card className="h-full flex flex-col border-border shadow-sm">
      <CardHeader className="border-b border-border/50 pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          <TrendingUp size={20} className="text-primary" />
          Balance Trend (Last 30 Days)
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-6 relative">
        <div className="h-[300px]">
          <Line data={data} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};
