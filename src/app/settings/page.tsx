'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';
import { useModal } from '@/components/ModalContext';

type ToastState = {
  visible: boolean;
  message: string;
  type: 'success' | 'error';
};

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { openAddExpense, openUserProfile, openChangePassword } = useModal();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Profile Form State
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [avatarUrl, setAvatarUrl] = useState(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBGQt8GMIwcYC-845jSWab8tAm_uY2EvIZ0mnp1IaqzcKvRwMiUPP5Vb06hjbQyvWOnISNaIccXn_uJeeFxc2_3g9tthVwzQrMxhpMIV-uUJwPkgqtJ4MChfaid_q-PrbNGDiROkQEcDrvFBMqsb7v_LBZ_2rvDrWmPfh6j1kEgAM5uOvoH0VgOcFXXYBs6vySJuUfZXQ9uq1TokaBmKn62XkPNgjrU7fzfipfKq2VIHn3gUu7qRYml'
  );

  // Preferences State
  const [prefTheme, setPrefTheme] = useState(theme === 'dark' ? 'dark' : 'light');
  const [currency, setCurrency] = useState('USD ($)');
  const [language, setLanguage] = useState('English (US)');

  // Sync preference theme state with provider theme when changed
  useEffect(() => {
    setPrefTheme(theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  // Notifications State
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [monthlyDigest, setMonthlyDigest] = useState(true);
  const [budgetAlerts, setBudgetAlerts] = useState(true);

  // Security State
  const [twoFactor, setTwoFactor] = useState(false);

  // Toast Banner State
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    type: 'success',
  });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handleChangeAvatar = () => {
    const alternateAvatar = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOuk9uqG_7xLADbcAzTnxX2qxrDUO0p6Rh7f2_vbvLM8wVkSALKWOhJH3thakD5eXeZmbS0Z62rT18EFHwmFrpmm10uu7q2pQZFt7ZcrFTFA0psKKRuBusLkjHPvG657I2VjWpWth7ZOU-XnHKRnt7Ccgb8FznJP8vUbNSrYtQJl_qNd2dJVebC4dSsxzaI-jOrgIWwDlrsDtBK7OdgjEIKzGwQ848F0-hmXkY3d5spkMtm6kXt4Zw';
    setAvatarUrl((prev) => (prev === alternateAvatar ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGQt8GMIwcYC-845jSWab8tAm_uY2EvIZ0mnp1IaqzcKvRwMiUPP5Vb06hjbQyvWOnISNaIccXn_uJeeFxc2_3g9tthVwzQrMxhpMIV-uUJwPkgqtJ4MChfaid_q-PrbNGDiROkQEcDrvFBMqsb7v_LBZ_2rvDrWmPfh6j1kEgAM5uOvoH0VgOcFXXYBs6vySJuUfZXQ9uq1TokaBmKn62XkPNgjrU7fzfipfKq2VIHn3gUu7qRYml' : alternateAvatar));
    showToast('Avatar profile picture updated!');
  };

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Profile information saved successfully!');
  };

  const handlePreferencesSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (prefTheme !== theme) {
      toggleTheme();
    }
    showToast('Dashboard preferences updated!');
  };

  const handleNotificationsSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Notification channels updated!');
  };

  const handleSecuritySave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Security settings saved successfully!');
  };

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
          <a className="flex items-center gap-md text-primary dark:text-primary-fixed-dim font-bold border-l-4 border-primary dark:border-primary-fixed-dim bg-secondary-container/30 px-4 py-2 transition-all rounded-r-lg active:scale-95" href="/settings">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              settings
            </span>
            <span className="font-label-caps text-label-caps">Settings</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-background text-on-surface font-body-md min-h-screen flex flex-col justify-between relative overflow-x-hidden">
      
      {/* Toast Notification */}
      {toast.visible && (
        <div
          className={`fixed top-24 right-md z-50 flex items-center gap-sm px-lg py-md rounded-xl shadow-lg border transition-all duration-300 transform translate-y-0 scale-100 ${
            toast.type === 'success'
              ? 'bg-success/15 border-success text-success'
              : 'bg-error/15 border-error text-error'
          }`}
        >
          <span className="material-symbols-outlined">
            {toast.type === 'success' ? 'check_circle' : 'error'}
          </span>
          <span className="font-title-md text-sm font-semibold">{toast.message}</span>
        </div>
      )}

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
            <a className="text-on-surface-variant hover:text-primary transition-colors duration-200 font-body-md" href="/reports">
              Reports
            </a>
            <a className="text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed pb-1 font-body-md" href="/settings">
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
                alt="User profile avatar"
                src={avatarUrl}
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
        <main className="flex-grow p-lg md:p-xl space-y-lg text-left">
          
          {/* Header Section */}
          <div className="mb-xl">
            <h1 className="font-headline text-3xl font-bold text-on-surface">Settings</h1>
            <p className="font-body-md text-on-surface-variant mt-1">
              Manage your account settings and preferences.
            </p>
          </div>

          {/* Settings Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-lg">
            
            {/* LEFT COLUMN */}
            <div className="space-y-lg">
              
              {/* Profile Settings Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col justify-between">
                <div>
                  <h2 className="font-title-md text-title-md font-bold text-on-surface mb-xs">Profile Settings</h2>
                  <p className="text-body-sm text-on-surface-variant mb-lg">Update your personal information.</p>
                  
                  <form onSubmit={handleProfileSave} className="space-y-md">
                    {/* Avatar Upload */}
                    <div className="flex items-center gap-md mb-lg">
                      <div className="w-16 h-16 rounded-full overflow-hidden border border-outline-variant relative">
                        <Image
                          className="w-full h-full object-cover"
                          alt="Avatar upload"
                          src={avatarUrl}
                          fill
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleChangeAvatar}
                        className="px-md py-sm bg-surface-container-high border border-outline-variant text-on-surface font-semibold text-xs rounded-lg hover:bg-surface-variant transition-colors"
                      >
                        Change Avatar
                      </button>
                    </div>

                    {/* Name Field */}
                    <div className="space-y-xs">
                      <label className="font-label-caps text-label-caps text-on-surface-variant font-bold block" htmlFor="full-name">
                        Full Name
                      </label>
                      <input
                        id="full-name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-md py-sm bg-white dark:bg-on-surface/5 border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-sm"
                      />
                    </div>

                    {/* Email Field */}
                    <div className="space-y-xs">
                      <label className="font-label-caps text-label-caps text-on-surface-variant font-bold block" htmlFor="email-addr">
                        Email Address
                      </label>
                      <input
                        id="email-addr"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-md py-sm bg-white dark:bg-on-surface/5 border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-sm"
                      />
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-md">
                      <button
                        type="submit"
                        className="px-lg py-md bg-primary text-on-primary font-bold text-sm rounded-lg hover:opacity-95 active:scale-98 transition-all"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Preferences Settings Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col justify-between">
                <div>
                  <h2 className="font-title-md text-title-md font-bold text-on-surface mb-xs">Preferences</h2>
                  <p className="text-body-sm text-on-surface-variant mb-lg">Customize your dashboard experience.</p>
                  
                  <form onSubmit={handlePreferencesSave} className="space-y-md">
                    {/* Theme Select */}
                    <div className="space-y-xs">
                      <label className="font-label-caps text-label-caps text-on-surface-variant font-bold block" htmlFor="theme-select">
                        Theme Mode
                      </label>
                      <select
                        id="theme-select"
                        value={prefTheme}
                        onChange={(e) => setPrefTheme(e.target.value)}
                        className="w-full px-md py-sm bg-white dark:bg-on-surface/5 border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-sm"
                      >
                        <option value="light">Light Mode</option>
                        <option value="dark">Dark Mode</option>
                      </select>
                    </div>

                    {/* Currency Select */}
                    <div className="space-y-xs">
                      <label className="font-label-caps text-label-caps text-on-surface-variant font-bold block" htmlFor="currency-select">
                        Currency
                      </label>
                      <select
                        id="currency-select"
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full px-md py-sm bg-white dark:bg-on-surface/5 border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-sm"
                      >
                        <option value="USD ($)">USD ($)</option>
                        <option value="EUR (€)">EUR (€)</option>
                        <option value="GBP (£)">GBP (£)</option>
                        <option value="INR (₹)">INR (₹)</option>
                      </select>
                    </div>

                    {/* Language Select */}
                    <div className="space-y-xs">
                      <label className="font-label-caps text-label-caps text-on-surface-variant font-bold block" htmlFor="lang-select">
                        Language
                      </label>
                      <select
                        id="lang-select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className="w-full px-md py-sm bg-white dark:bg-on-surface/5 border border-outline-variant rounded-lg outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-sm"
                      >
                        <option value="English (US)">English (US)</option>
                        <option value="Spanish (ES)">Spanish (ES)</option>
                        <option value="French (FR)">French (FR)</option>
                      </select>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-md">
                      <button
                        type="submit"
                        className="px-lg py-md bg-primary text-on-primary font-bold text-sm rounded-lg hover:opacity-95 active:scale-98 transition-all"
                      >
                        Save Preferences
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-lg">
              
              {/* Notification Settings Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col justify-between">
                <div>
                  <h2 className="font-title-md text-title-md font-bold text-on-surface mb-xs">Notification Settings</h2>
                  <p className="text-body-sm text-on-surface-variant mb-lg">Choose how you receive alerts.</p>
                  
                  <form onSubmit={handleNotificationsSave} className="space-y-lg">
                    {/* Toggles Container */}
                    <div className="space-y-md">
                      
                      {/* Email Toggle */}
                      <div className="flex justify-between items-center py-xs">
                        <div>
                          <p className="font-body-sm font-semibold text-on-surface">Email Notifications</p>
                          <p className="text-xs text-on-surface-variant">Receive warnings and reports via email.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setEmailNotif(!emailNotif)}
                          className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                            emailNotif ? 'bg-success' : 'bg-outline-variant'
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              emailNotif ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Push Toggle */}
                      <div className="flex justify-between items-center py-xs">
                        <div>
                          <p className="font-body-sm font-semibold text-on-surface">Push Notifications</p>
                          <p className="text-xs text-on-surface-variant">Real-time spending updates on this browser.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setPushNotif(!pushNotif)}
                          className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                            pushNotif ? 'bg-success' : 'bg-outline-variant'
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              pushNotif ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Monthly Digest Toggle */}
                      <div className="flex justify-between items-center py-xs">
                        <div>
                          <p className="font-body-sm font-semibold text-on-surface">Monthly Report Digest</p>
                          <p className="text-xs text-on-surface-variant">Get a comprehensive monthly summary statement.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setMonthlyDigest(!monthlyDigest)}
                          className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                            monthlyDigest ? 'bg-success' : 'bg-outline-variant'
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              monthlyDigest ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Budget Alerts Toggle */}
                      <div className="flex justify-between items-center py-xs">
                        <div>
                          <p className="font-body-sm font-semibold text-on-surface">Budget Alerts</p>
                          <p className="text-xs text-on-surface-variant">Alert immediately when category spending hits 90%.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setBudgetAlerts(!budgetAlerts)}
                          className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                            budgetAlerts ? 'bg-success' : 'bg-outline-variant'
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                              budgetAlerts ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>

                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end pt-md border-t border-outline-variant/30">
                      <button
                        type="submit"
                        className="px-lg py-md bg-primary text-on-primary font-bold text-sm rounded-lg hover:opacity-95 active:scale-98 transition-all"
                      >
                        Save Notifications
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* Security Settings Card */}
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-lg shadow-sm flex flex-col justify-between">
                <div>
                  <h2 className="font-title-md text-title-md font-bold text-on-surface mb-xs">Security Settings</h2>
                  <p className="text-body-sm text-on-surface-variant mb-lg">Update password and secure your account.</p>
                  
                  <form onSubmit={handleSecuritySave} className="space-y-md">

                    {/* Change Password CTA */}
                    <div className="flex items-center justify-between p-md bg-surface-container-low dark:bg-surface-container border border-outline-variant rounded-lg">
                      <div className="flex items-center gap-md">
                        <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-primary flex-shrink-0">
                          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>shield_lock</span>
                        </div>
                        <div>
                          <p className="font-body-sm font-semibold text-on-surface">Password</p>
                          <p className="text-xs text-on-surface-variant">Last changed 30 days ago</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={openChangePassword}
                        className="px-md py-xs text-primary font-label-caps text-label-caps border border-primary/30 hover:bg-primary/5 rounded-lg transition-all active:scale-95"
                      >
                        Change
                      </button>
                    </div>

                    {/* 2FA Toggle Row */}
                    <div className="flex justify-between items-center py-md border-t border-outline-variant/30 mt-lg">
                      <div>
                        <p className="font-body-sm font-semibold text-on-surface">Two-Factor Authentication</p>
                        <p className="text-xs text-on-surface-variant">Enable additional code layer on login.</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTwoFactor(!twoFactor)}
                        className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none ${
                          twoFactor ? 'bg-success' : 'bg-outline-variant'
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                            twoFactor ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-end pt-md">
                      <button
                        type="submit"
                        className="px-lg py-md bg-primary text-on-primary font-bold text-sm rounded-lg hover:opacity-95 active:scale-98 transition-all"
                      >
                        Save Security Settings
                      </button>
                    </div>
                  </form>
                </div>
              </div>

            </div>

          </div>

        </main>
      </div>

      {/* Footer */}
      <footer className="bg-surface-container border-t border-outline-variant w-full text-left mt-xl">
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
