import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CarCustomRoutingModule } from './route/car-custom-routing.module';
import { CarUpdateCustomComponent } from './car-update-custom/car-update-custom.component';
import { CarDetailCustomComponent } from './car-detail-custom/car-detail-custom.component';
import { CarDeleteCustomComponent } from './car-delete-custom/car-delete-custom.component';

@NgModule({
  imports: [SharedModule, CarCustomRoutingModule],
  declarations: [CarDetailCustomComponent, CarUpdateCustomComponent, CarDeleteCustomComponent],
})
export class CarCustomModule {}
