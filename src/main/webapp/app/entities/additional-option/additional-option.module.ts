import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { AdditionalOptionComponent } from './list/additional-option.component';
import { AdditionalOptionDetailComponent } from './detail/additional-option-detail.component';
import { AdditionalOptionUpdateComponent } from './update/additional-option-update.component';
import { AdditionalOptionDeleteDialogComponent } from './delete/additional-option-delete-dialog.component';
import { AdditionalOptionRoutingModule } from './route/additional-option-routing.module';

@NgModule({
  imports: [SharedModule, AdditionalOptionRoutingModule],
  declarations: [
    AdditionalOptionComponent,
    AdditionalOptionDetailComponent,
    AdditionalOptionUpdateComponent,
    AdditionalOptionDeleteDialogComponent,
  ],
})
export class AdditionalOptionModule {}
