import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ICar, NewCar } from '../car.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICar for edit and NewCarFormGroupInput for create.
 */
type CarFormGroupInput = ICar | PartialWithRequiredKeyOf<NewCar>;

type CarFormDefaults = Pick<NewCar, 'id'>;

type CarFormGroupContent = {
  id: FormControl<ICar['id'] | NewCar['id']>;
  carBrand: FormControl<ICar['carBrand']>;
  model: FormControl<ICar['model']>;
  carBodyType: FormControl<ICar['carBodyType']>;
  year: FormControl<ICar['year']>;
  transmissionBoxTypes: FormControl<ICar['transmissionBoxTypes']>;
  engineCapacity: FormControl<ICar['engineCapacity']>;
  fullDescription: FormControl<ICar['fullDescription']>;
  shortDescription: FormControl<ICar['shortDescription']>;
  imageFileId: FormControl<ICar['imageFileId']>;
};

export type CarFormGroup = FormGroup<CarFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CarFormService {
  createCarFormGroup(car: CarFormGroupInput = { id: null }): CarFormGroup {
    const carRawValue = {
      ...this.getFormDefaults(),
      ...car,
    };
    return new FormGroup<CarFormGroupContent>({
      id: new FormControl(
        { value: carRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      carBrand: new FormControl(carRawValue.carBrand, {
        validators: [Validators.required],
      }),
      model: new FormControl(carRawValue.model, {
        validators: [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
          Validators.pattern('^[a-zA-Z ]+[a-zA-Z0-9 ]*$'),
        ],
      }),
      carBodyType: new FormControl(carRawValue.carBodyType, {
        validators: [Validators.required],
      }),
      year: new FormControl(carRawValue.year, {
        validators: [Validators.min(1920), Validators.max(2023)],
      }),
      transmissionBoxTypes: new FormControl(carRawValue.transmissionBoxTypes, {
        validators: [Validators.required],
      }),
      engineCapacity: new FormControl(carRawValue.engineCapacity, {
        validators: [Validators.required, Validators.min(0), Validators.max(15)],
      }),
      fullDescription: new FormControl(carRawValue.fullDescription, {
        validators: [Validators.maxLength(5000), Validators.pattern('^[a-zA-Z \\n\\r]+[a-zA-Z-\\"/0-9 \\n.,:!?%()`’‘\'—–-]*$')],
      }),
      shortDescription: new FormControl(carRawValue.shortDescription, {
        validators: [Validators.maxLength(1000), Validators.pattern('^[a-zA-Z \\n\\r]+[a-zA-Z-\\"/0-9 \\n.,:!?%()`’‘\'—–-]*$')],
      }),
      imageFileId: new FormControl(carRawValue.imageFileId, {
        validators: [Validators.minLength(10), Validators.maxLength(150)],
      }),
    });
  }

  getCar(form: CarFormGroup): ICar | NewCar {
    return form.getRawValue() as ICar | NewCar;
  }

  resetForm(form: CarFormGroup, car: CarFormGroupInput): void {
    const carRawValue = { ...this.getFormDefaults(), ...car };
    form.reset(
      {
        ...carRawValue,
        id: { value: carRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): CarFormDefaults {
    return {
      id: null,
    };
  }
}
