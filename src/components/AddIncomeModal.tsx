'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from './ModalContext';

export default function AddIncomeModal() {
  const { isAddIncomeOpen, closeAddIncome } = useModal();
  
  // Form states
  const [sourceName, setSourceName] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [frequency, setFrequency] = useState('monthly');
  const [notes, setNotes] = useState('');

  // Submit states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Set today's date as default
  useEffect(() => {
    if (isAddIncomeOpen) {
      setDate(new Date().toISOString().split('T')[0]);
      setSourceName('');
      setAmount('');
      setFrequency('monthly');
      setNotes('');
      setIsSubmitting(false);
      setIsSuccess(false);
    }
  }, [isAddIncomeOpen]);

  if (!isAddIncomeOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate server transaction submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      setTimeout(() => {
        setIsSuccess(false);
        closeAddIncome();
      }, 1500);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-surface-container-lowest dark:bg-surface-container-low w-full max-w-lg rounded-xl shadow-2xl border border-outline-variant/30 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Modal Header */}
        <div className="bg-surface-container-low px-xl py-lg border-b border-outline-variant/30 flex justify-between items-center">
          <div className="flex items-center gap-md">
            <div className="bg-income text-white w-10 h-10 rounded-lg flex items-center justify-center shadow-md shrink-0">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
            <div className="text-left">
              <h2 className="font-title-md text-title-md font-bold text-on-surface leading-tight">Add Income Source</h2>
              <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                Update your recurring or one-time revenue.
              </p>
            </div>
          </div>
          <button
            onClick={closeAddIncome}
            disabled={isSubmitting || isSuccess}
            className="text-on-surface-variant hover:text-error transition-colors p-2 hover:bg-surface-variant rounded-full focus:outline-none"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body (Form) */}
        <form onSubmit={handleSubmit} className="p-xl space-y-lg text-left">
          
          {/* Source Name */}
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider font-bold" htmlFor="source_name">
              Source Name
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                business_center
              </span>
              <input
                id="source_name"
                type="text"
                required
                disabled={isSubmitting || isSuccess}
                value={sourceName}
                onChange={(e) => setSourceName(e.target.value)}
                placeholder="e.g. Monthly Salary, Freelance Project"
                className="w-full bg-surface-container dark:bg-on-surface/5 pl-10 pr-md py-3 rounded-lg border border-outline-variant outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md text-body-md text-on-surface"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {/* Amount */}
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider font-bold" htmlFor="amount">
                Amount
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-income transition-colors">
                  attach_money
                </span>
                <input
                  id="amount"
                  type="number"
                  required
                  step="0.01"
                  disabled={isSubmitting || isSuccess}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-surface-container dark:bg-on-surface/5 pl-10 pr-md py-3 rounded-lg border border-outline-variant outline-none focus:ring-2 focus:ring-income focus:border-transparent transition-all font-data-mono text-data-mono text-on-surface"
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider font-bold" htmlFor="date">
                Received Date
              </label>
              <div className="relative group">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                  calendar_today
                </span>
                <input
                  id="date"
                  type="date"
                  required
                  disabled={isSubmitting || isSuccess}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-surface-container dark:bg-on-surface/5 pl-10 pr-md py-3 rounded-lg border border-outline-variant outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md text-body-md text-on-surface"
                />
              </div>
            </div>
          </div>

          {/* Frequency */}
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider font-bold" htmlFor="frequency">
              Frequency
            </label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors">
                event_repeat
              </span>
              <select
                id="frequency"
                disabled={isSubmitting || isSuccess}
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="w-full bg-surface-container dark:bg-on-surface/5 pl-10 pr-10 py-3 rounded-lg border border-outline-variant outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none transition-all font-body-md text-body-md text-on-surface cursor-pointer"
              >
                <option value="one-time">One-time payment</option>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-outline">
                expand_more
              </span>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider font-bold" htmlFor="notes">
              Description (Optional)
            </label>
            <textarea
              id="notes"
              disabled={isSubmitting || isSuccess}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a brief note about this income..."
              rows={2}
              className="w-full bg-surface-container dark:bg-on-surface/5 px-md py-3 rounded-lg border border-outline-variant outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md text-body-md text-on-surface resize-none"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-lg flex flex-col sm:flex-row sm:justify-end gap-md items-center border-t border-outline-variant/30 mt-lg">
            <button
              type="button"
              onClick={closeAddIncome}
              disabled={isSubmitting || isSuccess}
              className="w-full sm:w-auto px-xl py-3 rounded-lg text-on-surface-variant font-bold font-label-caps text-xs hover:bg-surface-variant transition-all focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isSuccess}
              className={`w-full sm:flex-1 py-3 rounded-lg font-bold font-label-caps text-xs shadow-lg transition-all flex items-center justify-center gap-2 focus:outline-none ${
                isSuccess
                  ? 'bg-success text-white shadow-success/20'
                  : 'bg-income text-white shadow-income/20 hover:shadow-income/30 hover:-translate-y-0.5 active:translate-y-0'
              }`}
            >
              {isSubmitting && (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                  <span>Registering...</span>
                </>
              )}
              {isSuccess && (
                <>
                  <span className="material-symbols-outlined text-sm">done_all</span>
                  <span>Successfully Added</span>
                </>
              )}
              {!isSubmitting && !isSuccess && (
                <>
                  <span>Register Income</span>
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
