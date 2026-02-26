import React, { useState } from 'react';
import Header from './components/Header';
import KPICards from './components/KPICards';
import DataTable from './components/DataTable';
import DocumentDetailSidebar from './components/DocumentDetailSidebar';
import AdvancedFiltersSidebar from './components/AdvancedFiltersSidebar';
import StatusDetailSidebar from './components/StatusDetailSidebar';
import ErrorDetailSidebar from './components/ErrorDetailSidebar';
import MassReprocessModal from './components/MassReprocessModal';
import JSONUploadModal from './components/JSONUploadModal';
import KpiDetailSidebar from './components/KpiDetailSidebar';
import { documents, mockKpiDetails } from './data';
import { Document, KpiType } from './types';

export default function App() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isStatusDetailOpen, setIsStatusDetailOpen] = useState(false);
  const [isErrorDetailOpen, setIsErrorDetailOpen] = useState(false);
  const [isMassReprocessOpen, setIsMassReprocessOpen] = useState(false);
  const [isJSONUploadOpen, setIsJSONUploadOpen] = useState(false);

  // New states for Drill-down Analítico panel
  const [selectedKpi, setSelectedKpi] = useState<KpiType | null>(null);
  const [isKpiPanelOpen, setIsKpiPanelOpen] = useState(false);

  return (
    <div className="bg-background-light text-text-main antialiased h-screen flex flex-col overflow-hidden relative">
      <Header onMassReprocess={() => setIsMassReprocessOpen(true)} />

      <div className="flex flex-1 overflow-hidden relative">
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto p-6 md:p-8">
          <KPICards
            onStatusClick={() => setIsStatusDetailOpen(true)}
            onErrorClick={() => setIsErrorDetailOpen(true)}
            onKpiClick={(kpi: KpiType) => {
              setSelectedKpi(kpi);
              setIsKpiPanelOpen(true);
            }}
          />

          <div className="flex flex-col gap-4 relative z-10 mb-4">
            <div className="flex flex-wrap gap-4 items-end">
              <div className="flex-1 min-w-[200px] max-w-sm">
                <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">ID Referencia</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-text-secondary text-lg">tag</span>
                  </div>
                  <input type="text" className="block w-full rounded-lg border-border-color bg-surface shadow-sm focus:border-primary focus:ring-primary/20 sm:text-sm pl-10 py-2.5 transition-shadow outline-none" placeholder="e.g. JD1000..." />
                </div>
              </div>
              <div className="flex-1 min-w-[200px] max-w-sm">
                <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Sitio</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-text-secondary text-lg">location_on</span>
                  </div>
                  <select className="block w-full rounded-lg border-border-color bg-surface shadow-sm focus:border-primary focus:ring-primary/20 sm:text-sm pl-10 py-2.5 transition-shadow appearance-none outline-none">
                    <option>Todos los Sitios</option>
                    <option>Ciudad de México</option>
                    <option>São Paulo</option>
                    <option>Bogotá</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-text-secondary text-lg">arrow_drop_down</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[200px] max-w-sm">
                <label className="block text-xs font-medium text-text-secondary mb-1.5 ml-1">Fecha</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="material-symbols-outlined text-text-secondary text-lg">calendar_today</span>
                  </div>
                  <input type="date" className="block w-full rounded-lg border-border-color bg-surface shadow-sm focus:border-primary focus:ring-primary/20 sm:text-sm pl-10 py-2.5 transition-shadow text-text-secondary outline-none" />
                </div>
              </div>
              <button
                onClick={() => setIsFiltersOpen(true)}
                className="mb-0.5 px-4 py-2.5 rounded-lg border border-border-color bg-surface text-text-main text-sm font-medium hover:bg-background-light shadow-sm flex items-center gap-2 transition-colors"
              >
                <span className="material-symbols-outlined text-lg">filter_list</span>
                Filtros
              </button>
            </div>
          </div>

          <DataTable
            documents={documents}
            onRowClick={(doc) => setSelectedDoc(doc)}
            selectedDocId={selectedDoc?.id}
          />
        </main>

        {/* Sidebars */}
        {selectedDoc && (
          <DocumentDetailSidebar
            document={selectedDoc}
            onClose={() => setSelectedDoc(null)}
            onJSONUpload={() => setIsJSONUploadOpen(true)}
          />
        )}

        {isFiltersOpen && (
          <>
            <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm z-30 transition-opacity" onClick={() => setIsFiltersOpen(false)}></div>
            <AdvancedFiltersSidebar onClose={() => setIsFiltersOpen(false)} />
          </>
        )}

        {isStatusDetailOpen && (
          <>
            <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-40 transition-opacity duration-300" onClick={() => setIsStatusDetailOpen(false)}></div>
            <StatusDetailSidebar onClose={() => setIsStatusDetailOpen(false)} />
          </>
        )}

        {isErrorDetailOpen && (
          <>
            <div className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-40 transition-opacity duration-300" onClick={() => setIsErrorDetailOpen(false)}></div>
            <ErrorDetailSidebar onClose={() => setIsErrorDetailOpen(false)} />
          </>
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
    </div>
  );
}
