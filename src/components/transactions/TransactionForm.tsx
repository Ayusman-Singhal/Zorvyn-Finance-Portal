import React from 'react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '../../utils/mockData';

interface TransactionFormData {
  date: string;
  description: string;
  amount: string;
  category: string;
  type: 'income' | 'expense';
}

interface TransactionFormProps {
  formData: TransactionFormData;
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onTypeChange: (type: 'income' | 'expense') => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  formData,
  errors,
  onChange,
  onTypeChange,
}) => {
  const categories = formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <div className="space-y-4">
      {/* Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onTypeChange('expense')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              formData.type === 'expense'
                ? 'bg-red-100 text-red-800 border-2 border-red-500 shadow-sm'
                : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => onTypeChange('income')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              formData.type === 'income'
                ? 'bg-green-100 text-green-800 border-2 border-green-500 shadow-sm'
                : 'bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200'
            }`}
          >
            Income
          </button>
        </div>
      </div>

      {/* Date */}
      <div>
        <label htmlFor="form-date" className="block text-sm font-medium text-gray-700">
          Date *
        </label>
        <input
          type="date"
          id="form-date"
          name="date"
          value={formData.date}
          onChange={onChange}
          className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.date ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date}</p>}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="form-description" className="block text-sm font-medium text-gray-700">
          Description *
        </label>
        <input
          type="text"
          id="form-description"
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Enter description"
          className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.description ? 'border-red-300' : 'border-gray-300'
          }`}
        />
        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
      </div>

      {/* Amount */}
      <div>
        <label htmlFor="form-amount" className="block text-sm font-medium text-gray-700">
          Amount *
        </label>
        <div className="mt-1 relative rounded-lg shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-gray-500 sm:text-sm">$</span>
          </div>
          <input
            type="number"
            id="form-amount"
            name="amount"
            value={formData.amount}
            onChange={onChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className={`block w-full pl-7 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
              errors.amount ? 'border-red-300' : 'border-gray-300'
            }`}
          />
        </div>
        {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount}</p>}
      </div>

      {/* Category */}
      <div>
        <label htmlFor="form-category" className="block text-sm font-medium text-gray-700">
          Category *
        </label>
        <select
          id="form-category"
          name="category"
          value={formData.category}
          onChange={onChange}
          className={`mt-1 block w-full rounded-lg border px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
            errors.category ? 'border-red-300' : 'border-gray-300'
          }`}
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
      </div>
    </div>
  );
};
