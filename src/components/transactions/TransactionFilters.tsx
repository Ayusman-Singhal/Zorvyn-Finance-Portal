import React from 'react';
import { useFilters } from '../../hooks/useFilters';
import { ALL_CATEGORIES } from '../../utils/mockData';
import { Button } from '../common/Button';

export const TransactionFilters: React.FC = () => {
  const {
    filters,
    setSearchTerm,
    setCategoryFilter,
    setTypeFilter,
    resetFilters,
  } = useFilters();

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categoryFilter.includes(category)
      ? filters.categoryFilter.filter((c) => c !== category)
      : [...filters.categoryFilter, category];
    setCategoryFilter(newCategories);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
          <input
            type="text"
            value={filters.searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search transactions..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Type Filter */}
        <div className="w-full lg:w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
          <select
            value={filters.typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as 'all' | 'income' | 'expense')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <Button variant="secondary" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                filters.categoryFilter.includes(category)
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
