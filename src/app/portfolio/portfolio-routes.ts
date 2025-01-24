import { Route } from '@angular/router';

import { PortfolioHomeComponent } from './children/portfolio-home.component';
import { PortfolioBaseComponent } from './portfolio-base.component';
import { PortfolioConfig } from './portfolio-config';

export const portfolioRoutes: Route = {
  path: 'portfolio',
  component: PortfolioBaseComponent,
  ...PortfolioConfig,
  children: [{ path: '', component: PortfolioHomeComponent }],
};
