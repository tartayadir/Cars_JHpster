import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AdditionalOptionFormService, AdditionalOptionFormGroup } from './additional-option-form.service';
import { IAdditionalOption } from '../additional-option.model';
import { AdditionalOptionService } from '../service/additional-option.service';
import { ICar } from 'app/entities/car/car.model';
import { CarService } from 'app/entities/car/service/car.service';

@Component({
  selector: 'jhi-additional-option-update',
  templateUrl: './additional-option-update.component.html',
})
export class AdditionalOptionUpdateComponent implements OnInit {
  isSaving = false;
  additionalOption: IAdditionalOption | null = null;

  carsSharedCollection: ICar[] = [];

  editForm: AdditionalOptionFormGroup = this.additionalOptionFormService.createAdditionalOptionFormGroup();

  constructor(
    protected additionalOptionService: AdditionalOptionService,
    protected additionalOptionFormService: AdditionalOptionFormService,
    protected carService: CarService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCar = (o1: ICar | null, o2: ICar | null): boolean => this.carService.compareCar(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ additionalOption }) => {
      this.additionalOption = additionalOption;
      if (additionalOption) {
        this.updateForm(additionalOption);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const additionalOption = this.additionalOptionFormService.getAdditionalOption(this.editForm);
    if (additionalOption.id !== null) {
      this.subscribeToSaveResponse(this.additionalOptionService.update(additionalOption));
    } else {
      this.subscribeToSaveResponse(this.additionalOptionService.create(additionalOption));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAdditionalOption>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(additionalOption: IAdditionalOption): void {
    this.additionalOption = additionalOption;
    this.additionalOptionFormService.resetForm(this.editForm, additionalOption);

    this.carsSharedCollection = this.carService.addCarToCollectionIfMissing<ICar>(this.carsSharedCollection, additionalOption.car);
  }

  protected loadRelationshipsOptions(): void {
    this.carService
      .query()
      .pipe(map((res: HttpResponse<ICar[]>) => res.body ?? []))
      .pipe(map((cars: ICar[]) => this.carService.addCarToCollectionIfMissing<ICar>(cars, this.additionalOption?.car)))
      .subscribe((cars: ICar[]) => (this.carsSharedCollection = cars));
  }
}
