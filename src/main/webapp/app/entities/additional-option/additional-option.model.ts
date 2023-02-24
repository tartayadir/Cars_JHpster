import { ICar } from 'app/entities/car/car.model';

export interface IAdditionalOption {
  id: number;
  option?: string | null;
  car?: Pick<ICar, 'id'> | null;
}

export type NewAdditionalOption = Omit<IAdditionalOption, 'id'> & { id: null };
