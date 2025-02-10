import { Route } from '@angular/router';

import { AddCardComponent } from './children/add-card.component';
import { PortfolioCodeJumpBlogMenuComponent } from './children/code-jump/blog-menu/portfolio-code-jump-blog-menu.component';
import { PortfolioCodeJumpStoreMenuComponent } from './children/code-jump/store-menu/portfolio-code-jump-store-menu.component';
import { PortfolioCodeJumpStore2MenuRoutes } from './children/code-jump/store2-menu/portfolio-code-jump-store2-menu-routes';
import { PortfolioHomeComponent } from './children/portfolio-home.component';
import { PortfolioBaseComponent } from './portfolio-base.component';
import { PortfolioConfig } from './portfolio-config';

export const portfolioRoutes: Route = {
  path: 'portfolio',
  component: PortfolioBaseComponent,
  ...PortfolioConfig,
  children: [
    { path: '', component: PortfolioHomeComponent },
    { path: 'add-card', component: AddCardComponent },
    {
      path: 'code-jump',
      children: [
        { path: 'blog-menu', component: PortfolioCodeJumpBlogMenuComponent },
        { path: 'store-menu', component: PortfolioCodeJumpStoreMenuComponent },
        { path: 'store2-menu', children: [PortfolioCodeJumpStore2MenuRoutes] },
      ],
    },
  ],
};
