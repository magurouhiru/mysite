import { Component } from '@angular/core';
import { ScreenTrackingService } from '@angular/fire/analytics';
import { RouterLink, RouterOutlet } from '@angular/router';

import { Contents } from './shared/contents';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ScreenTrackingService],
})
export class AppComponent {
  title = 'mysite';
  contents = Contents;
  protected readonly Object = Object;
}
