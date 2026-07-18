'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-surface-container dark:bg-surface-container-highest border-t border-outline-variant dark:border-outline transition-colors duration-300">
      <div className="w-full px-lg py-xl flex flex-col md:flex-row justify-between items-start max-w-container-max mx-auto gap-xl">
        {/* Branding Column */}
        <div className="flex flex-col space-y-md max-w-xs text-left">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary dark:text-primary-fixed text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_balance
            </span>
            <span className="font-title-md text-title-md font-bold text-on-surface">
              Modern Fiscal Intelligence
            </span>
          </div>
          <p className="font-body-sm text-on-surface-variant dark:text-on-surface-variant/80">
            The professional gold standard for expense tracking and fiscal intelligence reporting.
          </p>
          {/* Social Links */}
          <div className="flex gap-4">
            <a
              className="w-8 h-8 rounded-full border border-outline dark:border-outline flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-200"
              href="#"
              aria-label="Website"
            >
              <span className="material-symbols-outlined text-sm dark:text-on-surface">public</span>
            </a>
            <a
              className="w-8 h-8 rounded-full border border-outline dark:border-outline flex items-center justify-center hover:bg-primary hover:text-on-primary transition-all duration-200"
              href="#"
              aria-label="Email"
            >
              <span className="material-symbols-outlined text-sm dark:text-on-surface">alternate_email</span>
            </a>
          </div>
        </div>

        {/* Links Columns */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-xl w-full md:w-auto text-left">
          <div className="flex flex-col space-y-sm">
            <p className="font-label-caps text-label-caps text-on-surface font-bold uppercase mb-2">
              Product
            </p>
            <a className="text-on-surface-variant dark:text-on-surface-variant/80 font-body-sm hover:underline hover:text-primary transition-all" href="#">
              Overview
            </a>
            <a className="text-on-surface-variant dark:text-on-surface-variant/80 font-body-sm hover:underline hover:text-primary transition-all" href="#">
              Features
            </a>
            <a className="text-on-surface-variant dark:text-on-surface-variant/80 font-body-sm hover:underline hover:text-primary transition-all" href="#">
              Pricing
            </a>
            <a className="text-on-surface-variant dark:text-on-surface-variant/80 font-body-sm hover:underline hover:text-primary transition-all" href="#">
              Security
            </a>
          </div>

          <div className="flex flex-col space-y-sm">
            <p className="font-label-caps text-label-caps text-on-surface font-bold uppercase mb-2">
              Resources
            </p>
            <a className="text-on-surface-variant dark:text-on-surface-variant/80 font-body-sm hover:underline hover:text-primary transition-all" href="#">
              Help Center
            </a>
            <a className="text-on-surface-variant dark:text-on-surface-variant/80 font-body-sm hover:underline hover:text-primary transition-all" href="#">
              Contact Support
            </a>
            <a className="text-on-surface-variant dark:text-on-surface-variant/80 font-body-sm hover:underline hover:text-primary transition-all" href="#">
              API Docs
            </a>
            <a className="text-on-surface-variant dark:text-on-surface-variant/80 font-body-sm hover:underline hover:text-primary transition-all" href="#">
              Community
            </a>
          </div>

          <div className="flex flex-col space-y-sm hidden lg:flex">
            <p className="font-label-caps text-label-caps text-on-surface font-bold uppercase mb-2">
              Legal
            </p>
            <a className="text-on-surface-variant dark:text-on-surface-variant/80 font-body-sm hover:underline hover:text-primary transition-all" href="#">
              Privacy Policy
            </a>
            <a className="text-on-surface-variant dark:text-on-surface-variant/80 font-body-sm hover:underline hover:text-primary transition-all" href="#">
              Terms of Service
            </a>
            <a className="text-on-surface-variant dark:text-on-surface-variant/80 font-body-sm hover:underline hover:text-primary transition-all" href="#">
              Security Overview
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="w-full px-lg py-md flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto border-t border-outline-variant/30">
        <p className="text-on-surface-variant dark:text-on-surface-variant/80 font-body-sm">
          © 2024 Modern Fiscal Intelligence. All rights reserved.
        </p>
        <div className="flex gap-md mt-sm md:mt-0">
          <span className="text-on-surface-variant dark:text-on-surface-variant/80 font-body-sm">English (US)</span>
          <span className="text-on-surface-variant dark:text-on-surface-variant/80 font-body-sm">v2.4.1</span>
        </div>
      </div>
    </footer>
  );
}
