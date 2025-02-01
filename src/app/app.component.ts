import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Contents } from './shared/contents';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [],
})
export class AppComponent {
  title = 'mysite';
  contents = Contents;
  protected readonly Object = Object;
}
