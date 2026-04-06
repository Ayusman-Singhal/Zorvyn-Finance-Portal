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
import { Card } from '../common/Card';
import { useTransactions } from '../../hooks/useTransactions';
import { getBalanceTrendData } from '../../utils/chartDataHelpers';

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
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleFont: { size: 13, family: 'Inter' },
        bodyFont: { size: 12, family: 'Inter' },
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            return `Balance: $${context.parsed.y.toLocaleString()}`;
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
          font: { family: 'Inter', size: 11 },
          callback: (value) => `$${Number(value).toLocaleString()}`,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { family: 'Inter', size: 11 },
          maxTicksLimit: 10,
        },
      },
    },
  };

  return (
    <Card title="Balance Trend (Last 30 Days)">
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </Card>
  );
};
