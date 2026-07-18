'use client';

import React, { useState } from 'react';
import { useModal } from './ModalContext';

export default function DeleteConfirmModal() {
  const { isDeleteConfirmOpen, deleteConfirmData, closeDeleteConfirm } = useModal();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!isDeleteConfirmOpen || !deleteConfirmData) return null;

  const handleDelete = () => {
    setIsDeleting(true);

    // Simulate database transaction deletion
    setTimeout(() => {
      setIsDeleting(false);
      alert('Transaction deleted.');
      closeDeleteConfirm();
    }, 1500);
  };

  const amountStr = Math.abs(deleteConfirmData.amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-surface-container-lowest dark:bg-surface-container-low w-full max-w-md rounded-xl shadow-2xl border border-outline-variant/30 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Warning Header Section */}
        <div className="p-lg bg-error-container/10 dark:bg-error-container/5 flex flex-col items-center text-center border-b border-outline-variant/20">
          <div className="w-16 h-16 rounded-full bg-error-container/20 flex items-center justify-center mb-md shadow-sm">
            <span className="material-symbols-outlined text-expense text-[40px]">warning</span>
          </div>
          <h2 className="font-title-md text-headline-lg font-bold text-on-surface mb-sm">Are you sure?</h2>
          <p className="font-body-sm text-on-surface-variant max-w-[320px]">
            This action will permanently delete the selected transaction record.
          </p>
        </div>

        {/* Impact Statement Canvas */}
        <div className="px-lg py-md space-y-md text-left">
          <div className="p-md rounded-lg bg-surface-container-low dark:bg-on-surface/5 border border-outline-variant/30">
            <div className="flex items-start gap-md">
              <span className="material-symbols-outlined text-outline mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                info
              </span>
              <div className="space-y-1">
                <span className="font-label-caps text-label-caps text-outline uppercase tracking-wider font-bold">
                  Impact Analysis
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Deleting <span className="font-bold text-on-surface">&quot;{deleteConfirmData.description}&quot;</span> will adjust your <span className="font-bold text-on-surface">Monthly Budget Report</span> by <span className="font-bold text-expense">-${amountStr}</span> and remove all associated tax receipts.
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-sm px-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-expense shrink-0" />
            <p className="font-body-sm text-xs text-expense font-semibold italic">
              This process cannot be undone. All audit trails will be purged.
            </p>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-lg bg-surface-container-low flex flex-col sm:flex-row-reverse gap-md border-t border-outline-variant/30">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex-1 bg-expense text-white py-3 rounded-lg font-label-caps text-label-caps font-bold hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-xs focus:outline-none relative overflow-hidden group"
          >
            {isDeleting ? (
              <>
                <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                <span>Deleting...</span>
              </>
            ) : (
              <span>Delete Transaction</span>
            )}
          </button>
          
          <button
            onClick={closeDeleteConfirm}
            disabled={isDeleting}
            className="flex-1 bg-surface-container-highest dark:bg-on-surface/10 text-on-surface-variant py-3 rounded-lg font-label-caps text-label-caps font-bold hover:bg-outline-variant/30 dark:hover:bg-on-surface/15 active:scale-98 transition-all focus:outline-none"
          >
            Cancel Action
          </button>
        </div>

      </div>
    </div>
  );
}
