import React from 'react';

export default function StatusDetailSidebar({ onClose }: { onClose: () => void }) {
  return (
    <aside className="fixed top-0 right-0 h-full w-full max-w-[480px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 translate-x-0 border-l border-slate-200">
      <div className="relative flex flex-col px-6 pt-6 pb-4 border-b border-slate-100 shrink-0">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#13ec5b]"></div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#13ec5b] shadow-[0_0_8px_rgba(19,236,91,0.6)]"></span>
            <span className="text-xs font-semibold tracking-wider text-[#13ec5b] uppercase">Estado Activo</span>
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
          <h2 className="text-xl font-bold text-text-main">Detalle de Estado: OK</h2>
          <p className="text-sm text-text-secondary">Transacciones contabilizadas correctamente en SAP</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 flex flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-background-light p-4 rounded-xl border border-slate-100 hover:border-[#13ec5b]/30 transition-colors group">
            <div className="mb-2 p-2 bg-white rounded-lg w-fit shadow-sm text-[#13ec5b] group-hover:text-[#0eb545] transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
            </div>
            <p className="text-xs text-text-secondary mb-1 font-medium">Monto Total</p>
            <p className="text-lg font-bold text-text-main">$2.4M <span className="text-xs font-normal text-slate-500">USD</span></p>
          </div>
          <div className="bg-background-light p-4 rounded-xl border border-slate-100 hover:border-[#13ec5b]/30 transition-colors group">
            <div className="mb-2 p-2 bg-white rounded-lg w-fit shadow-sm text-[#13ec5b] group-hover:text-[#0eb545] transition-colors">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
            </div>
            <p className="text-xs text-text-secondary mb-1 font-medium">Mayor Volumen</p>
            <p className="text-lg font-bold text-text-main">MLA <span className="text-xs font-normal text-slate-500">(Arg)</span></p>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-400">bar_chart</span>
              Distribución por Site
            </h3>
            <span className="text-xs text-[#13ec5b] font-medium hover:underline cursor-pointer">Ver reporte completo</span>
          </div>
          <div className="space-y-3">
            <div className="group">
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-text-main">MLA (Argentina)</span>
                <span className="text-text-main">150</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#13ec5b] rounded-full w-[75%] shadow-[0_0_10px_rgba(19,236,91,0.4)]"></div>
              </div>
            </div>
            <div className="group">
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-text-main">MLM (México)</span>
                <span className="text-text-main">120</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#13ec5b]/80 rounded-full w-[60%]"></div>
              </div>
            </div>
            <div className="group">
              <div className="flex justify-between text-xs mb-1.5 font-medium">
                <span className="text-text-main">MLC (Chile)</span>
                <span className="text-text-main">80</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#13ec5b]/60 rounded-full w-[40%]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-slate-400">show_chart</span>
            Tendencia Semanal
          </h3>
          <div className="h-32 w-full bg-gradient-to-b from-[#13ec5b]/5 to-transparent rounded-lg border border-slate-100 p-4 relative overflow-hidden flex items-end justify-between gap-1">
            <div className="w-full bg-[#13ec5b]/20 h-[30%] rounded-t-sm hover:bg-[#13ec5b]/40 transition-all cursor-pointer relative group"></div>
            <div className="w-full bg-[#13ec5b]/30 h-[45%] rounded-t-sm hover:bg-[#13ec5b]/50 transition-all cursor-pointer relative group"></div>
            <div className="w-full bg-[#13ec5b]/40 h-[40%] rounded-t-sm hover:bg-[#13ec5b]/60 transition-all cursor-pointer relative group"></div>
            <div className="w-full bg-[#13ec5b]/60 h-[65%] rounded-t-sm hover:bg-[#13ec5b]/80 transition-all cursor-pointer relative group"></div>
            <div className="w-full bg-[#13ec5b]/50 h-[55%] rounded-t-sm hover:bg-[#13ec5b]/70 transition-all cursor-pointer relative group"></div>
            <div className="w-full bg-[#13ec5b] h-[85%] rounded-t-sm hover:bg-[#0eb545] transition-all cursor-pointer relative group shadow-[0_0_15px_rgba(19,236,91,0.3)]"></div>
            <div className="w-full bg-[#13ec5b]/80 h-[70%] rounded-t-sm hover:bg-[#13ec5b] transition-all cursor-pointer relative group"></div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-sm font-bold text-text-main flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-slate-400">folder_open</span>
            Desglose por Tipo
          </h3>
          <div className="flex flex-col rounded-xl border border-slate-100 overflow-hidden">
            <div className="flex items-center justify-between p-3 bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">description</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-main">Orden 1 (Pedido)</p>
                  <p className="text-[11px] text-slate-400">FI-CA</p>
                </div>
              </div>
              <span className="text-sm font-bold text-text-main">240</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">receipt_long</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-text-main">Orden 2 (Factura)</p>
                  <p className="text-[11px] text-slate-400">MIGO/MIRO</p>
                </div>
              </div>
              <span className="text-sm font-bold text-text-main">110</span>
            </div>
          </div>
        </div>

        <div className="bg-[#13ec5b]/5 rounded-xl p-4 flex flex-col gap-3 border border-[#13ec5b]/10">
          <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary mb-1">Eficiencia del Proceso</h3>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-main">Tiempo Promedio</span>
            <span className="text-sm font-bold text-text-main flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#13ec5b]">timer</span> 1.2s
            </span>
          </div>
          <div className="w-full h-px bg-[#13ec5b]/10"></div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-main">Éxito en 1er intento</span>
            <span className="text-sm font-bold text-text-main flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#13ec5b]">check_circle</span> 98%
            </span>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-slate-100 bg-white">
        <button className="w-full flex items-center justify-center gap-2 bg-[#13ec5b] hover:bg-[#0eb545] text-slate-900 text-sm font-bold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-[#13ec5b]/20">
          Ver todos los registros exitosos
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </aside>
  );
}
