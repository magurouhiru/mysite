import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-article-base',
  standalone: true,
  imports: [
    RouterOutlet,
    AsyncPipe,
    CardModule,
    MarkdownComponent,
    Button,
    DialogModule,
    InputTextModule,
    AutoFocusModule,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './article-base.component.html',
  styleUrl: './article-base.component.scss',
})
export class ArticleBaseComponent {
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
}
