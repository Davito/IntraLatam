import React, { useState } from 'react';
import { Document } from '../types';

// ── Helpers ────────────────────────────────────────────────────────────────────

const getFacturaVenta = (status: Document['status']) => {
  switch (status) {
    case 'Contabilizado': return { text: 'Flujo completa',   cls: 'text-success' };
    case 'Error':         return { text: 'Error en entrada', cls: 'text-error' };
    case 'En Proceso':    return { text: 'Pendiente',        cls: 'text-amber-600' };
    case 'En Espera':     return { text: 'En Espera',        cls: 'text-amber-500' };
  }
};

const getRowBorder = (status: Document['status']) => {
  switch (status) {
    case 'Contabilizado': return 'bg-success';
    case 'Error':         return 'bg-error';
    case 'En Proceso':    return 'bg-amber-500';
    case 'En Espera':     return 'bg-amber-300';
  }
};

// ── Component ─────────────────────────────────────────────────────────────────

export default function DataTable({ documents, onRowClick, selectedDocId, onMassReprocess }: {
  documents: Document[];
  onRowClick: (doc: Document) => void;
  selectedDocId?: string;
  onMassReprocess: () => void;
}) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [grouped, setGrouped] = useState(false);

  const toggleRow = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    setSelectedRows(
      selectedRows.size === documents.length
        ? new Set()
        : new Set(documents.map(d => d.id))
    );
  };

  return (
    <div className="flex flex-col flex-1 min-h-0">

      {/* ── Floating contextual toolbar ──────────────────────────────── */}
      {selectedRows.size > 0 && (
        <div className="mb-2 flex items-center gap-3 bg-gray-900 text-white rounded-xl px-4 py-2.5 shadow-lg shrink-0">
          <span className="text-sm font-medium flex-1">
            {selectedRows.size} registro{selectedRows.size !== 1 ? 's' : ''} seleccionado{selectedRows.size !== 1 ? 's' : ''}
          </span>
          <button className="h-8 px-3 rounded-lg border border-white/20 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">download</span>
            Exportar
          </button>
          <button
            onClick={onMassReprocess}
            className="h-8 px-3 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors flex items-center gap-1.5 shadow-md shadow-primary/30"
          >
            <span className="material-symbols-outlined text-sm">replay</span>
            Reprocesamiento masivo
          </button>
        </div>
      )}

      {/* ── Table card ───────────────────────────────────────────────── */}
      <div className="bg-surface rounded-xl border border-border-color shadow-card overflow-hidden flex-1 flex flex-col min-h-0">

        {/* ── Table header: title + grouping toggle + icon toolbar ────── */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-color shrink-0">
          <div className="flex items-center gap-3">
            {/* Agrupado / No Agrupado pills */}
            <div className="flex rounded-lg border border-border-color overflow-hidden text-[11px] font-medium">
              <button
                onClick={() => setGrouped(true)}
                className={`px-3 py-1.5 transition-colors ${grouped ? 'bg-primary text-white' : 'bg-surface text-text-secondary hover:bg-background-light'}`}
              >
                Agrupado
              </button>
              <button
                onClick={() => setGrouped(false)}
                className={`px-3 py-1.5 transition-colors border-l border-border-color ${!grouped ? 'bg-primary text-white' : 'bg-surface text-text-secondary hover:bg-background-light'}`}
              >
                No Agrupado
              </button>
            </div>
          </div>

          {/* Icon toolbar */}
          <div className="flex items-center gap-0.5">
            {[
              { icon: 'sort',        title: 'Ordenar' },
              { icon: 'filter_list', title: 'Filtrar' },
              { icon: 'view_column', title: 'Columnas' },
              { icon: 'settings',    title: 'Configuración' },
            ].map(({ icon, title }) => (
              <button key={icon} title={title} className="p-1.5 rounded-lg text-text-secondary hover:bg-background-light hover:text-text-main transition-colors">
                <span className="material-symbols-outlined text-[18px]">{icon}</span>
              </button>
            ))}
            <button className="ml-1 h-8 px-3 rounded-lg border border-border-color bg-surface text-xs text-text-secondary font-medium hover:bg-background-light flex items-center gap-1.5 transition-colors">
              <span className="material-symbols-outlined text-[15px]">download</span>
              Exportar
              <span className="material-symbols-outlined text-[12px]">arrow_drop_down</span>
            </button>
          </div>
        </div>

        {/* ── Table ─────────────────────────────────────────────────── */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="h-[42px] border-b border-border-color bg-background-light/50 sticky top-0 z-10 backdrop-blur-sm">
                <th className="px-3 py-0 align-middle w-10">
                  <input
                    type="checkbox"
                    checked={selectedRows.size === documents.length && documents.length > 0}
                    ref={el => { if (el) el.indeterminate = selectedRows.size > 0 && selectedRows.size < documents.length; }}
                    onChange={toggleAll}
                    className="rounded border-border-color cursor-pointer"
                  />
                </th>
                <th className="px-3 py-0 align-middle text-[12px] font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">Pedido de Venta</th>
                <th className="px-3 py-0 align-middle text-[12px] font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">Orden</th>
                <th className="px-3 py-0 align-middle text-[12px] font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">ID Referencia</th>
                <th className="px-3 py-0 align-middle text-[12px] font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">Fecha Legal</th>
                <th className="px-3 py-0 align-middle text-[12px] font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">Fecha de Ingreso</th>
                <th className="px-3 py-0 align-middle text-[12px] font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">Tipo Documento</th>
                <th className="px-3 py-0 align-middle text-[12px] font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap text-right">Monto Total</th>
                <th className="px-3 py-0 align-middle text-[12px] font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">Sociedad (O/D)</th>
                <th className="px-3 py-0 align-middle text-[12px] font-semibold text-text-secondary uppercase tracking-wider whitespace-nowrap">Factura Venta</th>
                <th className="px-3 py-0 align-middle w-8" />
                <th className="px-3 py-0 align-middle w-8" />
                <th className="px-3 py-0 align-middle w-8" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border-color">
              {documents.map(doc => {
                const isChecked = selectedRows.has(doc.id);
                const isActive = selectedDocId === doc.id;
                const fv = getFacturaVenta(doc.status);
                const borderCls = getRowBorder(doc.status);
                return (
                  <tr
                    key={doc.id}
                    onClick={() => onRowClick(doc)}
                    className={`h-[48px] group transition-colors cursor-pointer ${
                      isChecked
                        ? 'bg-primary/5'
                        : isActive
                          ? 'bg-blue-50/50'
                          : 'hover:bg-background-light/80'
                    }`}
                  >
                    {/* Checkbox cell — hosts the left colored border indicator */}
                    <td className="relative px-3 py-0 align-middle" onClick={e => toggleRow(doc.id, e)}>
                      <div className={`absolute left-0 top-0 bottom-0 w-[3px] ${borderCls} rounded-r`} />
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="rounded border-border-color cursor-pointer"
                      />
                    </td>

                    {/* Pedido de Venta — blue link */}
                    <td className="px-3 py-0 align-middle">
                      <button
                        onClick={e => { e.stopPropagation(); onRowClick(doc); }}
                        className="text-sm font-semibold text-primary hover:underline tabular-nums"
                      >
                        {doc.pedidoVenta}
                      </button>
                    </td>

                    {/* Orden */}
                    <td className="px-3 py-0 align-middle text-sm text-text-secondary whitespace-nowrap">{doc.orden}</td>

                    {/* ID Referencia */}
                    <td className="px-3 py-0 align-middle text-sm font-medium text-text-main">{doc.refId}</td>

                    {/* Fecha Legal */}
                    <td className="px-3 py-0 align-middle text-sm text-text-secondary tabular-nums whitespace-nowrap">{doc.fechaLegal}</td>

                    {/* Fecha de Ingreso */}
                    <td className="px-3 py-0 align-middle text-sm text-text-secondary tabular-nums whitespace-nowrap">{doc.fechaIngreso}</td>

                    {/* Tipo Documento */}
                    <td className="px-3 py-0 align-middle text-sm text-text-secondary">{doc.type}</td>

                    {/* Monto Total */}
                    <td className="px-3 py-0 align-middle text-sm font-semibold text-text-main text-right tabular-nums whitespace-nowrap">
                      ${doc.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>

                    {/* Sociedad (O/D) */}
                    <td className="px-3 py-0 align-middle text-sm text-text-secondary font-medium">{doc.sociedad}</td>

                    {/* Factura Venta — inline status text */}
                    <td className="px-3 py-0 align-middle">
                      <span className={`text-xs font-semibold ${fv.cls}`}>{fv.text}</span>
                    </td>

                    {/* Download action */}
                    <td className="px-1 py-0 align-middle text-center">
                      <button
                        onClick={e => e.stopPropagation()}
                        className="p-1 rounded text-text-secondary hover:text-text-main hover:bg-background-light transition-colors"
                        title="Descargar"
                      >
                        <span className="material-symbols-outlined text-[17px]">download</span>
                      </button>
                    </td>

                    {/* Error icon — only for error rows */}
                    <td className="px-1 py-0 align-middle text-center w-8">
                      {doc.status === 'Error' && (
                        <button
                          onClick={e => e.stopPropagation()}
                          className="p-1 rounded text-error hover:bg-error/10 transition-colors"
                          title="Ver error"
                        >
                          <span className="material-symbols-outlined text-[17px]">cancel</span>
                        </button>
                      )}
                    </td>

                    {/* Expand / navigate */}
                    <td className="px-1 py-0 align-middle text-center">
                      <button
                        onClick={e => { e.stopPropagation(); onRowClick(doc); }}
                        className="p-1 rounded text-text-secondary hover:text-primary hover:bg-primary/5 transition-colors"
                        title="Ver detalle"
                      >
                        <span className="material-symbols-outlined text-[17px]">chevron_right</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Footer ───────────────────────────────────────────────── */}
        <div className="border-t border-border-color px-4 py-2.5 flex items-center justify-between shrink-0 bg-background-light/30">
          <div className="flex items-center gap-3">
            <span className="text-xs text-text-secondary">
              Mostrando{' '}
              <span className="font-medium text-text-main">1</span>
              {' '}a{' '}
              <span className="font-medium text-text-main">{Math.min(rowsPerPage, documents.length)}</span>
              {' '}de{' '}
              <span className="font-medium text-text-main">1240</span>
              {' '}resultados
            </span>
            <div className="relative">
              <select
                value={rowsPerPage}
                onChange={e => setRowsPerPage(Number(e.target.value))}
                className="h-7 rounded-md border border-border-color bg-surface text-xs pl-2 pr-6 outline-none appearance-none text-text-secondary hover:border-primary/40 transition-colors cursor-pointer"
              >
                <option value={10}>10 filas</option>
                <option value={25}>25 filas</option>
                <option value={50}>50 filas</option>
              </select>
              <div className="absolute inset-y-0 right-1 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-text-secondary text-sm">arrow_drop_down</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded hover:bg-background-light text-text-secondary disabled:opacity-40" disabled>
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <span className="text-xs text-text-secondary px-1 tabular-nums">1 / 124</span>
            <button className="p-1.5 rounded hover:bg-background-light text-text-secondary">
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
