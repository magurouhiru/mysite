import { AuthGuard } from '@angular/fire/auth-guard';
import { Route } from '@angular/router';

import { BaseComponent } from './base.component';
import { AboutComponent } from './component/about/about.component';
import { CompanyComponent } from './component/company/company.component';
import { DetailComponent } from './component/detail/detail.component';
import { HomeComponent } from './component/home/home.component';
import { ProductsComponent } from './component/products/products.component';
import { AddProductComponent } from './dev/add-product/add-product.component';

export const defaultTitel = 'Furniture Design';

export const PortfolioCodeJumpStore2MenuRoutes: Route = {
  path: '',
  component: BaseComponent,
  children: [
    {
      path: '',
      component: HomeComponent,
      data: { setTitle: true, title: defaultTitel },
    },
    {
      path: 'about',
      component: AboutComponent,
      data: { setTitle: true, title: 'About | ' + defaultTitel },
    },
    {
      path: 'company',
      component: CompanyComponent,
      data: { setTitle: true, title: 'Company | ' + defaultTitel },
    },
    {
      path: 'detail',
      children: [
        {
          path: ':productId',
          component: DetailComponent,
        },
      ],
    },
    {
      path: 'products',
      component: ProductsComponent,
      data: { setTitle: true, title: 'Products | ' + defaultTitel },
    },
    {
      path: 'add-product',
      component: AddProductComponent,
      canActivate: [AuthGuard],
    },
  ],
};
