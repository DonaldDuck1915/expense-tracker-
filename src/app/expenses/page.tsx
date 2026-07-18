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
  rawDate: string; // YYYY-MM-DD for sorting
  status: 'Completed' | 'Pending' | 'Flagged';
  amount: number;
  icon: string;
};

const initialTransactions: Transaction[] = [
  {
    id: '1',
    description: 'Amazon Web Services',
    subtext: 'Subscription #8291',
    category: 'Technology',
    date: 'Oct 24, 2024',
    rawDate: '2024-10-24',
    status: 'Completed',
    amount: -1240.00,
    icon: 'cloud',
  },
  {
    id: '2',
    description: 'Blue Bottle Coffee',
    subtext: 'Lunch & Meetings',
    category: 'Entertainment',
    date: 'Oct 23, 2024',
    rawDate: '2024-10-23',
    status: 'Completed',
    amount: -18.50,
    icon: 'local_cafe',
  },
  {
    id: '3',
    description: 'Facebook Ads',
    subtext: 'Q4 Campaign #2',
    category: 'Marketing',
    date: 'Oct 22, 2024',
    rawDate: '2024-10-22',
    status: 'Pending',
    amount: -4500.00,
    icon: 'campaign',
  },
  {
    id: '4',
    description: 'WeWork Office',
    subtext: 'Monthly Rent',
    category: 'Rent',
    date: 'Oct 20, 2024',
    rawDate: '2024-10-20',
    status: 'Completed',
    amount: -3200.00,
    icon: 'apartment',
  },
  {
    id: '5',
    description: 'Stripe Payout',
    subtext: 'SaaS Revenue',
    category: 'Income',
    date: 'Oct 19, 2024',
    rawDate: '2024-10-19',
    status: 'Completed',
    amount: 8900.00,
    icon: 'trending_up',
  },
  {
    id: '6',
    description: 'Delta Airlines',
    subtext: 'SFO to NYC Conference',
    category: 'Travel',
    date: 'Oct 18, 2024',
    rawDate: '2024-10-18',
    status: 'Flagged',
    amount: -452.10,
    icon: 'flight',
  },
];

type SortField = 'description' | 'rawDate' | 'category' | 'amount' | 'status';
type SortOrder = 'asc' | 'desc' | 'none';

export default function Expenses() {
  const { openAddExpense, openEditExpense, openUserProfile } = useModal();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [animateRows, setAnimateRows] = useState(false);

  // Sorting State
  const [sortField, setSortField] = useState<SortField>('rawDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    // Trigger staggered row entry animation
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

  // Filter transactions
  const filtered = initialTransactions.filter((tx) =>
    tx.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tx.subtext.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort transactions
  const sortedTransactions = [...filtered].sort((a, b) => {
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
        <div className="flex items-center gap-sm">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-on-primary shrink-0">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              account_balance_wallet
            </span>
          </div>
          <div>
            <h2 className="font-title-md text-title-md font-black text-primary leading-tight">MFI Dashboard</h2>
            <p className="text-[10px] font-label-caps text-outline uppercase tracking-widest">Professional Tier</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-4 space-y-1">
        <a className="flex items-center gap-3 text-on-surface-variant px-4 py-3 rounded-lg hover:bg-surface-container-high transition-all" href="/dashboard">
          <span className="material-symbols-outlined">dashboard</span>
          <span className="font-label-caps text-label-caps">Overview</span>
        </a>
        <a className="flex items-center gap-3 text-primary font-bold border-l-4 border-primary bg-secondary-container/30 px-4 py-3 rounded-r-lg transition-all" href="/expenses">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
            receipt_long
          </span>
          <span className="font-label-caps text-label-caps">All Expenses</span>
        </a>
        <a className="flex items-center gap-3 text-on-surface-variant px-4 py-3 rounded-lg hover:bg-surface-container-high transition-all" href="#">
          <span className="material-symbols-outlined">account_balance_wallet</span>
          <span className="font-label-caps text-label-caps">Monthly Budget</span>
        </a>
        <a className="flex items-center gap-3 text-on-surface-variant px-4 py-3 rounded-lg hover:bg-surface-container-high transition-all" href="#">
          <span className="material-symbols-outlined">ads_click</span>
          <span className="font-label-caps text-label-caps">Financial Goals</span>
        </a>
        <a className="flex items-center gap-3 text-on-surface-variant px-4 py-3 rounded-lg hover:bg-surface-container-high transition-all" href="#">
          <span className="material-symbols-outlined">shield</span>
          <span className="font-label-caps text-label-caps">Security</span>
        </a>
      </nav>
      <div className="px-4 mt-auto space-y-1 border-t border-outline-variant pt-lg">
        <a className="flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:underline transition-all" href="#">
          <span className="material-symbols-outlined">help</span>
          <span className="font-label-caps text-label-caps">Help Center</span>
        </a>
        <a className="flex items-center gap-3 text-on-surface-variant px-4 py-2 hover:underline transition-all" href="#">
          <span className="material-symbols-outlined">settings</span>
          <span className="font-label-caps text-label-caps">Settings</span>
        </a>
        <div className="mt-4 p-lg bg-primary-container rounded-xl text-on-primary-container text-left">
          <p className="font-label-caps text-[11px] mb-2">LIMITED TIME</p>
          <p className="font-title-md text-sm font-bold mb-3 text-white">Maximize your tax returns with AI</p>
          <button className="w-full bg-on-primary-container text-primary-container py-2 rounded-lg font-bold text-xs">
            Upgrade Plan
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background text-on-surface font-body-md relative min-h-screen flex flex-col justify-between">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full bg-surface-container-lowest shadow-sm border-b border-outline-variant">
        <div className="flex justify-between items-center w-full px-lg py-md max-w-container-max mx-auto h-20">
          <div className="flex items-center gap-xl">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="md:hidden p-2 text-on-surface rounded-full hover:bg-surface-container transition-colors focus:outline-none"
              aria-label="Open sidebar"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <span className="font-headline text-2xl font-bold text-primary">Modern Fiscal Intelligence</span>
            <nav className="hidden md:flex items-center gap-lg">
              <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-caps text-label-caps" href="/dashboard">
                Dashboard
              </a>
              <a className="text-primary font-bold border-b-2 border-primary pb-1 font-label-caps text-label-caps" href="/expenses">
                Transactions
              </a>
              <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-caps text-label-caps" href="#">
                Reports
              </a>
              <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-caps text-label-caps" href="#">
                Settings
              </a>
            </nav>
          </div>
          <div className="flex items-center gap-md">
            {/* Search Input (Hidden on mobile) */}
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-lg text-body-sm w-64 focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
             <button
               onClick={openAddExpense}
               className="bg-primary text-on-primary px-lg py-2 rounded-lg font-label-caps text-label-caps hover:opacity-90 transition-opacity cursor-pointer active:scale-95"
             >
               Add Expense
             </button>
            <div
              onClick={openUserProfile}
              className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant cursor-pointer hover:ring-2 hover:ring-primary/40 transition-all"
            >
              <Image
                className="w-full h-full object-cover"
                alt="Profile photo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOuk9uqG_7xLADbcAzTnxX2qxrDUO0p6Rh7f2_vbvLM8wVkSALKWOhJH3thakD5eXeZmbS0Z62rT18EFHwmFrpmm10uu7q2pQZFt7ZcrFTFA0psKKRuBusLkjHPvG657I2VjWpWth7ZOU-XnHKRnt7Ccgb8FznJP8vUbNSrYtQJl_qNd2dJVebC4dSsxzaI-jOrgIWwDlrsDtBK7OdgjEIKzGwQ848F0-hmXkY3d5spkMtm6kXt4Zw"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Side Navigation (Fixed Desktop) */}
        <aside className="hidden md:block fixed left-0 h-full w-[280px] bg-surface-container-low border-r border-outline-variant z-40">
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
        <main className="flex-1 md:ml-[280px] p-lg md:p-xl bg-background text-left">
          <div className="max-w-6xl mx-auto">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-lg mb-xl">
              <div>
                <nav className="flex items-center gap-2 text-outline mb-2">
                  <span className="text-xs font-label-caps">Management</span>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                  <span className="text-xs font-label-caps text-primary">All Expenses</span>
                </nav>
                <h1 className="font-headline text-3xl font-bold text-on-surface">Transactions</h1>
                <p className="text-on-surface-variant mt-1">Review and manage your fiscal footprint across all accounts.</p>
              </div>
              <div className="flex items-center gap-md">
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors focus:outline-none">
                  <span className="material-symbols-outlined">filter_list</span>
                  <span className="font-label-caps text-label-caps">Filter</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest border border-outline-variant rounded-lg text-on-surface-variant hover:bg-surface-variant transition-colors focus:outline-none">
                  <span className="material-symbols-outlined">download</span>
                  <span className="font-label-caps text-label-caps">Export</span>
                </button>
              </div>
            </div>

            {/* Stats Summary Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-lg mb-xl">
              {/* Total Spent */}
              <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant">
                <p className="text-outline font-label-caps text-label-caps mb-2">Total Spent (Monthly)</p>
                <p className="text-expense font-headline-lg text-headline-lg font-bold">$12,482.50</p>
                <div className="mt-4 flex items-center gap-1 text-success">
                  <span className="material-symbols-outlined text-sm">trending_up</span>
                  <span className="text-xs font-bold">+12% vs last month</span>
                </div>
              </div>

              {/* Pending Approvals */}
              <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant">
                <p className="text-outline font-label-caps text-label-caps mb-2">Pending Approvals</p>
                <p className="text-on-surface font-headline-lg text-headline-lg font-bold">14</p>
                <div className="mt-4 flex items-center gap-1 text-warning">
                  <span className="material-symbols-outlined text-sm">schedule</span>
                  <span className="text-xs font-bold">Action required</span>
                </div>
              </div>

              {/* Largest Category */}
              <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant">
                <p className="text-outline font-label-caps text-label-caps mb-2">Largest Category</p>
                <p className="text-on-surface font-headline-lg text-headline-lg font-bold">Marketing</p>
                <div className="mt-4 flex items-center gap-1 text-outline">
                  <span className="material-symbols-outlined text-sm">bar_chart</span>
                  <span className="text-xs font-bold">34% of total budget</span>
                </div>
              </div>

              {/* Budget Health */}
              <div className="bg-surface-container-lowest p-lg rounded-xl shadow-sm border border-outline-variant">
                <p className="text-outline font-label-caps text-label-caps mb-2">Budget Health</p>
                <p className="text-income font-headline-lg text-headline-lg font-bold">Healthy</p>
                <div className="mt-4 w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-income h-full transition-all duration-1000 ease-out"
                    style={{ width: animateRows ? '65%' : '0%' }}
                  />
                </div>
              </div>
            </div>

            {/* Main Data Table Container */}
            <div className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant overflow-hidden">
              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-surface-container-low border-b border-outline-variant">
                      <th
                        onClick={() => handleSort('description')}
                        className="px-lg py-4 font-label-caps text-label-caps text-outline uppercase tracking-wider cursor-pointer hover:bg-surface-container-high/50 transition-colors select-none"
                      >
                        <div className="flex items-center gap-1">
                          Transaction
                          <span className="material-symbols-outlined text-sm">{getSortIcon('description')}</span>
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort('rawDate')}
                        className="px-lg py-4 font-label-caps text-label-caps text-outline uppercase tracking-wider cursor-pointer hover:bg-surface-container-high/50 transition-colors select-none"
                      >
                        <div className="flex items-center gap-1">
                          Date
                          <span className="material-symbols-outlined text-sm">{getSortIcon('rawDate')}</span>
                        </div>
                      </th>
                      <th className="px-lg py-4 font-label-caps text-label-caps text-outline uppercase tracking-wider select-none">
                        Category
                      </th>
                      <th
                        onClick={() => handleSort('amount')}
                        className="px-lg py-4 font-label-caps text-label-caps text-outline uppercase tracking-wider text-right cursor-pointer hover:bg-surface-container-high/50 transition-colors select-none"
                      >
                        <div className="flex items-center gap-1 justify-end">
                          Amount
                          <span className="material-symbols-outlined text-sm">{getSortIcon('amount')}</span>
                        </div>
                      </th>
                      <th
                        onClick={() => handleSort('status')}
                        className="px-lg py-4 font-label-caps text-label-caps text-outline uppercase tracking-wider cursor-pointer hover:bg-surface-container-high/50 transition-colors select-none"
                      >
                        <div className="flex items-center gap-1">
                          Status
                          <span className="material-symbols-outlined text-sm">{getSortIcon('status')}</span>
                        </div>
                      </th>
                      <th className="px-lg py-4 font-label-caps text-label-caps text-outline uppercase tracking-wider"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/30">
                    {sortedTransactions.length > 0 ? (
                      sortedTransactions.map((tx, index) => {
                        const isIncome = tx.amount > 0;
                        return (
                          <tr
                            key={tx.id}
                            style={{
                              opacity: animateRows ? 1 : 0,
                              transform: animateRows ? 'translateY(0)' : 'translateY(10px)',
                              transition: 'all 0.4s ease',
                              transitionDelay: `${index * 50}ms`,
                            }}
                            onClick={() => openEditExpense(tx)}
                            className="transaction-row transition-colors group cursor-pointer"
                          >
                            <td className="px-lg py-4">
                              <div className="flex items-center gap-md">
                                <div className={`w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center transition-colors shrink-0 ${
                                  isIncome
                                    ? 'text-income group-hover:bg-success group-hover:text-on-primary'
                                    : 'text-primary group-hover:bg-primary-container group-hover:text-on-primary-container'
                                }`}>
                                  <span className="material-symbols-outlined">{tx.icon}</span>
                                </div>
                                <div>
                                  <p className="font-bold text-on-surface">{tx.description}</p>
                                  <p className="text-xs text-outline">{tx.subtext}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-lg py-4 font-data-mono text-data-mono text-on-surface-variant">
                              {tx.date}
                            </td>
                            <td className="px-lg py-4">
                              <span className={`px-2 py-1 rounded-full text-[11px] font-bold uppercase tracking-tight ${
                                isIncome
                                  ? 'bg-success/10 text-income'
                                  : tx.category === 'Technology'
                                  ? 'bg-secondary-container text-on-secondary-container'
                                  : tx.category === 'Marketing'
                                  ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
                                  : 'bg-surface-container-highest text-on-surface-variant'
                              }`}>
                                {tx.category}
                              </span>
                            </td>
                            <td className={`px-lg py-4 text-right font-data-mono text-data-mono font-bold ${
                              isIncome ? 'text-income' : 'text-expense'
                            }`}>
                              {isIncome ? `+$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
                            </td>
                            <td className="px-lg py-4">
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${
                                  tx.status === 'Completed'
                                    ? 'bg-success'
                                    : tx.status === 'Pending'
                                    ? 'bg-warning animate-pulse'
                                    : 'bg-error'
                                }`} />
                                <span className="text-sm font-medium">{tx.status}</span>
                              </div>
                            </td>
                            <td className="px-lg py-4 text-right">
                              <button className="text-outline hover:text-primary transition-colors focus:outline-none">
                                <span className="material-symbols-outlined">more_vert</span>
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={6} className="text-center py-8 text-on-surface-variant">
                          No transactions found matching search criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Footer */}
              <div className="px-lg py-md bg-surface-container-low flex flex-col md:flex-row items-center justify-between gap-md border-t border-outline-variant text-left">
                <p className="text-xs text-on-surface-variant">
                  Showing <span className="font-bold">1-{filtered.length}</span> of <span className="font-bold">482</span> transactions
                </p>
                <div className="flex items-center gap-sm">
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-outline hover:bg-surface-variant disabled:opacity-30" disabled>
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <button className="px-3 py-1 rounded bg-primary text-on-primary font-bold text-xs">1</button>
                  <button className="px-3 py-1 rounded border border-outline-variant text-outline hover:bg-surface-variant font-bold text-xs">2</button>
                  <button className="px-3 py-1 rounded border border-outline-variant text-outline hover:bg-surface-variant font-bold text-xs">3</button>
                  <span className="text-outline mx-1">...</span>
                  <button className="px-3 py-1 rounded border border-outline-variant text-outline hover:bg-surface-variant font-bold text-xs">20</button>
                  <button className="w-8 h-8 flex items-center justify-center rounded border border-outline-variant text-outline hover:bg-surface-variant">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Global Footer */}
      <footer className="w-full bg-surface-container border-t border-outline-variant mt-xl text-left">
        <div className="w-full px-lg py-xl flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto gap-lg">
          <div className="flex flex-col items-center md:items-start gap-sm">
            <span className="font-title-md text-title-md font-bold text-on-surface">Modern Fiscal Intelligence</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              © 2024 Modern Fiscal Intelligence. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-xl">
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">Privacy Policy</a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">Terms of Service</a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">Contact Support</a>
            <a className="font-label-caps text-label-caps text-on-surface-variant hover:text-primary hover:underline transition-all" href="#">Security Overview</a>
          </div>
        </div>
      </footer>

      {/* FAB for Mobile */}
      <button className="md:hidden fixed bottom-lg right-lg w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center active:scale-90 transition-transform z-50">
        <span className="material-symbols-outlined text-white">add</span>
      </button>
    </div>
  );
}
