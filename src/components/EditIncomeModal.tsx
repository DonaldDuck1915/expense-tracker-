'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from './ModalContext';

export default function EditIncomeModal() {
  const { isEditIncomeOpen, editIncomeData, closeEditIncome } = useModal();
  
  // Form states
  const [source, setSource] = useState('');
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('Monthly');
  const [category, setCategory] = useState('Salary');
  const [date, setDate] = useState('');
  const [notifications, setNotifications] = useState(true);
  const [updatePast, setUpdatePast] = useState(false);

  // Button interaction states
  const [isSaving, setIsSaving] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    if (editIncomeData) {
      setSource(editIncomeData.source || '');
      setAmount(Math.abs(editIncomeData.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
      
      // Frequency normalization
      const freq = editIncomeData.frequency || 'Monthly';
      setFrequency(freq.charAt(0).toUpperCase() + freq.slice(1).toLowerCase());
      
      // Category normalization
      const cat = (editIncomeData.category || 'Salary').toUpperCase();
      if (cat === 'SALARY') setCategory('Salary');
      else if (cat === 'INVESTMENT') setCategory('Investment');
      else if (cat === 'FREELANCE') setCategory('Freelance');
      else if (cat === 'RENTAL') setCategory('Rental');
      else setCategory('Salary');

      // Date normalization
      let dateVal = '';
      if (editIncomeData.rawDate) {
        dateVal = editIncomeData.rawDate;
      } else if (editIncomeData.date) {
        try {
          const d = new Date(editIncomeData.date);
          if (!isNaN(d.getTime())) {
            dateVal = d.toISOString().split('T')[0];
          }
        } catch {}
      }
      setDate(dateVal || new Date().toISOString().split('T')[0]);
      
      setNotifications(true);
      setUpdatePast(false);
    }
  }, [editIncomeData]);

  if (!isEditIncomeOpen || !editIncomeData) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate updating database record
    setTimeout(() => {
      setIsSaving(false);
      alert('Changes saved successfully.');
      closeEditIncome();
    }, 800);
  };

  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to remove the income entry for ${source}?`)) {
      setIsRemoving(true);
      
      // Simulate deleting database record
      setTimeout(() => {
        setIsRemoving(false);
        alert('Entry removed.');
        closeEditIncome();
      }, 800);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-surface-container-lowest dark:bg-surface-container-low w-full max-w-[560px] rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Modal Header */}
        <div className="px-xl py-lg bg-surface-container-low border-b border-outline-variant/30 flex justify-between items-center">
          <div className="flex items-center space-x-3 text-left">
            <div className="w-10 h-10 bg-income/10 rounded-lg flex items-center justify-center text-income shrink-0">
              <span className="material-symbols-outlined">payments</span>
            </div>
            <div>
              <h2 className="font-title-md text-title-md font-bold text-on-surface">Edit Income</h2>
              <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                Update your recurring revenue details.
              </p>
            </div>
          </div>
          <button
            onClick={closeEditIncome}
            disabled={isSaving || isRemoving}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container-high transition-colors text-on-surface-variant focus:outline-none"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSave} className="p-xl space-y-xl text-left">
          
          {/* Source Name */}
          <div className="space-y-2">
            <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider font-bold" htmlFor="income-source">
              Income Source
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline">
                business
              </span>
              <input
                id="income-source"
                type="text"
                required
                disabled={isSaving || isRemoving}
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-surface-container dark:bg-on-surface/5 rounded-xl border border-outline-variant outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md text-on-surface"
              />
            </div>
          </div>

          {/* Amount & Frequency */}
          <div className="grid grid-cols-2 gap-md">
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider font-bold" htmlFor="income-amount">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-outline">$</span>
                <input
                  id="income-amount"
                  type="text"
                  required
                  disabled={isSaving || isRemoving}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-surface-container dark:bg-on-surface/5 rounded-xl border border-outline-variant outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-data-mono text-on-surface"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider font-bold" htmlFor="income-frequency">
                Frequency
              </label>
              <div className="relative">
                <select
                  id="income-frequency"
                  disabled={isSaving || isRemoving}
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value)}
                  className="w-full px-4 pr-10 py-3 bg-surface-container dark:bg-on-surface/5 rounded-xl border border-outline-variant outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md text-on-surface appearance-none cursor-pointer"
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Bi-weekly">Bi-weekly</option>
                  <option value="Weekly">Weekly</option>
                  <option value="One-time">One-time</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>
          </div>

          {/* Category & Date */}
          <div className="grid grid-cols-2 gap-md">
            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider font-bold">
                Category
              </label>
              <div className="relative">
                <select
                  disabled={isSaving || isRemoving}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 pr-10 py-3 bg-surface-container dark:bg-on-surface/5 rounded-xl border border-outline-variant outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md text-on-surface appearance-none cursor-pointer"
                >
                  <option value="Salary">Salary</option>
                  <option value="Investment">Investment</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Rental">Rental</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline pointer-events-none">
                  category
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider font-bold">
                Next Payment Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  disabled={isSaving || isRemoving}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 bg-surface-container dark:bg-on-surface/5 rounded-xl border border-outline-variant outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-body-md text-on-surface"
                />
              </div>
            </div>
          </div>

          {/* Toggle Options */}
          <div className="bg-surface-container-low dark:bg-on-surface/5 p-4 rounded-xl border border-outline-variant/30 space-y-4">
            
            {/* Toggle 1 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-on-surface">
                <span className="material-symbols-outlined text-primary">notifications_active</span>
                <span className="font-body-md">Payment Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  disabled={isSaving || isRemoving}
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-outline-variant/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>

            {/* Toggle 2 */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-on-surface">
                <span className="material-symbols-outlined text-on-surface-variant">history</span>
                <span className="font-body-md">Update past transactions</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer select-none">
                <input
                  type="checkbox"
                  disabled={isSaving || isRemoving}
                  checked={updatePast}
                  onChange={(e) => setUpdatePast(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-outline-variant/50 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
              </label>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="pt-lg border-t border-outline-variant/30 flex justify-between items-center mt-lg">
            <button
              type="button"
              disabled={isSaving || isRemoving}
              onClick={handleRemove}
              className="flex items-center space-x-2 text-expense font-bold hover:bg-error/10 px-4 py-2 rounded-lg transition-colors focus:outline-none active:scale-95"
            >
              {isRemoving ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                  <span>Removing...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-sm">delete</span>
                  <span>Remove Entry</span>
                </>
              )}
            </button>
            <div className="flex space-x-md">
              <button
                type="button"
                disabled={isSaving || isRemoving}
                onClick={closeEditIncome}
                className="px-lg py-2.5 rounded-xl border border-outline-variant/30 font-bold text-on-surface hover:bg-surface-container-high transition-all focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving || isRemoving}
                className="px-lg py-2.5 rounded-xl bg-primary text-on-primary font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:opacity-90 transition-all active:scale-95 flex items-center gap-xs focus:outline-none"
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
