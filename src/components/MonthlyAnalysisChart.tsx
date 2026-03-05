import React, { useState } from 'react';
import {
  ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts';
import { HelpCircle } from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

type SitePair = 'MLM/MLA' | 'MLM/MLC' | 'MLC/MLA';

type RawEntry = {
  name:    string;
  mla_imp: number;
  mlc_imp: number;
  mlm_imp: number;
};

type ChartEntry = {
  name:      string;
  left_imp:  number;
  right_imp: number;
  margen:    number;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const SITE_PAIRS: SitePair[] = ['MLM/MLA', 'MLM/MLC', 'MLC/MLA'];

const SITE_COLORS: Record<string, string> = {
  MLA: '#f59e0b',  // amber
  MLM: '#10b981',  // emerald
  MLC: '#3b82f6',  // blue
};

const SITE_LABELS: Record<string, string> = {
  MLA: 'Argentina (MLA)',
  MLM: 'México (MLM)',
  MLC: 'Chile (MLC)',
};

const PAIR_TITLES: Record<SitePair, string> = {
  'MLM/MLA': 'México (MLM) vs Argentina (MLA)',
  'MLM/MLC': 'México (MLM) vs Chile (MLC)',
  'MLC/MLA': 'Chile (MLC) vs Argentina (MLA)',
};

const IMP_KEY: Record<string, keyof RawEntry> = {
  MLA: 'mla_imp',
  MLM: 'mlm_imp',
  MLC: 'mlc_imp',
};

// ── Mock data ─────────────────────────────────────────────────────────────────

const RAW_DATA: RawEntry[] = [
  { name: 'Oct',  mla_imp: 100000,  mlc_imp: 0,       mlm_imp: 0       },
  { name: 'Nov',  mla_imp: 500000,  mlc_imp: 0,       mlm_imp: 0       },
  { name: 'Dic',  mla_imp: 800000,  mlc_imp: 0,       mlm_imp: 80000   },
  { name: 'Ene',  mla_imp: 100000,  mlc_imp: 0,       mlm_imp: 80000   },
  { name: 'Feb',  mla_imp: 1500000, mlc_imp: 1360000, mlm_imp: 200000  },
  { name: 'Mar*', mla_imp: 3500000, mlc_imp: 500000,  mlm_imp: 200000  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function pairSites(pair: SitePair): [string, string] {
  return pair.split('/') as [string, string];
}

function fmtM(v: number): string {
  const abs  = Math.abs(v);
  const sign = v < 0 ? '−' : '';
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000)     return `${sign}$${(abs / 1_000).toFixed(0)}K`;
  return `${sign}$${abs}`;
}

function buildChartData(pair: SitePair): ChartEntry[] {
  const [l, r] = pairSites(pair);
  return RAW_DATA.map(d => ({
    name:      d.name,
    left_imp:  d[IMP_KEY[l]] as number,
    right_imp: d[IMP_KEY[r]] as number,
    margen:    (d[IMP_KEY[l]] as number) - (d[IMP_KEY[r]] as number),
  }));
}

// ── Custom Tooltip ────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs min-w-[200px]">
      <p className="font-semibold text-gray-800 mb-2 pb-1.5 border-b border-gray-100">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-6 mb-1.5">
          <span className="flex items-center gap-1.5 text-gray-500">
            <span
              className="size-2 rounded-full shrink-0"
              style={{ background: entry.dataKey === 'margen' ? '#ef4444' : entry.color }}
            />
            {entry.name}
          </span>
          <span className={`font-semibold tabular-nums ${
            entry.dataKey === 'margen' && entry.value < 0 ? 'text-red-500' : 'text-gray-800'
          }`}>
            {fmtM(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function MonthlyAnalysisChart() {
  const [pair,     setPair]     = useState<SitePair>('MLM/MLA');
  const [showInfo, setShowInfo] = useState(false);

  const [l, r]    = pairSites(pair);
  const chartData = buildChartData(pair);

  return (
    <div className="bg-surface rounded-2xl border border-border-color shadow-card mb-4 overflow-visible">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-color">
        <div>
          <h3 className="text-sm font-bold text-text-main">{PAIR_TITLES[pair]}</h3>
          <p className="text-[10px] text-text-secondary mt-0.5">
            Importe operativo y margen · Últimos 6 meses · USD
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter pills */}
          <div className="flex items-center gap-1.5">
            {SITE_PAIRS.map(p => (
              <button
                key={p}
                onClick={() => setPair(p)}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  pair === p
                    ? 'bg-gray-900 text-white border-gray-900'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Info popover */}
          <div className="relative">
            <button
              onMouseEnter={() => setShowInfo(true)}
              onMouseLeave={() => setShowInfo(false)}
              className="flex items-center text-gray-300 hover:text-gray-500 transition-colors"
            >
              <HelpCircle size={15} />
            </button>
            {showInfo && (
              <div className="absolute right-0 top-6 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs text-gray-500 z-30 leading-relaxed">
                La{' '}
                <span className="font-semibold text-red-500">línea roja</span>
                {' '}actúa como ancla de realidad financiera: si la línea cae, el
                crecimiento de volumen está comprometiendo la rentabilidad.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Legend ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 px-6 pt-4">
        {[l, r].map(site => (
          <span key={site} className="flex items-center gap-1.5 text-[10px] text-text-secondary">
            <span className="size-2.5 rounded-sm" style={{ background: SITE_COLORS[site] }} />
            {SITE_LABELS[site]}
          </span>
        ))}
        <span className="flex items-center gap-1.5 text-[10px] text-text-secondary">
          <span className="inline-block w-4 h-0.5 rounded-full bg-red-500" />
          Margen (O1 − CMV)
        </span>
      </div>

      {/* ── Chart canvas ─────────────────────────────────────────────────── */}
      <div style={{ height: '350px' }} className="px-2 pt-2 pb-1">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 10, right: 65, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />

            {/* Left Y-axis: Importe */}
            <YAxis
              yAxisId="import"
              orientation="left"
              tickFormatter={fmtM}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              width={56}
            />

            {/* Right Y-axis: Margen */}
            <YAxis
              yAxisId="margin"
              orientation="right"
              tickFormatter={fmtM}
              tick={{ fontSize: 10, fill: '#ef4444' }}
              axisLine={false}
              tickLine={false}
              width={62}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Zero reference line for margin */}
            <ReferenceLine
              yAxisId="margin"
              y={0}
              stroke="#cbd5e1"
              strokeDasharray="4 4"
              strokeWidth={1.5}
            />

            {/* Import bars */}
            <Bar
              yAxisId="import"
              dataKey="left_imp"
              fill={SITE_COLORS[l]}
              radius={[4, 4, 0, 0]}
              maxBarSize={48}
              name={SITE_LABELS[l]}
              isAnimationActive
            />
            <Bar
              yAxisId="import"
              dataKey="right_imp"
              fill={SITE_COLORS[r]}
              radius={[4, 4, 0, 0]}
              maxBarSize={48}
              name={SITE_LABELS[r]}
              isAnimationActive
            />

            {/* Margin line */}
            <Line
              yAxisId="margin"
              type="monotone"
              dataKey="margen"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ fill: '#ef4444', r: 4, strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff', fill: '#ef4444' }}
              name="Margen"
              isAnimationActive
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* ── Footer: margin grid ───────────────────────────────────────────── */}
      <div className="px-6 pt-3 pb-5 border-t border-border-color bg-gray-50/50">
        <p className="text-[9px] font-semibold text-text-secondary uppercase tracking-wide mb-2">
          Margen mensual (O1 − CMV)
        </p>
        <div className="grid grid-cols-6 gap-2">
          {chartData.map(d => {
            const isPos = d.margen >= 0;
            return (
              <div
                key={d.name}
                className={`rounded-lg px-2 py-2 text-center ${isPos ? 'bg-green-50' : 'bg-red-50'}`}
              >
                <p className="text-[9px] text-gray-400 mb-0.5">{d.name}</p>
                <p className={`text-[11px] font-bold tabular-nums ${isPos ? 'text-green-600' : 'text-red-500'}`}>
                  {isPos ? '+' : ''}{fmtM(d.margen)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
