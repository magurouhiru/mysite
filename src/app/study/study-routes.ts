import { Route } from '@angular/router';

import { BoxModelComponent } from './children/box-model/box-model.component';
import { StudyDetailComponent } from './children/detail/study-detail.component';
import { DirectivesComponent } from './children/directives/directives.component';
import { FlexBoxComponent } from './children/flex-box/flex-box.component';
import { GridsComponent } from './children/grids/grids.component';
import { StudyListComponent } from './children/list/study-list.component';
import { RxjsXxxMapComponent } from './children/rxjs-xxx-map/rxjs-xxx-map.component';
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
      path: 'Grids',
      component: GridsComponent,
    },
    {
      path: 'Directives',
      component: DirectivesComponent,
    },
    {
      path: 'RxjsXxxMap',
      component: RxjsXxxMapComponent,
    },
    {
      path: ':studyId',
      component: StudyDetailComponent,
    },
  ],
};
