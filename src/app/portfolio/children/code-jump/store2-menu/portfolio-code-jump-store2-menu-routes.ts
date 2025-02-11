import { Route } from '@angular/router';

import { BaseComponent } from './base.component';
import { AboutComponent } from './component/about/about.component';
import { CompanyComponent } from './component/company/company.component';
import { ContactComponent } from './component/contact/contact.component';
import { HomeComponent } from './component/home/home.component';
import { ProductsComponent } from './component/products/products.component';

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
  ],
};
