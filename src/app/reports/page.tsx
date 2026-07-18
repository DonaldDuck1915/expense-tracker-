'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useModal } from '@/components/ModalContext';

type ReportPeriod = 'monthly' | 'quarterly' | 'annual';

type PerformanceQuarter = {
  quarter: string;
  grossIncome: number;
  totalExpenses: number;
  taxProvision: number;
  netProfit: number;
  status: 'On Track' | 'Completed' | 'Deficit';
};

const quartersData: PerformanceQuarter[] = [
  {
    quarter: 'Q3 2024 (Current)',
    grossIncome: 124500.00,
    totalExpenses: 68200.00,
    taxProvision: 12450.00,
    netProfit: 43850.00,
    status: 'On Track',
  },
  {
    quarter: 'Q2 2024',
    grossIncome: 112000.00,
    totalExpenses: 72400.00,
    taxProvision: 11200.00,
    netProfit: 28400.00,
    status: 'Completed',
  },
  {
    quarter: 'Q1 2024',
    grossIncome: 98000.00,
    totalExpenses: 84000.00,
    taxProvision: 9800.00,
    netProfit: 4200.00,
    status: 'Completed',
  },
  {
    quarter: 'Q4 2023',
    grossIncome: 10500.00,
    totalExpenses: 108000.00,
    taxProvision: 0.00,
    netProfit: -3000.00,
    status: 'Deficit',
  },
];

export default function Reports() {
  const { openAddExpense, openExportReport, openUserProfile } = useModal();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [period, setPeriod] = useState<ReportPeriod>('monthly');
  const [animateChart, setAnimateChart] = useState(false);

  useEffect(() => {
    // Trigger SVG path draw animation on mount
    const timer = setTimeout(() => setAnimateChart(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-lg space-y-md text-left">
      <div className="px-lg pb-md">
        <div className="flex items-center gap-sm">
          <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
          <span className="font-title-md text-title-md font-black text-primary">MFI Dashboard</span>
        </div>
        <p className="font-label-caps text-label-caps text-on-surface-variant mt-1">Professional Tier</p>
      </div>
      <nav className="flex-1 px-md space-y-xs">
        <a className="flex items-center gap-md text-on-surface-variant px-4 py-2 hover:bg-surface-container-high transition-all rounded-lg active:scale-95" href="/dashboard">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-caps text-label-caps">Overview</span>
        </a>
        <a className="flex items-center gap-md text-on-surface-variant px-4 py-2 hover:bg-surface-container-high transition-all rounded-lg active:scale-95" href="/expenses">
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="font-label-caps text-label-caps">All Expenses</span>
        </a>
        <a className="flex items-center gap-md text-on-surface-variant px-4 py-2 hover:bg-surface-container-high transition-all rounded-lg active:scale-95" href="/budget">
          <span className="material-symbols-outlined">account_balance_wallet</span>
          <span className="font-label-caps text-label-caps">Monthly Budget</span>
        </a>
        <a className="flex items-center gap-md text-on-surface-variant px-4 py-2 hover:bg-surface-container-high transition-all rounded-lg active:scale-95" href="#">
          <span className="material-symbols-outlined">ads_click</span>
          <span className="font-label-caps text-label-caps">Financial Goals</span>
        </a>
        <a className="flex items-center gap-md text-on-surface-variant px-4 py-2 hover:bg-surface-container-high transition-all rounded-lg active:scale-95" href="#">
          <span className="material-symbols-outlined">shield</span>
          <span className="font-label-caps text-label-caps">Security</span>
        </a>
      </nav>
      <div className="px-md mt-auto pt-lg">
        <div className="bg-primary/10 p-md rounded-xl mb-md">
          <p className="font-body-sm text-body-sm text-primary font-bold">Pro Account</p>
          <p className="text-[12px] text-on-surface-variant leading-tight">Access advanced fiscal reporting and predictive analytics.</p>
          <button className="w-full mt-md bg-primary text-white py-2 rounded-lg font-label-caps text-label-caps hover:bg-primary-container transition-colors">
            Upgrade Plan
          </button>
        </div>
        <div className="space-y-xs">
          <a className="flex items-center gap-md text-on-surface-variant px-4 py-2 hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined">help</span>
            <span className="font-label-caps text-label-caps">Help Center</span>
          </a>
          <a className="flex items-center gap-md text-on-surface-variant px-4 py-2 hover:bg-surface-container-high transition-all rounded-lg" href="#">
            <span className="material-symbols-outlined">settings</span>
            <span className="font-label-caps text-label-caps">Settings</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col justify-between relative overflow-x-hidden">
      
      <style>{`
        @keyframes draw {
          to { stroke-dashoffset: 0; }
        }
        .draw-line {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: draw 2s ease-out forwards;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(226, 232, 240, 0.8);
        }
      `}</style>

      {/* TopNavBar */}
      <header className="bg-surface-container-lowest dark:bg-surface-container-low w-full top-0 shadow-sm border-b border-outline-variant dark:border-outline z-50 sticky">
        <div className="flex justify-between items-center w-full px-lg py-md max-w-container-max mx-auto h-20">
          <div className="flex items-center gap-md">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 text-on-surface rounded-full hover:bg-surface-container transition-colors focus:outline-none"
              aria-label="Open sidebar"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <span className="font-headline text-2xl font-bold text-primary dark:text-primary-fixed">
              Modern Fiscal Intelligence
            </span>
          </div>
          <nav className="hidden md:flex space-x-lg items-center">
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md" href="/dashboard">
              Dashboard
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md" href="/expenses">
              Transactions
            </a>
            <a className="text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed pb-1 font-body-md" href="/reports">
              Reports
            </a>
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md" href="#">
              Settings
            </a>
          </nav>
          <div className="flex items-center gap-md">
            <button
              onClick={openAddExpense}
              className="bg-primary text-on-primary px-lg py-sm rounded-lg font-label-caps text-label-caps cursor-pointer active:opacity-80 transition-opacity"
            >
              Add Expense
            </button>
            <div
              onClick={openUserProfile}
              className="w-10 h-10 rounded-full overflow-hidden bg-surface-container border border-outline-variant cursor-pointer hover:ring-2 hover:ring-primary/40 transition-all"
            >
              <Image
                className="w-full h-full object-cover"
                alt="Profile avatar"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGQt8GMIwcYC-845jSWab8tAm_uY2EvIZ0mnp1IaqzcKvRwMiUPP5Vb06hjbQyvWOnISNaIccXn_uJeeFxc2_3g9tthVwzQrMxhpMIV-uUJwPkgqtJ4MChfaid_q-PrbNGDiROkQEcDrvFBMqsb7v_LBZ_2rvDrWmPfh6j1kEgAM5uOvoH0VgOcFXXYBs6vySJuUfZXQ9uq1TokaBmKn62XkPNgjrU7fzfipfKq2VIHn3gUu7qRYml"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-container-max mx-auto w-full relative">
        {/* SideNavBar (Desktop) */}
        <aside className="hidden md:block w-[280px] bg-surface-container-low dark:bg-surface-dim border-r border-outline-variant dark:border-outline py-lg h-[calc(100vh-80px)] sticky top-20">
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
        <main className="flex-1 p-lg md:p-xl space-y-lg overflow-y-auto text-left">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-md mb-xl">
            <div>
              <h1 className="font-headline text-3xl font-bold text-on-surface">Analytics &amp; Reports</h1>
              <p className="font-body-md text-on-surface-variant mt-1">
                Review your fiscal performance and cash flow trends across all accounts.
              </p>
            </div>
          <div className="flex items-center gap-sm flex-wrap">
            <div className="flex items-center gap-sm bg-surface-container p-1 rounded-lg">
              <button
                onClick={() => setPeriod('monthly')}
                className={`px-lg py-2 rounded font-label-caps text-label-caps transition-all ${
                  period === 'monthly'
                    ? 'bg-surface-container-lowest shadow-sm text-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setPeriod('quarterly')}
                className={`px-lg py-2 rounded font-label-caps text-label-caps transition-all ${
                  period === 'quarterly'
                    ? 'bg-surface-container-lowest shadow-sm text-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Quarterly
              </button>
              <button
                onClick={() => setPeriod('annual')}
                className={`px-lg py-2 rounded font-label-caps text-label-caps transition-all ${
                  period === 'annual'
                    ? 'bg-surface-container-lowest shadow-sm text-primary font-bold'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                Annual
              </button>
            </div>
            <button
              onClick={openExportReport}
              className="flex items-center gap-sm px-lg py-2 rounded-lg border border-outline text-on-surface font-label-caps text-label-caps hover:bg-surface-container-high dark:hover:bg-surface-container active:scale-95 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">download</span>
              Export Report
            </button>
          </div>
          </div>

          {/* Bento Grid - Charts & Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
            
            {/* Cash Flow Line Graph */}
            <div className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm flex flex-col">
              <div className="flex justify-between items-center mb-lg">
                <h2 className="font-title-md text-title-md font-bold text-on-surface">Cash Flow Trends</h2>
                <div className="flex items-center gap-md font-semibold">
                  <div className="flex items-center gap-xs">
                    <span className="w-3 h-3 rounded-full bg-income" />
                    <span className="text-[12px] text-on-surface-variant">Income</span>
                  </div>
                  <div className="flex items-center gap-xs">
                    <span className="w-3 h-3 rounded-full bg-expense" />
                    <span className="text-[12px] text-on-surface-variant">Expense</span>
                  </div>
                </div>
              </div>
              
              {/* SVG Chart Mockup */}
              <div className="relative w-full h-[320px] bg-background-alt rounded-lg overflow-hidden flex items-end px-md pb-md border border-outline-variant/10">
                <svg className="w-full h-[260px] preserve-3d" viewBox="0 0 800 300">
                  {/* Grid lines */}
                  <line stroke="#e2e8f0" strokeDasharray="4" x1="0" x2="800" y1="50" y2="50" />
                  <line stroke="#e2e8f0" strokeDasharray="4" x1="0" x2="800" y1="150" y2="150" />
                  <line stroke="#e2e8f0" strokeDasharray="4" x1="0" x2="800" y1="250" y2="250" />
                  
                  {/* Line 1: Income */}
                  <path
                    d="M0,220 Q100,80 200,120 T400,60 T600,90 T800,40"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="3"
                    className={animateChart ? 'draw-line' : ''}
                  />
                  <path
                    d="M0,220 Q100,80 200,120 T400,60 T600,90 T800,40 V300 H0 Z"
                    fill="url(#gradIncome)"
                    opacity="0.1"
                  />
                  
                  {/* Line 2: Expense */}
                  <path
                    d="M0,280 Q100,200 200,240 T400,180 T600,220 T800,160"
                    fill="none"
                    stroke="#DC2626"
                    strokeWidth="3"
                    className={animateChart ? 'draw-line' : ''}
                  />
                  <path
                    d="M0,280 Q100,200 200,240 T400,180 T600,220 T800,160 V300 H0 Z"
                    fill="url(#gradExpense)"
                    opacity="0.1"
                  />
                  
                  <defs>
                    <linearGradient id="gradIncome" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#059669', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#059669', stopOpacity: 0 }} />
                    </linearGradient>
                    <linearGradient id="gradExpense" x1="0%" x2="0%" y1="0%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#DC2626', stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: '#DC2626', stopOpacity: 0 }} />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute bottom-4 left-0 w-full flex justify-between px-md font-label-caps text-[10px] text-on-surface-variant font-bold">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                </div>
              </div>
            </div>

            {/* Category Breakdown Donut Chart */}
            <div className="lg:col-span-4 bg-surface-container-lowest border border-outline-variant p-lg rounded-xl shadow-sm flex flex-col">
              <h2 className="font-title-md text-title-md font-bold text-on-surface mb-lg">Expense Categories</h2>
              <div className="relative flex-1 flex flex-col items-center justify-center">
                {/* Donut Graphic Mockup */}
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" fill="transparent" r="16" stroke="#e2e8f0" strokeWidth="4" />
                    <circle
                      cx="18"
                      cy="18"
                      fill="transparent"
                      r="16"
                      stroke="#004ac6"
                      strokeDasharray="40 100"
                      strokeDashoffset="0"
                      strokeWidth="4"
                      className="transition-all duration-1000"
                      style={{ strokeDasharray: animateChart ? '40 100' : '0 100' }}
                    />
                    <circle
                      cx="18"
                      cy="18"
                      fill="transparent"
                      r="16"
                      stroke="#943700"
                      strokeDasharray="25 100"
                      strokeDashoffset="-40"
                      strokeWidth="4"
                      className="transition-all duration-1000"
                      style={{ strokeDasharray: animateChart ? '25 100' : '0 100' }}
                    />
                    <circle
                      cx="18"
                      cy="18"
                      fill="transparent"
                      r="16"
                      stroke="#059669"
                      strokeDasharray="15 100"
                      strokeDashoffset="-65"
                      strokeWidth="4"
                      className="transition-all duration-1000"
                      style={{ strokeDasharray: animateChart ? '15 100' : '0 100' }}
                    />
                    <circle
                      cx="18"
                      cy="18"
                      fill="transparent"
                      r="16"
                      stroke="#F59E0B"
                      strokeDasharray="20 100"
                      strokeDashoffset="-80"
                      strokeWidth="4"
                      className="transition-all duration-1000"
                      style={{ strokeDasharray: animateChart ? '20 100' : '0 100' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <p className="font-headline text-3xl font-black text-on-surface mb-0">$8.4k</p>
                    <p className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">
                      Total Spend
                    </p>
                  </div>
                </div>
                <div className="w-full mt-lg space-y-sm">
                  <div className="flex justify-between items-center text-body-sm">
                    <div className="flex items-center gap-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                      <span>Housing &amp; Utilities</span>
                    </div>
                    <span className="font-data-mono text-data-mono font-bold">40%</span>
                  </div>
                  <div className="flex justify-between items-center text-body-sm">
                    <div className="flex items-center gap-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-tertiary" />
                      <span>Operations</span>
                    </div>
                    <span className="font-data-mono text-data-mono font-bold">25%</span>
                  </div>
                  <div className="flex justify-between items-center text-body-sm">
                    <div className="flex items-center gap-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-income" />
                      <span>Technology</span>
                    </div>
                    <span className="font-data-mono text-data-mono font-bold">15%</span>
                  </div>
                  <div className="flex justify-between items-center text-body-sm">
                    <div className="flex items-center gap-sm">
                      <span className="w-2.5 h-2.5 rounded-full bg-warning" />
                      <span>Miscellaneous</span>
                    </div>
                    <span className="font-data-mono text-data-mono font-bold">20%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Insights Row */}
            <div className="lg:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-lg">
              {/* Profitability */}
              <div className="glass-card p-lg rounded-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-md mb-sm">
                  <div className="w-10 h-10 rounded-lg bg-income/10 flex items-center justify-center text-income shrink-0">
                    <span className="material-symbols-outlined">trending_up</span>
                  </div>
                  <h3 className="font-title-md text-title-md font-bold text-on-surface">Profitability</h3>
                </div>
                <p className="text-headline-lg text-income font-bold text-3xl mb-1">+12.4%</p>
                <p className="text-body-sm text-on-surface-variant">
                  Compared to last quarter. Revenue is outpacing fixed costs significantly.
                </p>
              </div>

              {/* Burn Rate */}
              <div className="glass-card p-lg rounded-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-md mb-sm">
                  <div className="w-10 h-10 rounded-lg bg-expense/10 flex items-center justify-center text-expense shrink-0">
                    <span className="material-symbols-outlined">savings</span>
                  </div>
                  <h3 className="font-title-md text-title-md font-bold text-on-surface">Burn Rate</h3>
                </div>
                <p className="text-headline-lg text-on-surface font-bold text-3xl mb-1">
                  $2,840<span className="text-body-md font-normal text-on-surface-variant">/mo</span>
                </p>
                <p className="text-body-sm text-on-surface-variant">
                  Projected runway: 18 months based on current liquid assets.
                </p>
              </div>

              {/* Accuracy */}
              <div className="glass-card p-lg rounded-xl hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-md mb-sm">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined">analytics</span>
                  </div>
                  <h3 className="font-title-md text-title-md font-bold text-on-surface">Accuracy</h3>
                </div>
                <p className="text-headline-lg text-primary font-bold text-3xl mb-1">99.8%</p>
                <p className="text-body-sm text-on-surface-variant">
                  Automatic reconciliation successful for 1,240 transactions this month.
                </p>
              </div>
            </div>

            {/* Performance Summary Table */}
            <div className="lg:col-span-12 bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
              <div className="p-lg border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-md">
                <div>
                  <h2 className="font-title-md text-title-md font-bold text-on-surface">Quarterly Performance</h2>
                  <p className="text-body-sm text-on-surface-variant">
                    Comparative analysis of financial health indicators by quarter.
                  </p>
                </div>
                <button className="flex items-center gap-xs px-md py-2 border border-outline text-on-surface rounded-lg hover:bg-surface-container transition-all focus:outline-none">
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span className="font-label-caps text-label-caps font-semibold">Export CSV</span>
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low/50">
                      <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant">Quarter</th>
                      <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant">Gross Income</th>
                      <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant">Total Expenses</th>
                      <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant">Tax Provision</th>
                      <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant text-right">Net Profit</th>
                      <th className="px-lg py-md font-label-caps text-label-caps text-on-surface-variant text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30 text-body-sm">
                    {quartersData.map((q, index) => {
                      const isProfit = q.netProfit >= 0;
                      return (
                        <tr
                          key={index}
                          style={{
                            opacity: animateChart ? 1 : 0,
                            transform: animateChart ? 'translateY(0)' : 'translateY(10px)',
                            transition: 'all 0.4s ease',
                            transitionDelay: `${index * 50}ms`,
                          }}
                          className="hover:bg-surface-container-low/50 transition-colors cursor-default"
                        >
                          <td className="px-lg py-md font-semibold">{q.quarter}</td>
                          <td className="px-lg py-md font-data-mono text-data-mono">${q.grossIncome.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                          <td className="px-lg py-md font-data-mono text-data-mono">${q.totalExpenses.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                          <td className="px-lg py-md font-data-mono text-data-mono">${q.taxProvision.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                          <td className={`px-lg py-md font-data-mono text-data-mono text-right font-bold ${isProfit ? 'text-income' : 'text-expense'}`}>
                            {isProfit ? '+' : '-'}${Math.abs(q.netProfit).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                          </td>
                          <td className="px-lg py-md text-right">
                            <span className={`px-sm py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              q.status === 'Deficit'
                                ? 'bg-expense/10 text-expense'
                                : 'bg-income/10 text-income'
                            }`}>
                              {q.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-outline-variant w-full bottom-0 text-left">
        <div className="w-full px-lg py-xl flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto gap-md">
          <div className="flex flex-col md:flex-row items-center gap-md">
            <span className="font-title-md text-title-md font-bold text-on-surface dark:text-on-surface">Modern Fiscal Intelligence</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-surface-variant">© 2024 Modern Fiscal Intelligence. All rights reserved.</p>
          </div>
          <nav className="flex gap-lg">
            <a className="text-on-surface-variant hover:text-primary transition-all font-label-caps text-label-caps hover:underline cursor-pointer" href="#">Privacy Policy</a>
            <a className="text-on-surface-variant hover:text-primary transition-all font-label-caps text-label-caps hover:underline cursor-pointer" href="#">Terms of Service</a>
            <a className="text-on-surface-variant hover:text-primary transition-all font-label-caps text-label-caps hover:underline cursor-pointer" href="#">Contact Support</a>
            <a className="text-on-surface-variant hover:text-primary transition-all font-label-caps text-label-caps hover:underline cursor-pointer" href="#">Security Overview</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
