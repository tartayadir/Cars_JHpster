import { IAdditionalOption, NewAdditionalOption } from './additional-option.model';

export const sampleWithRequiredData: IAdditionalOption = {
  id: 54907,
};

export const sampleWithPartialData: IAdditionalOption = {
  id: 2850,
};

export const sampleWithFullData: IAdditionalOption = {
  id: 73356,
  option: 'deposit partnerships',
};

export const sampleWithNewData: NewAdditionalOption = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
