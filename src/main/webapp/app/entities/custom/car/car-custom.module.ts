import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CarCustomRoutingModule } from './route/car-custom-routing.module';
import { CarUpdateCustomComponent } from './car-update-custom/car-update-custom.component';
import { CarDetailCustomComponent } from './car-detail-custom/car-detail-custom.component';
import { CarDeleteCustomComponent } from './car-delete-custom/car-delete-custom.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TagInputModule } from 'ngx-chips';
import { ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  imports: [
    SharedModule,
    CarCustomRoutingModule,
    A11yModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    TagInputModule,
    ReactiveFormsModule,
    A11yModule,
    ImageCropperModule,
  ],
  declarations: [CarDetailCustomComponent, CarUpdateCustomComponent, CarDeleteCustomComponent],
})
export class CarCustomModule {}
