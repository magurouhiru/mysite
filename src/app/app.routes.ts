import { Routes } from '@angular/router';

import { ArticleComponent } from './article/article.component';

export const routes: Routes = [
  {
    path: '',
    component: ArticleComponent,
  },
  {
    path: 'article',
    component: ArticleComponent,
  },
  {
    path: 'article/:articleName',
    component: ArticleComponent,
  },
];
