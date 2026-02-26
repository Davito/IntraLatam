import React from 'react';

export default function AdvancedFiltersSidebar({ onClose }: { onClose: () => void }) {
  return (
    <div className="absolute inset-y-0 right-0 w-[400px] bg-surface shadow-drawer border-l border-border-color transform transition-transform z-40 flex flex-col h-full">
      <div className="flex items-center justify-between px-6 py-5 border-b border-border-color shrink-0">
        <h3 className="text-lg font-semibold text-text-main flex items-center gap-2">
          <span className="material-symbols-outlined text-primary">tune</span>
          Filtros Avanzados
        </h3>
        <div className="flex items-center gap-3">
          <button className="text-sm text-text-secondary hover:text-primary font-medium transition-colors">
            Restablecer
          </button>
          <button onClick={onClose} className="text-text-secondary hover:text-text-main p-1 rounded-md hover:bg-background-light transition-colors">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
        <div>
          <label className="block text-sm font-medium text-text-main mb-1.5">Sociedad</label>
          <div className="relative">
            <select className="block w-full rounded-lg border-border-color bg-surface shadow-sm focus:border-primary focus:ring-primary/20 sm:text-sm py-2.5 pl-3 pr-8 transition-shadow appearance-none outline-none">
              <option>Todas las Sociedades</option>
              <option>MX01 - Intralatam México</option>
              <option>BR01 - Intralatam Brasil</option>
              <option>CO01 - Intralatam Colombia</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-secondary text-lg">arrow_drop_down</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-main mb-1.5">Usuario Responsable</label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-secondary text-lg group-focus-within:text-primary">person</span>
            </div>
            <input type="text" className="block w-full rounded-lg border-border-color bg-surface shadow-sm focus:border-primary focus:ring-primary/20 sm:text-sm py-2.5 pl-10 pr-3 transition-shadow outline-none" placeholder="Buscar usuario..." />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-secondary text-lg">search</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-main mb-2">Tipo de Documento</label>
          <div className="space-y-2">
            {['Factura', 'Nota de Crédito', 'Pedido de Compra', 'Asiento Diario'].map((type, i) => (
              <label key={type} className="flex items-center gap-3 p-2 rounded-lg border border-border-color hover:bg-background-light cursor-pointer transition-colors group">
                <input type="checkbox" defaultChecked={i === 2} className="rounded border-border-color text-primary focus:ring-primary/20 size-4" />
                <span className="text-sm text-text-secondary group-hover:text-text-main">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-main mb-1.5">Rango de Fecha</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="material-symbols-outlined text-text-secondary text-lg">date_range</span>
            </div>
            <input type="date" className="block w-full rounded-lg border-border-color bg-surface shadow-sm focus:border-primary focus:ring-primary/20 sm:text-sm py-2.5 pl-10 pr-3 transition-shadow text-text-secondary outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-main mb-1.5">Rango de Monto ($)</label>
          <div className="flex items-center gap-2">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-secondary text-sm pointer-events-none">$</span>
              <input type="number" className="block w-full rounded-lg border-border-color bg-surface shadow-sm focus:border-primary focus:ring-primary/20 sm:text-sm py-2.5 pl-7 pr-3 transition-shadow outline-none" placeholder="Min" />
            </div>
            <span className="text-text-secondary font-medium">-</span>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-text-secondary text-sm pointer-events-none">$</span>
              <input type="number" className="block w-full rounded-lg border-border-color bg-surface shadow-sm focus:border-primary focus:ring-primary/20 sm:text-sm py-2.5 pl-7 pr-3 transition-shadow outline-none" placeholder="Max" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-main mb-2">Estado</label>
          <div className="grid grid-cols-2 gap-2">
            {['Error', 'OK', 'WIP', 'On Hold'].map((status, i) => (
              <label key={status} className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" defaultChecked={i === 1} className="rounded border-border-color text-primary focus:ring-primary/20 size-4" />
                <span className="text-sm text-text-secondary group-hover:text-text-main">{status}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-border-color bg-surface shrink-0 flex flex-col gap-3">
        <button className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-dark text-white text-sm font-semibold shadow-sm active:scale-95 transform transition-transform">
          Aplicar Filtros
        </button>
        <button className="w-full py-2.5 rounded-lg text-text-secondary hover:text-text-main hover:bg-background-light text-sm font-medium transition-colors">
          Limpiar todo
        </button>
      </div>
    </div>
  );
}
