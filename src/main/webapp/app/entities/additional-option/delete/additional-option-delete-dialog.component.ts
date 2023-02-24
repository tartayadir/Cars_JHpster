import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAdditionalOption } from '../additional-option.model';
import { AdditionalOptionService } from '../service/additional-option.service';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';

@Component({
  templateUrl: './additional-option-delete-dialog.component.html',
})
export class AdditionalOptionDeleteDialogComponent {
  additionalOption?: IAdditionalOption;

  constructor(protected additionalOptionService: AdditionalOptionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.additionalOptionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
