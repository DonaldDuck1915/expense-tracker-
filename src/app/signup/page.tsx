'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export default function SignUp() {
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const isMinLength = password.length >= 8;
  const hasNumber = /\d/.test(password);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Action logic here
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-margin-mobile">
      {/* Ambient Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Form Box */}
      <main className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-xl min-h-[600px] bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden relative z-10 m-margin-mobile border border-outline-variant/30">
        
        {/* Left Side: Brand & Visual */}
        <section className="hidden md:flex flex-col justify-between p-xl bg-surface-container-low border-r border-outline-variant relative overflow-hidden text-left">
          <div className="relative z-20">
            <div className="flex items-center gap-sm mb-xl">
              <div className="w-10 h-10 bg-primary flex items-center justify-center rounded-lg">
                <span className="material-symbols-outlined text-on-primary">account_balance</span>
              </div>
              <h1 className="font-headline text-2xl font-bold text-primary tracking-tight">
                Modern Fiscal Intelligence
              </h1>
            </div>
            <div className="space-y-lg mt-xl">
              <h2 className="font-display-lg text-display-lg text-on-surface leading-tight">
                Master your financial ecosystem.
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                Join over 50,000 professionals who use MFI to track, analyze, and optimize their business expenses with surgical precision.
              </p>
            </div>
          </div>
          <div className="relative z-20 pt-xl">
            {/* Glass panel review box */}
            <div className="glass-panel p-md rounded-xl flex items-center gap-md">
              <div className="flex -space-x-2">
                <Image
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  alt="Reviewer 1"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCEqOmQozQCm0xRUFUQ74lobff6ThGoEwgGnGdQMPcrrx1bKYxPtsGmpRELp6mgD7pTUEC1hyS38jobxMp5F8_trHQ4bq4qSmKB0RnGNmDMHtWZgClMG0TsgowPE_GoppXHGr6ksonDeUKw7trwQbklb9zGhP3focRUQNlgBpqAcW2ilXX7Xo8u7DJGJssatPWvPy8NrPC40dDeiYRiBhuHD1FrRtZFGh4T1ukbpPWntZ3kGKK-P8Lf"
                  width={40}
                  height={40}
                />
                <Image
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  alt="Reviewer 2"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAB8ZC7aDFlPOu2H5tOpvBSIKF6NHxREvgh5J_UYacMmvpTKiEv0xfWdlCeXN92yk7ibdCU32iul3Abu3xN8Kttis68O1RsQ2qoVLLnTdf__8_kCGspu7dQNvvPV0Y93zVvhKUrGD1ZJmF-XHtxLwXrkMDx-OcsrAyu5ZBw60sqN9ZhWrlc_6yzITjcPREusUB5qH6DGMsePQEKyE8dEeHhJ7ToyDp1gFR8JRY9mK7jFCPq03IuRMdn"
                  width={40}
                  height={40}
                />
                <Image
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  alt="Reviewer 3"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCj7RTw4yMv9RuJSBBYAogKuDXoZRBQj38eIrSfdFLDNmVSmlY1cRo8uLQx5tOo0uqMcZfYSkXVQ3M1iVpYSsSCyMFkHZ6H1aOQG0Cs5j7GhhAm1ncYa6kx3BS7HxEf3pp6D6hmJoVUJmms0YayVQ7FI6LOSaCrViVl3aUx-HN0VuyVM88Gp9GJH3avMscGV5eZDAa_Waca6Xks6odbiI468s3tO47CiX8U-Q2C0NZg8W0z-XKelCef"
                  width={40}
                  height={40}
                />
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <span className="font-bold text-on-surface">5 stars</span> by 2,000+ business owners.
              </p>
            </div>
          </div>
        </section>

        {/* Right Side: Signup Form */}
        <section className="flex flex-col justify-center p-xl md:px-xl md:py-xl text-left">
          <div className="max-w-[400px] mx-auto w-full">
            {/* Mobile Header (Hidden on Desktop) */}
            <div className="md:hidden flex items-center gap-sm mb-lg">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-lg">
                <span className="material-symbols-outlined text-on-primary text-[20px]">account_balance</span>
              </div>
              <span className="font-headline text-title-md text-primary font-bold">MFI</span>
            </div>

            <header className="mb-xl">
              <h2 className="font-headline text-headline-lg text-on-surface mb-xs">Create Account</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Start your 14-day free trial. No credit card required.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-lg">
              {/* Full Name */}
              <div className="relative w-full">
                <input
                  id="fullname"
                  type="text"
                  placeholder=" "
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="peer w-full h-14 px-md pt-4 pb-1 bg-surface-container border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md"
                  required
                />
                <label
                  htmlFor="fullname"
                  className="absolute left-md top-4 text-on-surface-variant font-body-md transition-all pointer-events-none origin-top-left 
                    peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
                    peer-focus:-translate-y-2.5 peer-focus:scale-85 peer-focus:text-primary
                    peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-primary"
                >
                  Full Name
                </label>
              </div>

              {/* Email Address */}
              <div className="relative w-full">
                <input
                  id="email"
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="peer w-full h-14 px-md pt-4 pb-1 bg-surface-container border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-md top-4 text-on-surface-variant font-body-md transition-all pointer-events-none origin-top-left 
                    peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
                    peer-focus:-translate-y-2.5 peer-focus:scale-85 peer-focus:text-primary
                    peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-primary"
                >
                  Work Email
                </label>
              </div>

              {/* Password */}
              <div className="relative w-full">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full h-14 px-md pt-4 pb-1 bg-surface-container border border-outline-variant rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body-md pr-12"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-md top-4 text-on-surface-variant font-body-md transition-all pointer-events-none origin-top-left 
                    peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
                    peer-focus:-translate-y-2.5 peer-focus:scale-85 peer-focus:text-primary
                    peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-85 peer-[:not(:placeholder-shown)]:text-primary"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
                  aria-label="Toggle password visibility"
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {/* Password Requirements */}
              <div className="flex flex-wrap gap-sm">
                <div className="flex items-center gap-xs">
                  <span className={`material-symbols-outlined text-[14px] ${isMinLength ? 'text-success' : 'text-outline'}`}>
                    {isMinLength ? 'check_circle' : 'circle'}
                  </span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">8+ Characters</span>
                </div>
                <div className="flex items-center gap-xs">
                  <span className={`material-symbols-outlined text-[14px] ${hasNumber ? 'text-success' : 'text-outline'}`}>
                    {hasNumber ? 'check_circle' : 'circle'}
                  </span>
                  <span className="font-label-caps text-label-caps text-on-surface-variant">1 Number</span>
                </div>
              </div>

              {/* Terms checkbox */}
              <div className="flex items-start gap-md pt-xs">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="w-4 h-4 text-primary border-outline-variant rounded focus:ring-primary cursor-pointer"
                    required
                  />
                </div>
                <label className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed cursor-pointer" htmlFor="terms">
                  I agree to the{' '}
                  <a className="text-primary hover:underline font-semibold" href="#">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a className="text-primary hover:underline font-semibold" href="#">
                    Privacy Policy
                  </a>
                  .
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full h-14 bg-primary text-on-primary font-title-md text-title-md rounded-lg hover:shadow-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-sm"
              >
                <span>Create Account</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>

              {/* Social Login Divider */}
              <div className="relative py-md flex items-center">
                <div className="flex-grow border-t border-outline-variant" />
                <span className="flex-shrink mx-md font-label-caps text-label-caps text-outline uppercase tracking-widest">
                  Or Sign up with
                </span>
                <div className="flex-grow border-t border-outline-variant" />
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-md">
                <button
                  type="button"
                  className="flex items-center justify-center gap-sm h-12 border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors font-body-md text-on-surface focus:outline-none"
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <svg height="18" viewBox="0 0 24 24" width="18">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                      />
                      <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                      />
                    </svg>
                  </div>
                  Google
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-sm h-12 border border-outline-variant rounded-lg hover:bg-surface-container-high transition-colors font-body-md text-on-surface focus:outline-none"
                >
                  <span className="material-symbols-outlined text-on-surface" style={{ fontVariationSettings: "'FILL' 1" }}>
                    corporate_fare
                  </span>
                  SSO
                </button>
              </div>
            </form>

            <footer className="mt-xl text-center">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Already have an account?{' '}
                <a className="text-primary font-bold hover:underline" href="#">
                  Log in
                </a>
              </p>
            </footer>
          </div>
        </section>
      </main>

      {/* Page Copyright Footer */}
      <div className="mt-xl text-center pb-xl relative z-10">
        <p className="font-label-caps text-label-caps text-outline tracking-wider uppercase">
          © 2024 Modern Fiscal Intelligence. All rights reserved.
        </p>
      </div>
    </div>
  );
}
