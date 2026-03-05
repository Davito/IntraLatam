import React from 'react';
import { KpiDetailData } from '../types';

// ── Mock monthly evolution data ───────────────────────────────────────────────

const MONTHLY_DATA = [
  { m: 'Oct', MLA: 40, MLM: 22, MLC: 14, MCO: 12 },
  { m: 'Nov', MLA: 48, MLM: 26, MLC: 16, MCO: 14 },
  { m: 'Dic', MLA: 55, MLM: 30, MLC: 18, MCO: 16 },
  { m: 'Ene', MLA: 60, MLM: 28, MLC: 20, MCO: 15 },
  { m: 'Feb', MLA: 70, MLM: 35, MLC: 22, MCO: 18 },
  { m: 'Mar', MLA: 80, MLM: 40, MLC: 24, MCO: 20 },
];

const SITE_COLORS: Record<string, string> = {
  MLA: '#f59e0b',
  MLM: '#10b981',
  MLC: '#3b82f6',
  MCO: '#8b5cf6',
};

// ── CSS-only monthly bar chart ────────────────────────────────────────────────

function MonthlyChart() {
  const max = Math.max(...MONTHLY_DATA.flatMap(d => [d.MLA, d.MLM, d.MLC, d.MCO]));
  const sites = ['MLA', 'MLM', 'MLC', 'MCO'] as const;

  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        {sites.map(s => (
          <span key={s} className="flex items-center gap-1.5 text-[10px] text-text-secondary">
            <span className="size-2 rounded-sm shrink-0" style={{ background: SITE_COLORS[s] }} />
            {s}
          </span>
        ))}
      </div>

      {/* Chart */}
      <div className="flex items-end justify-between gap-1 h-28">
        {MONTHLY_DATA.map(d => (
          <div key={d.m} className="flex-1 flex flex-col items-center gap-0.5 min-w-0">
            <div className="w-full flex items-end justify-center gap-0.5 h-20">
              {sites.map(s => (
                <div
                  key={s}
                  className="flex-1 rounded-t-sm min-w-0 transition-all"
                  style={{
                    height: `${(d[s] / max) * 100}%`,
                    background: SITE_COLORS[s],
                    opacity: 0.85,
                  }}
                  title={`${s}: ${d[s]}`}
                />
              ))}
            </div>
            <p className="text-[9px] text-text-secondary mt-1">{d.m}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface KpiDetailSidebarProps {
  data: KpiDetailData;
  onClose: () => void;
  onFilterByError?: (message: string) => void;
}

export default function KpiDetailSidebar({ data, onClose, onFilterByError }: KpiDetailSidebarProps) {
  const getAccentClass = () => {
    switch (data.type) {
      case 'Error':   return 'bg-error';
      case 'OK':      return 'bg-success';
      case 'WIP':     return 'bg-info';
      case 'OnHold':  return 'bg-warning';
      default:        return 'bg-primary';
    }
  };

  const formatUSD = (val: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-surface shadow-2xl z-50 flex flex-col border-l border-border-color">
      {/* Accent bar */}
      <div className={`h-1 w-full shrink-0 ${getAccentClass()}`} />

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-border-color shrink-0">
        <h2 className="text-lg font-semibold text-text-main">
          {data.count} {data.title}
        </h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-background-light rounded-full text-text-secondary transition-colors"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-6">

        {/* ── Salud de la Operación ─────────────────────────────────── */}
        <section className="bg-background-light p-4 rounded-xl border border-border-color">
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Salud de la Operación</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-text-secondary mb-1">SLA (&lt; 24hs)</p>
              <p className="text-2xl font-bold text-text-main">{data.slaPercent}%</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary mb-1">Volumen Acumulado</p>
              <p className="text-2xl font-bold text-text-main">{formatUSD(data.volumeUsd)}</p>
            </div>
          </div>
        </section>

        {/* ── Evolutivo mensual por sitio ───────────────────────────── */}
        <section className="bg-background-light p-4 rounded-xl border border-border-color">
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">
            Evolutivo Mensual por Sitio
          </h3>
          <MonthlyChart />
        </section>

        {/* ── Distribución por Site ─────────────────────────────────── */}
        <section>
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">Distribución por Site</h3>
          <div className="flex flex-col gap-3">
            {data.siteDistribution.map(site => (
              <div key={site.site}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-text-main">{site.site}</span>
                  <span className="text-text-secondary">{site.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-background-light rounded-full overflow-hidden border border-border-color">
                  <div
                    className={`h-full ${getAccentClass()} rounded-full opacity-80`}
                    style={{ width: `${site.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Composición por Flujo ─────────────────────────────────── */}
        <section>
          <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">Composición por Flujo</h3>
          <div className="flex items-center gap-6">
            <div className="relative w-24 h-24 rounded-full shrink-0 flex items-center justify-center"
              style={{
                background: `conic-gradient(var(--color-primary) 0% ${data.flowComposition.order1}%, #E5E7EB ${data.flowComposition.order1}% 100%)`
              }}
            >
              <div className="absolute w-16 h-16 bg-surface rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-primary" />
                <span className="text-xs text-text-main font-medium">Orden 1 (Ventas)</span>
                <span className="text-xs text-text-secondary ml-auto">{data.flowComposition.order1}%</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded bg-gray-200" />
                <span className="text-xs text-text-main font-medium">Orden 2 (Compras)</span>
                <span className="text-xs text-text-secondary ml-auto">{data.flowComposition.order2}%</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Diagnóstico Técnico (Error / OnHold only) ─────────────── */}
        {(data.type === 'Error' || data.type === 'OnHold') && data.commonErrors && (
          <section className="bg-error-bg/30 p-4 rounded-xl border border-error/20">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-error text-lg">build</span>
              <h3 className="text-sm font-semibold text-error uppercase tracking-wider">Diagnóstico Técnico</h3>
            </div>

            <p className="text-[10px] text-text-secondary mb-2">
              Haz clic en un error para filtrar la tabla principal
            </p>

            <ul className="flex flex-col gap-1 mb-4">
              {data.commonErrors.map((err, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onFilterByError?.(err.message)}
                    className="w-full flex items-center justify-between text-sm py-2 px-3 rounded-lg border border-transparent hover:border-error/20 hover:bg-error/5 transition-all group text-left"
                  >
                    <span className="flex items-center gap-2 text-text-main group-hover:text-error transition-colors">
                      <span className="material-symbols-outlined text-sm text-error/60 shrink-0">arrow_forward</span>
                      {err.message}
                    </span>
                    <span className="text-xs font-semibold bg-surface text-text-secondary px-2 py-0.5 rounded-full shadow-sm shrink-0 ml-2">
                      {err.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <button className="w-full py-2 bg-surface border border-error/30 text-error rounded-lg text-sm font-medium hover:bg-error-bg transition-colors flex items-center justify-center gap-2 shadow-sm">
              <span className="material-symbols-outlined text-sm">filter_list</span>
              Filtrar tabla por todos estos casos
            </button>
          </section>
        )}
      </div>
    </div>
  );
}
