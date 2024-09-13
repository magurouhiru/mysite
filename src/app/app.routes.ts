import { Routes } from '@angular/router';

import { articleRoutes } from './article/article-routes';
import { HomeComponent } from './home/home.component';
import { studyRoutes } from './study/study-routes';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  articleRoutes,
  studyRoutes,
];
