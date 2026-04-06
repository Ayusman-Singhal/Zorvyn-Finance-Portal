import React from 'react';

interface BadgeProps {
  type: 'income' | 'expense';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ type, children }) => {
  const styles = {
    income: 'bg-green-100 text-green-800 border-green-200',
    expense: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[type]}`}>
      {children}
    </span>
  );
};
