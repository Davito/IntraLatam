import React from 'react';

export default function JSONUploadModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity" onClick={onClose}></div>
      <div className="relative z-50 w-full max-w-[600px] bg-white rounded-xl shadow-xl flex flex-col overflow-hidden">
        <div className="flex items-start justify-between p-6 pb-2">
          <div className="flex flex-col gap-1 pr-8">
            <h2 className="text-xl font-semibold text-slate-900 leading-tight">Carga Manual de JSON</h2>
            <p className="text-sm text-slate-500 font-normal leading-normal">
              Sube o pega el contenido del JSON para forzar el reprocesamiento técnico del registro.
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors rounded-full p-1 hover:bg-slate-100">
            <span className="material-symbols-outlined !text-[24px]">close</span>
          </button>
        </div>
        
        <div className="p-6 pt-4 flex flex-col gap-6">
          <div className="flex p-1 bg-slate-100 rounded-lg">
            <button className="flex-1 flex items-center justify-center gap-2 py-1.5 px-3 bg-white shadow-sm rounded-md text-sm font-medium text-slate-900 transition-all">
              <span className="material-symbols-outlined !text-[18px]">upload_file</span>
              Subir Archivo
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-1.5 px-3 text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
              <span className="material-symbols-outlined !text-[18px]">code</span>
              Editor de Texto
            </button>
          </div>
          
          <div className="w-full">
            <label className="flex flex-col items-center justify-center w-full h-52 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="mb-3 p-3 bg-white rounded-full shadow-sm ring-1 ring-slate-200 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-primary !text-[28px]">cloud_upload</span>
                </div>
                <p className="mb-1 text-sm font-medium text-slate-700">Haga clic para cargar o arrastre y suelte</p>
                <p className="text-xs text-slate-500">JSON (MAX. 5MB)</p>
              </div>
              <input type="file" className="hidden" accept=".json" />
            </label>
          </div>
          
          <div className="flex gap-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <span className="material-symbols-outlined text-blue-600 !text-[20px] shrink-0 mt-0.5">info</span>
            <div className="flex flex-col gap-0.5">
              <p className="text-sm font-semibold text-blue-900">Validación Automática</p>
              <p className="text-sm text-blue-700">
                El sistema validará la estructura del JSON antes de permitir el procesamiento.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 border-t border-slate-200">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
            Cancelar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white text-sm font-medium rounded-lg shadow-sm transition-all">
            <span className="material-symbols-outlined !text-[18px]">check</span>
            Validar y Cargar
          </button>
        </div>
      </div>
    </div>
  );
}
