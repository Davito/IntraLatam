import { Document } from './types';

export const documents: Document[] = [
  { id: 'JD1000177229', type: 'Pedido de Compra', date: '01 Oct, 2023', amount: 4500.00, status: 'Error', site: 'MX01' },
  { id: 'JD1000177230', type: 'Pedido de Venta', date: '02 Oct, 2023', amount: 1200.00, status: 'Contabilizado', site: 'BR01' },
  { id: 'JD1000177231', type: 'Factura', date: '03 Oct, 2023', amount: 320.00, status: 'En Proceso', site: 'CO01' },
  { id: 'JD1000177232', type: 'Nota de Crédito', date: '04 Oct, 2023', amount: 150.00, status: 'En Espera', site: 'MX01' },
  { id: 'JD1000177233', type: 'Pedido de Compra', date: '05 Oct, 2023', amount: 8900.00, status: 'Contabilizado', site: 'BR01' },
  { id: 'JD1000177234', type: 'Pedido de Venta', date: '06 Oct, 2023', amount: 2450.00, status: 'Contabilizado', site: 'CO01' },
  { id: 'JD1000177235', type: 'Asiento Diario', date: '06 Oct, 2023', amount: 500.00, status: 'En Espera', site: 'MX01' },
];

export const mockKpiDetails: Record<import('./types').KpiType, import('./types').KpiDetailData> = {
  Total: {
    type: 'Total',
    title: 'Operaciones Totales',
    count: 1240,
    slaPercent: 92,
    volumeUsd: 1250400,
    siteDistribution: [
      { site: 'MLA', percentage: 45 },
      { site: 'MLM', percentage: 25 },
      { site: 'MLC', percentage: 15 },
      { site: 'MCO', percentage: 15 },
    ],
    flowComposition: { order1: 60, order2: 40 },
  },
  WIP: {
    type: 'WIP',
    title: 'Operaciones en Proceso',
    count: 320,
    slaPercent: 85,
    volumeUsd: 345000,
    siteDistribution: [
      { site: 'MLA', percentage: 30 },
      { site: 'MLM', percentage: 40 },
      { site: 'MLC', percentage: 20 },
      { site: 'MCO', percentage: 10 },
    ],
    flowComposition: { order1: 55, order2: 45 },
  },
  Error: {
    type: 'Error',
    title: 'Operaciones con Error',
    count: 45,
    slaPercent: 40,
    volumeUsd: 85000,
    siteDistribution: [
      { site: 'MLA', percentage: 20 },
      { site: 'MLM', percentage: 60 },
      { site: 'MLC', percentage: 10 },
      { site: 'MCO', percentage: 10 },
    ],
    flowComposition: { order1: 30, order2: 70 },
    commonErrors: [
      { message: 'Factura Legal inválida o faltante', count: 21 },
      { message: 'Cuenta de mayor no determinada', count: 12 },
      { message: 'Error en mapeo JSON de interface', count: 8 },
    ],
  },
  OnHold: {
    type: 'OnHold',
    title: 'Operaciones En Espera',
    count: 12,
    slaPercent: 60,
    volumeUsd: 15000,
    siteDistribution: [
      { site: 'MLA', percentage: 50 },
      { site: 'MLM', percentage: 20 },
      { site: 'MLC', percentage: 20 },
      { site: 'MCO', percentage: 10 },
    ],
    flowComposition: { order1: 50, order2: 50 },
    commonErrors: [
      { message: 'Aprobación manual pendiente', count: 7 },
      { message: 'Validación de compliance en curso', count: 5 },
    ],
  },
  OK: {
    type: 'OK',
    title: 'Operaciones Contabilizadas',
    count: 863,
    slaPercent: 98,
    volumeUsd: 805400,
    siteDistribution: [
      { site: 'MLA', percentage: 48 },
      { site: 'MLM', percentage: 22 },
      { site: 'MLC', percentage: 15 },
      { site: 'MCO', percentage: 15 },
    ],
    flowComposition: { order1: 65, order2: 35 },
  },
};
