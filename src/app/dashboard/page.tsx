'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useModal } from '@/components/ModalContext';

type Transaction = {
  id: string;
  description: string;
  subtext: string;
  category: string;
  date: string;
  status: 'Cleared' | 'Pending';
  amount: number;
  icon: string;
};

const initialTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Amazon Web Services',
    subtext: 'Monthly Infrastructure Hosting',
    category: 'Cloud Services',
    date: 'Oct 24, 2024',
    status: 'Cleared',
    amount: -432.50,
    icon: 'shopping_cart',
  },
  {
    id: '2',
    description: 'Stripe Payout',
    subtext: 'Sales Revenue Week 42',
    category: 'Income',
    date: 'Oct 23, 2024',
    status: 'Cleared',
    amount: 12400.00,
    icon: 'payments',
  },
  {
    id: '3',
    description: 'Blue Bottle Coffee',
    subtext: 'Client Meeting',
    category: 'Entertainment',
    date: 'Oct 22, 2024',
    status: 'Pending',
    amount: -18.40,
    icon: 'local_cafe',
  },
];

type Goal = {
  name: string;
  current: number;
  target: number;
  progress: number;
  color: string; // 'success' | 'warning' | 'primary'
};

export default function Dashboard() {
  const { openAddExpense, openEditExpense, openUserProfile } = useModal();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [chartPeriod, setChartPeriod] = useState<'6months' | '1year'>('6months');
  const [searchQuery, setSearchQuery] = useState('');
  const [animateProgress, setAnimateProgress] = useState(false);

  useEffect(() => {
    // Trigger animations after mount
    const timer = setTimeout(() => setAnimateProgress(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const filteredTransactions = initialTransactions.filter((tx) =>
    tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.subtext.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const goals: Goal[] = [
    { name: 'New Office Setup', current: 8200, target: 10000, progress: 82, color: 'bg-success' },
    { name: 'Q4 Taxes Reserve', current: 14500, target: 20000, progress: 72.5, color: 'bg-warning' },
    { name: 'Vacation Fund', current: 1200, target: 5000, progress: 24, color: 'bg-primary' },
  ];

  // Helper component to render sidebar items
  const SidebarContent = () => (
    <div className="flex flex-col h-full py-lg space-y-md">
      <div className="px-lg pb-md">
        <div className="flex items-center gap-3 mb-base">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-on-primary">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              account_balance
            </span>
          </div>
          <div>
            <h2 className="font-title-md text-title-md font-black text-primary">MFI Dashboard</h2>
            <p className="font-label-caps text-label-caps text-on-surface-variant">Professional Tier</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-md space-y-xs overflow-y-auto">
        <a
          className="flex items-center gap-4 text-primary font-bold border-l-4 border-primary bg-secondary-container/30 px-4 py-3 transition-transform active:scale-95"
          href="#"
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-title-md text-[16px]">Overview</span>
        </a>
        <a
          className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-high transition-all px-4 py-3 active:scale-95"
          href="#"
        >
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="font-title-md text-[16px]">All Expenses</span>
        </a>
        <a
          className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-high transition-all px-4 py-3 active:scale-95"
          href="#"
        >
          <span className="material-symbols-outlined">account_balance_wallet</span>
          <span className="font-title-md text-[16px]">Monthly Budget</span>
        </a>
        <a
          className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-high transition-all px-4 py-3 active:scale-95"
          href="#"
        >
          <span className="material-symbols-outlined">ads_click</span>
          <span className="font-title-md text-[16px]">Financial Goals</span>
        </a>
        <a
          className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-high transition-all px-4 py-3 active:scale-95"
          href="#"
        >
          <span className="material-symbols-outlined">shield</span>
          <span className="font-title-md text-[16px]">Security</span>
        </a>
      </nav>
      <div className="px-md mt-auto pt-md border-t border-outline-variant/30">
        <div className="bg-primary/5 rounded-xl p-4 mb-lg text-center border border-primary/10">
          <p className="font-label-caps text-label-caps text-primary mb-2">Power User</p>
          <button className="w-full bg-primary text-on-primary py-2 rounded-lg font-label-caps text-label-caps hover:opacity-90 transition-opacity active:scale-95">
            Upgrade Plan
          </button>
        </div>
        <a className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-high transition-all px-4 py-3 mb-1" href="#">
          <span className="material-symbols-outlined">help</span>
          <span className="font-label-caps text-label-caps uppercase">Help Center</span>
        </a>
        <a className="flex items-center gap-4 text-on-surface-variant hover:bg-surface-container-high transition-all px-4 py-3" href="#">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-caps text-label-caps uppercase">Settings</span>
        </a>
      </div>
    </div>
  );

  return (
    <div className="bg-background min-h-screen text-on-surface font-body-md relative">
      {/* Sidebar Navigation (Desktop) */}
      <aside className="fixed left-0 h-full w-[280px] bg-surface-container-low border-r border-outline-variant hidden md:block z-40">
        <SidebarContent />
      </aside>

      {/* Sidebar Drawer (Mobile Overlay) */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
          />
          {/* Sidebar Panel */}
          <aside className="relative w-[280px] bg-surface-container-low border-r border-outline-variant h-full flex flex-col z-50 animate-in slide-in-from-left duration-300">
            <button
              onClick={() => setIsMobileSidebarOpen(false)}
              className="absolute top-4 right-4 p-2 text-on-surface-variant hover:bg-surface-container-high rounded-full focus:outline-none"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main Content Canvas */}
      <main className="md:ml-[280px] min-h-screen flex flex-col justify-between">
        {/* Top Navigation */}
        <header className="sticky top-0 bg-surface-container-lowest shadow-sm z-35 border-b border-outline-variant">
          <div className="flex justify-between items-center w-full px-lg py-md max-w-container-max mx-auto h-20">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileSidebarOpen(true)}
                className="md:hidden p-2 text-on-surface rounded-full hover:bg-surface-container transition-colors focus:outline-none"
                aria-label="Open menu"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <h1 className="font-headline text-3xl font-bold text-primary">Overview</h1>
            </div>
            <div className="flex items-center gap-lg">
              <div className="hidden lg:flex items-center gap-6">
                <a className="text-primary font-bold border-b-2 border-primary pb-1 font-label-caps text-label-caps uppercase tracking-wider" href="#">
                  Dashboard
                </a>
                <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-caps text-label-caps uppercase tracking-wider" href="#">
                  Transactions
                </a>
                <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-caps text-label-caps uppercase tracking-wider" href="#">
                  Reports
                </a>
              </div>
              <div className="flex items-center gap-3">
                 <button
                   onClick={openAddExpense}
                   className="hidden sm:flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-lg font-label-caps text-label-caps uppercase transition-opacity hover:opacity-90 active:opacity-80"
                 >
                   <span className="material-symbols-outlined text-[18px]">add</span>
                   Add Expense
                 </button>
                <div
                  onClick={openUserProfile}
                  className="h-10 w-10 rounded-full bg-surface-container-high border border-outline-variant overflow-hidden cursor-pointer active:opacity-80 hover:ring-2 hover:ring-primary/40 transition-all"
                >
                  <Image
                    className="w-full h-full object-cover"
                    alt="User Profile"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAilmR-v1Ynxnhf_4qH0aD2rHkwmtE7bxcBZUOdJFXctjgQhnYj-KvMKS87_FN_lcNPI4HvTZNsKz4VNUsrdlYMpIqmt0T11GyniLa-Mt96yrLQvqb3QCJ5Kdpsoe2S2q2Xv_YcM_rSSmJ8Ro_8PSNrCix6yegud_P0aKJFxcu40rAzSpcbbidrtGjSfZMcQt_2E7_v9gBOrgTD--FjgVo1TNtGJaMcoph7KXqsKKldGCD71QUCaxOt"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-lg max-w-container-max mx-auto w-full flex-grow text-left">
          
          {/* Bento Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-lg mb-xl">
            {/* Total Balance Card */}
            <div className="col-span-1 md:col-span-4 lg:col-span-4 bento-card bg-primary text-on-primary p-xl rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[220px]">
              <div className="absolute top-0 right-0 p-lg opacity-20 pointer-events-none">
                <span className="material-symbols-outlined text-[120px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  account_balance_wallet
                </span>
              </div>
              <div className="relative z-10">
                <p className="font-label-caps text-label-caps text-on-primary/70 uppercase tracking-widest mb-1">
                  Total Balance
                </p>
                <h3 className="font-display-lg text-display-lg tracking-tight text-white">$42,850.32</h3>
              </div>
              <div className="relative z-10 flex items-center gap-2 text-on-primary/90">
                <span className="bg-success/20 text-white px-2 py-0.5 rounded text-[12px] font-bold">+2.4%</span>
                <p className="text-body-sm font-body-sm text-white/95">vs. last month</p>
              </div>
            </div>

            {/* Monthly Spending Card */}
            <div className="col-span-1 md:col-span-2 lg:col-span-4 bento-card bg-surface-container-lowest border border-outline-variant p-lg rounded-xl flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant uppercase mb-1">
                    Monthly Spending
                  </p>
                  <h3 className="font-headline-lg text-headline-lg">$12,405.00</h3>
                </div>
                <div className="w-12 h-12 bg-expense/10 text-expense rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-[12px] mb-2 font-bold">
                  <span className="text-on-surface-variant">Budget Progress</span>
                  <span className="text-primary">82%</span>
                </div>
                <div className="w-full bg-surface-variant h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-primary h-full transition-all duration-1000 ease-out"
                    style={{ width: animateProgress ? '82%' : '0%' }}
                  />
                </div>
              </div>
            </div>

            {/* Top Expense Quick Insight */}
            <div className="col-span-1 md:col-span-2 lg:col-span-4 bento-card glass-panel p-lg rounded-xl flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-warning/20 text-warning flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    restaurant
                  </span>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant uppercase">Top Expense</p>
                  <p className="font-title-md text-title-md font-bold">Dining &amp; Food</p>
                </div>
              </div>
              <div className="border-t border-outline-variant/30 pt-4">
                <p className="text-body-sm font-body-sm text-on-surface-variant">
                  This category has increased by 15% this week. Consider reviewing your subscriptions.
                </p>
              </div>
              <a className="mt-auto text-primary font-bold text-[14px] flex items-center gap-1 hover:underline font-semibold" href="#">
                View Details <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </a>
            </div>
          </section>

          {/* Secondary Grid: Chart & Active Goals */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg">
            {/* Financial Growth Chart */}
            <section className="lg:col-span-8 bg-surface-container-lowest border border-outline-variant rounded-xl p-lg bento-card">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-lg gap-4">
                <div>
                  <h4 className="font-title-md text-title-md font-bold">Expense Trends</h4>
                  <p className="text-body-sm font-body-sm text-on-surface-variant">
                    Visualizing your cashflow over the last 6 months
                  </p>
                </div>
                <div className="flex bg-surface-container-low p-1 rounded-lg">
                  <button
                    onClick={() => setChartPeriod('6months')}
                    className={`px-4 py-1.5 font-bold rounded-md text-[13px] uppercase tracking-wide transition-all ${
                      chartPeriod === '6months'
                        ? 'text-primary bg-white shadow-sm'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    6 Months
                  </button>
                  <button
                    onClick={() => setChartPeriod('1year')}
                    className={`px-4 py-1.5 font-bold rounded-md text-[13px] uppercase tracking-wide transition-all ${
                      chartPeriod === '1year'
                        ? 'text-primary bg-white shadow-sm'
                        : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    1 Year
                  </button>
                </div>
              </div>

              {/* Chart columns container */}
              <div className="w-full h-80 relative">
                <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
                  {/* Jan */}
                  <div
                    className="w-12 bg-primary/10 rounded-t-md hover:bg-primary/20 transition-all duration-1000 ease-out"
                    style={{ height: animateProgress ? '40%' : '0%' }}
                  />
                  {/* Feb */}
                  <div
                    className="w-12 bg-primary/10 rounded-t-md hover:bg-primary/20 transition-all duration-1000 ease-out"
                    style={{ height: animateProgress ? '60%' : '0%' }}
                  />
                  {/* Mar */}
                  <div
                    className="w-12 bg-primary/10 rounded-t-md hover:bg-primary/20 transition-all duration-1000 ease-out"
                    style={{ height: animateProgress ? '45%' : '0%' }}
                  />
                  {/* Apr (Peak) */}
                  <div
                    className="w-12 bg-primary rounded-t-md relative transition-all duration-1000 ease-out"
                    style={{ height: animateProgress ? '85%' : '0%' }}
                  >
                    {animateProgress && (
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-on-background text-white px-2 py-1 rounded text-[10px] whitespace-nowrap shadow-md">
                        Peak: $14,200
                      </div>
                    )}
                  </div>
                  {/* May */}
                  <div
                    className="w-12 bg-primary/10 rounded-t-md hover:bg-primary/20 transition-all duration-1000 ease-out"
                    style={{ height: animateProgress ? '70%' : '0%' }}
                  />
                  {/* Jun */}
                  <div
                    className="w-12 bg-primary/10 rounded-t-md hover:bg-primary/20 transition-all duration-1000 ease-out"
                    style={{ height: animateProgress ? '55%' : '0%' }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-outline-variant" />
                <div className="absolute left-0 bottom-0 flex flex-col justify-between h-full text-[10px] text-on-surface-variant/50 pr-4 pointer-events-none">
                  <span>20k</span>
                  <span>15k</span>
                  <span>10k</span>
                  <span>5k</span>
                  <span>0</span>
                </div>
              </div>
              <div className="flex justify-between px-16 mt-4 text-[12px] font-label-caps text-on-surface-variant uppercase tracking-tighter">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </section>

            {/* Financial Goals / Security Widgets */}
            <section className="lg:col-span-4 flex flex-col gap-lg">
              {/* Active Goals */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg bento-card flex-1">
                <div className="flex items-center justify-between mb-lg">
                  <h4 className="font-title-md text-title-md font-bold">Active Goals</h4>
                  <span className="material-symbols-outlined text-primary cursor-pointer">more_horiz</span>
                </div>
                <div className="space-y-6">
                  {goals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-end">
                        <span className="font-body-md font-bold">{goal.name}</span>
                        <span className="text-body-sm text-on-surface-variant">
                          ${(goal.current / 1000).toFixed(1)}k / ${(goal.target / 1000).toFixed(1)}k
                        </span>
                      </div>
                      <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${goal.color} transition-all duration-1000 ease-out`}
                          style={{ width: animateProgress ? `${goal.progress}%` : '0%' }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-lg border-2 border-primary/20 text-primary py-3 rounded-xl font-bold hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined">add_circle</span>
                  New Goal
                </button>
              </div>

              {/* Security Alert Widget */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
                <div className="flex gap-4">
                  <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                    verified_user
                  </span>
                  <div>
                    <h5 className="font-bold text-primary">Security Checkup</h5>
                    <p className="text-[13px] text-on-surface-variant mb-3">
                      Your account is 85% secure. Complete your profile for better protection.
                    </p>
                    <a className="text-[13px] font-bold text-primary underline" href="#">
                      Improve Security
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Recent Transactions Table Section */}
          <section className="mt-xl bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden bento-card">
            <div className="p-lg border-b border-outline-variant flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h4 className="font-title-md text-title-md font-bold">Recent Transactions</h4>
                <p className="text-body-sm font-body-sm text-on-surface-variant">Last updated: 5 minutes ago</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant">
                    search
                  </span>
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg text-body-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                </div>
                <button className="bg-surface-container-low p-2 rounded-lg text-on-surface-variant hover:text-primary transition-colors focus:outline-none">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50">
                    <th className="px-lg py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                      Entity / Description
                    </th>
                    <th className="px-lg py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-lg py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-lg py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-lg py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider text-right">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/30">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((tx) => {
                      const isIncome = tx.amount > 0;
                      return (
                        <tr key={tx.id} onClick={() => openEditExpense(tx)} className="hover:bg-surface-container-low transition-colors cursor-pointer group">
                          <td className="px-lg py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface shrink-0">
                                <span className="material-symbols-outlined">{tx.icon}</span>
                              </div>
                              <div>
                                <p className="font-bold">{tx.description}</p>
                                <p className="text-[12px] text-on-surface-variant">{tx.subtext}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-lg py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-[12px] font-bold ${
                                isIncome ? 'bg-income/10 text-income' : 'bg-primary/10 text-primary'
                              }`}
                            >
                              {tx.category}
                            </span>
                          </td>
                          <td className="px-lg py-4 text-body-sm">{tx.date}</td>
                          <td className="px-lg py-4">
                            <div
                              className={`flex items-center gap-1.5 ${
                                tx.status === 'Cleared' ? 'text-success' : 'text-on-surface-variant'
                              }`}
                            >
                              <span
                                className={`w-2 h-2 rounded-full ${
                                  tx.status === 'Cleared' ? 'bg-success' : 'bg-outline-variant'
                                }`}
                              />
                              <span className="text-[12px] font-bold">{tx.status}</span>
                            </div>
                          </td>
                          <td
                            className={`px-lg py-4 text-right font-data-mono text-data-mono font-bold ${
                              isIncome ? 'text-income' : 'text-expense'
                            }`}
                          >
                            {isIncome ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-on-surface-variant">
                        No transactions found matching search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="p-lg bg-surface-container-low/30 border-t border-outline-variant text-center">
              <button className="text-primary font-bold text-body-sm hover:underline">
                View All 154 Transactions
              </button>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="w-full bg-surface-container border-t border-outline-variant mt-auto">
          <div className="w-full px-lg py-xl flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto gap-6 text-left">
            <div>
              <h5 className="font-title-md text-title-md font-bold text-on-surface">Modern Fiscal Intelligence</h5>
              <p className="text-body-sm font-body-sm text-on-surface-variant mt-1">
                © 2024 Modern Fiscal Intelligence. All rights reserved.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
              <a className="text-on-surface-variant hover:text-primary transition-all text-body-sm hover:underline uppercase tracking-tight" href="#">
                Privacy Policy
              </a>
              <a className="text-on-surface-variant hover:text-primary transition-all text-body-sm hover:underline uppercase tracking-tight" href="#">
                Terms of Service
              </a>
              <a className="text-on-surface-variant hover:text-primary transition-all text-body-sm hover:underline uppercase tracking-tight" href="#">
                Contact Support
              </a>
              <a className="text-on-surface-variant hover:text-primary transition-all text-body-sm hover:underline uppercase tracking-tight" href="#">
                Security Overview
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* FAB (Mobile Only) */}
      <button
        onClick={openAddExpense}
        className="md:hidden fixed bottom-6 right-6 w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center z-50 active:scale-95 transition-transform"
      >
        <span className="material-symbols-outlined text-[28px] text-white">add</span>
      </button>
    </div>
  );
}
