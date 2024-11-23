import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Contents } from './shared/contents';
import { PrimeTemplate } from 'primeng/api';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CardModule, PrimeTemplate],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'mysite';
  contents = Contents;
  protected readonly Object = Object;
}
