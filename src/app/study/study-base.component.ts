import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { TreeTableModule } from 'primeng/treetable';

import { HomeButtonComponent } from '../shared/home-button/home-button.component';
import { ThemePickerComponent } from '../shared/theme-picker/theme-picker.component';

@Component({
  selector: 'app-study-base',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    TreeTableModule,
    ThemePickerComponent,
    HomeButtonComponent,
  ],
  templateUrl: './study-base.component.html',
  styleUrl: './study-base.component.scss',
})
export class StudyBaseComponent {}
