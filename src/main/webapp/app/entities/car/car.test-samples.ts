import { CarBrand } from 'app/entities/enumerations/car-brand.model';
import { CarBodyType } from 'app/entities/enumerations/car-body-type.model';
import { TransmissionBoxType } from 'app/entities/enumerations/transmission-box-type.model';

import { ICar, NewCar } from './car.model';

export const sampleWithRequiredData: ICar = {
  id: 96848,
  carBrand: CarBrand['NISSAN'],
  model: 'DowpMv8',
  carBodyType: CarBodyType['SEDAN'],
  transmissionBoxTypes: TransmissionBoxType['ROBOTIC'],
  engineCapacity: 14,
};

export const sampleWithPartialData: ICar = {
  id: 34384,
  carBrand: CarBrand['KIA'],
  model: 'kSBy',
  carBodyType: CarBodyType['SUV'],
  year: 2003,
  transmissionBoxTypes: TransmissionBoxType['VARIATIONAL'],
  engineCapacity: 9,
};

export const sampleWithFullData: ICar = {
  id: 66438,
  carBrand: CarBrand['LANCIA'],
  model: 'jOI',
  carBodyType: CarBodyType['PICKUP'],
  year: 2018,
  transmissionBoxTypes: TransmissionBoxType['VARIATIONAL'],
  engineCapacity: 13,
  fullDescription: undefined,
  shortDescription: undefined,
  imageFileId: 'groupware redundant Divide',
};

export const sampleWithNewData: NewCar = {
  carBrand: CarBrand['FIAT'],
  model: 'oFEp4v',
  carBodyType: CarBodyType['HATCHBACK'],
  transmissionBoxTypes: TransmissionBoxType['VARIATIONAL'],
  engineCapacity: 3,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
