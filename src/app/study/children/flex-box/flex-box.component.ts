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
  selector: 'app-flex-box',
  standalone: true,
  imports: [ToggleButtonModule, TabViewModule, Button],
  templateUrl: './flex-box.component.html',
  styleUrl: './flex-box.component.scss',
})
export class FlexBoxComponent {
  flexBoxHtml = `<div class="playBox playBox--1 flex-box">
  <div class="playBox playBox--2 hoge">hogehoge</div>
  <div class="playBox playBox--2 fuga">fugafuga</div>
  <div class="playBox playBox--2 piyo">
    piyopiyo
    piyopiyo
    piyopiyo
    piyopiyo
    piyopiyo
    piyopiyo
    piyopiyo
    piyopiyo
    piyopiyo
    piyopiyo
    piyopiyo
    piyopiyo
    piyopiyo
    piyopiyo
  </div>
</div>
`;
  flexBoxCss = `:host ::ng-deep .playBox {
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
    this.flexBoxHtml = changeClass(
      e,
      this.flexBoxHtml,
      targetClassName,
      changeClassName,
    );
  }
  addElement(className: string) {
    this.flexBoxHtml = addElement(this.flexBoxHtml, 'playBox--1', className);
  }
}
