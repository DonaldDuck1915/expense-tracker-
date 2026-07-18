'use client';

import React, { useRef } from 'react';
import Image from 'next/image';

type Testimonial = {
  stars: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    stars: 5,
    quote: '"The level of detail in the reports is unparalleled. As a CFO, I need precision, and Modern Fiscal Intelligence delivers exactly that."',
    name: 'Sarah Jenkins',
    role: 'CFO at TechNovate',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEuBijWUlAmFmBxgE9_ygEv7gOM5awy_wM-mDEev9Dv3sVAt9X6-TvNMf_lx_heYhFpxms_4DBY86szDPmDXkC8PYKYoR4bcCnKjRbtolAasqNIWZDqbbhd5qHFfsTd9hqRoIxlo2ZZiC3yomkIUz3ANYl7Va8GTch62PPRhJoo_IRewtJo2CzIbFHwUndp1LjzP4me9aYjnms4lHCfsXxaCe3facR_Qx29SHrKcr5TEQ8eKHFtLiz',
  },
  {
    stars: 5,
    quote: '"Tracking expenses across multiple business entities used to be a nightmare. MFI\'s consolidation features changed everything for us."',
    name: 'David Chen',
    role: 'Founder, Apex Ventures',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBJg9fHg-jG6yMaUvYxBzHBvzzyOFMGRCn48tqnE4h9YGOKHv6wmIDruPFGRjyk7NdrEBy-QxsGZOQ8GcqI9oeCIODoedZKID0KkSPWMWJWYQnC_3a3ke9988hXCuidDkPCRAIiwXX4keXoIOEBbQdpKxgS7OwY-uBhQW2IkduNDne4ElfiDtMhcfj8teh2TtP6jyp-Tu8NoB8SMYmhIEFwxwr0BZF6Y-cIfPd0iiSPqi6G3MK8zaxt',
  },
  {
    stars: 5,
    quote: '"Finally, an expense tracker that doesn\'t feel like a toy. It\'s built for power users who care about data integrity and speed."',
    name: 'Marcus Thorne',
    role: 'Independent Consultant',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8gxI8hDSXE_5oOG5qQ8wwsMzz8GDv7qf6-3Lf5CwIgmovEm0MlvkVezyG6AeqTgaFpuaGTKuAxR_HWKg6EZNVK-g8XyNsMh48SL64TReaCfdxfl49G9leO3SB-43hty5NgzFNXpMXAVNW41M4Qlb0xC5lFL2s6dfswA35TuMsc0slydxlpwOXF4d9u2BQBfB8h3nSKKL3jMfdLZtAf9YxebTnCqacmdHAin8EwifFNVeQudkgEt55',
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth;
      const scrollTo = direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 overflow-hidden">
      <div className="max-w-container-max mx-auto px-margin-mobile">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-md">
          <div className="max-w-xl text-left">
            <h2 className="font-headline-lg text-headline-lg mb-4 dark:text-surface-bright text-on-surface">
              Trusted by the most meticulous financial minds.
            </h2>
            <p className="text-on-surface-variant dark:text-outline-variant">
              Join thousands of professionals who have revolutionized their fiscal workflow.
            </p>
          </div>
          {/* Slider controls */}
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-full border border-outline dark:border-outline flex items-center justify-center hover:bg-surface-container dark:hover:bg-surface-container transition-colors"
              aria-label="Previous testimonial"
            >
              <span className="material-symbols-outlined dark:text-surface-bright text-on-surface">
                chevron_left
              </span>
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-full border border-outline dark:border-outline flex items-center justify-center hover:bg-surface-container dark:hover:bg-surface-container transition-colors"
              aria-label="Next testimonial"
            >
              <span className="material-symbols-outlined dark:text-surface-bright text-on-surface">
                chevron_right
              </span>
            </button>
          </div>
        </div>

        {/* Testimonials List */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-3 gap-lg overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {testimonials.map((item, index) => (
            <div
              key={index}
              className="glass-card p-xl rounded-3xl border border-outline-variant hover:shadow-2xl hover:translate-y-[-8px] transition-all duration-300 min-w-[85vw] sm:min-w-[45vw] md:min-w-0 snap-start flex flex-col justify-between"
            >
              <div>
                {/* Gold Stars */}
                <div className="flex text-warning mb-md">
                  {Array.from({ length: item.stars }).map((_, i) => (
                    <span
                      key={i}
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <p className="font-body-md italic mb-xl text-on-surface-variant dark:text-outline-variant text-left">
                  {item.quote}
                </p>
              </div>

              {/* Profile info */}
              <div className="flex items-center gap-md text-left mt-auto">
                <div className="w-12 h-12 rounded-full bg-slate-200 overflow-hidden border border-outline-variant">
                  <Image
                    className="w-full h-full object-cover"
                    alt={item.name}
                    src={item.avatar}
                    width={48}
                    height={48}
                  />
                </div>
                <div>
                  <p className="font-bold font-title-md dark:text-surface-bright text-on-surface">
                    {item.name}
                  </p>
                  <p className="font-body-sm text-on-surface-variant dark:text-outline-variant">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
