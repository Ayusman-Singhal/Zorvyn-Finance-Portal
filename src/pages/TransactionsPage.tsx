import React from 'react';
import { TransactionFilters } from '@/components/transactions/TransactionFilters';
import { TransactionTable } from '@/components/transactions/TransactionTable';
import { Button } from '@/components/ui/button';
import { exportToCSV, exportToJSON } from '@/utils/exportData';
import { useTransactions } from '@/hooks/useTransactions';
import { Download } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const TransactionsPage: React.FC = () => {
  const { transactions } = useTransactions();

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground mt-1">View and filter all your historical transactions.</p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" className="gap-2">
              <Download size={16} /> 
              Export Data
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => exportToCSV(transactions)}>
              Export as CSV
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => exportToJSON(transactions)}>
              Export as JSON
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="bg-card rounded-xl shadow-sm border border-border p-6 space-y-6 animate-fade-in">
        <TransactionFilters />
        <TransactionTable />
      </div>
    </div>
  );
};
