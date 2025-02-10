import { Route } from '@angular/router';

import { BaseComponent } from './base.component';
import { HomeComponent } from './component/home/home.component';

export const PortfolioCodeJumpStore2MenuRoutes: Route = {
  path: '',
  component: BaseComponent,
  children: [{ path: '', component: HomeComponent }],
};
