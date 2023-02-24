import { CarBrand } from 'app/entities/enumerations/car-brand.model';
import { CarBodyType } from 'app/entities/enumerations/car-body-type.model';
import { TransmissionBoxType } from 'app/entities/enumerations/transmission-box-type.model';

export interface ICar {
  id: number;
  carBrand?: CarBrand | null;
  model?: string | null;
  carBodyType?: CarBodyType | null;
  year?: number | null;
  transmissionBoxTypes?: TransmissionBoxType | null;
  engineCapacity?: number | null;
  fullDescription?: string | null;
  shortDescription?: string | null;
  imageFileId?: string | null;
}

export type NewCar = Omit<ICar, 'id'> & { id: null };
