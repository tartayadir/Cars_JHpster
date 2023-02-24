import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { CarFormService, CarFormGroup } from './car-form.service';
import { ICar, NewCar } from '../car.model';
import { CarService } from '../service/car.service';
import { CarBrand } from 'app/entities/enumerations/car-brand.model';
import { CarBodyType } from 'app/entities/enumerations/car-body-type.model';
import { TransmissionBoxType } from 'app/entities/enumerations/transmission-box-type.model';

@Component({
  selector: 'jhi-car-update',
  templateUrl: './car-update.component.html',
})
export class CarUpdateComponent implements OnInit {
  isSaving = false;
  car: ICar | null = null;
  carBrandValues = Object.values(CarBrand);
  carBrandKeys = Object.keys(CarBrand);
  carBodyTypeValues = Object.values(CarBodyType);
  carBodyTypeKeys = Object.keys(CarBodyType);
  transmissionBoxTypeValues = Object.values(TransmissionBoxType);
  transmissionBoxTypeKeys = Object.keys(TransmissionBoxType);

  editForm: CarFormGroup = this.carFormService.createCarFormGroup();

  constructor(protected carService: CarService, protected carFormService: CarFormService, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ car }) => {
      this.car = car;
      if (car) {
        this.updateForm(car);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const car = this.fixDescriptions(this.carFormService.getCar(this.editForm));
    console.log(car);
    if (car.id !== null) {
      this.subscribeToSaveResponse(this.carService.update(car));
    } else {
      this.subscribeToSaveResponse(this.carService.create(car));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICar>>): void {
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

  protected updateForm(car: ICar): void {
    this.car = car;
    this.carFormService.resetForm(this.editForm, car);
  }

  fixDescriptions(car: ICar | NewCar): ICar | NewCar {
    if (!car.fullDescription || car.fullDescription.length == 0) {
      car.fullDescription = ' ';
    }

    if (!car.shortDescription || car.shortDescription.length == 0) {
      car.shortDescription = ' ';
    }

    return car;
  }
}
