import React, { useState } from 'react';
import KPICards from './KPICards';
import MonthlyAnalysisChart from './MonthlyAnalysisChart';
import QualityChart from './QualityChart';
import { KpiType } from '../types';

// ── Types ─────────────────────────────────────────────────────────────────────

type Tab = 'general' | 'monthly' | 'quality';

// ── Constants ─────────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: 'general', label: 'Indicadores generales' },
  { id: 'monthly', label: 'Análisis mensual por sitio' },
  { id: 'quality', label: 'Estatus y calidad' },
];

// ── Main component ────────────────────────────────────────────────────────────

export default function IndicatorsPanel({ onKpiClick }: {
  onKpiClick: (kpi: KpiType) => void;
}) {
  const [tab, setTab] = useState<Tab>('general');
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div className="mb-4">

      {/* ── Tab pills + toggle ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-4">
        {TABS.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
              tab === t.id
                ? 'bg-primary text-white border-primary shadow-sm'
                : 'bg-surface text-text-secondary border-border-color hover:border-primary/30 hover:text-text-main'
            }`}
          >
            {t.label}
          </button>
        ))}

        <button
          onClick={() => setIsVisible(v => !v)}
          title={isVisible ? 'Ocultar indicadores' : 'Mostrar indicadores'}
          className={`h-7 w-7 rounded-full border flex items-center justify-center transition-colors ${
            isVisible
              ? 'border-border-color bg-surface text-text-secondary hover:bg-background-light'
              : 'border-primary bg-primary/5 text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-base">
            {isVisible ? 'visibility' : 'visibility_off'}
          </span>
        </button>
      </div>

      {/* ── Collapsible content ────────────────────────────────────────── */}
      <div className={`grid transition-all duration-300 ease-in-out ${isVisible ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">

          {/* Tab 1: Indicadores generales */}
          {tab === 'general' && (
            <KPICards onKpiClick={onKpiClick} />
          )}

          {/* Tab 2: Análisis mensual por sitio */}
          {tab === 'monthly' && <MonthlyAnalysisChart />}

          {/* Tab 3: Estatus y calidad */}
          {tab === 'quality' && <QualityChart />}

        </div>
      </div>
    </div>
  );
}
