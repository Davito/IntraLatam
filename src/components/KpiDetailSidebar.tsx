import React from 'react';
import { KpiDetailData } from '../types';

interface KpiDetailSidebarProps {
    data: KpiDetailData;
    onClose: () => void;
}

export default function KpiDetailSidebar({ data, onClose }: KpiDetailSidebarProps) {
    // Acento Visual dinámico
    const getAccentColor = () => {
        switch (data.type) {
            case 'Error': return 'bg-error';
            case 'OK': return 'bg-success';
            case 'WIP': return 'bg-info';
            case 'OnHold': return 'bg-warning';
            default: return 'bg-primary';
        }
    };

    // Formato USD
    const formatUSD = (val: number) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(val);
    };

    return (
        <div className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-surface shadow-2xl z-50 flex flex-col transform transition-transform duration-300 translate-x-0 border-l border-border-color">
            {/* Acento Visual */}
            <div className={`h-1 w-full ${getAccentColor()}`}></div>

            <div className="flex items-center justify-between p-6 border-b border-border-color">
                <h2 className="text-lg font-semibold text-text-main">
                    {data.count} {data.title}
                </h2>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-background-light rounded-full text-text-secondary transition-colors"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">

                {/* Salud de la Operación */}
                <section className="bg-background-light p-4 rounded-xl border border-border-color">
                    <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-3">Salud de la Operación</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs text-text-secondary mb-1">SLA (&lt; 24hs)</p>
                            <div className="flex items-end gap-2">
                                <p className="text-2xl font-bold text-text-main">{data.slaPercent}%</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-text-secondary mb-1">Volumen Acumulado</p>
                            <p className="text-2xl font-bold text-text-main">{formatUSD(data.volumeUsd)}</p>
                        </div>
                    </div>
                </section>

                {/* Visualizaciones */}
                <section>
                    <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">Distribución por Site</h3>
                    <div className="flex flex-col gap-3">
                        {data.siteDistribution.map((site) => (
                            <div key={site.site}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="font-medium text-text-main">{site.site}</span>
                                    <span className="text-text-secondary">{site.percentage}%</span>
                                </div>
                                <div className="h-2 w-full bg-background-light rounded-full overflow-hidden">
                                    <div
                                        className={`h-full ${getAccentColor()} rounded-full opacity-80`}
                                        style={{ width: `${site.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <h3 className="text-xs font-semibold text-text-secondary uppercase tracking-wider mb-4">Composición por Flujo</h3>
                    <div className="flex items-center gap-6">
                        {/* Tailwind CSS pure Donut Chart */}
                        <div className="relative w-24 h-24 rounded-full flex items-center justify-center"
                            style={{
                                background: `conic-gradient(var(--color-primary) 0% ${data.flowComposition.order1}%, #E5E7EB ${data.flowComposition.order1}% 100%)`
                            }}>
                            <div className="absolute w-16 h-16 bg-surface rounded-full"></div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-primary"></div>
                                <span className="text-xs text-text-main font-medium">Orden 1 (Ventas)</span>
                                <span className="text-xs text-text-secondary ml-auto">{data.flowComposition.order1}%</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded bg-gray-200"></div>
                                <span className="text-xs text-text-main font-medium">Orden 2 (Compras)</span>
                                <span className="text-xs text-text-secondary ml-auto">{data.flowComposition.order2}%</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Panel del Cocinero (Condicional) */}
                {(data.type === 'Error' || data.type === 'OnHold') && data.commonErrors && (
                    <section className="bg-error-bg/30 p-4 rounded-xl border border-error/20 mt-2">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-error text-lg">build</span>
                            <h3 className="text-sm font-semibold text-error uppercase tracking-wider">Diagnóstico Técnico</h3>
                        </div>

                        <ul className="flex flex-col gap-2 mb-4">
                            {data.commonErrors.map((err, idx) => (
                                <li key={idx} className="flex items-start justify-between text-sm py-1 border-b border-error/10 last:border-0">
                                    <span className="text-text-main">{err.message}</span>
                                    <span className="text-text-secondary text-xs font-medium bg-surface px-2 py-0.5 rounded-full shadow-sm">{err.count}</span>
                                </li>
                            ))}
                        </ul>

                        <button className="w-full py-2 bg-surface border border-error/30 text-error rounded-lg text-sm font-medium hover:bg-error-bg transition-colors flex items-center justify-center gap-2 shadow-sm">
                            <span className="material-symbols-outlined text-sm">filter_list</span>
                            Filtrar tabla por estos casos
                        </button>
                    </section>
                )}

            </div>
        </div>
    );
}
