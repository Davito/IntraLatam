export type DocumentStatus = 'Error' | 'Contabilizado' | 'En Proceso' | 'En Espera';

export interface Document {
  id: string;
  type: string;
  date: string;
  amount: number;
  status: DocumentStatus;
  site: string;
}
