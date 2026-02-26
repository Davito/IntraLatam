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
