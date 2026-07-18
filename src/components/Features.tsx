'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsActive(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`py-24 bg-surface-container-low dark:bg-surface-dim px-margin-mobile transition-all duration-1000 ${
        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[30px]'
      }`}
      id="features"
    >
      <div className="max-w-container-max mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-3xl md:text-headline-lg mb-4 dark:text-surface-bright text-on-surface">
            Engineered for Fiscal Excellence
          </h2>
          <p className="text-on-surface-variant dark:text-outline-variant max-w-2xl mx-auto">
            Our features are designed to provide maximum visibility into your financial health without the manual overhead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-lg h-auto">
          {/* Large Feature - Analytics */}
          <div className="md:col-span-2 bg-surface-container-lowest dark:bg-surface-container-low rounded-3xl p-xl border border-outline-variant dark:border-outline flex flex-col justify-between group hover:shadow-2xl transition-all duration-300 overflow-hidden relative">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-primary dark:text-primary-fixed text-4xl mb-md">
                analytics
              </span>
              <h3 className="font-title-md text-title-md text-2xl mb-sm dark:text-surface-bright text-on-surface">
                Advanced Financial Analytics
              </h3>
              <p className="text-on-surface-variant dark:text-outline-variant font-body-md max-w-sm">
                Deep dive into your spending patterns with predictive AI models that forecast your future cash flow and identify potential savings.
              </p>
            </div>
            <div className="mt-lg relative z-10">
              <button className="flex items-center gap-2 text-primary dark:text-primary-fixed font-bold group-hover:gap-4 transition-all">
                Explore Analytics{' '}
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity">
              <span
                className="material-symbols-outlined text-[200px] text-primary dark:text-primary-fixed"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                monitoring
              </span>
            </div>
          </div>

          {/* Side Feature 1 - Secure Vault */}
          <div className="bg-primary-container rounded-3xl p-xl flex flex-col justify-between text-on-primary-container relative overflow-hidden group hover:scale-[1.02] transition-transform">
            <div className="relative z-10">
              <span className="material-symbols-outlined text-4xl mb-md text-white">
                verified_user
              </span>
              <h3 className="font-title-md text-title-md text-xl mb-sm text-white">
                Secure Data Vault
              </h3>
              <p className="font-body-sm opacity-90 text-white/90">
                256-bit AES encryption and multi-factor authentication protect your sensitive financial data around the clock.
              </p>
            </div>
            <div className="absolute -bottom-4 -right-4">
              <span className="material-symbols-outlined text-8xl opacity-20 text-white">
                shield
              </span>
            </div>
          </div>

          {/* Side Feature 2 - Auto Tracking */}
          <div className="bg-surface-container-highest dark:bg-surface-container rounded-3xl p-xl flex flex-col justify-between border border-outline-variant dark:border-outline group hover:scale-[1.02] transition-transform">
            <div>
              <span className="material-symbols-outlined text-tertiary dark:text-tertiary-fixed-dim text-4xl mb-md">
                receipt_long
              </span>
              <h3 className="font-title-md text-title-md text-xl mb-sm dark:text-surface-bright text-on-surface">
                Automated Expense Tracking
              </h3>
              <p className="text-on-surface-variant dark:text-outline-variant font-body-sm">
                Connect your bank accounts and let MFI automatically categorize and tag every transaction in real-time.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-4">
              <div className="px-3 py-1 bg-white dark:bg-surface-dim rounded-full text-[10px] font-bold border border-outline-variant dark:border-outline uppercase dark:text-surface-bright text-on-surface">
                Real-time
              </div>
              <div className="px-3 py-1 bg-white dark:bg-surface-dim rounded-full text-[10px] font-bold border border-outline-variant dark:border-outline uppercase dark:text-surface-bright text-on-surface">
                AI Sync
              </div>
            </div>
          </div>

          {/* Bottom Small Feature - Mobile App */}
          <div className="bg-surface-container-lowest dark:bg-surface-container-low rounded-3xl p-xl border border-outline-variant dark:border-outline flex items-center justify-between group hover:shadow-xl transition-all">
            <div className="flex items-center gap-md">
              <div className="w-12 h-12 bg-secondary-container dark:bg-secondary-fixed rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-primary dark:text-on-primary-fixed-variant">
                  smartphone
                </span>
              </div>
              <div>
                <h4 className="font-title-md text-title-md dark:text-surface-bright text-on-surface">
                  Mobile Native App
                </h4>
                <p className="text-on-surface-variant dark:text-outline-variant font-body-sm">
                  Track on the go.
                </p>
              </div>
            </div>
            <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors">
              open_in_new
            </span>
          </div>

          {/* Bottom Long Feature - Budgeting Logic */}
          <div className="bg-surface-container-lowest dark:bg-surface-container-low rounded-3xl p-xl border border-outline-variant dark:border-outline flex items-center gap-xl md:col-span-1 group hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-tertiary-fixed rounded-full flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-tertiary text-2xl">
                account_balance_wallet
              </span>
            </div>
            <div>
              <h4 className="font-title-md text-title-md dark:text-surface-bright text-on-surface">
                Budgeting Logic
              </h4>
              <p className="text-on-surface-variant dark:text-outline-variant font-body-sm">
                Custom thresholds and automated alerts for your budget limits.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
