'use client';

import React, { useState } from 'react';
import { useModal } from './ModalContext';

type ExportFormat = 'pdf' | 'csv';
type DateRangePreset = 'monthly' | 'quarterly' | 'yearly' | 'custom';

type GenerateState = 'idle' | 'processing' | 'done';

const DATA_POINTS = [
  { id: 'txn_id', label: 'Transaction ID', defaultChecked: true },
  { id: 'datetime', label: 'Date & Time', defaultChecked: true },
  { id: 'description', label: 'Description', defaultChecked: true },
  { id: 'amount', label: 'Amount', defaultChecked: true },
  { id: 'category', label: 'Category', defaultChecked: true },
  { id: 'vendor_meta', label: 'Vendor Meta', defaultChecked: false },
  { id: 'tax', label: 'Tax Breakdowns', defaultChecked: false },
  { id: 'attachments', label: 'Attachments', defaultChecked: false },
];

function getDefaultDates(preset: DateRangePreset): { start: string; end: string } {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth(); // 0-indexed

  if (preset === 'monthly') {
    const start = new Date(y, m, 1);
    const end = new Date(y, m + 1, 0);
    return {
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
    };
  }
  if (preset === 'quarterly') {
    const qStart = Math.floor(m / 3) * 3;
    const start = new Date(y, qStart, 1);
    const end = new Date(y, qStart + 3, 0);
    return {
      start: start.toISOString().slice(0, 10),
      end: end.toISOString().slice(0, 10),
    };
  }
  if (preset === 'yearly') {
    return {
      start: `${y}-01-01`,
      end: `${y}-12-31`,
    };
  }
  // custom — keep whatever is already set
  return { start: `${y}-01-01`, end: `${y}-01-31` };
}

export default function ExportReportModal() {
  const { isExportReportOpen, closeExportReport } = useModal();

  const [format, setFormat] = useState<ExportFormat>('pdf');
  const [rangePreset, setRangePreset] = useState<DateRangePreset>('monthly');
  const [startDate, setStartDate] = useState(() => getDefaultDates('monthly').start);
  const [endDate, setEndDate] = useState(() => getDefaultDates('monthly').end);
  const [dataPoints, setDataPoints] = useState<Record<string, boolean>>(
    Object.fromEntries(DATA_POINTS.map((d) => [d.id, d.defaultChecked]))
  );
  const [genState, setGenState] = useState<GenerateState>('idle');

  if (!isExportReportOpen) return null;

  /* ── Handlers ── */
  const handlePreset = (preset: DateRangePreset) => {
    setRangePreset(preset);
    if (preset !== 'custom') {
      const { start, end } = getDefaultDates(preset);
      setStartDate(start);
      setEndDate(end);
    }
  };

  const toggleDataPoint = (id: string) => {
    setDataPoints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleGenerate = () => {
    if (genState !== 'idle') return;
    setGenState('processing');
    setTimeout(() => {
      setGenState('done');
      setTimeout(() => {
        setGenState('idle');
        closeExportReport();
      }, 2000);
    }, 1500);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) closeExportReport();
  };

  const checkedCount = Object.values(dataPoints).filter(Boolean).length;
  const estimatedMb = (checkedCount * 0.4 + 0.4).toFixed(1);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-md"
      style={{ background: 'rgba(25, 27, 35, 0.45)', backdropFilter: 'blur(4px)' }}
      onClick={handleOverlayClick}
    >
      <div className="bg-surface-container-lowest dark:bg-surface-container w-full max-w-[640px] rounded-xl shadow-2xl overflow-hidden border border-outline-variant animate-in fade-in zoom-in duration-300">

        {/* ── Header ── */}
        <div className="px-lg py-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low dark:bg-surface-dim">
          <div>
            <h3 className="font-headline text-title-md font-bold text-on-surface">Export Report</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Configure your document parameters</p>
          </div>
          <button
            onClick={closeExportReport}
            className="w-10 h-10 rounded-full hover:bg-surface-container-high dark:hover:bg-surface-container-highest transition-colors flex items-center justify-center text-outline"
            aria-label="Close Export Report Modal"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="p-lg space-y-xl max-h-[68vh] overflow-y-auto custom-scrollbar">

          {/* Format Section */}
          <section className="space-y-md">
            <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider">
              File Format
            </label>
            <div className="grid grid-cols-2 gap-md">
              {/* PDF */}
              <label className="relative cursor-pointer group">
                <input
                  type="radio"
                  name="export-format"
                  value="pdf"
                  checked={format === 'pdf'}
                  onChange={() => setFormat('pdf')}
                  className="sr-only peer"
                />
                <div className="p-md border border-outline-variant rounded-lg flex items-center space-x-md peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/60 transition-all">
                  <div className="w-10 h-10 rounded bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined">picture_as_pdf</span>
                  </div>
                  <div>
                    <div className="font-body-md font-bold text-on-surface">Portable Document</div>
                    <div className="text-body-sm text-on-surface-variant">Best for printing (.pdf)</div>
                  </div>
                  {format === 'pdf' && (
                    <div className="absolute top-2 right-2 text-primary">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </div>
                  )}
                </div>
              </label>

              {/* CSV */}
              <label className="relative cursor-pointer group">
                <input
                  type="radio"
                  name="export-format"
                  value="csv"
                  checked={format === 'csv'}
                  onChange={() => setFormat('csv')}
                  className="sr-only peer"
                />
                <div className="p-md border border-outline-variant rounded-lg flex items-center space-x-md peer-checked:border-primary peer-checked:bg-primary/5 hover:border-primary/60 transition-all">
                  <div className="w-10 h-10 rounded bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined">csv</span>
                  </div>
                  <div>
                    <div className="font-body-md font-bold text-on-surface">Data Spreadsheet</div>
                    <div className="text-body-sm text-on-surface-variant">Best for analysis (.csv)</div>
                  </div>
                  {format === 'csv' && (
                    <div className="absolute top-2 right-2 text-primary">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        check_circle
                      </span>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </section>

          {/* Date Range Section */}
          <section className="space-y-md">
            <div className="flex justify-between items-end">
              <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider">
                Date Range
              </label>
              <span className="text-xs font-data-mono text-outline">FY {new Date().getFullYear()}</span>
            </div>

            <div className="flex flex-wrap gap-sm">
              {(
                [
                  { key: 'monthly', label: 'Monthly' },
                  { key: 'quarterly', label: 'Quarterly' },
                  { key: 'yearly', label: 'Yearly' },
                ] as { key: DateRangePreset; label: string }[]
              ).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handlePreset(key)}
                  className={`px-lg py-2 rounded-full border font-label-caps text-label-caps transition-all ${
                    rangePreset === key
                      ? 'border-primary bg-surface-container-high text-primary font-bold'
                      : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
                  }`}
                >
                  {label}
                </button>
              ))}
              <button
                onClick={() => handlePreset('custom')}
                className={`px-lg py-2 rounded-full border font-label-caps text-label-caps transition-all flex items-center gap-1 ${
                  rangePreset === 'custom'
                    ? 'border-primary bg-surface-container-high text-primary font-bold'
                    : 'border-outline-variant text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                Custom Range
              </button>
            </div>

            <div className="grid grid-cols-2 gap-md pt-sm">
              <div className="space-y-base">
                <span className="text-[11px] font-label-caps text-outline ml-1">Start Date</span>
                {rangePreset === 'custom' ? (
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full flex items-center px-md py-2 bg-surface-container-low dark:bg-surface-container border border-outline-variant rounded-lg font-data-mono text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                ) : (
                  <div className="flex items-center px-md py-2 bg-surface-container-low dark:bg-surface-container border border-outline-variant rounded-lg">
                    <span className="font-data-mono text-body-sm text-on-surface">{startDate}</span>
                  </div>
                )}
              </div>
              <div className="space-y-base">
                <span className="text-[11px] font-label-caps text-outline ml-1">End Date</span>
                {rangePreset === 'custom' ? (
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full flex items-center px-md py-2 bg-surface-container-low dark:bg-surface-container border border-outline-variant rounded-lg font-data-mono text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                ) : (
                  <div className="flex items-center px-md py-2 bg-surface-container-low dark:bg-surface-container border border-outline-variant rounded-lg">
                    <span className="font-data-mono text-body-sm text-on-surface">{endDate}</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Data Points Section */}
          <section className="space-y-md">
            <label className="font-label-caps text-label-caps text-on-surface-variant block uppercase tracking-wider">
              Data points to include
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-sm">
              {DATA_POINTS.map(({ id, label }) => (
                <label
                  key={id}
                  htmlFor={`dp-${id}`}
                  className="flex items-center p-sm rounded hover:bg-surface-container-low dark:hover:bg-surface-container transition-colors cursor-pointer"
                >
                  <input
                    id={`dp-${id}`}
                    type="checkbox"
                    checked={!!dataPoints[id]}
                    onChange={() => toggleDataPoint(id)}
                    className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20 cursor-pointer accent-primary"
                  />
                  <span className="ml-3 font-body-sm text-on-surface">{label}</span>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* ── Footer ── */}
        <div className="px-lg py-lg bg-surface-container-low dark:bg-surface-dim border-t border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-md">
          <div className="flex items-center space-x-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-[20px]">info</span>
            <span className="text-[12px] font-body-sm">
              Final report will be ~{estimatedMb} MB
            </span>
          </div>

          <div className="flex space-x-md">
            <button
              onClick={closeExportReport}
              className="flex-1 md:flex-none px-xl py-2 rounded-lg border border-outline text-on-surface font-label-caps text-label-caps hover:bg-surface-container-high dark:hover:bg-surface-container transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              disabled={genState !== 'idle'}
              className={`flex-1 md:flex-none px-xl py-2 rounded-lg font-label-caps text-label-caps shadow-md hover:shadow-xl active:scale-95 transition-all flex items-center justify-center gap-2 ${
                genState === 'done'
                  ? 'bg-success text-white'
                  : 'bg-primary text-on-primary hover:opacity-90'
              } disabled:cursor-not-allowed`}
            >
              {genState === 'idle' && (
                <>
                  <span className="material-symbols-outlined text-[20px]">download</span>
                  Generate Report
                </>
              )}
              {genState === 'processing' && (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              )}
              {genState === 'done' && (
                <>
                  <span className="material-symbols-outlined text-[20px]">check</span>
                  Complete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
