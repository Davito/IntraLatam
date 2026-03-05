export type DocumentStatus = 'Error' | 'Contabilizado' | 'En Proceso' | 'En Espera' | 'Contabilizado legal';

export interface Document {
  id: string;
  pedidoVenta: string;
  orden: 'Orden 1' | 'Orden 2';
  refId: string;
  type: string;
  date: string;
  fechaLegal: string;
  fechaIngreso: string;
  amount: number;
  status: DocumentStatus;
  site: string;
  sociedad: string;
}

export type StepStatus = 'success' | 'error' | 'pending' | 'in_progress';

export interface WorkflowStep {
  id: number;
  name: string;
  description: string;
  status: StepStatus;
  timestamp?: string;
  sapId?: string;
}

export type KpiType = 'Total' | 'WIP' | 'Error' | 'OnHold' | 'OK';

export interface KpiDetailData {
  type: KpiType;
  title: string;
  count: number;
  slaPercent: number;
  volumeUsd: number;
  siteDistribution: { site: string; percentage: number }[];
  flowComposition: { order1: number; order2: number };
  commonErrors?: { message: string; count: number }[];
}
