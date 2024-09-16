import { Route } from '@angular/router';

import { BoxModelComponent } from './children/box-model/box-model.component';
import { StudyDetailComponent } from './children/detail/study-detail.component';
import { FlexBoxComponent } from './children/flex-box/flex-box.component';
import { StudyListComponent } from './children/list/study-list.component';
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
      path: 'FlexBox',
      component: FlexBoxComponent,
    },
    {
      path: ':studyId',
      component: StudyDetailComponent,
    },
  ],
};
