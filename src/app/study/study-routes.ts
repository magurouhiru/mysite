import { Route } from '@angular/router';

import { BoxModelComponent } from './children/box-model/box-model.component';
import { StudyDetailComponent } from './children/study-detail.component';
import { StudyListComponent } from './children/study-list.component';
import { StudyBaseComponent } from './study-base.component';
import { StudyConfig } from './study-config';

export const studyRoutes: Route = {
  path: 'study',
  component: StudyBaseComponent,
  ...StudyConfig,
  children: [
    {
      path: '',
      component: StudyListComponent,
    },
    {
      path: 'BoxModel',
      component: BoxModelComponent,
    },
    {
      path: ':studyId',
      component: StudyDetailComponent,
    },
  ],
};
