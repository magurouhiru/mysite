import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { TreeTableModule } from 'primeng/treetable';

import { changeStyle } from '../shared/change-style';

@Component({
  selector: 'app-study-base',
  standalone: true,
  imports: [RouterOutlet, RouterLink, TreeTableModule],
  templateUrl: './study-base.component.html',
  styleUrl: './study-base.component.scss',
})
export class StudyBaseComponent {
  constructor() {
    changeStyle();
  }
}
