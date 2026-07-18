'use client';

import React from 'react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] lg:min-h-[870px] flex items-center justify-center overflow-hidden px-margin-mobile md:px-lg">
      <div className="relative z-10 max-w-container-max mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-xl items-center">
        {/* Left text column */}
        <div className="flex flex-col space-y-lg text-center lg:text-left">
          <span className="font-label-caps text-label-caps text-primary dark:text-primary-fixed-dim tracking-widest uppercase">
            Intelligent Wealth Management
          </span>
          <h1 className="font-display-lg text-4xl md:text-5xl lg:text-display-lg leading-tight dark:text-surface-bright text-on-surface">
            Master Your Finances with <span className="text-primary dark:text-primary-fixed">Precision.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant dark:text-outline-variant max-w-lg mx-auto lg:mx-0">
            The ultimate professional SaaS expense tracker designed for modern founders and meticulous professionals. Control every cent with automated insights and military-grade security.
          </p>
          <div className="flex flex-col sm:flex-row gap-md pt-4 justify-center lg:justify-start">
            <button
              onClick={() => {}}
              className="px-xl py-4 bg-primary dark:bg-primary-container text-on-primary dark:text-on-primary-container rounded-xl font-title-md text-title-md shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition-all"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => {}}
              className="px-xl py-4 border-2 border-primary dark:border-primary-fixed text-primary dark:text-primary-fixed rounded-xl font-title-md text-title-md hover:bg-primary-fixed/20 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">play_circle</span>
              View Demo
            </button>
          </div>
          <div className="flex items-center gap-4 pt-sm justify-center lg:justify-start">
            {/* Avatars Stack */}
            <div className="flex -space-x-3">
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-200" />
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-300" />
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800 bg-slate-400" />
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-outline-variant">
              Trusted by 2,500+ Financial Advisors
            </p>
          </div>
        </div>

        {/* Right dashboard column */}
        <div className="relative h-[400px] md:h-[600px] mt-xl lg:mt-0">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Floating Glassmorphic Main Card */}
            <div className="glass-card p-sm rounded-[2rem] shadow-2xl relative z-20 w-[95%] lg:w-[90%] animate-float-custom">
              <Image
                className="rounded-xl w-full border border-outline-variant dark:border-outline"
                alt="Modern Financial Dashboard Illustration"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHO8LpD6ghGaSXRNaC-2xS5aYexjXd0Kiz2MLWEpGRuO02zwMm809SPQZZxG7mkSaYRTXo59LgAkRaAdedf-3AxetTxssl9DeMmq59nAyFsPGSCTMPRg-5WmTwEzed4D9W85YVAcNu9yiL1SC2He1dBfcNKvsd9NuRNJNUGwb-0p2Dc8QacscM1oZBr6TqoksPs1jKCG3vRvzNg5ujwqQ6-eeoOLm4QmeCqumnGUrJCrKrIvI2N-XF"
                width={1200}
                height={730}
                priority
              />
            </div>
            {/* Savings Rate Floating Badge */}
            <div className="absolute top-0 right-4 lg:top-10 lg:right-0 glass-card p-md rounded-xl shadow-xl z-30 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/20 rounded-full">
                  <span className="material-symbols-outlined text-success">trending_up</span>
                </div>
                <div>
                  <p className="font-label-caps text-label-caps text-on-surface-variant dark:text-outline-variant">
                    Savings Rate
                  </p>
                  <p className="font-title-md text-title-md dark:text-surface-bright text-on-surface">
                    +24.5%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
