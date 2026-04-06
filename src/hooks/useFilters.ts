import { useMemo } from 'react';
import { useTransactionStore } from '../store/transactionStore';
import { useFilterStore } from '../store/filterStore';

export const useFilters = () => {
  const { transactions } = useTransactionStore();
  const { filters, sortConfig, setSearchTerm, setCategoryFilter, setTypeFilter, setDateRange, setSortConfig, resetFilters } = useFilterStore();

  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    // Search filter
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        (t) =>
          t.description.toLowerCase().includes(term) ||
          t.category.toLowerCase().includes(term)
      );
    }

    // Category filter
    if (filters.categoryFilter.length > 0) {
      result = result.filter((t) => filters.categoryFilter.includes(t.category));
    }

    // Type filter
    if (filters.typeFilter !== 'all') {
      result = result.filter((t) => t.type === filters.typeFilter);
    }

    // Date range filter
    if (filters.dateRange) {
      result = result.filter((t) => {
        const date = new Date(t.date);
        return date >= filters.dateRange!.from && date <= filters.dateRange!.to;
      });
    }

    // Sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [transactions, filters, sortConfig]);

  return {
    filters,
    sortConfig,
    filteredTransactions,
    setSearchTerm,
    setCategoryFilter,
    setTypeFilter,
    setDateRange,
    setSortConfig,
    resetFilters,
  };
};
