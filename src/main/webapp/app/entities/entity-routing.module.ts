import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Authority } from '../config/authority.constants';
import { UserRouteAccessService } from '../core/auth/user-route-access.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'car',
        data: {
          pageTitle: 'Cars',
          authorities: [Authority.ADMIN],
        },
        canActivate: [UserRouteAccessService],
        loadChildren: () => import('./car/car.module').then(m => m.CarModule),
      },
      {
        path: 'additional-option',
        data: {
          pageTitle: 'AdditionalOptions',
          authorities: [Authority.ADMIN],
        },
        canActivate: [UserRouteAccessService],
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
