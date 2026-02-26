import React from 'react';
import { Document } from '../types';

const getStatusBadge = (status: Document['status']) => {
  switch (status) {
    case 'Error':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-error-bg px-2.5 py-1 text-xs font-medium text-error border border-error/10">
          <span className="size-1.5 rounded-full bg-error"></span> Error
        </span>
      );
    case 'Contabilizado':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-success-bg px-2.5 py-1 text-xs font-medium text-success border border-success/10">
          <span className="size-1.5 rounded-full bg-success"></span> Contabilizado
        </span>
      );
    case 'En Proceso':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-info-bg px-2.5 py-1 text-xs font-medium text-info border border-info/10">
          <span className="size-1.5 rounded-full bg-info"></span> En Proceso
        </span>
      );
    case 'En Espera':
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-background-light px-2.5 py-1 text-xs font-medium text-text-secondary border border-border-color">
          <span className="size-1.5 rounded-full bg-gray-400"></span> En Espera
        </span>
      );
  }
};

const getIcon = (type: string) => {
  if (type.includes('Compra')) return 'description';
  if (type.includes('Venta')) return 'shopping_cart';
  if (type.includes('Factura')) return 'receipt_long';
  if (type.includes('Crédito')) return 'credit_score';
  return 'description';
};

export default function DataTable({ documents, onRowClick, selectedDocId }: { documents: Document[], onRowClick: (doc: Document) => void, selectedDocId?: string }) {
  return (
    <div className="bg-surface rounded-xl border border-border-color shadow-card overflow-hidden flex-1 flex flex-col">
      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-color bg-background-light/50 sticky top-0 z-10 backdrop-blur-sm">
              <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">ID Referencia</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Tipo Orden</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider">Fecha Contable</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-center">Estado</th>
              <th className="px-6 py-4 text-xs font-semibold text-text-secondary uppercase tracking-wider text-right">Monto</th>
              <th className="px-4 py-4 w-10"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-color">
            {documents.map((doc) => (
              <tr
                key={doc.id}
                onClick={() => onRowClick(doc)}
                className={`group transition-colors cursor-pointer relative ${selectedDocId === doc.id ? 'bg-primary/5' : 'hover:bg-background-light/80'}`}
              >
                <td className="px-6 py-4 text-sm font-medium text-text-main flex items-center gap-2">
                  {selectedDocId === doc.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>}
                  <span className="material-symbols-outlined text-text-secondary text-base">{getIcon(doc.type)}</span>
                  {doc.id}
                </td>
                <td className="px-6 py-4 text-sm text-text-secondary">{doc.type}</td>
                <td className="px-6 py-4 text-sm text-text-secondary">{doc.date}</td>
                <td className="px-6 py-4 text-center">
                  {getStatusBadge(doc.status)}
                </td>
                <td className="px-6 py-4 text-sm font-medium text-text-main text-right">
                  ${doc.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td className="px-4 py-4 text-right">
                  <button className="text-text-secondary hover:text-text-main p-1 rounded hover:bg-background-light transition-colors">
                    <span className="material-symbols-outlined text-lg">more_horiz</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="border-t border-border-color px-6 py-3 flex items-center justify-between shrink-0">
        <span className="text-xs text-text-secondary">Mostrando <span className="font-medium text-text-main">1</span> a <span className="font-medium text-text-main">{documents.length}</span> de <span className="font-medium text-text-main">1240</span> resultados</span>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded hover:bg-background-light text-text-secondary disabled:opacity-50">
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button className="p-1 rounded hover:bg-background-light text-text-secondary">
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
}
