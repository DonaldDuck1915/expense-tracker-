'use client';

import React, { useState, useEffect } from 'react';
import { useModal } from './ModalContext';

export default function AddBudgetModal() {
  const { isAddBudgetOpen, closeAddBudget } = useModal();
  
  // Slider states
  const [income, setIncome] = useState(5200);
  const [housing, setHousing] = useState(1800);
  const [food, setFood] = useState(600);
  const [transport, setTransport] = useState(400);
  const [entertainment, setEntertainment] = useState(300);
  const [savings, setSavings] = useState(1000);

  // Interaction states
  const [isSavingDraft, setIsSavingDraft] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);

  useEffect(() => {
    if (isAddBudgetOpen) {
      setIncome(5200);
      setHousing(1800);
      setFood(600);
      setTransport(400);
      setEntertainment(300);
      setSavings(1000);
      setIsSavingDraft(false);
      setIsConfirming(false);
    }
  }, [isAddBudgetOpen]);

  if (!isAddBudgetOpen) return null;

  // Real-time calculations
  const totalExpenses = housing + food + transport + entertainment;
  const remaining = income - totalExpenses - savings;
  
  const capVal = (val: number) => Math.min(251.2, Math.max(0, val));
  
  const expenseDashoffset = income > 0 ? capVal(251.2 - (totalExpenses / income * 251.2)) : 251.2;
  const savingsDashoffset = income > 0 ? capVal(251.2 - ((totalExpenses + savings) / income * 251.2)) : 251.2;
  const efficiency = income > 0 ? Math.round(((savings + totalExpenses) / income) * 100) : 0;

  // Insights triggers
  const housingPercent = income > 0 ? Math.round((housing / income) * 100) : 0;
  const savingsPercent = income > 0 ? Math.round((savings / income) * 100) : 0;

  const handleSaveDraft = () => {
    setIsSavingDraft(true);
    setTimeout(() => {
      setIsSavingDraft(false);
      alert('Draft saved.');
      closeAddBudget();
    }, 800);
  };

  const handleConfirm = () => {
    setIsConfirming(true);
    setTimeout(() => {
      setIsConfirming(false);
      alert('Budget confirmed successfully!');
      closeAddBudget();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="bg-surface-container-lowest dark:bg-surface-container-low w-full max-w-4xl rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left Section: Form */}
        <div className="w-full md:w-3/5 p-xl flex flex-col overflow-y-auto custom-scrollbar text-left">
          
          <div className="mb-xl">
            <h2 className="font-title-md text-headline-lg font-bold text-on-surface">Create Monthly Budget</h2>
            <p className="font-body-sm text-on-surface-variant mt-sm">
              Set your financial guardrails for the upcoming month. Strategic planning today ensures security tomorrow.
            </p>
          </div>

          <div className="space-y-lg flex-1">
            {/* Income Context */}
            <div className="p-md bg-surface-container-low dark:bg-on-surface/5 rounded-xl border border-outline-variant/30">
              <label className="font-label-caps text-label-caps text-on-surface-variant font-bold mb-xs block">
                Estimated Monthly Income
              </label>
              <div className="flex items-center gap-md">
                <span className="text-title-md font-bold text-income">$</span>
                <input
                  type="number"
                  value={income}
                  onChange={(e) => setIncome(Number(e.target.value))}
                  className="bg-transparent border-none focus:ring-0 text-title-md font-bold text-on-surface w-full p-0 outline-none"
                />
              </div>
            </div>

            {/* Category sliders */}
            <div className="space-y-md">
              <h3 className="font-body-md font-bold text-on-surface">Category Limits</h3>

              {/* Housing */}
              <div className="flex items-center gap-md group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined">home</span>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-xs">
                    <span className="font-body-sm font-semibold">Housing</span>
                    <span className="font-data-mono text-on-surface-variant text-sm font-semibold">
                      ${housing.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="3000"
                    value={housing}
                    onChange={(e) => setHousing(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-surface-variant rounded-full cursor-pointer"
                  />
                </div>
              </div>

              {/* Food & Dining */}
              <div className="flex items-center gap-md group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined">restaurant</span>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-xs">
                    <span className="font-body-sm font-semibold">Food &amp; Dining</span>
                    <span className="font-data-mono text-on-surface-variant text-sm font-semibold">
                      ${food.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1500"
                    value={food}
                    onChange={(e) => setFood(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-surface-variant rounded-full cursor-pointer"
                  />
                </div>
              </div>

              {/* Transportation */}
              <div className="flex items-center gap-md group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined">directions_car</span>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-xs">
                    <span className="font-body-sm font-semibold">Transportation</span>
                    <span className="font-data-mono text-on-surface-variant text-sm font-semibold">
                      ${transport.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={transport}
                    onChange={(e) => setTransport(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-surface-variant rounded-full cursor-pointer"
                  />
                </div>
              </div>

              {/* Entertainment */}
              <div className="flex items-center gap-md group">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
                  <span className="material-symbols-outlined">movie</span>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-xs">
                    <span className="font-body-sm font-semibold">Entertainment</span>
                    <span className="font-data-mono text-on-surface-variant text-sm font-semibold">
                      ${entertainment.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={entertainment}
                    onChange={(e) => setEntertainment(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-surface-variant rounded-full cursor-pointer"
                  />
                </div>
              </div>

              {/* Savings Goal */}
              <div className="flex items-center gap-md group">
                <div className="w-12 h-12 rounded-full bg-income/10 flex items-center justify-center shrink-0 text-income">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    trending_up
                  </span>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-center mb-xs">
                    <span className="font-body-sm font-semibold text-income">Savings Goal</span>
                    <span className="font-data-mono text-income text-sm font-semibold">
                      ${savings.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={savings}
                    onChange={(e) => setSavings(Number(e.target.value))}
                    className="w-full accent-income h-1 bg-surface-variant rounded-full cursor-pointer"
                  />
                </div>
              </div>

            </div>
          </div>

          <div className="mt-xl flex gap-md pt-lg border-t border-outline-variant/30">
            <button
              onClick={handleConfirm}
              disabled={isSavingDraft || isConfirming}
              className="flex-grow py-3 bg-primary text-on-primary font-bold font-label-caps text-xs rounded-xl shadow-lg hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-xs focus:outline-none"
            >
              {isConfirming ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                  <span>Confirming...</span>
                </>
              ) : (
                <span>Confirm Budget Plan</span>
              )}
            </button>
            <button
              onClick={handleSaveDraft}
              disabled={isSavingDraft || isConfirming}
              className="px-xl py-3 bg-surface-container-high dark:bg-on-surface/10 text-on-surface font-bold font-label-caps text-xs rounded-xl hover:bg-surface-variant dark:hover:bg-on-surface/15 transition-colors focus:outline-none"
            >
              {isSavingDraft ? 'Saving...' : 'Save Draft'}
            </button>
          </div>
        </div>

        {/* Right Section: Visualization */}
        <div className="w-full md:w-2/5 bg-surface-container-low dark:bg-on-surface/5 p-xl border-l border-outline-variant/30 flex flex-col justify-between text-left">
          <div>
            <div className="mb-lg">
              <h3 className="font-label-caps text-label-caps text-on-surface-variant font-bold uppercase tracking-widest">
                Proposed Allocation
              </h3>
              <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">
                Real-time health check based on your limits.
              </p>
            </div>

            {/* Circular Gauge Chart */}
            <div className="relative w-full aspect-square max-w-[220px] mx-auto flex items-center justify-center mb-xl">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                {/* Background circle track */}
                <circle
                  className="text-surface-container-highest dark:text-on-surface/10"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="8"
                />
                {/* Savings Track */}
                <circle
                  className="text-income transition-all duration-300"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="currentColor"
                  strokeDasharray="251.2"
                  strokeDashoffset={savingsDashoffset}
                  strokeWidth="8"
                />
                {/* Expense Track */}
                <circle
                  className="text-primary transition-all duration-300"
                  cx="50"
                  cy="50"
                  fill="transparent"
                  r="40"
                  stroke="currentColor"
                  strokeDasharray="251.2"
                  strokeDashoffset={expenseDashoffset}
                  strokeWidth="8"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-label-caps text-[10px] text-on-surface-variant font-bold uppercase">Remaining</span>
                <span
                  className={`font-headline-lg text-title-md font-bold mt-0.5 ${
                    remaining < 0 ? 'text-expense animate-pulse' : 'text-on-surface'
                  }`}
                >
                  ${remaining.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Statistics */}
            <div className="space-y-md">
              <div className="flex justify-between items-center p-md bg-surface-container-lowest dark:bg-surface-container-low border border-outline-variant/30 rounded-xl">
                <div>
                  <p className="font-label-caps text-[10px] text-on-surface-variant font-bold">Total Expenses</p>
                  <p className="font-title-md text-primary font-bold text-base mt-0.5">${totalExpenses.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-label-caps text-[10px] text-on-surface-variant font-bold">Efficiency</p>
                  <p className="font-title-md text-on-surface font-bold text-base mt-0.5">{efficiency}%</p>
                </div>
              </div>

              {/* Insights */}
              <div className="p-md rounded-xl border border-outline-variant/30 bg-surface-container-lowest dark:bg-surface-container-low space-y-sm">
                <h4 className="font-label-caps text-[10px] text-on-surface-variant font-bold">Insights</h4>
                <div className="space-y-2">
                  {housingPercent > 30 ? (
                    <div className="flex items-start gap-sm">
                      <span className="material-symbols-outlined text-warning text-[16px] mt-0.5">info</span>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Housing is <span className="font-bold text-on-surface">{housingPercent}%</span> of your total income. Financial experts recommend keeping it under 30%.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-sm">
                      <span className="material-symbols-outlined text-success text-[16px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Your housing rate of <span className="font-bold text-on-surface">{housingPercent}%</span> is within safe guidelines.
                      </p>
                    </div>
                  )}

                  {savingsPercent >= 15 ? (
                    <div className="flex items-start gap-sm">
                      <span className="material-symbols-outlined text-success text-[16px] mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Your savings rate of <span className="font-bold text-on-surface">{savingsPercent}%</span> is excellent for your current bracket.
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-start gap-sm">
                      <span className="material-symbols-outlined text-warning text-[16px] mt-0.5">info</span>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Your savings goal is <span className="font-bold text-on-surface">{savingsPercent}%</span>. Aim for at least 15% to increase security.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>

          <div className="pt-xl flex justify-center items-center">
            <span className="material-symbols-outlined text-outline text-[48px] opacity-20">analytics</span>
          </div>
        </div>

        {/* Close Button overlay */}
        <button
          onClick={closeAddBudget}
          disabled={isSavingDraft || isConfirming}
          className="absolute top-4 right-4 p-1.5 bg-surface-container-high hover:bg-surface-variant dark:bg-on-surface/10 dark:hover:bg-on-surface/20 rounded-full transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <span className="material-symbols-outlined">close</span>
        </button>

      </div>
    </div>
  );
}
