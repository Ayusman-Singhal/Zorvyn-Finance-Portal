import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useTransactions } from '@/hooks/useTransactions';
import { calculateTotalBalance, calculateTotalIncome, calculateTotalExpenses } from '@/utils/calculations';
import { formatCurrency } from '@/utils/formatters';
import { DollarSign, ArrowDownRight, ArrowUpRight } from 'lucide-react';

export const SummaryCards: React.FC = () => {
  const { transactions } = useTransactions();

  const totalBalance = calculateTotalBalance(transactions);
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);

  const cards = [
    {
      title: 'Total Balance',
      value: totalBalance,
      icon: <DollarSign size={24} className="text-primary" />,
      bg: 'bg-muted/50',
    },
    {
      title: 'Total Income',
      value: totalIncome,
      icon: <ArrowUpRight size={24} className="text-primary" />,
      bg: 'bg-secondary/30',
    },
    {
      title: 'Total Expenses',
      value: totalExpenses,
      icon: <ArrowDownRight size={24} className="text-primary" />,
      bg: 'bg-accent/30',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          className="overflow-hidden border-border transition-all duration-300 hover:shadow-md animate-slide-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className={`p-6 flex items-center gap-4 ${card.bg}`}>
            <div className="p-3 rounded-full bg-background shadow-sm border border-border">
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">{card.title}</p>
              <p className="text-2xl font-bold tracking-tight text-foreground">
                {formatCurrency(card.value)}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
