'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useModal } from '@/components/ModalContext';

type IncomeItem = {
  id: string;
  source: string;
  category: 'SALARY' | 'FREELANCE' | 'INVESTMENT' | 'RENTAL';
  frequency: string;
  date: string;
  rawDate: string; // YYYY-MM-DD for sorting
  amount: number;
  status: 'ACTIVE' | 'COMPLETED' | 'RECURRING';
  icon: string;
};

const initialIncomeItems: IncomeItem[] = [
  {
    id: '1',
    source: 'TechCorp Global Inc.',
    category: 'SALARY',
    frequency: 'Bi-Weekly',
    date: 'Oct 15, 2024',
    rawDate: '2024-10-15',
    amount: 4250.00,
    status: 'ACTIVE',
    icon: 'corporate_fare',
  },
  {
    id: '2',
    source: 'UX Project: FinLeap',
    category: 'FREELANCE',
    frequency: 'One-time',
    date: 'Oct 12, 2024',
    rawDate: '2024-10-12',
    amount: 1800.00,
    status: 'COMPLETED',
    icon: 'design_services',
  },
  {
    id: '3',
    source: 'S&P 500 Index Dividends',
    category: 'INVESTMENT',
    frequency: 'Quarterly',
    date: 'Sep 30, 2024',
    rawDate: '2024-09-30',
    amount: 645.20,
    status: 'RECURRING',
    icon: 'show_chart',
  },
  {
    id: '4',
    source: 'Westside Studio Rent',
    category: 'RENTAL',
    frequency: 'Monthly',
    date: 'Oct 05, 2024',
    rawDate: '2024-10-05',
    amount: 1200.00,
    status: 'ACTIVE',
    icon: 'apartment',
  },
];

type SortField = 'source' | 'rawDate' | 'category' | 'frequency' | 'amount' | 'status';
type SortOrder = 'asc' | 'desc' | 'none';

export default function Income() {
  const { openAddExpense, openAddIncome, openEditIncome, openUserProfile } = useModal();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [animateRows, setAnimateRows] = useState(false);

  // Sorting State
  const [sortField, setSortField] = useState<SortField>('rawDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    // Trigger staggered entry transitions
    const timer = setTimeout(() => setAnimateRows(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortOrder === 'asc') setSortOrder('desc');
      else if (sortOrder === 'desc') setSortOrder('none');
      else setSortOrder('asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field || sortOrder === 'none') {
      return 'unfold_more';
    }
    return sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward';
  };

  // Sort income items
  const sortedItems = [...initialIncomeItems].sort((a, b) => {
    if (sortOrder === 'none') return 0;

    let aVal: string | number = a[sortField];
    let bVal: string | number = b[sortField];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }

    if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-lg space-y-md text-left">
      <div className="px-lg mb-xl">
        <div className="flex items-center gap-md mb-xs">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-white">account_balance</span>
          </div>
          <span className="font-title-md text-title-md font-black text-primary">MFI Dashboard</span>
        </div>
        <span className="font-label-caps text-label-caps text-on-surface-variant opacity-70">Professional Tier</span>
      </div>
      <nav className="flex-1 space-y-base">
        <a className="px-4 py-2 flex items-center gap-md text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container transition-all cursor-pointer group" href="/dashboard">
          <span className="material-symbols-outlined text-outline group-hover:text-primary">dashboard</span>
          <span className="font-label-caps text-label-caps">Overview</span>
        </a>
        <a className="px-4 py-2 flex items-center gap-md text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container transition-all cursor-pointer group" href="/expenses">
          <span className="material-symbols-outlined text-outline group-hover:text-primary">receipt_long</span>
          <span className="font-label-caps text-label-caps">All Expenses</span>
        </a>
        <a className="px-4 py-2 flex items-center gap-md text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container transition-all cursor-pointer group" href="#">
          <span className="material-symbols-outlined text-outline group-hover:text-primary">account_balance_wallet</span>
          <span className="font-label-caps text-label-caps">Monthly Budget</span>
        </a>
        <a className="px-4 py-2 flex items-center gap-md text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container transition-all cursor-pointer group" href="#">
          <span className="material-symbols-outlined text-outline group-hover:text-primary">ads_click</span>
          <span className="font-label-caps text-label-caps">Financial Goals</span>
        </a>
        <a className="px-4 py-2 flex items-center gap-md text-on-surface-variant hover:bg-surface-container-high dark:hover:bg-surface-container transition-all cursor-pointer group" href="#">
          <span className="material-symbols-outlined text-outline group-hover:text-primary">shield</span>
          <span className="font-label-caps text-label-caps">Security</span>
        </a>
      </nav>
      <div className="mt-auto px-lg pt-lg border-t border-outline-variant">
        <button className="w-full bg-primary-container text-on-primary-container py-md rounded-xl font-label-caps text-label-caps hover:opacity-90 transition-opacity mb-lg">
          Upgrade Plan
        </button>
        <div className="space-y-sm">
          <div className="flex items-center gap-md text-on-surface-variant hover:underline cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">help</span>
            <span className="font-label-caps text-label-caps">Help Center</span>
          </div>
          <div className="flex items-center gap-md text-on-surface-variant hover:underline cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">settings</span>
            <span className="font-label-caps text-label-caps">Settings</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col justify-between">
      
      {/* TopNavBar */}
      <header className="w-full top-0 z-50 bg-surface-container-lowest dark:bg-surface-container-low shadow-sm border-b border-outline-variant dark:border-outline">
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
          <nav className="hidden md:flex items-center space-x-lg">
            <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors duration-200 cursor-pointer active:opacity-80" href="/dashboard">
              Dashboard
            </a>
            <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors duration-200 cursor-pointer active:opacity-80" href="/expenses">
              Transactions
            </a>
            <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors duration-200 cursor-pointer active:opacity-80" href="#">
              Reports
            </a>
            <a className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors duration-200 cursor-pointer active:opacity-80" href="#">
              Settings
            </a>
          </nav>
          <div className="flex items-center gap-md">
            <button
               onClick={openAddExpense}
               className="bg-primary text-on-primary px-lg py-sm rounded-lg font-label-caps text-label-caps hover:opacity-90 transition-opacity flex items-center gap-xs"
             >
               <span className="material-symbols-outlined text-[18px]">add</span>
               Add Expense
             </button>
            <div
              onClick={openUserProfile}
              className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant cursor-pointer hover:ring-2 hover:ring-primary/40 transition-all"
            >
              <Image
                className="w-full h-full object-cover"
                alt="Profile photo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGvFkXAjJz04DgkxYClYoBsG4lZfV2AlxuVyAO62JjcN_d7yNDQVtjbd0owQ6maG_I24fIwxcxYq7Imv5GBsslqgcR2ENXsaYSnuZZ-A5oEFDq1eShwJ-D41slH3LsjGkg-fBim3QG-orR423Ku90AFkJhgwCsUO28qIQQiWRpAqWLy2qEZox0JShb7Pm0yzRcfyxX0cG9O4dA5jopMztm_kHbptKedH0AkN2oNKGSjqjci9XbyPyk"
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
        <main className="flex-1 p-lg md:p-xl text-left">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-lg mb-xl">
            <div>
              <h1 className="font-headline text-3xl font-bold text-on-surface mb-xs">Income Streams</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Manage and track your primary revenue sources and investments.
              </p>
            </div>
            <div className="flex items-center gap-md">
              <button className="flex items-center gap-xs px-lg py-md border border-outline-variant rounded-lg font-label-caps text-label-caps text-on-surface hover:bg-surface-container-low transition-colors focus:outline-none">
                <span className="material-symbols-outlined text-[20px]">filter_list</span>
                Filter
              </button>
              <button
                onClick={openAddIncome}
                className="flex items-center gap-xs px-lg py-md bg-income text-white rounded-lg font-label-caps text-label-caps hover:opacity-90 transition-opacity shadow-sm font-semibold"
              >
                <span className="material-symbols-outlined text-[20px] text-white">add_circle</span>
                Add Income
              </button>
            </div>
          </div>

          {/* Bento Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg mb-xl">
            {/* Total Income Card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
              <div className="flex items-center justify-between mb-md">
                <span className="font-label-caps text-label-caps text-on-surface-variant">Monthly Total</span>
                <div className="w-10 h-10 rounded-full bg-income/10 flex items-center justify-center text-income shrink-0">
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    trending_up
                  </span>
                </div>
              </div>
              <div className="space-y-xs">
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">$12,450.00</h2>
                <div className="flex items-center gap-xs text-income font-label-caps text-label-caps font-semibold">
                  <span className="material-symbols-outlined text-[16px] text-income">arrow_upward</span>
                  <span>12.5% from last month</span>
                </div>
              </div>
            </div>

            {/* Active Sources Card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm">
              <div className="flex items-center justify-between mb-md">
                <span className="font-label-caps text-label-caps text-on-surface-variant">Revenue Sources</span>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <span className="material-symbols-outlined">hub</span>
                </div>
              </div>
              <div className="space-y-xs">
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">8 Active</h2>
                <div className="flex items-center gap-xs text-on-surface-variant font-label-caps text-label-caps font-semibold">
                  <span>Main: Salary (65%)</span>
                </div>
              </div>
            </div>

            {/* Projected Card */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm overflow-hidden relative">
              <div className="flex items-center justify-between mb-md relative z-10">
                <span className="font-label-caps text-label-caps text-on-surface-variant">Q4 Projected</span>
                <div className="w-10 h-10 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary shrink-0">
                  <span className="material-symbols-outlined">insights</span>
                </div>
              </div>
              <div className="space-y-xs relative z-10">
                <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">$38,200.00</h2>
                <div className="flex items-center gap-xs text-on-surface-variant font-label-caps text-label-caps font-semibold">
                  <span>On track for goal</span>
                </div>
              </div>
              {/* Subtle background pattern */}
              <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-1/4 translate-y-1/4">
                <span className="material-symbols-outlined text-[120px]">payments</span>
              </div>
            </div>
          </div>

          {/* Data Table Section */}
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm overflow-hidden">
            <div className="px-lg py-md border-b border-outline-variant flex items-center justify-between bg-surface-container-low/50">
              <h3 className="font-title-md text-title-md text-on-surface font-bold">Income Details</h3>
              <div className="flex gap-md">
                <button className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none">
                  <span className="material-symbols-outlined text-[20px]">download</span>
                </button>
                <button className="text-on-surface-variant hover:text-primary transition-colors focus:outline-none">
                  <span className="material-symbols-outlined text-[20px]">more_vert</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/30 border-b border-outline-variant">
                    <th
                      onClick={() => handleSort('source')}
                      className="px-lg py-md font-label-caps text-label-caps text-outline cursor-pointer hover:bg-surface-container-high/50 transition-colors select-none"
                    >
                      <div className="flex items-center gap-1">
                        Source Name
                        <span className="material-symbols-outlined text-sm">{getSortIcon('source')}</span>
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('category')}
                      className="px-lg py-md font-label-caps text-label-caps text-outline cursor-pointer hover:bg-surface-container-high/50 transition-colors select-none"
                    >
                      <div className="flex items-center gap-1">
                        Category
                        <span className="material-symbols-outlined text-sm">{getSortIcon('category')}</span>
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('frequency')}
                      className="px-lg py-md font-label-caps text-label-caps text-outline cursor-pointer hover:bg-surface-container-high/50 transition-colors select-none"
                    >
                      <div className="flex items-center gap-1">
                        Frequency
                        <span className="material-symbols-outlined text-sm">{getSortIcon('frequency')}</span>
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('rawDate')}
                      className="px-lg py-md font-label-caps text-label-caps text-outline cursor-pointer hover:bg-surface-container-high/50 transition-colors select-none"
                    >
                      <div className="flex items-center gap-1">
                        Last Deposit
                        <span className="material-symbols-outlined text-sm">{getSortIcon('rawDate')}</span>
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('amount')}
                      className="px-lg py-md font-label-caps text-label-caps text-outline text-right cursor-pointer hover:bg-surface-container-high/50 transition-colors select-none"
                    >
                      <div className="flex items-center gap-1 justify-end">
                        Amount
                        <span className="material-symbols-outlined text-sm">{getSortIcon('amount')}</span>
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort('status')}
                      className="px-lg py-md font-label-caps text-label-caps text-outline cursor-pointer hover:bg-surface-container-high/50 transition-colors select-none"
                    >
                      <div className="flex items-center gap-1">
                        Status
                        <span className="material-symbols-outlined text-sm">{getSortIcon('status')}</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="font-body-sm text-body-sm text-on-surface divide-y divide-outline-variant/30">
                  {sortedItems.map((item, index) => (
                    <tr
                      key={item.id}
                      style={{
                        opacity: animateRows ? 1 : 0,
                        transform: animateRows ? 'translateY(0)' : 'translateY(10px)',
                        transition: 'all 0.4s ease',
                        transitionDelay: `${index * 50}ms`,
                      }}
                      onClick={() => openEditIncome(item)}
                      className="hover:bg-secondary-container/10 transition-colors cursor-pointer group odd:bg-transparent even:bg-surface-container-low/40"
                    >
                      <td className="px-lg py-md">
                        <div className="flex items-center gap-md">
                          <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${
                            item.category === 'SALARY'
                              ? 'bg-primary/10 text-primary'
                              : item.category === 'FREELANCE'
                              ? 'bg-tertiary/10 text-tertiary'
                              : item.category === 'RENTAL'
                              ? 'bg-orange-100 text-orange-600'
                              : 'bg-secondary/10 text-secondary'
                          }`}>
                            <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                          </div>
                          <span className="font-semibold">{item.source}</span>
                        </div>
                      </td>
                      <td className="px-lg py-md">
                        <span className={`px-sm py-1 rounded-full font-label-caps text-[10px] ${
                          item.category === 'SALARY'
                            ? 'bg-primary/5 text-primary'
                            : item.category === 'FREELANCE'
                            ? 'bg-tertiary/5 text-tertiary'
                            : item.category === 'RENTAL'
                            ? 'bg-orange-50 text-orange-600'
                            : 'bg-secondary/5 text-secondary'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-lg py-md text-on-surface-variant">{item.frequency}</td>
                      <td className="px-lg py-md text-on-surface-variant font-data-mono text-data-mono">
                        {item.date}
                      </td>
                      <td className="px-lg py-md font-data-mono text-data-mono text-right font-bold text-income">
                        ${item.amount.toFixed(2)}
                      </td>
                      <td className="px-lg py-md">
                        <div className={`flex items-center gap-xs ${
                          item.status === 'COMPLETED' ? 'text-on-surface-variant' : 'text-success'
                        }`}>
                          <div className={`w-2 h-2 rounded-full ${
                            item.status === 'COMPLETED' ? 'bg-outline' : 'bg-success'
                          }`} />
                          <span className="font-label-caps text-[11px] font-bold">{item.status}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-lg py-md border-t border-outline-variant flex items-center justify-between font-label-caps text-[11px] text-on-surface-variant">
              <span>Showing 4 of 8 results</span>
              <div className="flex items-center gap-md">
                <button className="hover:text-primary disabled:opacity-30" disabled>
                  Previous
                </button>
                <div className="flex items-center gap-sm">
                  <span className="px-2 py-1 bg-primary text-white rounded font-bold">1</span>
                  <span className="px-2 py-1 hover:bg-surface-container-high rounded cursor-pointer font-bold">2</span>
                </div>
                <button className="hover:text-primary">Next</button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full bg-surface-container dark:bg-surface-container-highest border-t border-outline-variant dark:border-outline mt-auto text-left">
        <div className="w-full px-lg py-xl flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto">
          <div className="mb-md md:mb-0">
            <span className="font-title-md text-title-md font-bold text-on-surface dark:text-on-surface">
              Modern Fiscal Intelligence
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-xs">
              © 2024 Modern Fiscal Intelligence. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-lg">
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary hover:underline transition-all cursor-pointer" href="#">Privacy Policy</a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary hover:underline transition-all cursor-pointer" href="#">Terms of Service</a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary hover:underline transition-all cursor-pointer" href="#">Contact Support</a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary hover:underline transition-all cursor-pointer" href="#">Security Overview</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
