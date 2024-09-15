import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Button } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import {
  ToggleButtonChangeEvent,
  ToggleButtonModule,
} from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';

import { changeClass } from '../../tools/change-class';

@Component({
  selector: 'app-box-model',
  standalone: true,
  imports: [
    ToggleButtonModule,
    FormsModule,
    Button,
    TooltipModule,
    TabViewModule,
  ],
  templateUrl: './box-model.component.html',
  styleUrl: './box-model.component.scss',
})
export class BoxModelComponent {
  htmlInLine = `hogehogehogehogehogehogehogehogehogehogehogehoge
<span>fugafuga</span>
<span>fugafuga</span>
<span>fugafuga</span>
<span>fugafuga</span>
<span>fugafuga</span>
<span>fugafuga</span>
<span>fugafuga</span>
`;

  readonly buttonLabelHogehoge = 'add hogehoge';
  addHogehoge() {
    this.htmlInLine += 'hogehoge';
  }
  readonly buttonLabelFugafuga = 'add <span>fugafuga</span>\\n';
  addFugafuga() {
    this.htmlInLine += '<span>fugafuga</span>\n';
  }

  inline__text_align__left = false;
  inline__text_align__right = false;
  inline__text_align__center = false;
  inline__text_align__end = false;
  inline__text_align__justify = false;
  inline__text_align__justify_all = false;

  inline__overflow_wrap__normal = false;
  inline__overflow_wrap__anywhere = false;
  inline__overflow_wrap__break_word = false;

  inline__vertical_align__baseline = false;
  inline__vertical_align__top = false;
  inline__vertical_align__middle = false;
  inline__vertical_align__bottom = false;
  inline__vertical_align__sub = false;
  inline__vertical_align__text_top = false;

  inline__display__inline = false;
  inline__display__block = false;
  inline__display__inline_block = false;
  inline__display__table_cell = false;
  inline__display__flex = false;

  blockHtml = `<div class="playBox playBox--1">hogehoge</div>
<div class="playBox playBox--2">fugafuga</div>
<div class="playBox playBox--1">
  hogehoge
  <div class="playBox playBox--2">fugafuga</div>
</div>`;
  blockCss = `:host ::ng-deep .playBox {
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
  &--3 {
    color: white;
    background-color: #0d9488; /* 濃い緑 */
  }
}
`;
  block__width__auto = false;
  block__height__auto = false;

  changeCssClass(
    e: ToggleButtonChangeEvent,
    targetClassName: string,
    changeClassName: string,
  ) {
    this.blockHtml = changeClass(
      e,
      this.blockHtml,
      targetClassName,
      changeClassName,
    );
  }
}
