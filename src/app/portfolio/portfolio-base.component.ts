import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { concat, filter, map, of, switchMap } from 'rxjs';

import { ThemePickerComponent } from '../shared/theme-picker/theme-picker.component';

@Component({
  selector: 'app-portfolio-base',
  standalone: true,
  imports: [RouterOutlet, ThemePickerComponent],
  templateUrl: './portfolio-base.component.html',
  styleUrl: './portfolio-base.component.scss',
})
export class PortfolioBaseComponent {
  readonly route = inject(ActivatedRoute);
  readonly router = inject(Router);
  readonly trigger = concat(
    of({}),
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)),
  );
  readonly displayEnd = toSignal(
    this.trigger.pipe(
      switchMap(() => this.route.firstChild?.url ?? of([])),
      map((url) => url.length > 0),
    ),
    { initialValue: false },
  );
}
