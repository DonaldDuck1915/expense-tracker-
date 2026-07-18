'use client';

import React, { createContext, useContext, useState } from 'react';

export type Transaction = {
  id: string;
  description: string;
  subtext: string;
  category: string;
  date: string;
  rawDate?: string;
  status: string;
  amount: number;
  icon: string;
  fileName?: string;
  fileSize?: string;
};

export type IncomeItem = {
  id: string;
  source: string;
  category: string;
  frequency: string;
  date: string;
  rawDate?: string;
  amount: number;
  status: string;
  icon: string;
};

export type BudgetCategory = {
  name: string;
  subtext: string;
  spent: number;
  limit: number;
  progress: number;
  color: string;
  statusText: string;
  statusColor: string;
  icon: string;
  isCritical?: boolean;
};

type ModalContextType = {
  isAddExpenseOpen: boolean;
  openAddExpense: () => void;
  closeAddExpense: () => void;
  isEditExpenseOpen: boolean;
  editExpenseData: Transaction | null;
  openEditExpense: (data: Transaction) => void;
  closeEditExpense: () => void;
  isDeleteConfirmOpen: boolean;
  deleteConfirmData: Transaction | null;
  openDeleteConfirm: (data: Transaction) => void;
  closeDeleteConfirm: () => void;
  isAddIncomeOpen: boolean;
  openAddIncome: () => void;
  closeAddIncome: () => void;
  isEditIncomeOpen: boolean;
  editIncomeData: IncomeItem | null;
  openEditIncome: (data: IncomeItem) => void;
  closeEditIncome: () => void;
  isAddBudgetOpen: boolean;
  openAddBudget: () => void;
  closeAddBudget: () => void;
  isEditBudgetOpen: boolean;
  editBudgetData: BudgetCategory | null;
  openEditBudget: (data: BudgetCategory) => void;
  closeEditBudget: () => void;
  isExportReportOpen: boolean;
  openExportReport: () => void;
  closeExportReport: () => void;
  isUserProfileOpen: boolean;
  openUserProfile: () => void;
  closeUserProfile: () => void;
  isChangePasswordOpen: boolean;
  openChangePassword: () => void;
  closeChangePassword: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isEditExpenseOpen, setIsEditExpenseOpen] = useState(false);
  const [editExpenseData, setEditExpenseData] = useState<Transaction | null>(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [deleteConfirmData, setDeleteConfirmData] = useState<Transaction | null>(null);
  const [isAddIncomeOpen, setIsAddIncomeOpen] = useState(false);
  const [isEditIncomeOpen, setIsEditIncomeOpen] = useState(false);
  const [editIncomeData, setEditIncomeData] = useState<IncomeItem | null>(null);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [isEditBudgetOpen, setIsEditBudgetOpen] = useState(false);
  const [editBudgetData, setEditBudgetData] = useState<BudgetCategory | null>(null);
  const [isExportReportOpen, setIsExportReportOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const openAddExpense = () => setIsAddExpenseOpen(true);
  const closeAddExpense = () => setIsAddExpenseOpen(false);

  const openEditExpense = (data: Transaction) => {
    setEditExpenseData(data);
    setIsEditExpenseOpen(true);
  };
  const closeEditExpense = () => {
    setEditExpenseData(null);
    setIsEditExpenseOpen(false);
  };

  const openDeleteConfirm = (data: Transaction) => {
    setDeleteConfirmData(data);
    setIsDeleteConfirmOpen(true);
  };
  const closeDeleteConfirm = () => {
    setDeleteConfirmData(null);
    setIsDeleteConfirmOpen(false);
  };

  const openAddIncome = () => setIsAddIncomeOpen(true);
  const closeAddIncome = () => setIsAddIncomeOpen(false);

  const openEditIncome = (data: IncomeItem) => {
    setEditIncomeData(data);
    setIsEditIncomeOpen(true);
  };
  const closeEditIncome = () => {
    setEditIncomeData(null);
    setIsEditIncomeOpen(false);
  };

  const openAddBudget = () => setIsAddBudgetOpen(true);
  const closeAddBudget = () => setIsAddBudgetOpen(false);

  const openEditBudget = (data: BudgetCategory) => {
    setEditBudgetData(data);
    setIsEditBudgetOpen(true);
  };
  const closeEditBudget = () => {
    setEditBudgetData(null);
    setIsEditBudgetOpen(false);
  };

  const openExportReport = () => setIsExportReportOpen(true);
  const closeExportReport = () => setIsExportReportOpen(false);

  const openUserProfile = () => setIsUserProfileOpen(true);
  const closeUserProfile = () => setIsUserProfileOpen(false);

  const openChangePassword = () => setIsChangePasswordOpen(true);
  const closeChangePassword = () => setIsChangePasswordOpen(false);

  return (
    <ModalContext.Provider
      value={{
        isAddExpenseOpen,
        openAddExpense,
        closeAddExpense,
        isEditExpenseOpen,
        editExpenseData,
        openEditExpense,
        closeEditExpense,
        isDeleteConfirmOpen,
        deleteConfirmData,
        openDeleteConfirm,
        closeDeleteConfirm,
        isAddIncomeOpen,
        openAddIncome,
        closeAddIncome,
        isEditIncomeOpen,
        editIncomeData,
        openEditIncome,
        closeEditIncome,
        isAddBudgetOpen,
        openAddBudget,
        closeAddBudget,
        isEditBudgetOpen,
        editBudgetData,
        openEditBudget,
        closeEditBudget,
        isExportReportOpen,
        openExportReport,
        closeExportReport,
        isUserProfileOpen,
        openUserProfile,
        closeUserProfile,
        isChangePasswordOpen,
        openChangePassword,
        closeChangePassword,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
