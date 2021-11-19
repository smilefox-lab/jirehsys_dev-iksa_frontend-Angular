
export interface Contract {
  id: number;
  name: string;
  quota: number;
  contribution_quota: number;
  contribution: number;
  income: number;
  start_date: string;
  end_date: string;
  cutoff_date: string;
}
