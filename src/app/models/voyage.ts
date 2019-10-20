import { Time } from '@angular/common';

export interface Voyage {
  id: number;
  date: string;
  time: string;
  poids: number;
  typeVoyage: string;
  coordonnees: string;
}
