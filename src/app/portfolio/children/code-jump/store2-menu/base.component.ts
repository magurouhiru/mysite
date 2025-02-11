import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Title } from '@angular/platform-browser';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { concat, filter, map, of } from 'rxjs';

import { defaultTitel } from './portfolio-code-jump-store2-menu-routes';

import { FaviconService } from '../../../service/favicon.service';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, RouterLink],
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent implements OnInit, OnDestroy {
  readonly #router = inject(Router);
  readonly #title = inject(Title);
  readonly #favicon = inject(FaviconService);
  readonly #trigger = concat(
    of({}),
    this.#router.events.pipe(filter((e) => e instanceof NavigationEnd)),
  ).pipe(takeUntilDestroyed());

  ngOnInit() {
    this.#trigger
      .pipe(
        map(() => {
          let route = this.#router.routerState.snapshot.root;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.data;
        }),
      )
      .subscribe({
        next: (data) => {
          this.#title.setTitle(data['title'] ?? defaultTitel);
          const navToggle = document.getElementById(
            'nav-toggle',
          ) as HTMLInputElement;
          if (navToggle.checked) {
            navToggle.checked = false;
          }
        },
      });
    this.#favicon.serFavicon('/portfolio/code-jump/store2-menu/favicon.ico');
  }
  ngOnDestroy() {
    this.#favicon.serFavicon('favicon.ico');
  }
}
