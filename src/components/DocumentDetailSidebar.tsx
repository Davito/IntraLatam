import React from 'react';
import { Document } from '../types';

export default function DocumentDetailSidebar({ document, onClose, onJSONUpload }: { document: Document, onClose: () => void, onJSONUpload: () => void }) {
  return (
    <aside className="w-[500px] bg-surface shadow-drawer border-l border-border-color flex flex-col z-30 transform transition-transform duration-300 ease-in-out absolute right-0 top-0 bottom-0">
      <div className="px-6 py-4 border-b border-border-color flex items-center justify-between bg-surface z-10 sticky top-0">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded uppercase tracking-wide">{document.type}</span>
            <span className="text-xs text-text-secondary">{document.date} a las 10:23 AM</span>
          </div>
          <h3 className="text-lg font-bold text-text-main">Detalle del Documento #{document.id}</h3>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-lg text-text-secondary hover:bg-background-light hover:text-text-main transition-colors">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
          <button onClick={onClose} className="p-2 rounded-lg text-text-secondary hover:bg-background-light hover:text-text-main transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-8 custom-scrollbar">
        {document.status === 'Error' && (
          <div className="rounded-lg border border-error/20 bg-error-bg/50 p-4 flex gap-3 items-start">
            <span className="material-symbols-outlined text-error mt-0.5">error</span>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-text-main">Log de Integración</h4>
              <p className="text-sm text-text-secondary mt-1">Código de error: <span className="font-mono text-xs bg-white px-1 py-0.5 rounded border border-error/20 mx-1">E092</span> Cuenta de mayor no determinada para el sitio {document.site}.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-y-6 gap-x-4">
          <div>
            <p className="text-xs font-medium text-text-secondary mb-1">Sociedad</p>
            <p className="text-sm font-medium text-text-main flex items-center gap-2">
              <span className="size-6 rounded bg-background-light flex items-center justify-center text-[10px] font-bold text-text-secondary border border-border-color">MX</span>
              Latam Ops Ltd.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium text-text-secondary mb-1">Sitio</p>
            <p className="text-sm font-medium text-text-main">Ciudad de México ({document.site})</p>
          </div>
          <div>
            <p className="text-xs font-medium text-text-secondary mb-1">Monto Total</p>
            <p className="text-sm font-bold text-text-main">${document.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-text-secondary">USD</span></p>
          </div>
          <div>
            <p className="text-xs font-medium text-text-secondary mb-1">Proveedor</p>
            <p className="text-sm font-medium text-text-main text-primary hover:underline cursor-pointer">Acme Supply Co.</p>
          </div>
        </div>

        <div className="h-px bg-border-color w-full"></div>

        <div>
          <h4 className="text-sm font-bold text-text-main mb-4">Flujo de Documento</h4>
          <div className="relative pl-2">
            <div className="absolute left-[19px] top-2 bottom-4 w-0.5 bg-border-color"></div>
            
            <div className="relative flex gap-4 pb-8 group">
              <div className="size-10 rounded-full border-2 border-success bg-white z-10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-success text-xl">check</span>
              </div>
              <div className="pt-1">
                <p className="text-sm font-semibold text-text-main">Pedido Recibido</p>
                <p className="text-xs text-text-secondary mt-0.5">Entrada automatizada vía API</p>
                <p className="text-[10px] text-text-secondary mt-1">10:23:45 AM</p>
              </div>
            </div>

            <div className="relative flex gap-4 pb-8 group">
              <div className="size-10 rounded-full border-2 border-success bg-white z-10 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-success text-xl">check</span>
              </div>
              <div className="pt-1">
                <p className="text-sm font-semibold text-text-main">MIGO Generado</p>
                <p className="text-xs text-text-secondary mt-0.5">Documento de recepción de mercancía creado</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-[10px] bg-background-light px-1.5 py-0.5 rounded text-text-secondary border border-border-color font-mono">doc_55021.pdf</span>
                  <span className="text-[10px] text-text-secondary">10:24:12 AM</span>
                </div>
              </div>
            </div>

            <div className="relative flex gap-4">
              <div className={`size-10 rounded-full border-2 z-10 flex items-center justify-center shrink-0 shadow-sm ${document.status === 'Error' ? 'border-error bg-error-bg ring-4 ring-error/10' : 'border-success bg-white'}`}>
                <span className={`material-symbols-outlined text-xl ${document.status === 'Error' ? 'text-error' : 'text-success'}`}>
                  {document.status === 'Error' ? 'close' : 'check'}
                </span>
              </div>
              <div className="pt-1">
                <p className={`text-sm font-semibold ${document.status === 'Error' ? 'text-error' : 'text-text-main'}`}>
                  {document.status === 'Error' ? 'Provisión MIRO Fallida' : 'Provisión MIRO Exitosa'}
                </p>
                <p className="text-xs text-text-secondary mt-0.5">
                  {document.status === 'Error' ? 'Verificación de factura detenida' : 'Factura verificada correctamente'}
                </p>
                <p className="text-[10px] text-text-secondary mt-1">10:24:15 AM</p>
              </div>
            </div>
          </div>
        </div>

        {document.status === 'Error' && (
          <div className="bg-background-light rounded-lg p-4 border border-border-color">
            <div className="flex justify-between items-center mb-3">
              <h5 className="text-xs font-bold uppercase text-text-secondary tracking-wide">Campos Editables</h5>
              <button className="text-xs text-primary font-medium hover:underline">Restablecer valores</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Cuenta de Mayor</label>
                <input type="text" className="block w-full rounded border-border-color bg-white shadow-sm focus:border-primary focus:ring-primary/20 text-sm px-2 py-1.5 outline-none" defaultValue="400021" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1">Centro de Costo</label>
                <input type="text" className="block w-full rounded border-border-color bg-white shadow-sm focus:border-primary focus:ring-primary/20 text-sm px-2 py-1.5 outline-none" defaultValue="CC-MX-01" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6 border-t border-border-color bg-surface sticky bottom-0 z-10">
        <button onClick={onJSONUpload} className="w-full flex items-center justify-center gap-2 rounded-lg h-11 px-4 bg-primary hover:bg-primary-dark text-white text-sm font-bold shadow-lg shadow-primary/20 transition-all active:scale-[0.98]">
          <span className="material-symbols-outlined">replay</span>
          Reprocesar Registro
        </button>
        <button className="w-full mt-3 flex items-center justify-center gap-2 rounded-lg h-9 px-4 text-text-secondary hover:bg-background-light text-sm font-medium transition-colors">
          Guardar Cambios
        </button>
      </div>
    </aside>
  );
}
