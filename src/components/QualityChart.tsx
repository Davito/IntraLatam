import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

// ── Types ─────────────────────────────────────────────────────────────────────

type SiteFilter = 'Todos los sitios' | 'MLA' | 'MLM' | 'MLC' | 'MCO';

type RawMonth = {
  m:          string;
  procesadas: number;
  pendientes: number;
  errores:    number;
  facturas:   number;
  proformas:  number;
};

type ChartEntry = {
  name:       string;
  procesadas: number;
  pendientes: number;
  errores:    number;
  // raw counts for tooltip
  _procesadas: number;
  _pendientes: number;
  _errores:    number;
  _facturas:   number;
  _proformas:  number;
};

// ── Constants ─────────────────────────────────────────────────────────────────

const SITE_FILTERS: SiteFilter[] = ['Todos los sitios', 'MLA', 'MLM', 'MLC', 'MCO'];

// ── Mock data ─────────────────────────────────────────────────────────────────

const RAW_DATA: RawMonth[] = [
  { m: 'Oct',  procesadas: 320,  pendientes: 18, errores: 12,  facturas: 120, proformas: 180 },
  { m: 'Nov',  procesadas: 390,  pendientes: 20, errores: 10,  facturas: 165, proformas: 200 },
  { m: 'Dic',  procesadas: 460,  pendientes: 22, errores: 18,  facturas: 200, proformas: 230 },
  { m: 'Ene',  procesadas: 500,  pendientes: 0,  errores: 0,   facturas: 200, proformas: 250 },
  { m: 'Feb',  procesadas: 1700, pendientes: 0,  errores: 0,   facturas: 1000,proformas: 700 },
  { m: 'Mar*', procesadas: 3180, pendientes: 80, errores: 100, facturas: 3000,proformas: 260 },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function buildChartData(data: RawMonth[]): ChartEntry[] {
  return data.map(d => {
    const total = d.procesadas + d.pendientes + d.errores || 1;
    return {
      name:        d.m,
      procesadas:  Math.round((d.procesadas / total) * 100),
      pendientes:  Math.round((d.pendientes / total) * 100),
      errores:     Math.round((d.errores    / total) * 100),
      _procesadas: d.procesadas,
      _pendientes: d.pendientes,
      _errores:    d.errores,
      _facturas:   d.facturas,
      _proformas:  d.proformas,
    };
  });
}

// ── Custom Tooltip ────────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;

  const d = payload[0]?.payload as ChartEntry;
  const total = d._procesadas + d._pendientes + d._errores;
  const pct = (n: number) => total > 0 ? `${((n / total) * 100).toFixed(1)}%` : '0%';

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-3 text-xs min-w-[210px]">
      <p className="font-semibold text-gray-800 mb-2 pb-1.5 border-b border-gray-100">{label}</p>

      {/* ESTATUS */}
      <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5">Estatus</p>
      <div className="flex flex-col gap-1 mb-3">
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-gray-500">
            <span className="size-2 rounded-full bg-emerald-400 shrink-0" />
            Procesadas
          </span>
          <span className="font-semibold tabular-nums text-gray-800">
            {d._procesadas} <span className="text-gray-400 font-normal">({pct(d._procesadas)})</span>
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-gray-500">
            <span className="size-2 rounded-full bg-amber-400 shrink-0" />
            Pendientes
          </span>
          <span className="font-semibold tabular-nums text-gray-800">
            {d._pendientes} <span className="text-gray-400 font-normal">({pct(d._pendientes)})</span>
          </span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="flex items-center gap-1.5 text-gray-500">
            <span className="size-2 rounded-full bg-rose-400 shrink-0" />
            Con Error
          </span>
          <span className="font-semibold tabular-nums text-gray-800">
            {d._errores} <span className="text-gray-400 font-normal">({pct(d._errores)})</span>
          </span>
        </div>
      </div>

      {/* DOCUMENTOS */}
      <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5 pt-2 border-t border-gray-100">
        Documentos
      </p>
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-500 italic">Facturas</span>
          <span className="font-bold tabular-nums text-indigo-500">{d._facturas}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-500 italic">Proformas</span>
          <span className="font-bold tabular-nums text-indigo-500">{d._proformas}</span>
        </div>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function QualityChart() {
  const [site, setSite] = useState<SiteFilter>('Todos los sitios');

  // In a real app this would filter data by site; with mock data we use all months
  const chartData = buildChartData(RAW_DATA);

  return (
    <div className="bg-surface rounded-2xl border border-border-color shadow-card overflow-hidden">

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-color">
        <div>
          <h3 className="text-sm font-bold text-text-main">
            Visualización de proporción relativa (100%)
          </h3>
          <p className="text-[10px] text-text-secondary mt-0.5">
            Estatus y documentos por mes · Últimos 6 meses
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex items-center gap-1.5">
          {SITE_FILTERS.map(sf => (
            <button
              key={sf}
              onClick={() => setSite(sf)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                site === sf
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-700'
              }`}
            >
              {sf}
            </button>
          ))}
        </div>
      </div>

      {/* ── Legend ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 px-6 pt-4">
        {[
          { label: 'Procesadas', color: '#34d399' },
          { label: 'Pendientes', color: '#fbbf24' },
          { label: 'Con error',  color: '#f87171' },
        ].map(s => (
          <span key={s.label} className="flex items-center gap-1.5 text-[10px] text-text-secondary">
            <span className="size-2.5 rounded-sm" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>

      {/* ── Chart ───────────────────────────────────────────────────────── */}
      <div style={{ height: '280px' }} className="px-2 pt-2 pb-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 16, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 11, fill: '#94a3b8' }}
              axisLine={{ stroke: '#e2e8f0' }}
              tickLine={false}
            />

            <YAxis
              tickFormatter={v => `${v}%`}
              tick={{ fontSize: 10, fill: '#94a3b8' }}
              axisLine={false}
              tickLine={false}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.04)' }} />

            <Bar
              dataKey="procesadas"
              stackId="a"
              fill="#34d399"
              maxBarSize={52}
              isAnimationActive
            />
            <Bar
              dataKey="pendientes"
              stackId="a"
              fill="#fbbf24"
              maxBarSize={52}
              isAnimationActive
            />
            <Bar
              dataKey="errores"
              stackId="a"
              fill="#f87171"
              radius={[4, 4, 0, 0]}
              maxBarSize={52}
              isAnimationActive
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Footer: summary grid ─────────────────────────────────────────── */}
      <div className="px-6 pt-3 pb-5 border-t border-border-color bg-gray-50/50">
        <p className="text-[9px] font-semibold text-text-secondary uppercase tracking-wide mb-2">
          Total operaciones por mes
        </p>
        <div className="grid grid-cols-6 gap-2">
          {RAW_DATA.map(d => {
            const total = d.procesadas + d.pendientes + d.errores;
            const errPct = total > 0 ? ((d.errores / total) * 100).toFixed(0) : '0';
            const hasErr = d.errores > 0;
            return (
              <div
                key={d.m}
                className={`rounded-lg px-2 py-2 text-center ${hasErr ? 'bg-red-50' : 'bg-green-50'}`}
              >
                <p className="text-[9px] text-gray-400 mb-0.5">{d.m}</p>
                <p className={`text-[11px] font-bold tabular-nums ${hasErr ? 'text-red-500' : 'text-green-600'}`}>
                  {total.toLocaleString()}
                </p>
                {hasErr && (
                  <p className="text-[9px] text-red-400 mt-0.5">{errPct}% err</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
