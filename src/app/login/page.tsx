'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTheme } from '@/components/ThemeProvider';

export default function Login() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic here
  };

  return (
    <div className="bg-background dark:bg-on-background min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-colors duration-300 px-margin-mobile">
      {/* Dark Mode Toggle (Consistent with Dashboard vibe) */}
      <button
        onClick={toggleTheme}
        className="fixed top-md right-md z-50 p-sm bg-surface-container dark:bg-surface-container-low rounded-full border border-outline-variant dark:border-outline/30 hover:bg-surface-container-high transition-colors"
        aria-label="Toggle theme"
      >
        {mounted && (
          <>
            {theme === 'dark' ? (
              <span className="material-symbols-outlined text-primary-fixed block">light_mode</span>
            ) : (
              <span className="material-symbols-outlined text-on-surface block">dark_mode</span>
            )}
          </>
        )}
        {!mounted && (
          <span className="material-symbols-outlined text-on-surface block">dark_mode</span>
        )}
      </button>

      {/* Atmospheric Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-secondary-container/20 dark:bg-primary-container/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-primary-fixed/30 dark:bg-secondary-fixed/10 rounded-full blur-[100px]" />
      </div>

      {/* Main Content Grid */}
      <main className="w-full max-w-container-max px-md z-10 flex flex-col md:flex-row items-center justify-center gap-xl md:gap-gutter my-xl">
        {/* Illustration Side (Desktop) */}
        <div className="hidden md:flex flex-1 flex-col items-start max-w-[540px] text-left">
          <div className="mb-lg">
            <span className="inline-flex items-center gap-sm bg-primary-fixed text-on-primary-fixed px-sm py-xs rounded-full font-label-caps text-label-caps animate-pulse">
              <span className="material-symbols-outlined text-[16px]">security</span>
              SECURE DATA ARCHITECTURE
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-background dark:text-surface-container-lowest mb-md leading-tight">
            Modern Fiscal <span className="text-primary dark:text-primary-fixed-dim">Intelligence</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-outline-variant mb-xl">
            The professional-grade platform for serious financial tracking. Manage expenses, analyze cash flow, and secure your fiscal future with precision.
          </p>
          {/* Graphic Feature Box */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-sm border border-outline-variant dark:border-outline/30">
            <div className="absolute inset-0 bg-surface-container-highest dark:bg-inverse-surface" />
            <Image
              className="w-full h-full object-cover dark:opacity-80"
              alt="Laptop displaying financial dashboard"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4K8A6h5wBAZG_vkUMoC35Avee-mEO0N5SNAKM4fMZj17m9499ZF2pj8eyXsFQdr7b0-KC1oVLAARzpYehVdxSrwNitMl-LyAuH5l_a9qKSteUx9v1oWyJqzyEqtfrR-J9Us-BRFCno80ZDQb6ECG5P-cbJnsn1PkmenvJ5EUIvCDSOcNHGbiGGcjc_7RtsGDXSEf1axQOaIwjyEjvi1BL7JFpHGTY-EOEUnYbSJusAXtMbgOjaJFA"
              width={540}
              height={300}
              priority
            />
            <div className="absolute bottom-md left-md right-md glass-panel p-md rounded-lg flex items-center justify-between border-outline-variant/30">
              <div>
                <p className="font-label-caps text-label-caps text-on-surface-variant dark:text-outline-variant">
                  MONTHLY GROWTH
                </p>
                <p className="font-title-md text-title-md text-income font-bold">+12.40%</p>
              </div>
              <div className="h-8 w-24 bg-surface-variant dark:bg-surface-dim rounded-sm overflow-hidden flex items-end gap-1 px-1">
                <div className="flex-1 bg-primary/20 h-1/4" />
                <div className="flex-1 bg-primary/40 h-2/5" />
                <div className="flex-1 bg-primary/60 h-3/5" />
                <div className="flex-1 bg-primary h-4/5" />
              </div>
            </div>
          </div>
        </div>

        {/* Login Form Card */}
        <div
          id="login-card"
          className={`w-full md:w-[460px] glass-panel p-xl rounded-xl shadow-lg transition-all duration-300 ${
            isFocused ? 'shadow-2xl scale-[1.005] border-primary/25 ring-1 ring-primary/25' : ''
          }`}
        >
          {/* Logo Section */}
          <div className="flex flex-col items-center mb-xl">
            <div className="w-12 h-12 bg-primary dark:bg-primary-container rounded-lg flex items-center justify-center mb-md shadow-md shadow-primary/20">
              <span
                className="material-symbols-outlined text-white text-[32px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                account_balance_wallet
              </span>
            </div>
            <h2 className="font-title-md text-title-md text-on-background dark:text-surface-bright font-bold">
              Sign in to MFI
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant mt-1">
              Enter your credentials to access your dashboard
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-lg">
            {/* Email Field */}
            <div className="space-y-xs group text-left">
              <label
                className="font-label-caps text-label-caps text-on-surface-variant dark:text-outline-variant block uppercase font-semibold"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors">
                  mail
                </span>
                <input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className={`w-full pl-[48px] pr-[40px] py-md bg-white dark:bg-on-surface/5 dark:text-surface-bright border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-body-md outline-none ${
                    isEmailValid
                      ? 'border-success/80 focus:border-success focus:ring-success/20'
                      : 'border-outline-variant dark:border-outline/20'
                  }`}
                  required
                />
                {isEmailValid && (
                  <span className="material-symbols-outlined absolute right-md top-1/2 -translate-y-1/2 text-success text-[20px]">
                    check_circle
                  </span>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-xs group text-left">
              <div className="flex justify-between items-center">
                <label
                  className="font-label-caps text-label-caps text-on-surface-variant dark:text-outline-variant block uppercase font-semibold"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  className="font-label-caps text-label-caps text-primary dark:text-primary-fixed-dim hover:underline transition-all font-semibold"
                  href="#"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-md top-1/2 -translate-y-1/2 text-outline text-[20px] group-focus-within:text-primary transition-colors">
                  lock
                </span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  className="w-full pl-[48px] pr-[40px] py-md bg-white dark:bg-on-surface/5 dark:text-surface-bright border border-outline-variant dark:border-outline/20 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-body-md text-body-md outline-none"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-md top-1/2 -translate-y-1/2 text-outline hover:text-on-surface dark:hover:text-surface-bright transition-colors"
                  aria-label="Toggle password visibility"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-sm text-left">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-primary rounded border-outline-variant dark:border-outline/20 bg-white dark:bg-on-surface/10 focus:ring-primary focus:ring-offset-0 cursor-pointer"
              />
              <label
                className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant cursor-pointer select-none"
                htmlFor="remember"
              >
                Remember this device for 30 days
              </label>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              className="w-full py-md bg-primary dark:bg-primary-container text-on-primary font-title-md text-title-md rounded-lg shadow-md hover:bg-surface-tint dark:hover:bg-primary active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-sm group"
            >
              Sign In
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </button>
          </form>

          {/* Secondary Actions */}
          <div className="mt-xl pt-lg border-t border-outline-variant/30 dark:border-outline/10 flex flex-col items-center gap-md">
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">
              Don&apos;t have an account yet?{' '}
              <a className="text-primary dark:text-primary-fixed-dim font-semibold hover:underline" href="/signup">
                Request Access
              </a>
            </p>
            <div className="flex gap-lg">
              <div className="flex items-center gap-xs opacity-60 dark:opacity-40">
                <span className="material-symbols-outlined text-[16px] text-on-surface dark:text-surface-bright">
                  verified_user
                </span>
                <span className="font-label-caps text-[10px] text-on-surface dark:text-surface-bright">
                  256-BIT ENCRYPTION
                </span>
              </div>
              <div className="flex items-center gap-xs opacity-60 dark:opacity-40">
                <span className="material-symbols-outlined text-[16px] text-on-surface dark:text-surface-bright">
                  shield
                </span>
                <span className="font-label-caps text-[10px] text-on-surface dark:text-surface-bright">
                  SOC2 COMPLIANT
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple Footer for Transactional Page */}
      <footer className="mt-xl pb-lg px-md w-full max-w-container-max flex flex-col md:flex-row justify-between items-center gap-md z-10 border-t border-outline-variant/20 dark:border-outline/10 pt-md">
        <p className="font-body-sm text-body-sm text-on-surface-variant/60 dark:text-outline-variant/40">
          © 2024 Modern Fiscal Intelligence. All rights reserved.
        </p>
        <div className="flex gap-lg">
          <a
            className="font-label-caps text-[11px] text-on-surface-variant/60 dark:text-outline-variant/40 hover:text-primary dark:hover:text-primary-fixed transition-colors"
            href="#"
          >
            PRIVACY POLICY
          </a>
          <a
            className="font-label-caps text-[11px] text-on-surface-variant/60 dark:text-outline-variant/40 hover:text-primary dark:hover:text-primary-fixed transition-colors"
            href="#"
          >
            TERMS OF SERVICE
          </a>
          <a
            className="font-label-caps text-[11px] text-on-surface-variant/60 dark:text-outline-variant/40 hover:text-primary dark:hover:text-primary-fixed transition-colors"
            href="#"
          >
            SECURITY OVERVIEW
          </a>
        </div>
      </footer>
    </div>
  );
}
