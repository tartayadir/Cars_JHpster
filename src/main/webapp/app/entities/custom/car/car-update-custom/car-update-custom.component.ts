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
import { AdditionalOptionService } from '../../../additional-option/service/additional-option.service';
import { TagModel } from 'ngx-chips/core/tag-model';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { ImageConvertorService } from '../../image/service/image-convertor.service';
import { ModalService } from '../../services/modal.service';
import { ImageService } from '../../image/service/image.service';

interface InputOption {
  option: string;
  value: string;
}

export interface CustomOption {
  id: number | null;
  option?: string | null;
  car?: Pick<ICar, 'id'> | null;
}

@Component({
  selector: 'jhi-car-update-custom',
  templateUrl: './car-update-custom.component.html',
  styleUrls: ['./car-update-custom.component.scss'],
})
export class CarUpdateCustomComponent implements OnInit {
  imageTypeIsValid = true;
  imgChangeEvt: any = '';
  imageUrl: any;
  imageIsUploaded: boolean = false;
  trySubmitted: boolean = false;
  tryChangeImage: boolean = false;
  private imageFile!: File;

  isSaving = false;
  isNewCar = true;
  car: ICar | null = null;
  carBrandValues = Object.values(CarBrand);
  carBrandKeys = Object.keys(CarBrand);
  carBodyTypeValues = Object.values(CarBodyType);
  carBodyTypeKeys = Object.keys(CarBodyType);
  transmissionBoxTypeValues = Object.values(TransmissionBoxType);
  transmissionBoxTypeKeys = Object.keys(TransmissionBoxType);
  concurredYear!: number;
  additionalOptions: CustomOption[] = [];
  deleteAdditionalOptions: CustomOption[] = [];

  optionPlaceHolder: string = 'Enter new option';

  editForm: CarFormGroup = this.carFormService.createCarFormGroup();

  bucketURL: string = 'https://d3t4g72htdika4.cloudfront.net/';

  constructor(
    protected additionalOptionService: AdditionalOptionService,
    protected carService: CarService,
    protected carFormService: CarFormService,
    protected activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router,
    private images: ImageConvertorService,
    private modalWindowService: ModalService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.concurredYear = new Date().getFullYear();
    this.activatedRoute.data.subscribe(({ car }) => {
      this.car = car;
      if (car) {
        this.isNewCar = false;
        this.updateForm(car);
        // @ts-ignore
        this.titleService.setTitle('Edit ' + CarBrand[car.carBrand!] + ' ' + car.model);
        this.loadAdditionalOptions();
      } else {
        this.titleService.setTitle('New car');
      }
    });
  }

  loadAdditionalOptions(): void {
    if (this.car) {
      this.additionalOptionService.findByCarId(this.car.id).subscribe(options => {
        this.additionalOptions = options.body
          ? options.body.map(option => {
              return {
                car: this.car,
                id: option.id,
                option: option.option,
              };
            })
          : [];
      });
    }
  }

  previousState(): void {
    window.history.back();
  }

  async save() {
    this.isSaving = true;
    const car = this.fixDescriptions(this.carFormService.getCar(this.editForm));

    if (this.imageIsUploaded) {
      if (car.imageFileId) {
        this.imageService.deleteImage(car.imageFileId).then();
      }

      car.imageFileId = (
        car.model +
        car.carBrand! +
        Math.floor(Math.random() * 1_000_000_000) +
        '.' +
        this.imageFile.type.split('/')[1]
      ).replace(' ', '');

      this.imageService.uploadImage(this.imageFile, car.imageFileId!).then();
      setTimeout(() => {
        if (car.id !== null) {
          this.subscribeToSaveResponse(this.carService.update(car));
        } else {
          this.subscribeToSaveResponse(this.carService.create(car));
        } // And any other code that should run only after 5s
      }, 1000);
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICar>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: car => {
        if (this.additionalOptions.length > 0) {
          this.additionalOptionService
            .updateOptions(
              this.additionalOptions.map(option => {
                option.car = car.body;
                return option;
              })
            )
            .subscribe(() => {
              if (!this.isNewCar && this.deleteAdditionalOptions.length > 0) {
                this.additionalOptionService.deleteAll(this.deleteAdditionalOptions).then();
              }
            });
        }

        if (!this.isNewCar && this.deleteAdditionalOptions.length > 0) {
          this.additionalOptionService.deleteAll(this.deleteAdditionalOptions).then();
        }

        this.onSaveSuccess();
      },
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

  onAdding(tag: TagModel): void {
    const option: CustomOption = {
      car: this.car,
      id: null,
      option: (tag as InputOption).option,
    };

    this.additionalOptions.push(option);
  }

  onRemoving(tag: TagModel): void {
    let option: CustomOption | undefined = this.additionalOptions.find(l => l.option == (tag as InputOption).option);

    if (option) {
      const index = this.additionalOptions.indexOf(option, 0);

      if (index > -1) {
        if (option.id != null) {
          this.deleteAdditionalOptions.push(option);
        }
        this.additionalOptions.splice(index, 1);
      }
    }
  }

  public getBrandValue(): string {
    // @ts-ignore
    return CarBrand[this.car!.carBrand!];
  }

  getImageURL(): string {
    return this.bucketURL + this.car?.imageFileId;
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

  function() {
    this.additionalOptions.forEach(l => console.log(l));
  }

  openModalWindow(content: any): void {
    this.modalWindowService.open(content);
  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      let imageType: string = event.target.files[0].type;
      console.log('Image type : ' + imageType);
      if (imageType == 'image/png' || imageType == 'image/gif' || imageType == 'image/jpeg') {
        this.imageTypeIsValid = true;
        this.tryChangeImage = true;

        this.imgChangeEvt = event;
        this.imageFile = event.target.files[0];

        this.trySubmitted = false;
        this.imageIsUploaded = true;

        let reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        reader.onload = event => {
          // called once readAsDataURL is completed
          this.imageUrl = (event.target as FileReader).result;
        };
      } else {
        this.imageTypeIsValid = false;
        this.trySubmitted = false;
        this.imageIsUploaded = true;
      }
    }
  }

  cropImg(event: ImageCroppedEvent) {
    this.imageUrl = event.base64;
    this.images.dataURItoBlob((event.base64 as string).replace('data:image/png;base64,', '')).subscribe((blob: any) => {
      this.imageFile = this.images.blobToFile(blob, '');
    });
  }

  imgLoad() {
    // display cropper tool
  }

  initCropper() {
    // init cropper
  }

  imgFailed() {
    // error msg
  }

  changeImageIsFalse(): void {
    this.tryChangeImage = false;
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
