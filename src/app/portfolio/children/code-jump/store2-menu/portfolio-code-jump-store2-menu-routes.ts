import { AuthGuard } from '@angular/fire/auth-guard';
import { Route } from '@angular/router';

import { BaseComponent } from './base.component';
import { AboutComponent } from './component/about/about.component';
import { CompanyComponent } from './component/company/company.component';
import { ContactComponent } from './component/contact/contact.component';
import { HomeComponent } from './component/home/home.component';
import { ProductsComponent } from './component/products/products.component';
import { AddProductComponent } from './dev/add-product/add-product.component';

export const defaultTitel = 'Furniture Design';

export const PortfolioCodeJumpStore2MenuRoutes: Route = {
  path: '',
  component: BaseComponent,
  children: [
    { path: '', component: HomeComponent, data: { title: defaultTitel } },
    {
      path: 'about',
      component: AboutComponent,
      data: { title: 'About | ' + defaultTitel },
    },
    {
      path: 'company',
      component: CompanyComponent,
      data: { title: 'Company | ' + defaultTitel },
    },
    {
      path: 'contact',
      component: ContactComponent,
      data: { title: 'Contact | ' + defaultTitel },
    },
    {
      path: 'products',
      component: ProductsComponent,
      data: { title: 'Products | ' + defaultTitel },
    },
    {
      path: 'add-product',
      component: AddProductComponent,
      data: { title: 'Dev Add Product | ' + defaultTitel },
      canActivate: [AuthGuard],
    },
  ],
};
