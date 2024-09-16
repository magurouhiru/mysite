import { Component } from '@angular/core';

import { Button } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import {
  ToggleButtonChangeEvent,
  ToggleButtonModule,
} from 'primeng/togglebutton';

import { addElement } from '../../tools/add-element';
import { changeClass } from '../../tools/change-class';

@Component({
  selector: 'app-grids',
  standalone: true,
  imports: [Button, TabViewModule, ToggleButtonModule],
  templateUrl: './grids.component.html',
  styleUrl: './grids.component.scss',
})
export class GridsComponent {
  gridsHtml = `<div class="playBox playBox--1 grid">
  <div class="playBox playBox--2 hoge">hogehoge</div>
  <div class="playBox playBox--2 fuga">fugafuga</div>
  <div class="playBox playBox--2 piyo">
    piyopiyo
    piyopiyo
    piyopiyo
  </div>
</div>
`;
  gridsCss = `:host ::ng-deep .playBox {
  border: 2px;
  border-style: solid;
  border-color: #115e59; /* すごく濃い緑 */
  margin: 2px;
  padding: 2px;
  font-size: 1rem;
  line-height: 1rem;
  &--1 {
    background-color: #99f6e4; /* 薄い緑 */
  }
  &--2 {
    background-color: #2dd4bf; /* 緑 */
  }
}
`;

  changeCssClass(
    e: ToggleButtonChangeEvent,
    targetClassName: string,
    changeClassName: string,
  ) {
    this.gridsHtml = changeClass(
      e,
      this.gridsHtml,
      targetClassName,
      changeClassName,
    );
  }
  addElement(className: string) {
    this.gridsHtml = addElement(this.gridsHtml, 'playBox--1', className);
  }

  gridsHtml2 = `<div class="playBox playBox--1 grid2">
  <div class="playBox playBox--2 hoge2">hogehoge</div>
  <div class="playBox playBox--2 fuga2">fugafuga</div>
  <div class="playBox playBox--2 piyo2">
    piyopiyo
    piyopiyo
    piyopiyo
  </div>
  <div class="playBox playBox--2 foo2">foofoo</div>
</div>
`;
  gridsCss2 =
    this.gridsCss +
    `
:host ::ng-deep .grid2 {
  display: grid;
  width: 350px;
  height: 150px;
}
:host ::ng-deep .hoge2 {
  grid-column: 1 / 3;
  grid-row: 1;
}
:host ::ng-deep .fuga2 {
  grid-column: 1;
  grid-row: 2;
}
:host ::ng-deep .piyo2 {
  grid-column: 2;
  grid-row: 2;
}
:host ::ng-deep .foo2 {
  grid-column: 1 / 3;
  grid-row: 3;
}
`;
  gridsHtml3 = `<div class="playBox playBox--1 grid3">
  <div class="playBox playBox--2 hoge3">hogehoge</div>
  <div class="playBox playBox--2 fuga3">fugafuga</div>
  <div class="playBox playBox--2 piyo3">
    piyopiyo
    piyopiyo
    piyopiyo
  </div>
  <div class="playBox playBox--2 foo3">foofoo</div>
</div>
`;
  gridsCss3 =
    this.gridsCss +
    `
:host ::ng-deep .grid3 {
  display: grid;
  grid-template-areas:
    "hoge hoge"
    "fuga piyo"
    "foo foo";
  grid-template-columns: 1fr 3fr;
  gap: 5px;
}
:host ::ng-deep .hoge3 {
  grid-area: hoge;
}
:host ::ng-deep .fuga3 {
  grid-area: fuga;
}
:host ::ng-deep .piyo3 {
  grid-area: piyo;
}
:host ::ng-deep .foo3 {
  grid-area: foo;
}
`;
}
