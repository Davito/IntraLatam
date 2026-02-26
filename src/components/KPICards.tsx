import React from 'react';

export default function KPICards({ onStatusClick, onErrorClick }: { onStatusClick: () => void, onErrorClick: () => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <div className="bg-surface rounded-xl p-5 border border-border-color shadow-card flex flex-col gap-1 hover:border-primary/30 transition-colors cursor-default group">
        <div className="flex justify-between items-start">
          <p className="text-text-secondary text-sm font-medium">Total Operaciones</p>
          <span className="material-symbols-outlined text-text-secondary/50 group-hover:text-primary transition-colors text-lg">stacked_bar_chart</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-2xl font-bold text-text-main">1,240</p>
          <span className="text-xs font-medium text-success bg-success-bg px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[10px]">arrow_upward</span> 5%
          </span>
        </div>
      </div>
      
      <div className="bg-surface rounded-xl p-5 border border-border-color shadow-card flex flex-col gap-1 hover:border-info/30 transition-colors cursor-default group">
        <div className="flex justify-between items-start">
          <p className="text-text-secondary text-sm font-medium">En Proceso (WIP)</p>
          <span className="material-symbols-outlined text-text-secondary/50 group-hover:text-info transition-colors text-lg">hourglass_top</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-2xl font-bold text-text-main">320</p>
          <span className="text-xs font-medium text-info bg-info-bg px-1.5 py-0.5 rounded flex items-center gap-0.5">
            + 2%
          </span>
        </div>
      </div>

      <div 
        className="bg-surface rounded-xl p-5 border border-border-color shadow-card flex flex-col gap-1 hover:border-error/30 transition-colors cursor-pointer group"
        onClick={onErrorClick}
      >
        <div className="flex justify-between items-start">
          <p className="text-text-secondary text-sm font-medium">Error (Acción requerida)</p>
          <span className="material-symbols-outlined text-text-secondary/50 group-hover:text-error transition-colors text-lg">error</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-2xl font-bold text-text-main">45</p>
          <span className="text-xs font-medium text-error bg-error-bg px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[10px]">arrow_downward</span> 1%
          </span>
        </div>
      </div>

      <div className="bg-surface rounded-xl p-5 border border-border-color shadow-card flex flex-col gap-1 hover:border-warning/30 transition-colors cursor-default group">
        <div className="flex justify-between items-start">
          <p className="text-text-secondary text-sm font-medium">En Espera (On Hold)</p>
          <span className="material-symbols-outlined text-text-secondary/50 group-hover:text-warning transition-colors text-lg">pause_circle</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-2xl font-bold text-text-main">12</p>
          <span className="text-xs font-medium text-text-secondary bg-background-light px-1.5 py-0.5 rounded">0%</span>
        </div>
      </div>

      <div 
        className="bg-surface rounded-xl p-5 border border-border-color shadow-card flex flex-col gap-1 hover:border-success/30 transition-colors cursor-pointer group"
        onClick={onStatusClick}
      >
        <div className="flex justify-between items-start">
          <p className="text-text-secondary text-sm font-medium">Contabilizado (OK)</p>
          <span className="material-symbols-outlined text-text-secondary/50 group-hover:text-success transition-colors text-lg">check_circle</span>
        </div>
        <div className="flex items-baseline gap-2 mt-2">
          <p className="text-2xl font-bold text-text-main">863</p>
          <span className="text-xs font-medium text-success bg-success-bg px-1.5 py-0.5 rounded flex items-center gap-0.5">
            <span className="material-symbols-outlined text-[10px]">arrow_upward</span> 8%
          </span>
        </div>
      </div>
    </div>
  );
}
