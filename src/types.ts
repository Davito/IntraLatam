export type DocumentStatus = 'Error' | 'Contabilizado' | 'En Proceso' | 'En Espera';

export interface Document {
  id: string;
  type: string;
  date: string;
  amount: number;
  status: DocumentStatus;
  site: string;
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
