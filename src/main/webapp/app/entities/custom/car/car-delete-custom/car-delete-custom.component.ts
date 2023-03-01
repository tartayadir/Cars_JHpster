import { Component } from '@angular/core';
import { ICar } from '../../../car/car.model';
import { CarService } from '../../../car/service/car.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ITEM_DELETED_EVENT } from '../../../../config/navigation.constants';
import { Router } from '@angular/router';
import { ImageService } from '../../image/service/image.service';

@Component({
  selector: 'jhi-car-delete-custom',
  templateUrl: './car-delete-custom.component.html',
  styleUrls: ['./car-delete-custom.component.scss'],
})
export class CarDeleteCustomComponent {
  car?: ICar;

  constructor(
    protected carService: CarService,
    private router: Router,
    protected activeModal: NgbActiveModal,
    private imageService: ImageService
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.carService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);

      if (this.car) {
        this.imageService.deleteImage(this.car.imageFileId as string);
      }
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([this.router.url]);
      });
    });
  }
}
