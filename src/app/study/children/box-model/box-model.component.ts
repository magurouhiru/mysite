import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Button } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';

@Component({
  selector: 'app-box-model',
  standalone: true,
  imports: [ToggleButtonModule, FormsModule, Button],
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
  readonly buttonLabel = 'add <span>fugafuga</span>';
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
}
