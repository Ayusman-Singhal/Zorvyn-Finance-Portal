import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useTransactions } from '../../hooks/useTransactions';
import { Button } from '../common/Button';
import { TransactionForm } from './TransactionForm';
import type { Transaction } from '../../types';

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  const { editTransaction, deleteTransaction } = useTransactions();
  const [formData, setFormData] = useState({
    date: '',
    description: '',
    amount: '',
    category: '',
    type: 'expense' as 'income' | 'expense',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isVisible, setIsVisible] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (transaction) {
      setFormData({
        date: new Date(transaction.date).toISOString().split('T')[0],
        description: transaction.description,
        amount: transaction.amount.toString(),
        category: transaction.category,
        type: transaction.type,
      });
    }
  }, [transaction]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }
    if (!formData.category) newErrors.category = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !transaction) return;

    editTransaction(transaction.id, {
      date: new Date(formData.date),
      description: formData.description,
      amount: parseFloat(formData.amount),
      category: formData.category,
      type: formData.type,
    });

    onClose();
  };

  const handleDelete = () => {
    if (!transaction) return;
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(transaction.id);
      onClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleTypeChange = (type: 'income' | 'expense') => {
    setFormData((prev) => ({ ...prev, type, category: '' }));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  if (!isOpen || !transaction) return null;

  return createPortal(
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-200 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Edit Transaction</h2>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-4">
          <TransactionForm
            formData={formData}
            errors={errors}
            onChange={handleChange}
            onTypeChange={handleTypeChange}
          />

          <div className="flex justify-between pt-6">
            <Button type="button" variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <div className="flex gap-3">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};
