import { AsyncPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, authState } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';

import { SearchedArticle } from './article';
import { ArticleService } from './article.service';
import { AutoFocusModule } from 'primeng/autofocus';
import { Button } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

import { HomeButtonComponent } from '../shared/home-button/home-button.component';
import { ThemePickerComponent } from '../shared/theme-picker/theme-picker.component';

@Component({
  selector: 'app-article-base',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    CardModule,
    Button,
    DialogModule,
    InputTextModule,
    AutoFocusModule,
    FormsModule,
    RouterLink,
    HomeButtonComponent,
    ThemePickerComponent,
  ],
  templateUrl: './article-base.component.html',
  styleUrl: './article-base.component.scss',
})
export class ArticleBaseComponent {
  auth = inject(Auth);
  readonly #service = inject(ArticleService);
  readonly #router = inject(Router);

  visible = false;
  showDialog() {
    this.visible = true;
    this.search();
  }

  target = '';
  res$: Observable<SearchedArticle[]> = of([]);
  search() {
    this.res$ = this.#service.search(this.target);
  }
  junp(id: string) {
    this.visible = false;
    this.#router.navigateByUrl(`/article/${id}`);
  }

  readonly #authState = toSignal(authState(this.auth));
  isLogin = computed(() => !!this.#authState());
}
