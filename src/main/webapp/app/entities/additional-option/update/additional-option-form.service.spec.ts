import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../additional-option.test-samples';

import { AdditionalOptionFormService } from './additional-option-form.service';

describe('AdditionalOption Form Service', () => {
  let service: AdditionalOptionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdditionalOptionFormService);
  });

  describe('Service methods', () => {
    describe('createAdditionalOptionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAdditionalOptionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            option: expect.any(Object),
            car: expect.any(Object),
          })
        );
      });

      it('passing IAdditionalOption should create a new form with FormGroup', () => {
        const formGroup = service.createAdditionalOptionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            option: expect.any(Object),
            car: expect.any(Object),
          })
        );
      });
    });

    describe('getAdditionalOption', () => {
      it('should return NewAdditionalOption for default AdditionalOption initial value', () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const formGroup = service.createAdditionalOptionFormGroup(sampleWithNewData);

        const additionalOption = service.getAdditionalOption(formGroup) as any;

        expect(additionalOption).toMatchObject(sampleWithNewData);
      });

      it('should return NewAdditionalOption for empty AdditionalOption initial value', () => {
        const formGroup = service.createAdditionalOptionFormGroup();

        const additionalOption = service.getAdditionalOption(formGroup) as any;

        expect(additionalOption).toMatchObject({});
      });

      it('should return IAdditionalOption', () => {
        const formGroup = service.createAdditionalOptionFormGroup(sampleWithRequiredData);

        const additionalOption = service.getAdditionalOption(formGroup) as any;

        expect(additionalOption).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAdditionalOption should not enable id FormControl', () => {
        const formGroup = service.createAdditionalOptionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAdditionalOption should disable id FormControl', () => {
        const formGroup = service.createAdditionalOptionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
