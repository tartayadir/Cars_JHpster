import { Component, OnInit } from '@angular/core';
import { ICar, NewCar } from '../../../car/car.model';
import { CarBrand } from '../../../enumerations/car-brand.model';
import { CarBodyType } from '../../../enumerations/car-body-type.model';
import { TransmissionBoxType } from '../../../enumerations/transmission-box-type.model';
import { CarFormGroup, CarFormService } from '../../../car/update/car-form.service';
import { CarService } from '../../../car/service/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'jhi-car-update-custom',
  templateUrl: './car-update-custom.component.html',
  styleUrls: ['./car-update-custom.component.scss'],
})
export class CarUpdateCustomComponent implements OnInit {
  isSaving = false;
  car: ICar | null = null;
  carBrandValues = Object.values(CarBrand);
  carBrandKeys = Object.keys(CarBrand);
  carBodyTypeValues = Object.values(CarBodyType);
  carBodyTypeKeys = Object.keys(CarBodyType);
  transmissionBoxTypeValues = Object.values(TransmissionBoxType);
  transmissionBoxTypeKeys = Object.keys(TransmissionBoxType);
  concurredYear!: number;

  editForm: CarFormGroup = this.carFormService.createCarFormGroup();

  constructor(
    protected carService: CarService,
    protected carFormService: CarFormService,
    protected activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.concurredYear = new Date().getFullYear();
    this.activatedRoute.data.subscribe(({ car }) => {
      this.car = car;
      if (car) {
        this.updateForm(car);
        // @ts-ignore
        this.titleService.setTitle('Edit ' + CarBrand[car.carBrand!] + ' ' + car.model);
      } else {
        this.titleService.setTitle('New car');
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const car = this.fixDescriptions(this.carFormService.getCar(this.editForm));
    car.imageFileId = 'default-car-image';

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
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
    // this.previousState();
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

  public getBrandValue(): string {
    // @ts-ignore
    return CarBrand[this.car!.carBrand!];
  }

  public getTransmissionTypeViewValue(transType: string): string {
    return this.transmissionBoxTypeValues[this.transmissionBoxTypeKeys.indexOf(transType as TransmissionBoxType)];
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
