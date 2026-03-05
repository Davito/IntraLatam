import React, { useState } from 'react';
import { Document, WorkflowStep } from '../types';
import { mockWorkflowSteps } from '../data';

// ── Types ─────────────────────────────────────────────────────────────────────

type DetailTab = 'flow' | 'provision';

// ── Status badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: Document['status'] }) {
  const s: Record<string, string> = {
    Error:          'bg-error/10 text-error border-error/20',
    Contabilizado:  'bg-success/10 text-success border-success/20',
    'En Proceso':   'bg-primary/10 text-primary border-primary/20',
    'En Espera':    'bg-amber-50 text-amber-600 border-amber-200',
  };
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s[status]}`}>
      {status}
    </span>
  );
}

// ── Horizontal compact stepper ────────────────────────────────────────────────

function nodeStyle(status: WorkflowStep['status']) {
  switch (status) {
    case 'success':     return { ring: 'border-success bg-success/10',        icon: 'check', color: 'text-success' };
    case 'error':       return { ring: 'border-error bg-error/10',            icon: 'close', color: 'text-error' };
    case 'in_progress': return { ring: 'border-primary bg-primary/10',        icon: 'sync',  color: 'text-primary' };
    case 'pending':     return { ring: 'border-border-color bg-background-light', icon: '', color: '' };
  }
}

function lineColor(status: WorkflowStep['status']) {
  return status === 'success' ? 'bg-success/40' : 'bg-border-color';
}

function HorizontalStepper({ steps }: { steps: WorkflowStep[] }) {
  return (
    <div className="flex items-start w-full">
      {steps.map((step, i) => {
        const s = nodeStyle(step.status);
        const isLast = i === steps.length - 1;
        return (
          <div key={step.id} className="flex-1 flex flex-col items-center relative min-w-0">
            {/* connector right */}
            {!isLast && (
              <div className={`absolute top-[13px] left-1/2 right-0 h-0.5 z-0 ${lineColor(steps[i + 1].status)}`} />
            )}
            {/* connector left */}
            {i > 0 && (
              <div className={`absolute top-[13px] left-0 right-1/2 h-0.5 z-0 ${lineColor(step.status)}`} />
            )}

            {/* Node */}
            <div className={`relative z-10 size-7 rounded-full border-2 flex items-center justify-center shrink-0 ${s.ring}`}>
              {step.status === 'pending' ? (
                <span className="size-2 rounded-full bg-gray-300" />
              ) : (
                <span className={`material-symbols-outlined text-[13px] leading-none ${s.color} ${step.status === 'in_progress' ? 'animate-spin' : ''}`}>
                  {s.icon}
                </span>
              )}
            </div>

            {/* Step name */}
            <p className="text-[9px] font-medium text-text-secondary text-center mt-1.5 leading-tight px-1 truncate w-full">
              {step.name}
            </p>

            {/* SAP ID */}
            {step.sapId ? (
              <p className="text-[8px] font-mono text-primary/70 text-center mt-0.5">{step.sapId}</p>
            ) : (
              <p className="text-[8px] text-transparent select-none mt-0.5">—</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Vertical step row ─────────────────────────────────────────────────────────

function rowStyle(status: WorkflowStep['status']) {
  switch (status) {
    case 'success':     return { icon: 'check_circle',           c: 'text-success',           bg: 'bg-success/10',       b: 'border-success/30',   line: 'bg-success/25' };
    case 'error':       return { icon: 'cancel',                 c: 'text-error',             bg: 'bg-error/10',         b: 'border-error/30',     line: 'bg-border-color' };
    case 'in_progress': return { icon: 'sync',                   c: 'text-primary',           bg: 'bg-primary/10',       b: 'border-primary/30',   line: 'bg-border-color' };
    case 'pending':     return { icon: 'radio_button_unchecked', c: 'text-text-secondary/40', bg: 'bg-background-light', b: 'border-border-color', line: 'bg-border-color' };
  }
}

function StepRow({ step, isLast, defaultOpen, key: _key }: {
  step: WorkflowStep; isLast: boolean; defaultOpen: boolean; key?: string | number;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const s = rowStyle(step.status);

  return (
    <div className="relative">
      {!isLast && <div className={`absolute left-[15px] top-[32px] w-0.5 h-[calc(100%+2px)] ${s.line} z-0`} />}
      <button
        onClick={() => setOpen(o => !o)}
        className={`w-full flex items-start gap-3 px-2 py-2 rounded-xl text-left relative z-10 transition-colors ${open ? 'bg-background-light' : 'hover:bg-background-light/70'}`}
      >
        <div className={`size-8 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${s.bg} ${s.b}`}>
          <span className={`material-symbols-outlined text-sm leading-none ${s.c} ${step.status === 'in_progress' ? 'animate-spin' : ''}`}>
            {s.icon}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className={`text-sm font-semibold leading-tight ${step.status === 'pending' ? 'text-text-secondary/60' : 'text-text-main'}`}>
              {step.name}
            </span>
            <div className="flex items-center gap-2 shrink-0">
              {step.sapId && (
                <span className="text-[10px] font-mono bg-primary/5 text-primary border border-primary/20 px-2 py-0.5 rounded">
                  {step.sapId}
                </span>
              )}
              {step.timestamp && (
                <span className="text-[10px] text-text-secondary tabular-nums">{step.timestamp}</span>
              )}
              <span className={`material-symbols-outlined text-xs text-text-secondary/50 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </div>
          </div>
          {open && (
            <div className={`mt-2 mb-1 px-3 py-2.5 rounded-lg text-xs ${step.status === 'error' ? 'bg-error/5 border border-error/20' : 'bg-white border border-border-color'}`}>
              {step.status === 'error' ? (
                <div className="flex gap-2">
                  <span className="material-symbols-outlined text-error text-sm shrink-0">error</span>
                  <div>
                    <p className="font-semibold text-error">Código E092</p>
                    <p className="text-text-secondary mt-0.5">{step.description}</p>
                  </div>
                </div>
              ) : (
                <p className="text-text-secondary">{step.description}</p>
              )}
            </div>
          )}
        </div>
      </button>
    </div>
  );
}

// ── Mock provision data ───────────────────────────────────────────────────────

const PROVISION_ROWS = [
  { pos: '10', tipo: 'Débito',  cuenta: '400021', desc: 'Materias primas',     debe: 2100.00, haber: null    },
  { pos: '10', tipo: 'Crédito', cuenta: '211001', desc: 'Cuentas por pagar',   debe: null,    haber: 2100.00 },
  { pos: '20', tipo: 'Débito',  cuenta: '400022', desc: 'Flete internacional',  debe: 850.00,  haber: null    },
  { pos: '20', tipo: 'Crédito', cuenta: '211001', desc: 'Cuentas por pagar',   debe: null,    haber: 850.00  },
  { pos: '30', tipo: 'Débito',  cuenta: '400031', desc: 'Servicio de aduanas', debe: 1550.00, haber: null    },
  { pos: '30', tipo: 'Crédito', cuenta: '211001', desc: 'Cuentas por pagar',   debe: null,    haber: 1550.00 },
];

const fmt = (n: number | null) =>
  n == null ? '—' : `$${n.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

// ── Page component ────────────────────────────────────────────────────────────

export default function DocumentDetailPage({ document, onBack, onJSONUpload }: {
  document: Document;
  onBack: () => void;
  onJSONUpload: () => void;
}) {
  const [tab, setTab] = useState<DetailTab>('flow');
  const steps = mockWorkflowSteps[document.status];
  const isSuccess = document.status === 'Contabilizado';

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-background-light overflow-hidden">

      {/* ── Sticky page header ──────────────────────────────────────── */}
      <div className="bg-surface border-b border-border-color shrink-0 px-8 pt-5 pb-0">

        {/* Row 1: back + actions */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-primary transition-colors font-medium"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Volver
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onJSONUpload}
              className="h-9 px-4 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-semibold flex items-center gap-1.5 transition-all active:scale-[0.98] shadow-sm"
            >
              <span className="material-symbols-outlined text-base">replay</span>
              Reprocesar
            </button>
            <button className="h-9 px-4 rounded-lg border border-error/30 text-error text-sm font-medium hover:bg-error/5 flex items-center gap-1.5 transition-colors">
              <span className="material-symbols-outlined text-base">delete_outline</span>
              Descartar
            </button>
          </div>
        </div>

        {/* Row 2: title + summary */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-text-main leading-tight">
            {document.type} {document.id}
          </h1>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <span className="text-sm text-text-secondary">
              Referencia: <span className="font-semibold text-text-main">{document.id.slice(-6)}</span>
            </span>
            {isSuccess ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-success/10 text-success border border-success/20 px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Recibo generado correctamente
              </span>
            ) : (
              <StatusBadge status={document.status} />
            )}
          </div>
        </div>

        {/* Row 3: horizontal stepper */}
        <div className="border border-border-color rounded-2xl bg-background-light/60 px-6 pt-3 pb-3 mb-5">
          <HorizontalStepper steps={steps} />
        </div>

        {/* Row 4: tabs */}
        <div className="flex gap-0 -mb-px">
          {([
            { id: 'flow' as DetailTab,      label: 'Flujo de Documento' },
            { id: 'provision' as DetailTab, label: 'Detalle de provisión' },
          ]).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`pb-3 pt-1 px-1 mr-8 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === t.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-text-secondary hover:text-text-main'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Scrollable tab content ───────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto px-8 py-6">

        {/* Flujo de Documento */}
        {tab === 'flow' && (
          <div className="max-w-4xl flex flex-col gap-6">

            {/* Metadata grid */}
            <div className="grid grid-cols-5 gap-4 bg-surface rounded-2xl border border-border-color px-6 py-4">
              <div>
                <p className="text-xs font-medium text-text-secondary mb-1">Sociedad</p>
                <p className="text-sm font-semibold text-text-main flex items-center gap-1.5">
                  <span className="size-5 rounded bg-background-light flex items-center justify-center text-[9px] font-bold text-text-secondary border border-border-color">MX</span>
                  Latam Ops
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-text-secondary mb-1">Sitio</p>
                <p className="text-sm font-semibold text-text-main">{document.site}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-text-secondary mb-1">Fecha Contable</p>
                <p className="text-sm font-semibold text-text-main">{document.date}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-text-secondary mb-1">Monto</p>
                <p className="text-sm font-bold text-text-main">${document.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-text-secondary mb-1">Proveedor</p>
                <p className="text-sm font-medium text-primary hover:underline cursor-pointer">Acme Supply Co.</p>
              </div>
            </div>

            {/* Steps list */}
            <div className="bg-surface rounded-2xl border border-border-color px-6 py-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase text-text-secondary tracking-wide">Flujo de Ejecución</h3>
                <span className="text-xs text-text-secondary">{document.date} · 10:23 AM</span>
              </div>
              <div className="flex flex-col gap-0.5">
                {steps.map((step, i) => (
                  <StepRow
                    key={step.id}
                    step={step}
                    isLast={i === steps.length - 1}
                    defaultOpen={step.status === 'error'}
                  />
                ))}
              </div>
            </div>

            {/* Corrección manual — solo Error */}
            {document.status === 'Error' && (
              <div className="bg-surface rounded-2xl border border-error/20 px-6 py-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-bold uppercase text-text-secondary tracking-wide">Corrección Manual</h3>
                  <button className="text-sm text-primary font-medium hover:underline">Restablecer</button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">Cuenta de Mayor</label>
                    <input type="text" className="block w-full rounded-lg border border-border-color bg-background-light text-sm px-3 py-2 outline-none focus:border-primary focus:bg-white transition-colors" defaultValue="400021" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">Centro de Costo</label>
                    <input type="text" className="block w-full rounded-lg border border-border-color bg-background-light text-sm px-3 py-2 outline-none focus:border-primary focus:bg-white transition-colors" defaultValue="CC-MX-01" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">Responsable</label>
                    <input type="text" className="block w-full rounded-lg border border-border-color bg-background-light text-sm px-3 py-2 outline-none focus:border-primary focus:bg-white transition-colors" defaultValue="David Pinto" />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Detalle de provisión */}
        {tab === 'provision' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold uppercase text-text-secondary tracking-wide">Detalle de Provisión</h3>
                <p className="text-xs text-text-secondary mt-0.5">{document.date} · Documento #{document.id}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="h-8 px-3 rounded-lg border border-border-color bg-surface text-xs text-text-secondary font-medium hover:bg-background-light flex items-center gap-1.5 transition-colors">
                  <span className="material-symbols-outlined text-sm">download</span>
                  Exportar
                </button>
              </div>
            </div>

            <div className="bg-surface rounded-2xl border border-border-color overflow-hidden">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-background-light/70 border-b border-border-color">
                    <th className="px-5 py-3.5 font-semibold text-text-secondary uppercase tracking-wide text-xs w-16">Pos.</th>
                    <th className="px-5 py-3.5 font-semibold text-text-secondary uppercase tracking-wide text-xs">Tipo asiento</th>
                    <th className="px-5 py-3.5 font-semibold text-text-secondary uppercase tracking-wide text-xs">Cuenta mayor</th>
                    <th className="px-5 py-3.5 font-semibold text-text-secondary uppercase tracking-wide text-xs">Descripción</th>
                    <th className="px-5 py-3.5 font-semibold text-text-secondary uppercase tracking-wide text-xs text-right">Debe</th>
                    <th className="px-5 py-3.5 font-semibold text-text-secondary uppercase tracking-wide text-xs text-right">Haber</th>
                    <th className="px-5 py-3.5 font-semibold text-text-secondary uppercase tracking-wide text-xs w-16">Mon.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color">
                  {PROVISION_ROWS.map((row, idx) => {
                    const isGroupStart = idx === 0 || PROVISION_ROWS[idx - 1].pos !== row.pos;
                    return (
                      <tr key={idx} className={`hover:bg-background-light/60 transition-colors ${isGroupStart && idx > 0 ? 'border-t-2 border-t-border-color' : ''}`}>
                        <td className="px-5 py-3.5 font-mono font-bold text-text-secondary text-sm">
                          {isGroupStart ? row.pos : ''}
                        </td>
                        <td className={`px-5 py-3.5 font-medium ${row.tipo === 'Débito' ? 'text-primary' : 'text-text-secondary'}`}>
                          {row.tipo}
                        </td>
                        <td className="px-5 py-3.5 font-mono text-text-secondary">{row.cuenta}</td>
                        <td className="px-5 py-3.5 text-text-main">{row.desc}</td>
                        <td className="px-5 py-3.5 text-right font-semibold text-text-main tabular-nums">{fmt(row.debe)}</td>
                        <td className="px-5 py-3.5 text-right font-medium text-text-secondary tabular-nums">{fmt(row.haber)}</td>
                        <td className="px-5 py-3.5 text-text-secondary text-xs">USD</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-background-light/50 border-t-2 border-border-color">
                    <td colSpan={4} className="px-5 py-3.5 text-xs font-bold text-text-secondary uppercase tracking-wide">Total</td>
                    <td className="px-5 py-3.5 text-right font-bold text-text-main tabular-nums">$4,500.00</td>
                    <td className="px-5 py-3.5 text-right font-bold text-text-secondary tabular-nums">$4,500.00</td>
                    <td className="px-5 py-3.5 text-text-secondary text-xs">USD</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
