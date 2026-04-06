import { create } from 'zustand';
import type { FilterState, SortConfig } from '../types';

interface FilterStoreState {
  filters: FilterState;
  sortConfig: SortConfig;
  setSearchTerm: (term: string) => void;
  setCategoryFilter: (categories: string[]) => void;
  setTypeFilter: (type: 'all' | 'income' | 'expense') => void;
  setDateRange: (from: Date | null, to: Date | null) => void;
  setSortConfig: (key: SortConfig['key'], direction: SortConfig['direction']) => void;
  resetFilters: () => void;
}

const initialFilters: FilterState = {
  searchTerm: '',
  categoryFilter: [],
  typeFilter: 'all',
  dateRange: null,
};

export const useFilterStore = create<FilterStoreState>()((set) => ({
  filters: initialFilters,
  sortConfig: { key: 'date', direction: 'desc' },

  setSearchTerm: (term) => {
    set((state) => ({
      filters: { ...state.filters, searchTerm: term },
    }));
  },

  setCategoryFilter: (categories) => {
    set((state) => ({
      filters: { ...state.filters, categoryFilter: categories },
    }));
  },

  setTypeFilter: (type) => {
    set((state) => ({
      filters: { ...state.filters, typeFilter: type },
    }));
  },

  setDateRange: (from, to) => {
    set((state) => ({
      filters: {
        ...state.filters,
        dateRange: from && to ? { from, to } : null,
      },
    }));
  },

  setSortConfig: (key, direction) => {
    set({ sortConfig: { key, direction } });
  },

  resetFilters: () => {
    set({ filters: initialFilters });
  },
}));
