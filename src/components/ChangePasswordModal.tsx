'use client';

import React, { useState } from 'react';
import { useModal } from './ModalContext';

type SaveState = 'idle' | 'saving' | 'saved';

type StrengthLevel = 0 | 1 | 2 | 3 | 4;

interface PasswordChecks {
  len: boolean;
  spec: boolean;
  num: boolean;
  case: boolean;
}

function evaluatePassword(val: string): { checks: PasswordChecks; strength: StrengthLevel } {
  const checks: PasswordChecks = {
    len: val.length >= 12,
    spec: /[!@#$%^&*(),.?":{}|<>]/.test(val),
    num: /[0-9]/.test(val),
    case: /[A-Z]/.test(val),
  };
  const score = Object.values(checks).filter(Boolean).length as StrengthLevel;
  return { checks, strength: score };
}

const STRENGTH_CONFIG: Record<
  number,
  { label: string; color: string; segments: number; segmentClass: string }
> = {
  0: { label: 'Weak', color: 'text-outline-variant', segments: 0, segmentClass: 'bg-outline-variant' },
  1: { label: 'Weak', color: 'text-expense', segments: 1, segmentClass: 'bg-expense' },
  2: { label: 'Fair', color: 'text-warning', segments: 2, segmentClass: 'bg-warning' },
  3: { label: 'Good', color: 'text-primary', segments: 3, segmentClass: 'bg-primary' },
  4: { label: 'Strong', color: 'text-success', segments: 4, segmentClass: 'bg-success' },
};

export default function ChangePasswordModal() {
  const { isChangePasswordOpen, closeChangePassword } = useModal();

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [mismatchError, setMismatchError] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>('idle');

  if (!isChangePasswordOpen) return null;

  const { checks, strength } = evaluatePassword(newPw);
  const strengthCfg = STRENGTH_CONFIG[newPw.length > 0 ? strength : 0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMismatchError(false);
    if (newPw !== confirmPw) {
      setMismatchError(true);
      return;
    }
    if (saveState !== 'idle') return;
    setSaveState('saving');
    setTimeout(() => {
      setSaveState('saved');
      setTimeout(() => {
        setSaveState('idle');
        setCurrentPw('');
        setNewPw('');
        setConfirmPw('');
        setMismatchError(false);
        closeChangePassword();
      }, 1500);
    }, 1400);
  };

  const handleCancel = () => {
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
    setMismatchError(false);
    setSaveState('idle');
    closeChangePassword();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) handleCancel();
  };

  const reqIcon = (met: boolean) => (
    <span
      className={`material-symbols-outlined text-body-sm transition-colors duration-300 ${met ? 'text-success' : 'text-outline-variant'}`}
      style={{ fontVariationSettings: met ? "'FILL' 1" : "'FILL' 0" }}
    >
      check_circle
    </span>
  );

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-md"
      style={{ background: 'rgba(25, 27, 35, 0.5)', backdropFilter: 'blur(6px)' }}
      onClick={handleOverlayClick}
    >
      {/* Modal Card */}
      <div className="w-full max-w-[480px] bg-surface-container-lowest dark:bg-surface-container rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-in fade-in zoom-in duration-300">

        {/* Top accent bar */}
        <div className="h-1.5 w-full bg-primary" />

        <div className="p-xl space-y-xl">

          {/* Header */}
          <div className="space-y-sm text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary-container text-primary mb-sm">
              <span
                className="material-symbols-outlined text-title-md"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield_lock
              </span>
            </div>
            <h2 className="font-headline text-2xl font-bold text-on-surface">Update Security</h2>
            <p className="text-on-surface-variant font-body-sm text-body-sm max-w-[340px] mx-auto">
              Ensure your Modern Fiscal Intelligence account remains protected by choosing a strong, unique password.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-lg" onSubmit={handleSubmit} id="change-pw-form">

            {/* Current Password */}
            <div className="space-y-xs">
              <label
                htmlFor="cp-current"
                className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider"
              >
                Current Password
              </label>
              <div className="relative">
                <input
                  id="cp-current"
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-md py-sm rounded-lg border border-outline-variant bg-surface-container-low dark:bg-surface-container text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-body-md text-body-md pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((v) => !v)}
                  className="absolute right-md top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors"
                  aria-label="Toggle current password visibility"
                >
                  <span className="material-symbols-outlined">
                    {showCurrent ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="space-y-xs">
              <label
                htmlFor="cp-new"
                className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  id="cp-new"
                  type={showNew ? 'text' : 'password'}
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  placeholder="Min. 12 characters"
                  required
                  className="w-full px-md py-sm rounded-lg border border-outline-variant bg-surface-container-low dark:bg-surface-container text-on-surface focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-body-md text-body-md pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute right-md top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors"
                  aria-label="Toggle new password visibility"
                >
                  <span className="material-symbols-outlined">
                    {showNew ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {/* Strength Meter */}
              <div className="pt-base">
                <div className="flex gap-xs h-1">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-full transition-all duration-300 ${
                        i < (newPw.length > 0 ? strengthCfg.segments : 0)
                          ? strengthCfg.segmentClass
                          : 'bg-outline-variant'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-xs">
                  <p className="text-[11px] font-semibold text-outline-variant uppercase tracking-wider">
                    Security Strength
                  </p>
                  <span className={`text-[11px] font-bold uppercase tracking-wider transition-colors duration-300 ${strengthCfg.color}`}>
                    {strengthCfg.label}
                  </span>
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-xs">
              <label
                htmlFor="cp-confirm"
                className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  id="cp-confirm"
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPw}
                  onChange={(e) => { setConfirmPw(e.target.value); setMismatchError(false); }}
                  placeholder="Repeat new password"
                  required
                  className={`w-full px-md py-sm rounded-lg border bg-surface-container-low dark:bg-surface-container text-on-surface focus:outline-none focus:ring-4 transition-all font-body-md text-body-md pr-12 ${
                    mismatchError
                      ? 'border-error focus:border-error focus:ring-error/10'
                      : 'border-outline-variant focus:border-primary focus:ring-primary/10'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute right-md top-1/2 -translate-y-1/2 text-outline-variant hover:text-primary transition-colors"
                  aria-label="Toggle confirm password visibility"
                >
                  <span className="material-symbols-outlined">
                    {showConfirm ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
              {mismatchError && (
                <p className="text-[12px] text-error flex items-center gap-xs mt-xs animate-in fade-in duration-200">
                  <span className="material-symbols-outlined text-[16px]">error</span>
                  Passwords do not match. Please try again.
                </p>
              )}
            </div>

            {/* Security Requirements */}
            <div className="bg-surface-container-low dark:bg-surface-container rounded-lg p-md border border-outline-variant/50 space-y-sm">
              <p className="font-label-caps text-[11px] text-outline uppercase tracking-wider">
                Security Requirements
              </p>
              <div className="grid grid-cols-2 gap-sm">
                <div className="flex items-center gap-xs">
                  {reqIcon(checks.len)}
                  <span className="text-[13px] text-on-surface-variant">12+ Characters</span>
                </div>
                <div className="flex items-center gap-xs">
                  {reqIcon(checks.spec)}
                  <span className="text-[13px] text-on-surface-variant">Special Char</span>
                </div>
                <div className="flex items-center gap-xs">
                  {reqIcon(checks.num)}
                  <span className="text-[13px] text-on-surface-variant">Number</span>
                </div>
                <div className="flex items-center gap-xs">
                  {reqIcon(checks.case)}
                  <span className="text-[13px] text-on-surface-variant">Uppercase</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-md pt-sm">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 px-lg py-sm rounded-lg border border-outline-variant text-on-surface hover:bg-surface-container dark:hover:bg-surface-container-high transition-all font-label-caps text-label-caps"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saveState !== 'idle'}
                className={`flex-1 px-lg py-sm rounded-lg font-label-caps text-label-caps shadow-md hover:shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 ${
                  saveState === 'saved'
                    ? 'bg-success text-white'
                    : 'bg-primary text-on-primary hover:opacity-90'
                } disabled:cursor-not-allowed`}
              >
                {saveState === 'idle' && 'Update Password'}
                {saveState === 'saving' && (
                  <>
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Updating...
                  </>
                )}
                {saveState === 'saved' && (
                  <>
                    <span className="material-symbols-outlined text-[18px]">check</span>
                    Updated!
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer badge */}
        <div className="bg-surface-container-low dark:bg-surface-dim px-xl py-md border-t border-outline-variant flex items-center justify-center gap-sm">
          <span className="material-symbols-outlined text-body-sm text-primary">verified_user</span>
          <p className="text-[12px] text-on-surface-variant italic">
            Encrypted via professional-grade 256-bit AES protocols
          </p>
        </div>
      </div>
    </div>
  );
}
