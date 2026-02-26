import React from 'react';

export default function MassReprocessModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      <div className="relative z-50 w-full max-w-4xl bg-white rounded-xl shadow-modal flex flex-col max-h-[90vh] overflow-hidden transform transition-all">
        <div className="flex items-start justify-between p-6 border-b border-border-color bg-white">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Reprocesamiento Masivo</h2>
            <p className="text-slate-500 text-sm">Selecciona los registros con error que deseas volver a procesar.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-background-light">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col p-5 bg-white border border-border-color rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-primary p-2 bg-primary/10 rounded-full text-xl">playlist_add_check</span>
                <p className="text-slate-500 text-sm font-medium">Registros seleccionados</p>
              </div>
              <p className="text-slate-900 text-3xl font-bold tracking-tight pl-1">12</p>
            </div>
            <div className="flex flex-col p-5 bg-white border border-border-color rounded-lg shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="material-symbols-outlined text-emerald-600 p-2 bg-emerald-100 rounded-full text-xl">payments</span>
                <p className="text-slate-500 text-sm font-medium">Monto total</p>
              </div>
              <p className="text-slate-900 text-3xl font-bold tracking-tight pl-1">$450,200.00</p>
            </div>
          </div>

          <div className="flex gap-4 p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-900">
            <span className="material-symbols-outlined text-amber-600 flex-shrink-0 mt-0.5">warning</span>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-semibold">Precaución</p>
              <p className="text-sm opacity-90 leading-relaxed">Esta acción intentará recontabilizar los documentos en SAP. Asegúrate de que las causas raíz (ej. cuentas bloqueadas, periodos cerrados) hayan sido corregidas antes de continuar.</p>
            </div>
          </div>

          <div className="border border-border-color rounded-lg overflow-hidden bg-white shadow-sm">
            <div className="bg-slate-50 px-4 py-3 border-b border-border-color flex justify-between items-center">
              <h3 className="text-sm font-semibold text-slate-700">Detalle de registros</h3>
              <span className="text-xs text-slate-500 font-medium bg-slate-200 px-2 py-0.5 rounded">Vista previa</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-border-color">
                  <tr>
                    <th className="px-6 py-3 font-medium">ID Referencia</th>
                    <th className="px-6 py-3 font-medium">Sitio</th>
                    <th className="px-6 py-3 font-medium">Mensaje de Error</th>
                    <th className="px-6 py-3 font-medium text-right">Monto</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-color">
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">REF-2023-001</td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> Chile
                      </div>
                    </td>
                    <td className="px-6 py-4 text-red-600 font-medium flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">error</span>
                      Error de conexión SAP
                    </td>
                    <td className="px-6 py-4 text-right text-slate-700 font-mono">$120,500.00</td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">REF-2023-002</td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span> Perú
                      </div>
                    </td>
                    <td className="px-6 py-4 text-red-600 font-medium flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">block</span>
                      Cuenta no válida
                    </td>
                    <td className="px-6 py-4 text-right text-slate-700 font-mono">$85,200.00</td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">REF-2023-003</td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Colombia
                      </div>
                    </td>
                    <td className="px-6 py-4 text-red-600 font-medium flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">timer_off</span>
                      Timeout de red
                    </td>
                    <td className="px-6 py-4 text-right text-slate-700 font-mono">$45,000.00</td>
                  </tr>
                  <tr className="bg-white hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">REF-2023-004</td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span> Chile
                      </div>
                    </td>
                    <td className="px-6 py-4 text-red-600 font-medium flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">lock</span>
                      Centro de costo bloqueado
                    </td>
                    <td className="px-6 py-4 text-right text-slate-700 font-mono">$199,500.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50/50 px-6 py-2 border-t border-border-color text-xs text-center text-slate-500">
              Mostrando 4 de 12 registros
            </div>
          </div>

          <div>
            <label className="flex items-center gap-3 p-4 border border-border-color rounded-lg bg-white cursor-pointer hover:border-primary/50 transition-colors group">
              <div className="relative flex items-center">
                <input type="checkbox" defaultChecked className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 checked:bg-primary checked:border-primary transition-all focus:ring-2 focus:ring-primary/20" />
                <span className="material-symbols-outlined absolute pointer-events-none opacity-0 peer-checked:opacity-100 text-white text-sm left-0.5 top-0.5">check</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-900 group-hover:text-primary transition-colors">Notificar por email al finalizar</span>
                <span className="text-xs text-slate-500">Recibirás un resumen detallado del resultado de la operación.</span>
              </div>
            </label>
          </div>
        </div>

        <div className="p-6 bg-white border-t border-border-color flex justify-end items-center gap-3">
          <button onClick={onClose} className="px-5 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors border border-transparent">
            Cancelar
          </button>
          <button className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-primary hover:bg-primary-dark shadow-md shadow-primary/20 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">play_circle</span>
            Iniciar Reprocesamiento
          </button>
        </div>
      </div>
    </div>
  );
}
