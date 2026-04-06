import React, { useState } from 'react';
import { SummaryCards } from './dashboard/SummaryCards';
import { BalanceTrendChart } from './dashboard/BalanceTrendChart';
import { SpendingCategoryChart } from './dashboard/SpendingCategoryChart';
import { TransactionFilters } from './transactions/TransactionFilters';
import { TransactionTable } from './transactions/TransactionTable';
import { AddTransactionModal } from './transactions/AddTransactionModal';
import { EditTransactionModal } from './transactions/EditTransactionModal';
import { InsightsPanel } from './insights/InsightsPanel';
import { Button } from './common/Button';
import { useAuth } from '../hooks/useAuth';
import { useTransactions } from '../hooks/useTransactions';
import { exportToCSV, exportToJSON } from '../utils/exportData';
import type { Transaction } from '../types';

export const Dashboard: React.FC = () => {
  const { canAdd } = useAuth();
  const { transactions, deleteTransaction } = useTransactions();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="animate-fade-in">
            <BalanceTrendChart />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
            <SpendingCategoryChart />
          </div>
        </div>
        <div className="lg:col-span-1 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Financial Insights</h2>
          </div>
          <InsightsPanel />
        </div>
      </div>

      {/* Transactions Section */}
      <div className="space-y-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Transactions</h2>
          <div className="flex items-center gap-3">
            {/* Export Dropdown */}
            <div className="relative">
              <Button
                variant="secondary"
                onClick={() => setShowExportMenu(!showExportMenu)}
              >
                <span className="flex items-center gap-2">
                  <svg style={{ width: 16, height: 16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Export
                </span>
              </Button>
              {showExportMenu && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20 animate-scale-in">
                  <button
                    onClick={() => { exportToCSV(transactions); setShowExportMenu(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Export as CSV
                  </button>
                  <button
                    onClick={() => { exportToJSON(transactions); setShowExportMenu(false); }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Export as JSON
                  </button>
                </div>
              )}
            </div>

            {/* Add Transaction Button */}
            {canAdd && (
              <Button onClick={() => setIsAddModalOpen(true)}>
                <span className="flex items-center gap-2">
                  <svg style={{ width: 20, height: 20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Transaction
                </span>
              </Button>
            )}
          </div>
        </div>

        <TransactionFilters />
        <TransactionTable onEdit={handleEdit} onDelete={handleDelete} />
      </div>

      {/* Modals */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditTransactionModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        transaction={selectedTransaction}
      />
    </div>
  );
};
