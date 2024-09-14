import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Button } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-box-model',
  standalone: true,
  imports: [ToggleButtonModule, FormsModule, Button, TooltipModule],
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

  block = `<div>hogehoge<div>hugahuga</div></div>`;
}
