import { Component, OnInit } from '@angular/core';
import { ICar } from '../../../car/car.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CarBrand } from '../../../enumerations/car-brand.model';
import { CarBodyType } from '../../../enumerations/car-body-type.model';
import { CarDeleteCustomComponent } from '../car-delete-custom/car-delete-custom.component';
import { CarService } from '../../../car/service/car.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'jhi-car-detail-custom',
  templateUrl: './car-detail-custom.component.html',
  styleUrls: ['./car-detail-custom.component.scss'],
})
export class CarDetailCustomComponent implements OnInit {
  car: ICar | null = null;

  predicate = 'id';
  ascending = true;

  constructor(
    protected activatedRoute: ActivatedRoute,
    protected carService: CarService,
    public router: Router,
    protected modalService: NgbModal,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ car }) => {
      this.car = car;
      this.titleService.setTitle(this.getCarBrand() + ' ' + car.model);
    });
  }

  previousState(): void {
    window.history.back();
  }

  hasFullDescription(): boolean {
    let description: string = this.car!.fullDescription!;
    return description!.length! >= 1 && description != ' ';
  }

  hasShortDescription(): boolean {
    let description: string = this.car!.shortDescription!;
    return description!.length! >= 1 && description != ' ';
  }

  public getCarBodyType(): string {
    // @ts-ignore
    return CarBodyType[this.car!.carBodyType!];
  }

  public getCarBrand(): string {
    // @ts-ignore
    return CarBrand[this.car!.carBrand!];
  }

  delete(): void {
    const modalRef = this.modalService.open(CarDeleteCustomComponent, { backdrop: 'static' });
    modalRef.componentInstance.car = this.car;
  }
}
