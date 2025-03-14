import { Route } from '@angular/router';

import { AngularfireFirestoreComponent } from './children/angularfire-firestore/angularfire-firestore.component';
import { BoxModelComponent } from './children/box-model/box-model.component';
import { ColdHotObservableComponent } from './children/cold-hot-observable/cold-hot-observable.component';
import { StudyDetailComponent } from './children/detail/study-detail.component';
import { DirectivesComponent } from './children/directives/directives.component';
import { FlexBoxComponent } from './children/flex-box/flex-box.component';
import { CssRangeSliderExamplesComponent } from './children/frontend-planet-examples/css-range-slider-examples/css-range-slider-examples.component';
import { FrontendPlanetExamplesComponent } from './children/frontend-planet-examples/frontend-planet-examples.component';
import { GridsComponent } from './children/grids/grids.component';
import { StudyListComponent } from './children/list/study-list.component';
import { ObservableNTo1Component } from './children/observable-n-to-1/observable-n-to-1.component';
import { RxjsXxxMapComponent } from './children/rxjs-xxx-map/rxjs-xxx-map.component';
import { UnsubscribeComponent } from './children/unsubscribe/unsubscribe.component';
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
      path: 'unsubscribe',
      component: UnsubscribeComponent,
    },
    {
      path: 'cold-hot-observable',
      component: ColdHotObservableComponent,
    },
    {
      path: 'observable-n-to-1',
      component: ObservableNTo1Component,
    },
    {
      path: 'frontend-planet-examples',
      children: [
        {
          path: '',
          component: FrontendPlanetExamplesComponent,
        },
        {
          path: 'css-range-slider-examples',
          component: CssRangeSliderExamplesComponent,
        },
      ],
    },
    {
      path: 'angularfire-firestore',
      component: AngularfireFirestoreComponent,
    },
    {
      path: ':studyId',
      component: StudyDetailComponent,
    },
  ],
};
