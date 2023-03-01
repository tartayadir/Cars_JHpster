import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from '../../../car/list/car.component';
import { ASC } from '../../../../config/navigation.constants';
import { UserRouteAccessService } from '../../../../core/auth/user-route-access.service';
import { CarRoutingResolveService } from '../../../car/route/car-routing-resolve.service';
import { CarDetailCustomComponent } from '../car-detail-custom/car-detail-custom.component';
import { CarUpdateCustomComponent } from '../car-update-custom/car-update-custom.component';
import { Authority } from '../../../../config/authority.constants';

const carRoute: Routes = [
  {
    path: '',
    component: CarComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: CarDetailCustomComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    resolve: {
      car: CarRoutingResolveService,
    },
  },
  {
    path: 'new',
    component: CarUpdateCustomComponent,
    resolve: {
      car: CarRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: CarUpdateCustomComponent,
    resolve: {
      car: CarRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(carRoute)],
  exports: [RouterModule],
})
export class CarCustomRoutingModule {}
