
import { Commune } from './commune';
import { Company } from './company';
import { Coordinate } from './coordinate';
import { Type } from './type';
import { Contract } from './contract';
import { Payment } from './payment';
import { Lessee } from './lessee';

export interface Property {
  id: number;
  name: string;
  role?: string;
  status?: string;
  company: Company;
  type: Type;
  description: string;
  commune: Commune;
  coordinates: Coordinate;
  location: string;
  fojas: string;
  number: string;
  year: string;
  buy: number;
  date_deed: Date;
  appraisal: number;
  uf: number;
  pesos: number;
  rent: number;
  profitability: number;
  square: number;
  square_build: number;
  image: string;
  images: string[];
  contract: Contract;
  payments: Payment[];
  top_payments: Payment[];
  lessee: Lessee;
  files_technical: string[];
  files_legal: string[];
  files_plane: string[];
}
