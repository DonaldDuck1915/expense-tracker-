'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from './ModalContext';

export default function EditExpenseModal() {
  const { isEditExpenseOpen, editExpenseData, closeEditExpense, openDeleteConfirm } = useModal();
  
  // Form states
  const [merchant, setMerchant] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('Technology');
  const [notes, setNotes] = useState('');
  
  // Simulated attachment states
  const [fileName, setFileName] = useState('aws_invoice_may_24.pdf');
  const [fileSize, setFileSize] = useState('PDF • 1.2 MB');

  // Button interaction states
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (editExpenseData) {
      setMerchant(editExpenseData.description || '');
      // Format amount to positive string (remove negative sign if present)
      const amt = Math.abs(editExpenseData.amount || 0);
      setAmount(amt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      
      let dateVal = '';
      if (editExpenseData.rawDate) {
        dateVal = editExpenseData.rawDate;
      } else if (editExpenseData.date) {
        try {
          const d = new Date(editExpenseData.date);
          if (!isNaN(d.getTime())) {
            dateVal = d.toISOString().split('T')[0];
          }
        } catch {
          // Ignore parse errors
        }
      }
      setDate(dateVal || new Date().toISOString().split('T')[0]);

      // Normalize category
      const cat = (editExpenseData.category || '').toLowerCase();
      if (cat.includes('cloud') || cat.includes('tech')) {
        setCategory('Technology');
      } else if (cat.includes('market') || cat.includes('ad')) {
        setCategory('Marketing');
      } else if (cat.includes('office') || cat.includes('supplies')) {
        setCategory('Office Supplies');
      } else if (cat.includes('travel') || cat.includes('transport')) {
        setCategory('Travel');
      } else {
        setCategory('Subscription');
      }

      setNotes(editExpenseData.subtext || 'Transaction details logged.');
      setFileName(editExpenseData.fileName || 'aws_invoice_may_24.pdf');
      setFileSize(editExpenseData.fileSize || 'PDF • 1.2 MB');
    }
  }, [editExpenseData]);

  if (!isEditExpenseOpen || !editExpenseData) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate updating database record
    setTimeout(() => {
      setIsSaving(false);
      alert('Changes saved successfully.');
      closeEditExpense();
    }, 800);
  };

  const handleDelete = () => {
    openDeleteConfirm(editExpenseData);
    closeEditExpense();
  };

  const handleReplaceAttachment = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.pdf,.png,.jpg,.jpeg';
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files[0]) {
        const file = target.files[0];
        setFileName(file.name);
        const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
        const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
        setFileSize(`${ext} • ${sizeMb} MB`);
      }
    };
    input.click();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-surface-container-lowest dark:bg-surface-container-low w-full max-w-lg rounded-xl shadow-2xl border border-outline-variant/30 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Modal Header */}
        <div className="px-lg py-md border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low">
          <div className="flex items-center gap-sm text-primary dark:text-primary-fixed">
            <span className="material-symbols-outlined">edit_square</span>
            <h3 className="font-title-md text-title-md font-bold">Edit Expense</h3>
          </div>
          <button
            onClick={closeEditExpense}
            className="p-1 hover:bg-surface-container-high rounded-full transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSave} className="p-lg space-y-lg text-left">
          
          {/* Merchant/Entity */}
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant font-bold block">
              Merchant / Payee
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                business
              </span>
              <input
                type="text"
                required
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                className="w-full pl-10 pr-md py-sm bg-surface-container dark:bg-on-surface/5 border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body-md text-on-surface"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-md">
            {/* Amount */}
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant font-bold block">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 font-data-mono text-outline font-bold">$</span>
                <input
                  type="text"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-8 pr-md py-sm bg-surface-container dark:bg-on-surface/5 border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-data-mono text-on-surface text-right"
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant font-bold block">
                Transaction Date
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                  calendar_today
                </span>
                <input
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full pl-10 pr-md py-sm bg-surface-container dark:bg-on-surface/5 border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body-sm text-on-surface"
                />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant font-bold block">
              Category
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">
                category
              </span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full pl-10 pr-md py-sm bg-surface-container dark:bg-on-surface/5 border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body-md text-on-surface appearance-none"
              >
                <option value="Technology">Technology</option>
                <option value="Marketing">Marketing</option>
                <option value="Office Supplies">Office Supplies</option>
                <option value="Travel">Travel</option>
                <option value="Subscription">Subscription</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          {/* Receipt Upload / Preview */}
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant font-bold block">
              Receipt Attachment
            </label>
            <div className="flex items-center gap-md p-sm border border-outline-variant border-dashed rounded-lg bg-surface-container-lowest">
              <div className="w-16 h-16 rounded bg-surface-container-high flex items-center justify-center overflow-hidden shrink-0 text-outline">
                <span className="material-symbols-outlined">description</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-body-sm text-on-surface font-semibold truncate">{fileName}</p>
                <p className="text-xs text-outline mt-0.5">{fileSize}</p>
              </div>
              <button
                type="button"
                onClick={handleReplaceAttachment}
                className="text-primary font-bold font-label-caps text-xs hover:underline px-md focus:outline-none"
              >
                Replace
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant font-bold block">
              Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full px-md py-sm bg-surface-container dark:bg-on-surface/5 border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary focus:border-transparent font-body-md text-on-surface resize-none"
            />
          </div>

          {/* Modal Footer */}
          <div className="flex justify-between items-center pt-md border-t border-outline-variant/30 mt-lg">
            <button
              type="button"
              disabled={isSaving}
              onClick={handleDelete}
              className="px-md py-sm text-expense font-bold font-label-caps text-xs border border-error/20 hover:bg-error/10 rounded-lg transition-all flex items-center gap-xs focus:outline-none active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">delete</span>
              <span>Delete Transaction</span>
            </button>
            <div className="flex gap-md">
              <button
                type="button"
                disabled={isSaving}
                onClick={closeEditExpense}
                className="px-lg py-sm text-on-surface-variant font-bold font-label-caps text-xs hover:bg-surface-container-high rounded-lg transition-all focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="px-xl py-sm bg-primary text-on-primary font-bold font-label-caps text-xs rounded-lg shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center gap-xs focus:outline-none"
              >
                {isSaving ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                    <span>Saving...</span>
                  </>
                ) : (
                  <span>Save Changes</span>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
