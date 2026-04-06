import { useTransactionStore } from '../store/transactionStore';

export const useTransactions = () => {
  const {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    getTransaction,
    initializeMockData,
  } = useTransactionStore();

  return {
    transactions,
    addTransaction,
    editTransaction,
    deleteTransaction,
    getTransaction,
    initializeMockData,
  };
};
