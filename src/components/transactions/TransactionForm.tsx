import React from 'react';
import { INCOME_CATEGORIES, EXPENSE_CATEGORIES } from '@/utils/mockData';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
  onFieldChange?: (name: string, value: string) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  formData,
  errors,
  onChange,
  onTypeChange,
  onFieldChange,
}) => {
  const categories = formData.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  // Helper for component updates like Select that don't provide a native event
  const handleValueChange = (name: string, value: string) => {
    if (onFieldChange) onFieldChange(name, value);
    else {
      // simulate event
      onChange({ target: { name, value } } as unknown as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <div className="space-y-5">
      {/* Type Selection */}
      <div className="space-y-2">
        <Label>Type</Label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onTypeChange('expense')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 border ${
              formData.type === 'expense'
                ? 'bg-destructive/10 text-destructive border-destructive/50'
                : 'bg-muted/50 text-muted-foreground border-transparent hover:bg-muted'
            }`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => onTypeChange('income')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 border ${
              formData.type === 'income'
                ? 'bg-primary/10 text-primary border-primary/50'
                : 'bg-muted/50 text-muted-foreground border-transparent hover:bg-muted'
            }`}
          >
            Income
          </button>
        </div>
      </div>

      {/* Date */}
      <div className="space-y-2">
        <Label htmlFor="form-date">Date <span className="text-destructive">*</span></Label>
        <Input
          type="date"
          id="form-date"
          name="date"
          value={formData.date}
          onChange={onChange}
          className={errors.date ? 'border-destructive focus-visible:ring-destructive' : ''}
        />
        {errors.date && <p className="text-xs text-destructive">{errors.date}</p>}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="form-description">Description <span className="text-destructive">*</span></Label>
        <Input
          type="text"
          id="form-description"
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Enter description"
          className={errors.description ? 'border-destructive focus-visible:ring-destructive' : ''}
        />
        {errors.description && <p className="text-xs text-destructive">{errors.description}</p>}
      </div>

      {/* Amount */}
      <div className="space-y-2">
        <Label htmlFor="form-amount">Amount <span className="text-destructive">*</span></Label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-muted-foreground sm:text-sm">$</span>
          </div>
          <Input
            type="number"
            id="form-amount"
            name="amount"
            value={formData.amount}
            onChange={onChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            className={`pl-7 ${errors.amount ? 'border-destructive focus-visible:ring-destructive' : ''}`}
          />
        </div>
        {errors.amount && <p className="text-xs text-destructive">{errors.amount}</p>}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="form-category">Category <span className="text-destructive">*</span></Label>
        <Select 
          value={formData.category} 
          onValueChange={(val) => handleValueChange('category', val || '')}
        >
          <SelectTrigger 
            id="form-category"
            className={errors.category ? 'border-destructive focus-visible:ring-destructive' : ''}
          >
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && <p className="text-xs text-destructive">{errors.category}</p>}
      </div>
    </div>
  );
};
