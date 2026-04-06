import React from 'react';
import { useFilters } from '@/hooks/useFilters';
import { useAuth } from '@/hooks/useAuth';
import { formatCurrency, formatDate } from '@/utils/formatters';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { EmptyState } from '../common/EmptyState';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowUp, ArrowDown, ArrowUpDown, Pencil, Trash2 } from 'lucide-react';
import type { Transaction } from '@/types';

interface TransactionTableProps {
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
}

export const TransactionTable: React.FC<TransactionTableProps> = ({
  onEdit,
  onDelete,
}) => {
  const { filteredTransactions, sortConfig, setSortConfig } = useFilters();
  const { currentRole } = useAuth();
  
  const canEdit = currentRole === 'admin' && onEdit;
  const canDelete = currentRole === 'admin' && onDelete;

  const handleSort = (key: keyof Transaction) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig(key, direction);
  };

  const getSortIcon = (key: keyof Transaction) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown size={14} className="text-muted-foreground ml-1" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp size={14} className="text-primary ml-1" />
    ) : (
      <ArrowDown size={14} className="text-primary ml-1" />
    );
  };

  if (filteredTransactions.length === 0) {
    return (
      <EmptyState
        title="No transactions found"
        description="Try adjusting your filters or add a new transaction if you have permissions."
      />
    );
  }

  return (
    <div className="rounded-md border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleSort('date')}
            >
              <div className="flex items-center">
                Date {getSortIcon('date')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleSort('description')}
            >
              <div className="flex items-center">
                Description {getSortIcon('description')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleSort('category')}
            >
              <div className="flex items-center">
                Category {getSortIcon('category')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => handleSort('type')}
            >
              <div className="flex items-center">
                Type {getSortIcon('type')}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/50 transition-colors text-right"
              onClick={() => handleSort('amount')}
            >
              <div className="flex items-center justify-end">
                Amount {getSortIcon('amount')}
              </div>
            </TableHead>
            {(canEdit || canDelete) && (
              <TableHead className="text-right">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium whitespace-nowrap">
                {formatDate(transaction.date)}
              </TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell className="text-muted-foreground whitespace-nowrap">
                {transaction.category}
              </TableCell>
              <TableCell>
                <Badge variant={transaction.type === 'income' ? 'default' : 'secondary'}>
                  {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                </Badge>
              </TableCell>
              <TableCell 
                className={`text-right font-medium whitespace-nowrap ${
                  transaction.type === 'income' ? 'text-primary' : 'text-foreground'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}
                {formatCurrency(transaction.amount)}
              </TableCell>
              {(canEdit || canDelete) && (
                <TableCell className="text-right whitespace-nowrap">
                  <div className="flex justify-end gap-2">
                    {canEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(transaction)}
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </Button>
                    )}
                    {canDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => onDelete(transaction.id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
