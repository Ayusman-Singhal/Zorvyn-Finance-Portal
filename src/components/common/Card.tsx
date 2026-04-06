import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-5 transition-all duration-300 hover:shadow-lg ${className}`}>
      {title && (
        <div className="border-b border-gray-200 pb-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      {children}
    </div>
  );
};
