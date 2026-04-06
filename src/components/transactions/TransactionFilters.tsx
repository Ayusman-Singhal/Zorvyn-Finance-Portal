import React from 'react';
import { useFilters } from '@/hooks/useFilters';
import { ALL_CATEGORIES } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
    <div className="bg-card p-5 rounded-lg border border-border">
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        {/* Search */}
        <div className="flex-1 space-y-2">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            value={filters.searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search transactions..."
            className="w-full"
          />
        </div>

        {/* Type Filter */}
        <div className="w-full lg:w-[200px] space-y-2">
          <Label htmlFor="type-filter">Type</Label>
          <Select 
            value={filters.typeFilter} 
            onValueChange={(value) => setTypeFilter(value as 'all' | 'income' | 'expense')}
          >
            <SelectTrigger id="type-filter">
              <SelectValue placeholder="All types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <Button variant="outline" onClick={resetFilters} className="w-full lg:w-auto">
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <Label className="mb-3 block">Categories</Label>
        <div className="flex flex-wrap gap-2">
          {ALL_CATEGORIES.map((category) => {
            const isSelected = filters.categoryFilter.includes(category);
            return (
              <button
                key={category}
                onClick={() => handleCategoryToggle(category)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                  isSelected
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
