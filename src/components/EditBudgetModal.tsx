'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from './ModalContext';

export default function EditBudgetModal() {
  const { isEditBudgetOpen, editBudgetData, closeEditBudget } = useModal();
  
  // Limit input state
  const [limit, setLimit] = useState(3000);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (editBudgetData) {
      setLimit(editBudgetData.limit || 0);
    }
  }, [editBudgetData]);

  if (!isEditBudgetOpen || !editBudgetData) return null;

  const spent = editBudgetData.spent || 0;
  const initialLimit = editBudgetData.limit || 0;
  const diff = limit - spent;
  
  // Progress calculations
  const progressPercent = limit > 0 ? Math.min(100, (spent / limit) * 100) : 100;
  const isOverBudget = diff < 0;
  const overPercentage = limit > 0 && spent > limit ? Math.min(100, ((spent - limit) / spent) * 100) : 0;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate updating database record
    setTimeout(() => {
      setIsSaving(false);
      alert('Changes saved successfully.');
      closeEditBudget();
    }, 800);
  };

  const handleAdjust = (amount: number) => {
    setLimit(amount);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-surface-container-lowest dark:bg-surface-container-low w-full max-w-lg rounded-xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
        
        {/* Modal Header */}
        <div className="px-lg py-md border-b border-outline-variant/30 flex justify-between items-center bg-surface-bright dark:bg-surface-container-low">
          <div className="flex items-center gap-sm text-left">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined">edit_note</span>
            </div>
            <div>
              <h2 className="font-title-md text-title-md font-bold text-on-surface leading-none">Edit Budget Limit</h2>
              <p className="text-on-surface-variant font-label-caps text-xs mt-1 font-semibold uppercase tracking-wider">
                {editBudgetData.name}
              </p>
            </div>
          </div>
          <button
            onClick={closeEditBudget}
            disabled={isSaving}
            className="text-on-surface-variant hover:text-on-surface transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="p-lg space-y-xl text-left">
          
          {/* Summary Bar */}
          <div className="bg-background-alt dark:bg-on-surface/5 p-md rounded-lg border border-outline-variant/30">
            <div className="flex justify-between items-end mb-sm">
              <div>
                <p className="font-label-caps text-[10px] text-on-surface-variant font-bold uppercase">CURRENT SPEND</p>
                <p className="font-headline-lg text-xl font-bold text-on-surface">${spent.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              </div>
              <div className="text-right">
                <p className="font-label-caps text-[10px] text-on-surface-variant font-bold uppercase">REMAINING</p>
                <p
                  className={`font-headline-lg text-xl font-bold ${
                    isOverBudget ? 'text-expense animate-pulse' : 'text-success'
                  }`}
                >
                  {isOverBudget ? '-' : ''}${Math.abs(diff).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>

            {/* Progress bar track */}
            <div className="relative w-full h-3 bg-surface-variant dark:bg-on-surface/10 rounded-full overflow-hidden">
              <div
                style={{ width: `${progressPercent}%` }}
                className={`absolute left-0 top-0 h-full transition-all duration-500 ${
                  isOverBudget ? 'bg-expense' : 'bg-primary'
                }`}
              />
              {isOverBudget && (
                <div
                  style={{ width: `${overPercentage}%` }}
                  className="absolute right-0 top-0 h-full bg-expense/60 transition-all duration-500"
                />
              )}
            </div>

            <div className="flex justify-between mt-xs">
              <span className="text-[10px] font-label-caps text-on-surface-variant font-bold">0%</span>
              <span className="text-[10px] font-label-caps text-on-surface-variant font-bold">
                CURRENT LIMIT: ${initialLimit.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Input Field */}
          <div className="space-y-sm">
            <label className="block font-label-caps text-[10px] text-on-surface-variant font-bold uppercase" htmlFor="new-limit">
              NEW MONTHLY LIMIT ($)
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none">
                <span className="text-on-surface-variant font-body-lg font-bold">$</span>
              </div>
              <input
                id="new-limit"
                type="number"
                step="100"
                required
                disabled={isSaving}
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
                className="block w-full pl-xl pr-md py-3 bg-surface-container dark:bg-on-surface/5 border border-outline-variant rounded-lg font-data-mono text-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none text-on-surface"
              />
            </div>

            {/* Feedback Message */}
            <div
              className={`flex items-start gap-xs p-sm rounded border ${
                isOverBudget
                  ? 'bg-expense/5 border-expense/20 text-expense'
                  : 'bg-primary/5 border-primary/20 text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] mt-0.5">
                {isOverBudget ? 'warning' : 'info'}
              </span>
              <p className="font-body-sm text-xs leading-normal">
                {isOverBudget ? (
                  <>
                    Warning: This limit is below your current spend. You will be{' '}
                    <span className="font-bold">${Math.abs(diff).toLocaleString()}</span> over budget.
                  </>
                ) : (
                  <>
                    {limit - initialLimit >= 0 ? (
                      <>
                        Increasing the limit by{' '}
                        <span className="font-bold">${(limit - initialLimit).toLocaleString()}</span> will allocate more
                        funds from your surplus.
                      </>
                    ) : (
                      <>
                        Decreasing the limit by{' '}
                        <span className="font-bold">${Math.abs(limit - initialLimit).toLocaleString()}</span> helps save
                        more this month.
                      </>
                    )}
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="space-y-sm">
            <span className="block font-label-caps text-[10px] text-on-surface-variant font-bold uppercase">
              QUICK ADJUSTMENTS
            </span>
            <div className="flex gap-sm">
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleAdjust(initialLimit + 500)}
                className="flex-grow py-2 border border-outline-variant hover:bg-surface-container-high dark:hover:bg-on-surface/10 rounded transition-colors font-label-caps text-xs font-bold text-on-surface focus:outline-none"
              >
                + $500
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleAdjust(initialLimit + 1000)}
                className="flex-grow py-2 border border-outline-variant hover:bg-surface-container-high dark:hover:bg-on-surface/10 rounded transition-colors font-label-caps text-xs font-bold text-on-surface focus:outline-none"
              >
                + $1,000
              </button>
              <button
                type="button"
                disabled={isSaving}
                onClick={() => handleAdjust(spent > 0 ? spent + 50 : 500)}
                className="flex-grow py-2 border border-outline-variant hover:bg-surface-container-high dark:hover:bg-on-surface/10 rounded transition-colors font-label-caps text-xs font-bold text-on-surface focus:outline-none"
              >
                MINIMUM
              </button>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-md flex gap-md justify-end border-t border-outline-variant/30">
            <button
              type="button"
              disabled={isSaving}
              onClick={closeEditBudget}
              className="px-xl py-2.5 text-on-surface-variant hover:text-on-surface font-label-caps text-xs font-bold transition-colors focus:outline-none"
            >
              Cancel Changes
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className={`px-xl py-2.5 rounded-lg font-label-caps text-xs font-bold text-on-primary shadow-md hover:shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center gap-xs focus:outline-none ${
                isOverBudget ? 'bg-expense' : 'bg-primary'
              }`}
            >
              {isSaving ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                  <span>Updating...</span>
                </>
              ) : (
                <span>Confirm Limit Update</span>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
