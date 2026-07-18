'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useModal } from '@/components/ModalContext';

type BudgetCategory = {
  name: string;
  subtext: string;
  spent: number;
  limit: number;
  progress: number;
  color: string; // 'primary' | 'expense' | 'warning' | 'success'
  statusText: string;
  statusColor: string;
  icon: string;
  isCritical?: boolean;
};

const categories: BudgetCategory[] = [
  {
    name: 'Housing',
    subtext: 'Rent, Utilities, Insurance',
    spent: 1200,
    limit: 1500,
    progress: 80,
    color: 'bg-primary',
    statusText: 'On Track',
    statusColor: 'text-primary',
    icon: 'home',
  },
  {
    name: 'Food & Dining',
    subtext: 'Groceries, Restaurants',
    spent: 620,
    limit: 500,
    progress: 100,
    color: 'bg-expense',
    statusText: 'CRITICAL',
    statusColor: 'text-expense',
    icon: 'restaurant',
    isCritical: true,
  },
  {
    name: 'Entertainment',
    subtext: 'Streaming, Movies, Fun',
    spent: 185,
    limit: 200,
    progress: 92.5,
    color: 'bg-warning',
    statusText: 'Warning',
    statusColor: 'text-warning',
    icon: 'movie',
  },
  {
    name: 'Transport',
    subtext: 'Fuel, Public Transit',
    spent: 115,
    limit: 350,
    progress: 33,
    color: 'bg-success',
    statusText: 'Healthy',
    statusColor: 'text-success',
    icon: 'commute',
  },
  {
    name: 'Healthcare',
    subtext: 'Insurance, Meds, Visits',
    spent: 0,
    limit: 250,
    progress: 0,
    color: 'bg-primary',
    statusText: 'Unused',
    statusColor: 'text-outline-variant',
    icon: 'medical_services',
  },
  {
    name: 'Shopping',
    subtext: 'Clothes, Electronics',
    spent: 480,
    limit: 400,
    progress: 100,
    color: 'bg-expense',
    statusText: 'ALARM',
    statusColor: 'text-expense',
    icon: 'shopping_bag',
    isCritical: true,
  },
];

export default function Budget() {
  const { openAddExpense, openAddBudget, openEditBudget, openUserProfile } = useModal();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [animateProgress, setAnimateProgress] = useState(false);
  const [spendingView, setSpendingView] = useState<'weekly' | 'monthly'>('weekly');

  useEffect(() => {
    // Trigger progress animations on mount
    const timer = setTimeout(() => setAnimateProgress(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-lg space-y-md text-left">
      <div className="px-lg mb-lg">
        <div className="flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
            account_balance_wallet
          </span>
          <span className="font-title-md text-title-md font-black text-primary">MFI Dashboard</span>
        </div>
        <p className="text-on-surface-variant font-label-caps opacity-70">Professional Tier</p>
      </div>
      <nav className="flex-1 px-sm">
        <div className="space-y-1">
          <a className="flex items-center gap-md px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg group" href="/dashboard">
            <span className="material-symbols-outlined group-hover:text-primary">dashboard</span>
            <span className="font-label-caps">Overview</span>
          </a>
          <a className="flex items-center gap-md px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg group" href="/expenses">
            <span className="material-symbols-outlined group-hover:text-primary">receipt_long</span>
            <span className="font-label-caps">All Expenses</span>
          </a>
          <a className="flex items-center gap-md px-4 py-2 text-primary font-bold border-l-4 border-primary bg-secondary-container/30 rounded-r-lg group" href="/budget">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              account_balance_wallet
            </span>
            <span className="font-label-caps">Monthly Budget</span>
          </a>
          <a className="flex items-center gap-md px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg group" href="#">
            <span className="material-symbols-outlined group-hover:text-primary">ads_click</span>
            <span className="font-label-caps">Financial Goals</span>
          </a>
          <a className="flex items-center gap-md px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg group" href="#">
            <span className="material-symbols-outlined group-hover:text-primary">shield</span>
            <span className="font-label-caps">Security</span>
          </a>
        </div>
      </nav>
      <div className="px-lg pt-md border-t border-outline-variant space-y-md">
        <div className="bg-primary/5 p-md rounded-xl border border-primary/10">
          <p className="text-on-surface font-label-caps font-bold">Limited Space</p>
          <p className="text-on-surface-variant text-xs mb-sm">Upgrade to unlock unlimited budgets.</p>
          <button className="w-full bg-primary text-white py-1.5 rounded-lg text-xs font-bold active:scale-95 transition-transform">
            Upgrade Plan
          </button>
        </div>
        <div className="space-y-1">
          <a className="flex items-center gap-md px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined">help</span>
            <span className="font-label-caps">Help Center</span>
          </a>
          <a className="flex items-center gap-md px-4 py-2 text-on-surface-variant hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-caps">Settings</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col justify-between relative">
      <style>{`
        .progress-bar-glow {
          box-shadow: 0 0 10px rgba(0, 74, 198, 0.2);
        }
        .alert-pulse {
          animation: pulse-red 2s infinite;
        }
        @keyframes pulse-red {
          0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(220, 38, 38, 0); }
          100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
        }
      `}</style>

      {/* TopNavBar */}
      <header className="sticky top-0 z-50 bg-surface-container-lowest shadow-sm border-b border-outline-variant w-full">
        <div className="flex justify-between items-center w-full px-lg py-md max-w-container-max mx-auto h-20">
          <div className="flex items-center gap-md">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 text-on-surface rounded-full hover:bg-surface-container transition-colors focus:outline-none"
              aria-label="Open sidebar"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <span className="font-headline text-2xl font-bold text-primary">Modern Fiscal Intelligence</span>
          </div>
          <nav className="hidden md:flex items-center space-x-lg">
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer font-body-md" href="/dashboard">
              Dashboard
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer font-body-md" href="/expenses">
              Transactions
            </a>
            <a className="text-primary font-bold border-b-2 border-primary pb-1 cursor-pointer font-body-md" href="/budget">
              Reports
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 cursor-pointer font-body-md" href="#">
              Settings
            </a>
          </nav>
          <div className="flex items-center gap-md">
             <button
               onClick={openAddExpense}
               className="bg-primary text-on-primary px-lg py-sm rounded-lg font-label-caps hover:opacity-90 transition-opacity active:scale-95"
             >
               Add Expense
             </button>
            <div
              onClick={openUserProfile}
              className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden border border-outline-variant cursor-pointer hover:ring-2 hover:ring-primary/40 transition-all"
            >
              <Image
                className="w-full h-full object-cover"
                alt="Profile picture"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlF9OjtWuaFgPhpO_1zw2DvHUkdbmPKVLbIXg75p4i99pF8chd-hpCsuo8MFu-TQj0F4XsBTPdv3C3tVWff4TROWb2coFYovwRGidPesFdJDNOLHR24RSIeacWWO-MvhmEzPbaYTGTF5w38qT8tb-_GPz3G6hCC9h6br9jWKQn2oLPXuo-CvLtkcB9sZFim9yq1Y9i6ZYMeug6uJ0N9aeU7-b3z98tHhWsIkZiJN_wuFhw6gKLrewS"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-container-max mx-auto w-full relative">
        {/* SideNavBar (Desktop) */}
        <aside className="hidden md:block w-[280px] bg-surface-container-low border-r border-outline-variant py-lg h-[calc(100vh-80px)] sticky top-20">
          <SidebarContent />
        </aside>

        {/* Mobile Navigation Drawer */}
        {isMobileSidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />
            <aside className="relative w-[280px] bg-surface-container-low border-r border-outline-variant h-full flex flex-col z-50 animate-in slide-in-from-left duration-300">
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="absolute top-4 right-4 p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full focus:outline-none"
                aria-label="Close sidebar"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <SidebarContent />
            </aside>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-grow p-lg md:p-xl space-y-xl overflow-x-hidden text-left">
          
          {/* Header Section */}
          <section className="flex flex-col md:flex-row md:items-end justify-between gap-lg">
            <div>
              <h1 className="font-headline text-3xl font-bold text-on-surface">Monthly Budgeting</h1>
              <p className="text-on-surface-variant font-body-md mt-sm">
                Monitor your spending limits and manage your financial health across 12 active categories.
              </p>
            </div>
            <button
              onClick={openAddBudget}
              className="flex items-center justify-center gap-sm bg-primary text-on-primary px-lg py-md rounded-xl font-title-md shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all active:scale-95 font-semibold"
            >
              <span className="material-symbols-outlined text-white">add_circle</span>
              Create Budget
            </button>
          </section>

          {/* Overview Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
            {/* Total Budget Remaining */}
            <div className="col-span-1 md:col-span-2 glass-card rounded-2xl p-lg flex flex-col justify-between h-48 shadow-sm">
              <div className="flex justify-between items-start">
                <div className="p-sm bg-primary-fixed rounded-lg">
                  <span className="material-symbols-outlined text-primary">savings</span>
                </div>
                <span className="text-success font-label-caps text-label-caps bg-success/10 px-2 py-1 rounded-full font-bold">
                  +12% vs last month
                </span>
              </div>
              <div>
                <p className="text-on-surface-variant font-label-caps">TOTAL BUDGET REMAINING</p>
                <h2 className="text-display-lg text-display-lg text-primary mt-xs font-bold">$4,280.00</h2>
              </div>
            </div>

            {/* Monthly Spent */}
            <div className="col-span-1 glass-card rounded-2xl p-lg flex flex-col justify-between h-48 shadow-sm">
              <div className="p-sm bg-secondary-container rounded-lg w-fit">
                <span className="material-symbols-outlined text-secondary">shopping_cart</span>
              </div>
              <div>
                <p className="text-on-surface-variant font-label-caps">MONTHLY SPENT</p>
                <h3 className="text-title-md text-title-md text-on-surface mt-xs font-bold">$2,120.45</h3>
              </div>
            </div>

            {/* Alerts */}
            <div className="col-span-1 glass-card rounded-2xl p-lg flex flex-col justify-between h-48 shadow-sm">
              <div className="p-sm bg-tertiary-fixed rounded-lg w-fit">
                <span className="material-symbols-outlined text-tertiary">warning</span>
              </div>
              <div>
                <p className="text-on-surface-variant font-label-caps">ALERTS</p>
                <h3 className="text-title-md text-title-md text-expense mt-xs font-bold">2 Over Budget</h3>
              </div>
            </div>
          </div>

          {/* Budget Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {categories.map((cat, index) => (
              <div
                key={index}
                onClick={() => openEditBudget(cat)}
                className={`glass-card rounded-2xl p-lg hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-sm relative overflow-hidden ${
                  cat.isCritical ? 'border-expense/30 bg-expense/5' : ''
                }`}
              >
                {cat.isCritical && (
                  <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
                    <span className="material-symbols-outlined text-expense text-[120px]">
                      {cat.icon}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-start mb-lg">
                  <div className="flex items-center gap-md">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      cat.isCritical
                        ? 'bg-expense text-white alert-pulse'
                        : cat.color === 'bg-warning'
                        ? 'bg-warning/10 text-warning'
                        : cat.color === 'bg-success'
                        ? 'bg-success/10 text-success'
                        : 'bg-primary/10 text-primary'
                    }`}>
                      <span
                        className="material-symbols-outlined text-[24px]"
                        style={{ fontVariationSettings: cat.isCritical ? "'FILL' 1" : undefined }}
                      >
                        {cat.icon}
                      </span>
                    </div>
                    <div>
                      <h4 className={`font-title-md text-title-md font-bold ${cat.isCritical ? 'text-expense' : 'text-on-surface'}`}>
                        {cat.name}
                      </h4>
                      <p className="text-on-surface-variant text-xs">{cat.subtext}</p>
                    </div>
                  </div>
                  <span className={`material-symbols-outlined transition-colors ${
                    cat.isCritical ? 'text-expense' : 'text-outline-variant group-hover:text-primary'
                  }`}>
                    {cat.isCritical ? 'error' : 'more_vert'}
                  </span>
                </div>

                <div className="space-y-sm">
                  <div className="flex justify-between font-label-caps">
                    <span className={cat.isCritical ? 'text-expense font-bold' : 'text-on-surface-variant'}>
                      Spent: <span className={cat.isCritical ? 'font-bold' : 'text-on-surface font-bold'}>${cat.spent}</span>
                    </span>
                    <span className="text-on-surface-variant">Limit: ${cat.limit}</span>
                  </div>
                  <div className="w-full bg-surface-container-high h-3 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-1000 ease-out progress-bar-glow ${cat.color}`}
                      style={{ width: animateProgress ? `${cat.progress}%` : '0%' }}
                    />
                  </div>
                  <div className="flex justify-between items-center pt-xs">
                    <span className={`text-xs ${cat.isCritical ? 'text-expense font-bold' : 'text-on-surface-variant italic'}`}>
                      {cat.spent > cat.limit ? `Over by $${cat.spent - cat.limit}.00` : `${cat.progress}% consumed`}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      cat.isCritical
                        ? 'bg-expense/10 text-expense'
                        : cat.statusText === 'Warning'
                        ? 'text-warning font-bold'
                        : cat.statusText === 'Healthy'
                        ? 'text-success font-bold'
                        : 'text-primary font-bold'
                    }`}>
                      {cat.statusText}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Visual Insight Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
            {/* Spending Patterns */}
            <div className="glass-card rounded-2xl p-lg shadow-sm border border-outline-variant">
              <div className="flex justify-between items-center mb-lg">
                <h4 className="font-title-md text-title-md font-bold">Spending Patterns</h4>
                <div className="flex bg-surface-container p-0.5 rounded-lg">
                  <button
                    onClick={() => setSpendingView('weekly')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      spendingView === 'weekly' ? 'text-primary bg-white shadow-sm' : 'text-on-surface-variant'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setSpendingView('monthly')}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      spendingView === 'monthly' ? 'text-primary bg-white shadow-sm' : 'text-on-surface-variant'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* Chart Grid */}
              <div className="h-64 flex items-end justify-between gap-2 px-4">
                {/* Mon */}
                <div className="w-12 bg-primary/20 rounded-t-lg transition-all hover:bg-primary/45 relative group cursor-pointer" style={{ height: '40%' }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap shadow-md">
                    Mon: $45
                  </div>
                </div>
                {/* Tue */}
                <div className="w-12 bg-primary/20 rounded-t-lg transition-all hover:bg-primary/45 relative group cursor-pointer" style={{ height: '65%' }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap shadow-md">
                    Tue: $82
                  </div>
                </div>
                {/* Wed */}
                <div className="w-12 bg-expense rounded-t-lg transition-all hover:bg-expense/80 relative group cursor-pointer" style={{ height: '95%' }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap shadow-md">
                    Wed: $120
                  </div>
                </div>
                {/* Thu */}
                <div className="w-12 bg-primary/20 rounded-t-lg transition-all hover:bg-primary/45 relative group cursor-pointer" style={{ height: '30%' }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap shadow-md">
                    Thu: $32
                  </div>
                </div>
                {/* Fri */}
                <div className="w-12 bg-primary/20 rounded-t-lg transition-all hover:bg-primary/45 relative group cursor-pointer" style={{ height: '50%' }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap shadow-md">
                    Fri: $58
                  </div>
                </div>
                {/* Sat */}
                <div className="w-12 bg-primary/20 rounded-t-lg transition-all hover:bg-primary/45 relative group cursor-pointer" style={{ height: '80%' }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap shadow-md">
                    Sat: $95
                  </div>
                </div>
                {/* Sun */}
                <div className="w-12 bg-primary/20 rounded-t-lg transition-all hover:bg-primary/45 relative group cursor-pointer" style={{ height: '45%' }}>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-inverse-surface text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap shadow-md">
                    Sun: $50
                  </div>
                </div>
              </div>
              <div className="flex justify-between px-4 mt-4 text-[10px] font-label-caps text-on-surface-variant">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
                <span>SUN</span>
              </div>
            </div>

            {/* Advisor Recommendation */}
            <div className="glass-card rounded-2xl p-lg shadow-sm border border-outline-variant overflow-hidden relative group">
              <div className="relative z-10">
                <h4 className="font-title-md text-title-md mb-md font-bold text-on-surface">
                  Advisor Recommendation
                </h4>
                <div className="flex items-start gap-md bg-secondary-container/50 p-md rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-white">psychology</span>
                  </div>
                  <div>
                    <p className="text-body-md font-bold text-on-surface">Reduce Dining Out</p>
                    <p className="text-body-sm text-on-surface-variant mt-xs">
                      You&apos;ve exceeded your Food budget by 24% this month. Redirecting $50 from Entertainment could help balance your accounts before month-end.
                    </p>
                    <button className="mt-md text-primary font-bold text-sm flex items-center gap-xs hover:gap-md transition-all focus:outline-none">
                      Analyze Details <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Decorative background pattern */}
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors" />
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-outline-variant w-full text-left">
        <div className="w-full px-lg py-xl flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto gap-md">
          <div className="flex flex-col items-center md:items-start gap-xs">
            <span className="font-title-md text-title-md font-bold text-on-surface">Modern Fiscal Intelligence</span>
            <p className="text-on-surface-variant font-body-sm text-center md:text-left">
              © 2024 Modern Fiscal Intelligence. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-lg">
            <a className="text-on-surface-variant font-label-caps hover:text-primary hover:underline transition-all" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant font-label-caps hover:text-primary hover:underline transition-all" href="#">Terms of Service</a>
            <a className="text-on-surface-variant font-label-caps hover:text-primary hover:underline transition-all" href="#">Contact Support</a>
            <a className="text-on-surface-variant font-label-caps hover:text-primary hover:underline transition-all" href="#">Security Overview</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
