import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AdditionalOptionComponent } from '../list/additional-option.component';
import { AdditionalOptionDetailComponent } from '../detail/additional-option-detail.component';
import { AdditionalOptionUpdateComponent } from '../update/additional-option-update.component';
import { AdditionalOptionRoutingResolveService } from './additional-option-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const additionalOptionRoute: Routes = [
  {
    path: '',
    component: AdditionalOptionComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AdditionalOptionDetailComponent,
    resolve: {
      additionalOption: AdditionalOptionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AdditionalOptionUpdateComponent,
    resolve: {
      additionalOption: AdditionalOptionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AdditionalOptionUpdateComponent,
    resolve: {
      additionalOption: AdditionalOptionRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(additionalOptionRoute)],
  exports: [RouterModule],
})
export class AdditionalOptionRoutingModule {}
