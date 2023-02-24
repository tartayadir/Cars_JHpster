import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'car',
        data: { pageTitle: 'Cars' },
        loadChildren: () => import('./car/car.module').then(m => m.CarModule),
      },
      {
        path: 'additional-option',
        data: { pageTitle: 'AdditionalOptions' },
        loadChildren: () => import('./additional-option/additional-option.module').then(m => m.AdditionalOptionModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
      {
        path: 'custom-car',
        data: { pageTitle: 'Cars' },
        loadChildren: () => import('./custom/car/car-custom.module').then(m => m.CarCustomModule),
      },
    ]),
  ],
})
export class EntityRoutingModule {}
