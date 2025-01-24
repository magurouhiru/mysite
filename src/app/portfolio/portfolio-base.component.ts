import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ThemePickerComponent } from '../shared/theme-picker/theme-picker.component';

@Component({
  selector: 'app-portfolio-base',
  standalone: true,
  imports: [RouterOutlet, ThemePickerComponent],
  templateUrl: './portfolio-base.component.html',
  styleUrl: './portfolio-base.component.scss',
})
export class PortfolioBaseComponent {}
