'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from './ThemeProvider';
import { useModal } from './ModalContext';

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { openAddExpense } = useModal();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full bg-surface-container-lowest dark:bg-surface-container-low border-b border-outline-variant dark:border-outline transition-all duration-300 ${
          isScrolled ? 'shadow-md' : 'shadow-sm'
        }`}
      >
        <div className="flex justify-between items-center w-full px-lg py-md max-w-container-max mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary dark:text-primary-fixed text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
            <span className="font-headline-lg text-headline-lg font-bold text-primary dark:text-primary-fixed">
              Modern Fiscal Intelligence
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-xl">
            <a
              className="text-primary dark:text-primary-fixed font-bold border-b-2 border-primary dark:border-primary-fixed pb-1 font-label-caps text-label-caps"
              href="#"
            >
              Dashboard
            </a>
            <a
              className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors duration-200 font-label-caps text-label-caps"
              href="#"
            >
              Transactions
            </a>
            <a
              className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors duration-200 font-label-caps text-label-caps"
              href="#"
            >
              Reports
            </a>
            <a
              className="text-on-surface-variant dark:text-on-surface-variant hover:text-primary dark:hover:text-primary-fixed transition-colors duration-200 font-label-caps text-label-caps"
              href="#"
            >
              Settings
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-md">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface-container transition-colors"
              id="theme-toggle"
              aria-label="Toggle theme"
            >
              {mounted ? (
                <span className="material-symbols-outlined text-on-surface-variant">
                  {theme === 'dark' ? 'light_mode' : 'dark_mode'}
                </span>
              ) : (
                <span className="material-symbols-outlined text-on-surface-variant">
                  dark_mode
                </span>
              )}
            </button>

            {/* Login */}
            <a
              className="text-on-surface-variant hover:text-primary transition-colors font-label-caps text-label-caps hidden sm:block"
              href="#"
            >
              Login
            </a>

            {/* Add Expense Button */}
            <button
              onClick={openAddExpense}
              className="hidden lg:block px-lg py-2 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container rounded-xl font-label-caps text-label-caps hover:opacity-90 transition-opacity"
            >
              Add Expense
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-full hover:bg-surface-container transition-colors"
              id="mobile-menu-btn"
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            {/* Profile Avatar */}
            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
              <Image
                className="w-full h-full object-cover"
                alt="Profile photo"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDSx47Q4RdEILblUMGz8anJumzX2cdcmUt0iJGcjqKjnSqpVVCOPHFYnZAX4gXmRbahcF3n8udQc8eqiaordMRLkBIjurrFQDvv_7hiDtAwvGfvmV14L5WDRBK1GA66zzCQgVML6Rdg94wLPvUiXzre7LDrh0etE3qSz0wu8HvpqFRO6SCOSnyEP570oaXpXKiu4bSc5Q49BwFlRAKEyYMV5dDUaxXFEhHlGdnDVjs_J0z3gJZI9Nhd"
                width={40}
                height={40}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm flex flex-col p-xl animate-in fade-in duration-200">
          <div className="flex justify-between items-center mb-xl">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                account_balance
              </span>
              <span className="font-headline-lg text-headline-lg font-bold text-primary">
                MFI
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2"
              id="close-mobile-menu"
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-3xl">close</span>
            </button>
          </div>
          <nav className="flex flex-col gap-lg">
            <a
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold text-primary"
              href="#"
            >
              Dashboard
            </a>
            <a
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl text-on-surface-variant"
              href="#"
            >
              Transactions
            </a>
            <a
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl text-on-surface-variant"
              href="#"
            >
              Reports
            </a>
            <a
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl text-on-surface-variant"
              href="#"
            >
              Settings
            </a>
            <hr className="border-outline-variant my-md" />
            <a
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl text-on-surface-variant"
              href="#"
            >
              Login
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full py-4 bg-primary text-on-primary rounded-xl text-xl font-bold"
            >
              Start Free Trial
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
