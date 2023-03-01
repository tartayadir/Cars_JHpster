import { Component, OnInit } from '@angular/core';
import { ICar } from '../../../car/car.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CarBrand } from '../../../enumerations/car-brand.model';
import { CarBodyType } from '../../../enumerations/car-body-type.model';
import { CarDeleteCustomComponent } from '../car-delete-custom/car-delete-custom.component';
import { CarService } from '../../../car/service/car.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Title } from '@angular/platform-browser';
import { AdditionalOptionService } from '../../../additional-option/service/additional-option.service';
import { IAdditionalOption } from '../../../additional-option/additional-option.model';

@Component({
  selector: 'jhi-car-detail-custom',
  templateUrl: './car-detail-custom.component.html',
  styleUrls: ['./car-detail-custom.component.scss'],
})
export class CarDetailCustomComponent implements OnInit {
  car: ICar | null = null;
  additionalOptions: IAdditionalOption[] = [];

  bucketURL: string = 'https://d3t4g72htdika4.cloudfront.net/';

  predicate = 'id';
  ascending = true;

  constructor(
    protected additionalOptionService: AdditionalOptionService,
    protected activatedRoute: ActivatedRoute,
    protected carService: CarService,
    public router: Router,
    protected modalService: NgbModal,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.loadAdditionalOptions();

    this.activatedRoute.data.subscribe(({ car }) => {
      this.car = car;
      this.loadAdditionalOptions();
      this.titleService.setTitle(this.getCarBrand() + ' ' + car.model);
    });
  }

  loadAdditionalOptions(): void {
    if (this.car) {
      this.additionalOptionService.findByCarId(this.car.id).subscribe(options => {
        this.additionalOptions = options.body ? options.body : [];
      });
    }
  }

  getImageURL(): string {
    return this.bucketURL + this.car?.imageFileId;
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
