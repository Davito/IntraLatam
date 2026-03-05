import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import IndicatorsPanel from './components/IndicatorsPanel';
import DataTable from './components/DataTable';
import DocumentDetailPage from './components/DocumentDetailPage';
import MassReprocessModal from './components/MassReprocessModal';
import JSONUploadModal from './components/JSONUploadModal';
import KpiDetailSidebar from './components/KpiDetailSidebar';
import SaveViewModal from './components/SaveViewModal';
import MultiSelectDropdown from './components/MultiSelectDropdown';
import { documents, mockKpiDetails } from './data';
import { Document, DocumentStatus, KpiType } from './types';

type UserRole = 'viewer' | 'support';

interface SavedViewConfig {
  quickFilter: DocumentStatus | null;
  savedAt: string;
  savedBy: UserRole;
}

export interface SavedView extends SavedViewConfig {
  id: string;
  name: string;
}

function loadConfig(role: UserRole): SavedViewConfig | null {
  try {
    const raw = localStorage.getItem(`monitor-config-${role}`);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function loadSavedViews(role: UserRole): SavedView[] {
  try {
    const raw = localStorage.getItem(`monitor-views-${role}`);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

const QUICK_FILTERS: { label: string; value: DocumentStatus | null; color: string }[] = [
  { label: 'Todos',               value: null,                 color: '' },
  { label: 'WIP',                 value: 'En Proceso',         color: 'text-primary   border-primary/30   bg-primary/5' },
  { label: 'Error',               value: 'Error',              color: 'text-error     border-error/30     bg-error/5' },
  { label: 'On hold',             value: 'En Espera',          color: 'text-amber-600 border-amber-300    bg-amber-50' },
  { label: 'Contabilizado',       value: 'Contabilizado',      color: 'text-success   border-success/30   bg-success/5' },
  { label: 'Contabilizado legal', value: 'Contabilizado legal',color: 'text-emerald-700 border-emerald-300 bg-emerald-50' },
];

export default function App() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isMassReprocessOpen, setIsMassReprocessOpen] = useState(false);
  const [isJSONUploadOpen, setIsJSONUploadOpen] = useState(false);
  const [isSaveViewOpen, setIsSaveViewOpen] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('viewer');
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [quickFilter, setQuickFilter] = useState<DocumentStatus | null>(() => loadConfig('viewer')?.quickFilter ?? null);
  const [savedViews, setSavedViews] = useState<SavedView[]>(() => loadSavedViews('viewer'));
  const [activeViewId, setActiveViewId] = useState<string | null>(null);

  useEffect(() => {
    const config = loadConfig(userRole);
    setQuickFilter(config?.quickFilter ?? null);
    setSavedViews(loadSavedViews(userRole));
    setActiveViewId(null);
  }, [userRole]);

  const handleSaveConfig = () => setIsSaveViewOpen(true);

  const handleConfirmSave = (name: string) => {
    const newView: SavedView = {
      id: Date.now().toString(),
      name,
      quickFilter,
      savedAt: new Date().toISOString(),
      savedBy: userRole,
    };
    const updated = [...savedViews, newView];
    localStorage.setItem(`monitor-views-${userRole}`, JSON.stringify(updated));
    setSavedViews(updated);
    setIsSaveViewOpen(false);
  };

  // New states for Drill-down Analítico panel
  const [selectedKpi, setSelectedKpi] = useState<KpiType | null>(null);
  const [isKpiPanelOpen, setIsKpiPanelOpen] = useState(false);

  const filteredDocuments = quickFilter
    ? documents.filter(d => d.status === quickFilter)
    : documents;

  return (
    <div className="bg-background-light text-text-main antialiased h-screen flex overflow-hidden relative">
      <Header
        onMassReprocess={() => setIsMassReprocessOpen(true)}
        userRole={userRole}
        onRoleToggle={() => setUserRole(r => r === 'viewer' ? 'support' : 'viewer')}
        isOpen={isNavOpen}
        onToggle={() => setIsNavOpen(v => !v)}
        savedViews={savedViews}
        activeViewId={activeViewId}
        onViewClick={(view) => { setQuickFilter(view.quickFilter); setActiveViewId(view.id); }}
      />

      <div className="flex flex-1 flex-col overflow-hidden relative">

        {/* ── Detail page (full-screen swap) ─────────────────────── */}
        {selectedDoc ? (
          <DocumentDetailPage
            document={selectedDoc}
            onBack={() => setSelectedDoc(null)}
            onJSONUpload={() => setIsJSONUploadOpen(true)}
          />
        ) : (

        /* ── Dashboard ─────────────────────────────────────────── */
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto p-6 md:p-8">
          <IndicatorsPanel
            onKpiClick={(kpi: KpiType) => {
              setSelectedKpi(kpi);
              setIsKpiPanelOpen(true);
            }}
          />

          {/* ── Toolbar ────────────────────────────────────────────── */}
          <div className="flex items-center gap-2 mb-4 flex-wrap">

            {/* Left: quick filter pills */}
            {QUICK_FILTERS.map(({ label, value, color }) => {
              const isActive = quickFilter === value;
              return (
                <button
                  key={label}
                  onClick={() => setQuickFilter(value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all shrink-0 ${
                    isActive
                      ? value === null
                        ? 'bg-text-main text-white border-text-main'
                        : `${color} border-current font-semibold shadow-sm`
                      : 'bg-surface text-text-secondary border-border-color hover:border-text-secondary/30 hover:text-text-main'
                  }`}
                >
                  {label}
                  {isActive && value !== null && (
                    <span className="ml-1.5 opacity-60 font-normal">
                      ({documents.filter(d => d.status === value).length})
                    </span>
                  )}
                </button>
              );
            })}

            <div className="flex-1" />

            {/* Right: quick search inputs + Filtros avanzados */}
            <div className="relative shrink-0">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-secondary text-base">tag</span>
              </div>
              <input type="text" className="h-9 w-36 rounded-lg border border-border-color bg-surface text-sm pl-8 pr-3 outline-none focus:border-primary transition-colors placeholder:text-text-secondary/60" placeholder="ID Referencia" />
            </div>

            <div className="relative shrink-0">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-secondary text-base">location_on</span>
              </div>
              <select className="h-9 w-40 rounded-lg border border-border-color bg-surface text-sm pl-8 pr-7 outline-none focus:border-primary appearance-none transition-colors text-text-secondary">
                <option>Todos los Sitios</option>
                <option>Ciudad de México</option>
                <option>São Paulo</option>
                <option>Bogotá</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-secondary text-base">arrow_drop_down</span>
              </div>
            </div>

            <div className="relative shrink-0">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-secondary text-base">calendar_today</span>
              </div>
              <input type="date" className="h-9 w-38 rounded-lg border border-border-color bg-surface text-sm pl-8 pr-3 outline-none focus:border-primary transition-colors text-text-secondary" />
            </div>

            <button
              onClick={() => setIsFiltersOpen(v => !v)}
              title="Filtros avanzados"
              className={`h-9 w-9 rounded-lg border flex items-center justify-center transition-colors shrink-0 ${
                isFiltersOpen
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-border-color bg-surface text-text-main hover:bg-background-light'
              }`}
            >
              <span className="material-symbols-outlined text-base">tune</span>
            </button>

            <button
              onClick={handleSaveConfig}
              title="Guardar vista"
              className="h-9 w-9 rounded-lg border border-border-color bg-surface text-text-secondary flex items-center justify-center hover:bg-background-light transition-colors shrink-0"
            >
              <span className="material-symbols-outlined text-base">bookmark</span>
            </button>

          </div>

          {/* ── Inline advanced filters zone ─────────────────────────── */}
          <div className={`grid transition-all duration-300 ease-in-out ${isFiltersOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden">
          {/* inner wrapper keeps margin only when open */}
            <div className={`bg-slate-50 border border-border-color rounded-xl px-4 py-2.5 flex items-end gap-3 flex-wrap transition-all duration-300 ${isFiltersOpen ? 'mb-4 opacity-100' : 'opacity-0'}`}>

              {/* Sociedad */}
              <div className="flex flex-col gap-1 shrink-0">
                <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide">Sociedad</label>
                <div className="relative">
                  <select className="h-8 w-36 rounded-lg border border-border-color bg-white text-xs pl-3 pr-7 outline-none focus:border-primary appearance-none text-text-secondary">
                    <option>Todas</option>
                    <option>MX01 - México</option>
                    <option>BR01 - Brasil</option>
                    <option>CO01 - Colombia</option>
                  </select>
                  <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-text-secondary text-sm">arrow_drop_down</span>
                  </div>
                </div>
              </div>

              {/* Usuario */}
              <div className="flex flex-col gap-1 shrink-0">
                <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide">Usuario</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-text-secondary text-sm">person</span>
                  </div>
                  <input type="text" placeholder="Buscar..." className="h-8 w-32 rounded-lg border border-border-color bg-white text-xs pl-8 pr-3 outline-none focus:border-primary transition-colors placeholder:text-text-secondary/50" />
                </div>
              </div>

              {/* Documentos — multi-select */}
              <div className="flex flex-col gap-1 shrink-0">
                <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide">Documentos</label>
                <MultiSelectDropdown
                  options={['Factura', 'Recibo', 'Nota de Crédito', 'Pedido']}
                  placeholder="Todos"
                  className="w-36"
                />
              </div>

              {/* Desde / Hasta */}
              <div className="flex flex-col gap-1 shrink-0">
                <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide">Desde</label>
                <input type="date" className="h-8 rounded-lg border border-border-color bg-white text-xs px-2.5 outline-none focus:border-primary text-text-secondary" />
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide">Hasta</label>
                <input type="date" className="h-8 rounded-lg border border-border-color bg-white text-xs px-2.5 outline-none focus:border-primary text-text-secondary" />
              </div>

              {/* Monto */}
              <div className="flex flex-col gap-1 shrink-0">
                <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide">Monto (min)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-2.5 flex items-center text-text-secondary text-xs pointer-events-none">$</span>
                  <input type="number" placeholder="0" className="h-8 w-20 rounded-lg border border-border-color bg-white text-xs pl-6 pr-2 outline-none focus:border-primary placeholder:text-text-secondary/50" />
                </div>
              </div>
              <div className="flex flex-col gap-1 shrink-0">
                <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide">Monto (max)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-2.5 flex items-center text-text-secondary text-xs pointer-events-none">$</span>
                  <input type="number" placeholder="∞" className="h-8 w-20 rounded-lg border border-border-color bg-white text-xs pl-6 pr-2 outline-none focus:border-primary placeholder:text-text-secondary/50" />
                </div>
              </div>

              {/* Estados */}
              <div className="flex flex-col gap-1 shrink-0">
                <label className="text-[10px] font-semibold text-text-secondary uppercase tracking-wide">Estados</label>
                <div className="relative">
                  <select className="h-8 w-40 rounded-lg border border-border-color bg-white text-xs pl-3 pr-7 outline-none focus:border-primary appearance-none text-text-secondary">
                    <option>Todos</option>
                    <option>WIP</option>
                    <option>Error</option>
                    <option>On hold</option>
                    <option>Contabilizado</option>
                    <option>Contabilizado legal</option>
                  </select>
                  <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-text-secondary text-sm">arrow_drop_down</span>
                  </div>
                </div>
              </div>

              <div className="flex-1" />

              {/* Actions */}
              <div className="flex items-end gap-2 shrink-0">
                <button
                  onClick={() => { setQuickFilter(null); setActiveViewId(null); }}
                  title="Limpiar filtros"
                  className="h-8 w-8 rounded-lg border border-border-color bg-white text-text-secondary flex items-center justify-center hover:bg-background-light transition-colors"
                >
                  <span className="material-symbols-outlined text-base">refresh</span>
                </button>
                <button className="h-8 px-4 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors shadow-sm">
                  Aplicar
                </button>
              </div>
            </div>
          </div>
          </div>

          <DataTable
            documents={filteredDocuments}
            onRowClick={(doc) => setSelectedDoc(doc)}
            selectedDocId={selectedDoc?.id}
            onMassReprocess={() => setIsMassReprocessOpen(true)}
          />
        </main>
        )}

{isKpiPanelOpen && selectedKpi && (
          <>
            <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-40 transition-opacity duration-300" onClick={() => setIsKpiPanelOpen(false)}></div>
            <KpiDetailSidebar data={mockKpiDetails[selectedKpi]} onClose={() => setIsKpiPanelOpen(false)} />
          </>
        )}
      </div>

      {/* Modals */}
      {isMassReprocessOpen && (
        <MassReprocessModal onClose={() => setIsMassReprocessOpen(false)} />
      )}

      {isJSONUploadOpen && (
        <JSONUploadModal onClose={() => setIsJSONUploadOpen(false)} />
      )}

      {isSaveViewOpen && (
        <SaveViewModal onClose={() => setIsSaveViewOpen(false)} onSave={handleConfirmSave} />
      )}
    </div>
  );
}
