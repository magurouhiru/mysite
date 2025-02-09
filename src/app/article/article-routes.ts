import { Route } from '@angular/router';

import { ArticleBaseComponent } from './article-base.component';
import { ArticleConfig } from './article-config';
import { AddArticleComponent } from './children/add-article.component';
import { ArticleDetailComponent } from './children/article-detail.component';
import { ArticleListComponent } from './children/article-list.component';

export const articleRoutes: Route = {
  path: 'article',
  component: ArticleBaseComponent,
  ...ArticleConfig,
  children: [
    {
      path: '',
      component: ArticleListComponent,
    },
    {
      path: 'add-article',
      component: AddArticleComponent,
    },
    {
      path: ':articleId',
      component: ArticleDetailComponent,
    },
  ],
};
