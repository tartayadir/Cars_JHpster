import { Component, OnInit } from '@angular/core';
import { ICar } from '../../../car/car.model';
import { CarService } from '../../../car/service/car.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ITEM_DELETED_EVENT } from '../../../../config/navigation.constants';

@Component({
  selector: 'jhi-car-delete-custom',
  templateUrl: './car-delete-custom.component.html',
  styleUrls: ['./car-delete-custom.component.scss'],
})
export class CarDeleteCustomComponent {
  car?: ICar;

  constructor(protected carService: CarService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.carService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
