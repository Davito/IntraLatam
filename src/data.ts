import { Document, DocumentStatus, WorkflowStep } from './types';

export const documents: Document[] = [
  { id: 'JD177229', pedidoVenta: '10223882001820', orden: 'Orden 1', refId: 'JO77229', type: 'Factura',       date: '01 Oct, 2023', fechaLegal: '01/10/2023', fechaIngreso: '01/10/2023', amount: 4500.00,  status: 'Error',         site: 'MX01', sociedad: 'MLA/MCO' },
  { id: 'JD177230', pedidoVenta: '21718318237193', orden: 'Orden 1', refId: 'JO77230', type: 'Recibo',        date: '02 Oct, 2023', fechaLegal: '02/10/2023', fechaIngreso: '02/10/2023', amount: 1200.00,  status: 'Contabilizado', site: 'BR01', sociedad: 'MLA/MCO' },
  { id: 'JD177231', pedidoVenta: '21718318237193', orden: 'Orden 2', refId: 'JO77231', type: 'Factura',       date: '03 Oct, 2023', fechaLegal: '03/10/2023', fechaIngreso: '03/10/2023', amount: 320.00,   status: 'En Proceso',    site: 'CO01', sociedad: 'MLA/MCO' },
  { id: 'JD177232', pedidoVenta: '30948821004411', orden: 'Orden 1', refId: 'JO77232', type: 'Nota Crédito',  date: '04 Oct, 2023', fechaLegal: '04/10/2023', fechaIngreso: '04/10/2023', amount: 150.00,   status: 'En Espera',     site: 'MX01', sociedad: 'MLM/MLA' },
  { id: 'JD177233', pedidoVenta: '30948821004412', orden: 'Orden 2', refId: 'JO77233', type: 'Factura',       date: '05 Oct, 2023', fechaLegal: '05/10/2023', fechaIngreso: '05/10/2023', amount: 8900.00,  status: 'Contabilizado', site: 'BR01', sociedad: 'MLC/MLM' },
  { id: 'JD177234', pedidoVenta: '41029384756201', orden: 'Orden 1', refId: 'JO77234', type: 'Recibo',        date: '06 Oct, 2023', fechaLegal: '06/10/2023', fechaIngreso: '06/10/2023', amount: 2450.00,  status: 'Contabilizado', site: 'CO01', sociedad: 'MCO/MLA' },
  { id: 'JD177235', pedidoVenta: '41029384756202', orden: 'Orden 2', refId: 'JO77235', type: 'Factura',       date: '07 Oct, 2023', fechaLegal: '07/10/2023', fechaIngreso: '07/10/2023', amount: 500.00,   status: 'En Espera',     site: 'MX01', sociedad: 'MLM/MCO' },
  { id: 'JD177236', pedidoVenta: '51938475610293', orden: 'Orden 1', refId: 'JO77236', type: 'Nota Crédito',  date: '08 Oct, 2023', fechaLegal: '08/10/2023', fechaIngreso: '08/10/2023', amount: 3200.00,  status: 'Error',         site: 'BR01', sociedad: 'MLA/MLC' },
  { id: 'JD177237', pedidoVenta: '51938475610294', orden: 'Orden 1', refId: 'JO77237', type: 'Factura',       date: '09 Oct, 2023', fechaLegal: '09/10/2023', fechaIngreso: '09/10/2023', amount: 675.00,   status: 'En Proceso',    site: 'CO01', sociedad: 'MCO/MLM' },
  { id: 'JD177238', pedidoVenta: '62847563019284', orden: 'Orden 2', refId: 'JO77238', type: 'Recibo',        date: '10 Oct, 2023', fechaLegal: '10/10/2023', fechaIngreso: '10/10/2023', amount: 12800.00, status: 'Contabilizado', site: 'MX01', sociedad: 'MLA/MCO' },
];

export const mockWorkflowSteps: Record<DocumentStatus, WorkflowStep[]> = {
  Contabilizado: [
    { id: 1, name: 'Pedido Recibido',      description: 'Entrada automatizada vía API',               status: 'success',     timestamp: '10:23:45' },
    { id: 2, name: 'Validación JSON',      description: 'Datos de interface validados correctamente', status: 'success',     timestamp: '10:23:46' },
    { id: 3, name: 'MIGO Generado',        description: 'Documento de recepción de mercancía creado', status: 'success',     timestamp: '10:24:12', sapId: '5000000001' },
    { id: 4, name: 'Provisión MIRO',       description: 'Factura verificada correctamente',           status: 'success',     timestamp: '10:24:35', sapId: '5100000001' },
    { id: 5, name: 'Asiento Contable',     description: 'Asiento contable generado en libro mayor',  status: 'success',     timestamp: '10:24:50', sapId: '1400000001' },
    { id: 6, name: 'Contabilización SAP',  description: 'Documento contabilizado en SAP FI',         status: 'success',     timestamp: '10:25:01', sapId: '9000000001' },
  ],
  Error: [
    { id: 1, name: 'Pedido Recibido',      description: 'Entrada automatizada vía API',                          status: 'success',     timestamp: '10:23:45' },
    { id: 2, name: 'Validación JSON',      description: 'Datos de interface validados correctamente',            status: 'success',     timestamp: '10:23:46' },
    { id: 3, name: 'MIGO Generado',        description: 'Documento de recepción de mercancía creado',            status: 'success',     timestamp: '10:24:12', sapId: '5000000001' },
    { id: 4, name: 'Provisión MIRO',       description: 'Cuenta de mayor no determinada para el sitio MX01',    status: 'error',       timestamp: '10:24:15' },
    { id: 5, name: 'Asiento Contable',     description: 'En espera de resolución del error anterior',           status: 'pending' },
    { id: 6, name: 'Contabilización SAP',  description: 'En espera de asiento contable',                        status: 'pending' },
  ],
  'En Proceso': [
    { id: 1, name: 'Pedido Recibido',      description: 'Entrada automatizada vía API',               status: 'success',     timestamp: '10:23:45' },
    { id: 2, name: 'Validación JSON',      description: 'Datos de interface validados correctamente', status: 'success',     timestamp: '10:23:46' },
    { id: 3, name: 'MIGO Generado',        description: 'Documento de recepción de mercancía creado', status: 'success',     timestamp: '10:24:12', sapId: '5000000001' },
    { id: 4, name: 'Provisión MIRO',       description: 'Verificación de factura en curso',           status: 'in_progress', timestamp: '10:24:35' },
    { id: 5, name: 'Asiento Contable',     description: 'En espera de confirmación MIRO',             status: 'pending' },
    { id: 6, name: 'Contabilización SAP',  description: 'En espera de asiento contable',              status: 'pending' },
  ],
  'En Espera': [
    { id: 1, name: 'Pedido Recibido',      description: 'Entrada automatizada vía API',               status: 'success',     timestamp: '10:23:45' },
    { id: 2, name: 'Validación JSON',      description: 'Datos de interface validados correctamente', status: 'success',     timestamp: '10:23:46' },
    { id: 3, name: 'MIGO Generado',        description: 'Documento de recepción de mercancía creado', status: 'success',     timestamp: '10:24:12', sapId: '5000000001' },
    { id: 4, name: 'Provisión MIRO',       description: 'Aprobación manual pendiente de gestión',    status: 'pending',     timestamp: '10:24:40' },
    { id: 5, name: 'Asiento Contable',     description: 'En espera de aprobación MIRO',              status: 'pending' },
    { id: 6, name: 'Contabilización SAP',  description: 'En espera de asiento contable',             status: 'pending' },
  ],
};

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
