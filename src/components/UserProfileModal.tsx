'use client';

import React, { useState, useRef } from 'react';
import { useModal } from './ModalContext';

type SaveState = 'idle' | 'saving' | 'saved';

const WORK_ROLES = [
  'Account Manager',
  'Financial Analyst',
  'System Administrator',
  'View Only',
];

const AVATAR_SRC =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCH_C8-lRtLb564bZQGo8KvWP3C6qSoRqXFJOPj2_HLZc0rvI5zVuczwlB5Tvb1jBaYR0w2Mmh_EPbIb1G_DUiQXdwNimiziVtYuqOS461VfMa2utnvfYjwGkYdVE_84TxygJnkV7U06276jT29Prscj7pWiVXaFpEIzUVfyRNbQZ9UKD7i7osHLX7jjdwlThVOT36kQjS3wqb7LI5dcOciW4s7PbDNR5HmmT3d8L9i2kzNSYxGl6IY';

export default function UserProfileModal() {
  const { isUserProfileOpen, closeUserProfile } = useModal();

  const [fullName, setFullName] = useState('Alexander Hamilton');
  const [workRole, setWorkRole] = useState('Financial Analyst');
  const [email, setEmail] = useState('alexander.h@modernfiscal.io');
  const [twoFa, setTwoFa] = useState(true);
  const [avatarSrc, setAvatarSrc] = useState(AVATAR_SRC);
  const [saveState, setSaveState] = useState<SaveState>('idle');

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isUserProfileOpen) return null;

  /* ── Handlers ── */
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (typeof ev.target?.result === 'string') setAvatarSrc(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (saveState !== 'idle') return;
    setSaveState('saving');
    setTimeout(() => {
      setSaveState('saved');
      setTimeout(() => {
        setSaveState('idle');
        closeUserProfile();
      }, 1200);
    }, 1400);
  };

  const handleDiscard = () => {
    setFullName('Alexander Hamilton');
    setWorkRole('Financial Analyst');
    setEmail('alexander.h@modernfiscal.io');
    setTwoFa(true);
    setAvatarSrc(AVATAR_SRC);
    closeUserProfile();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeUserProfile();
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-md"
      style={{ background: 'rgba(25, 27, 35, 0.45)', backdropFilter: 'blur(6px)' }}
      onClick={handleOverlayClick}
    >
      {/* Modal Card */}
      <div className="w-full max-w-[560px] bg-surface-container-lowest/90 dark:bg-surface-container/90 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-in fade-in zoom-in duration-300">

        {/* ── Header ── */}
        <div className="px-xl py-lg flex justify-between items-center border-b border-outline-variant bg-surface-container-lowest dark:bg-surface-container">
          <h2 className="font-headline text-title-md font-bold text-on-surface">Edit Profile</h2>
          <button
            onClick={closeUserProfile}
            className="p-2 hover:bg-surface-variant dark:hover:bg-surface-container-high rounded-full transition-colors"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-on-surface-variant">close</span>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="px-xl py-xl space-y-xl max-h-[72vh] overflow-y-auto custom-scrollbar">

          {/* Avatar Upload */}
          <div className="flex flex-col items-center gap-md">
            <div
              className="relative group cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/10 group-hover:border-primary/30 transition-all">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={avatarSrc}
                  alt="Profile avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-on-surface/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-white">photo_camera</span>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
            <div className="text-center">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-primary font-label-caps text-label-caps hover:underline"
              >
                Change Profile Picture
              </button>
              <p className="text-on-surface-variant font-body-sm text-body-sm mt-1">
                Recommended size: 512×512px
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {/* Full Name */}
            <div className="space-y-sm">
              <label
                htmlFor="profile-full-name"
                className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider"
              >
                Full Name
              </label>
              <input
                id="profile-full-name"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-surface-container-lowest dark:bg-surface-container border border-outline-variant rounded-lg px-md py-3 text-body-md text-on-surface transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
              />
            </div>

            {/* Work Role */}
            <div className="space-y-sm">
              <label
                htmlFor="profile-work-role"
                className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider"
              >
                Work Role
              </label>
              <div className="relative">
                <select
                  id="profile-work-role"
                  value={workRole}
                  onChange={(e) => setWorkRole(e.target.value)}
                  className="w-full bg-surface-container-lowest dark:bg-surface-container border border-outline-variant rounded-lg px-md py-3 text-body-md text-on-surface appearance-none cursor-pointer transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                >
                  {WORK_ROLES.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-outline pointer-events-none text-[20px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Email — full width */}
            <div className="md:col-span-2 space-y-sm">
              <label
                htmlFor="profile-email"
                className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider"
              >
                Email Address
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[18px]">
                  mail
                </span>
                <input
                  id="profile-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container-lowest dark:bg-surface-container border border-outline-variant rounded-lg pl-10 pr-md py-3 text-body-md text-on-surface transition-all focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10"
                />
              </div>
            </div>
          </div>

          {/* Two-Factor Authentication Toggle */}
          <div className="pt-md border-t border-outline-variant">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-body-md text-body-md font-semibold text-on-surface">
                  Two-Factor Authentication
                </p>
                <p className="text-on-surface-variant font-body-sm text-body-sm">
                  Protect your account with an extra layer of security.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0 ml-md">
                <input
                  type="checkbox"
                  checked={twoFa}
                  onChange={() => setTwoFa((v) => !v)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-variant rounded-full peer peer-checked:bg-primary after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="px-xl py-lg bg-surface-container-low/60 dark:bg-surface-dim/60 border-t border-outline-variant flex justify-end gap-md">
          <button
            onClick={handleDiscard}
            className="px-lg py-2.5 rounded-lg font-label-caps text-label-caps text-on-surface-variant hover:bg-surface-variant dark:hover:bg-surface-container-high transition-colors border border-outline-variant"
          >
            Discard Changes
          </button>
          <button
            onClick={handleSave}
            disabled={saveState !== 'idle'}
            className={`px-xl py-2.5 rounded-lg font-label-caps text-label-caps shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 ${
              saveState === 'saved'
                ? 'bg-success text-white'
                : 'bg-primary text-on-primary'
            } disabled:cursor-not-allowed`}
          >
            {saveState === 'idle' && 'Save Profile'}
            {saveState === 'saving' && (
              <>
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </>
            )}
            {saveState === 'saved' && (
              <>
                <span className="material-symbols-outlined text-[18px]">check</span>
                Saved!
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
