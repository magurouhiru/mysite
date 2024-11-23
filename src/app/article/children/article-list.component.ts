import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';

import { CardModule } from 'primeng/card';

import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CardModule, AsyncPipe, RouterLink],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent {
  readonly #articleService = inject(ArticleService);
  readonly articleIndex$ = this.#articleService.getArticleIdList();

  readonly articles$ = this.articleIndex$.pipe(
    map((index) => index.slice(-20).reverse()),
    switchMap((index) =>
      combineLatest(
        index.map((articleId) => this.#articleService.getArticle(articleId)),
      ),
    ),
  );
}
