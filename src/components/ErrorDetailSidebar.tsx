import React from 'react';

export default function ErrorDetailSidebar({ onClose }: { onClose: () => void }) {
  return (
    <aside className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 translate-x-0 border-l border-slate-200">
      <div className="relative flex flex-col px-6 pt-6 pb-4 border-b border-slate-100 shrink-0">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-error"></div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-error shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
            <span className="text-xs font-semibold tracking-wider text-error uppercase">Acción Requerida</span>
          </div>
          <div className="flex gap-2">
            <button className="text-slate-400 hover:text-slate-600 transition-colors p-1" title="Exportar">
              <span className="material-symbols-outlined text-[20px]">download</span>
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1" title="Cerrar">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold text-text-main">Detalle de Estado: Error</h2>
          <p className="text-sm text-text-secondary">Transacciones con errores que requieren intervención manual</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background-light p-4 rounded-xl border border-slate-100 hover:border-error/30 transition-colors group">
            <div className="mb-2 p-2 bg-white rounded-lg w-fit shadow-sm text-error group-hover:text-red-600 transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
            </div>
            <p className="text-xs text-text-secondary mb-1 font-medium">Total Errores</p>
            <p className="text-lg font-bold text-text-main">45 <span className="text-xs font-normal text-slate-500">registros</span></p>
          </div>
          <div className="bg-background-light p-4 rounded-xl border border-slate-100 hover:border-error/30 transition-colors group">
            <div className="mb-2 p-2 bg-white rounded-lg w-fit shadow-sm text-error group-hover:text-red-600 transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
            </div>
            <p className="text-xs text-text-secondary mb-1 font-medium">Monto Afectado</p>
            <p className="text-lg font-bold text-text-main">$125K <span className="text-xs font-normal text-slate-500">USD</span></p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-slate-400">bug_report</span>
            Top Errores Frecuentes
          </h3>
          <div className="space-y-3">
            <div className="group">
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-text-main">E092 - Cuenta de mayor no determinada</span>
                <span className="text-text-main">20</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-error rounded-full w-[44%] shadow-[0_0_10px_rgba(239,68,68,0.4)]"></div>
              </div>
            </div>
            <div className="group">
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-text-main">E045 - Centro de costo bloqueado</span>
                <span className="text-text-main">15</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-error/80 rounded-full w-[33%]"></div>
              </div>
            </div>
            <div className="group">
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-text-main">E102 - Timeout de conexión SAP</span>
                <span className="text-text-main">10</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-error/60 rounded-full w-[22%]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-slate-400">location_on</span>
            Errores por Sitio
          </h3>
          <div className="flex flex-col rounded-xl border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold text-xs">
                  MX
                </div>
                <div>
                  <p className="text-sm font-medium text-text-main">Ciudad de México</p>
                  <p className="text-[11px] text-slate-400">MX01</p>
                </div>
              </div>
              <span className="text-sm font-bold text-text-main">25</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-xs">
                  BR
                </div>
                <div>
                  <p className="text-sm font-medium text-text-main">São Paulo</p>
                  <p className="text-[11px] text-slate-400">BR01</p>
                </div>
              </div>
              <span className="text-sm font-bold text-text-main">12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-yellow-50 text-yellow-600 flex items-center justify-center font-bold text-xs">
                  CO
                </div>
                <div>
                  <p className="text-sm font-medium text-text-main">Bogotá</p>
                  <p className="text-[11px] text-slate-400">CO01</p>
                </div>
              </div>
              <span className="text-sm font-bold text-text-main">8</span>
            </div>
          </div>
        </div>

        <div className="bg-error/5 rounded-xl p-4 flex flex-col gap-3 border border-error/10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-error mb-1">Impacto en SLA</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-main">Tiempo Promedio de Resolución</span>
            <span className="text-sm font-bold text-text-main flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-error">timer</span> 4.5h
            </span>
          </div>
          <div className="w-full h-px bg-error/10"></div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-main">Registros Críticos (&gt;24h)</span>
            <span className="text-sm font-bold text-error flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-error">warning</span> 12
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 bg-white">
        <button className="w-full flex items-center justify-center gap-2 bg-error hover:bg-red-600 text-white text-sm font-bold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-error/20">
          Ver todos los registros con error
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </aside>
  );
}
