import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IAdditionalOption, NewAdditionalOption } from '../additional-option.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IAdditionalOption for edit and NewAdditionalOptionFormGroupInput for create.
 */
type AdditionalOptionFormGroupInput = IAdditionalOption | PartialWithRequiredKeyOf<NewAdditionalOption>;

type AdditionalOptionFormDefaults = Pick<NewAdditionalOption, 'id'>;

type AdditionalOptionFormGroupContent = {
  id: FormControl<IAdditionalOption['id'] | NewAdditionalOption['id']>;
  option: FormControl<IAdditionalOption['option']>;
  car: FormControl<IAdditionalOption['car']>;
};

export type AdditionalOptionFormGroup = FormGroup<AdditionalOptionFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class AdditionalOptionFormService {
  createAdditionalOptionFormGroup(additionalOption: AdditionalOptionFormGroupInput = { id: null }): AdditionalOptionFormGroup {
    const additionalOptionRawValue = {
      ...this.getFormDefaults(),
      ...additionalOption,
    };
    return new FormGroup<AdditionalOptionFormGroupContent>({
      id: new FormControl(
        { value: additionalOptionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      option: new FormControl(additionalOptionRawValue.option),
      car: new FormControl(additionalOptionRawValue.car),
    });
  }

  getAdditionalOption(form: AdditionalOptionFormGroup): IAdditionalOption | NewAdditionalOption {
    return form.getRawValue() as IAdditionalOption | NewAdditionalOption;
  }

  resetForm(form: AdditionalOptionFormGroup, additionalOption: AdditionalOptionFormGroupInput): void {
    const additionalOptionRawValue = { ...this.getFormDefaults(), ...additionalOption };
    form.reset(
      {
        ...additionalOptionRawValue,
        id: { value: additionalOptionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): AdditionalOptionFormDefaults {
    return {
      id: null,
    };
  }
}
