import { Route } from '@angular/router';

import { HomeComponent } from './home.component';
import { ASC } from '../config/navigation.constants';

export const HOME_ROUTE: Route = {
  path: '',
  component: HomeComponent,
  data: {
    pageTitle: 'Car Catalog',
    defaultSort: 'id,' + ASC,
  },
};
