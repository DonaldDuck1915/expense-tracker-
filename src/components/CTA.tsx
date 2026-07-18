'use client';

import React from 'react';

export default function CTA() {
  return (
    <section className="py-24 px-margin-mobile">
      <div className="max-w-container-max mx-auto bg-primary dark:bg-primary-container rounded-[3rem] p-xl md:p-[80px] text-center text-on-primary dark:text-on-primary-container relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="font-display-lg text-3xl md:text-display-lg mb-md text-white">
            Ready to Command Your Capital?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-xl text-white/95">
            Join the elite league of professionals who leave nothing to chance. Start your 14-day premium trial today.
          </p>
          <div className="flex flex-col sm:flex-row gap-md justify-center items-center">
            <button
              onClick={() => {}}
              className="w-full sm:w-auto px-xl py-4 bg-white dark:bg-on-primary-container text-primary dark:text-primary-container rounded-xl font-title-md text-title-md hover:scale-105 transition-transform shadow-lg"
            >
              Create Professional Account
            </button>
            <button
              onClick={() => {}}
              className="w-full sm:w-auto px-xl py-4 border border-white text-on-primary dark:text-on-primary-container rounded-xl font-title-md text-title-md hover:bg-white/10 transition-all text-white"
            >
              Speak to Sales
            </button>
          </div>
          <p className="mt-lg font-body-sm opacity-75 text-white/80">
            No credit card required • Unlimited transactions • Full security features
          </p>
        </div>
      </div>
    </section>
  );
}
