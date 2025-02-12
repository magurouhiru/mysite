import { NgOptimizedImage } from '@angular/common';
import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState } from '@angular/fire/auth';
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
import { FontService } from '../../../service/font.service';

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
  readonly #font = inject(FontService);
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
          if (data['setTitle']) {
            this.#title.setTitle(data['title'] ?? defaultTitel);
          }
          const navToggle = document.getElementById(
            'nav-toggle',
          ) as HTMLInputElement;
          if (navToggle.checked) {
            navToggle.checked = false;
          }
        },
      });
    this.#favicon.serFavicon('/portfolio/code-jump/store2-menu/favicon.ico');
    this.#font.setNotoSansJP();
  }
  ngOnDestroy() {
    this.#favicon.serFavicon('favicon.ico');
  }

  // 以下は開発用のロジック
  readonly auth = inject(Auth);
  readonly #authState = toSignal(authState(this.auth));
  isLogin = computed(() => !!this.#authState());
}
