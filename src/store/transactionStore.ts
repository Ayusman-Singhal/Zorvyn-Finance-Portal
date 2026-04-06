import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Transaction } from '../types';
import { generateMockTransactions } from '../utils/mockData';

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  editTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  getTransaction: (id: string) => Transaction | undefined;
  setTransactions: (transactions: Transaction[]) => void;
  initializeMockData: () => void;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set, get) => ({
      transactions: [],

      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: crypto.randomUUID(),
        };
        set((state) => ({
          transactions: [...state.transactions, newTransaction],
        }));
      },

      editTransaction: (id, updates) => {
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        }));
      },

      deleteTransaction: (id) => {
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        }));
      },

      getTransaction: (id) => {
        return get().transactions.find((t) => t.id === id);
      },

      setTransactions: (transactions) => {
        set({ transactions });
      },

      initializeMockData: () => {
        const { transactions } = get();
        if (transactions.length === 0) {
          set({ transactions: generateMockTransactions() });
        }
      },
    }),
    {
      name: 'finance-dashboard-transactions',
      partialize: (state) => ({ transactions: state.transactions }),
    }
  )
);
