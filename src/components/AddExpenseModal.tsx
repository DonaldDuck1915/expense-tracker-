'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useModal } from './ModalContext';

export default function AddExpenseModal() {
  const { isAddExpenseOpen, closeAddExpense } = useModal();
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  
  // Drag & Drop attachment state
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submit button states
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Set today's date as default on mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, [isAddExpenseOpen]);

  if (!isAddExpenseOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = () => {
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFileName(e.dataTransfer.files[0].name);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleDropzoneClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate server request processing for 1.5 seconds
    setTimeout(() => {
      setIsProcessing(false);
      setIsSaved(true);
      
      // Keep "Saved" state for 800ms, then close and reset form
      setTimeout(() => {
        setIsSaved(false);
        setAmount('');
        setCategory('');
        setDescription('');
        setFileName(null);
        closeAddExpense();
      }, 800);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Card */}
      <section className="bg-surface-container-lowest dark:bg-surface-container-low w-full max-w-[600px] rounded-xl shadow-2xl border border-outline-variant/30 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Modal Header */}
        <header className="px-xl py-lg border-b border-outline-variant/30 flex justify-between items-center text-left">
          <div>
            <h3 className="font-title-md text-headline-lg font-bold text-primary dark:text-primary-fixed">
              Add Expense
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Log a new transaction to your professional ledger.
            </p>
          </div>
          <button
            onClick={closeAddExpense}
            className="p-1 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors focus:outline-none"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </header>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-xl space-y-lg text-left">
          
          {/* Row 1: Amount and Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            
            {/* Amount */}
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant font-bold block" htmlFor="modal-amount">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-md top-1/2 -translate-y-1/2 text-on-surface-variant font-data-mono font-bold">$</span>
                <input
                  id="modal-amount"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  required
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full pl-xl pr-md py-md bg-white dark:bg-on-surface/5 border border-outline-variant rounded-lg font-data-mono outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Date */}
            <div className="space-y-xs">
              <label className="font-label-caps text-label-caps text-on-surface-variant font-bold block" htmlFor="modal-date">
                Date
              </label>
              <input
                id="modal-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-md py-md bg-white dark:bg-on-surface/5 border border-outline-variant rounded-lg font-body-md outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>

          {/* Row 2: Category */}
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant font-bold block" htmlFor="modal-category">
              Category
            </label>
            <div className="relative">
              <select
                id="modal-category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-md py-md bg-white dark:bg-on-surface/5 border border-outline-variant rounded-lg font-body-md appearance-none outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              >
                <option value="" disabled>Select a category</option>
                <option value="travel">Travel &amp; Transport</option>
                <option value="office">Office Supplies</option>
                <option value="software">Software &amp; Subscriptions</option>
                <option value="meals">Business Meals</option>
                <option value="marketing">Marketing &amp; Ads</option>
                <option value="other">Other</option>
              </select>
              <span className="absolute right-md top-1/2 -translate-y-1/2 material-symbols-outlined pointer-events-none text-outline">
                expand_more
              </span>
            </div>
          </div>

          {/* Row 3: Description */}
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant font-bold block" htmlFor="modal-desc">
              Description
            </label>
            <textarea
              id="modal-desc"
              placeholder="What was this expense for?"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-md py-md bg-white dark:bg-on-surface/5 border border-outline-variant rounded-lg font-body-md resize-none outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {/* Row 4: Attachment */}
          <div className="space-y-xs">
            <label className="font-label-caps text-label-caps text-on-surface-variant font-bold block">
              Receipt Attachment
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleDropzoneClick}
              className={`border-2 border-dashed rounded-xl p-lg flex flex-col items-center justify-center space-y-sm transition-all cursor-pointer group ${
                isDragActive
                  ? 'border-primary bg-primary/10'
                  : 'border-outline-variant bg-surface-container-low/50 hover:bg-surface-container-low hover:border-outline'
              }`}
            >
              <div className="w-10 h-10 rounded-full bg-secondary-container/50 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">cloud_upload</span>
              </div>
              <div className="text-center">
                <p className={`font-body-md font-semibold ${fileName ? 'text-primary' : 'text-on-surface'}`}>
                  {fileName ? `Selected: ${fileName}` : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  PDF, PNG, or JPG (max. 10MB)
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Modal Footer Actions */}
          <footer className="flex items-center justify-end space-x-md pt-lg border-t border-outline-variant/30">
            <button
              type="button"
              onClick={closeAddExpense}
              className="px-lg py-md font-label-caps text-label-caps font-semibold text-secondary hover:bg-surface-container-high rounded-full transition-colors active:scale-95 focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing || isSaved}
              className={`px-xl py-md font-label-caps text-label-caps font-bold rounded-full shadow-sm active:scale-95 transition-all flex items-center space-x-sm focus:outline-none ${
                isSaved
                  ? 'bg-success text-white'
                  : 'bg-primary text-on-primary hover:opacity-90'
              }`}
            >
              {isProcessing ? (
                <>
                  <span className="material-symbols-outlined animate-spin">progress_activity</span>
                  <span>Processing...</span>
                </>
              ) : isSaved ? (
                <>
                  <span className="material-symbols-outlined">check</span>
                  <span>Saved</span>
                </>
              ) : (
                <>
                  <span>Save Expense</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </>
              )}
            </button>
          </footer>

        </form>
      </section>
    </div>
  );
}
