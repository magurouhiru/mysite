import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, switchMap } from 'rxjs';

import { CardModule } from 'primeng/card';

import { ArticleService } from '../article.service';

import { differenceInCalendarDays, parse } from 'date-fns';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CardModule, AsyncPipe],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent {
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly param =
    this.#activatedRoute.snapshot.paramMap.get('articleId') ?? '';
  readonly #articleService = inject(ArticleService);
  readonly articleIndex$ = this.#articleService.getArticleNameList();
  readonly #now = Date.now();

  readonly articles$ = this.articleIndex$.pipe(
    map((index) => index.slice(-10).reverse()),
    switchMap((index) =>
      combineLatest(
        index.map((articleName) =>
          this.#articleService.getArticle(articleName).pipe(
            map((article) => {
              const raws = article.split(/\r?\n/);
              const meta = JSON.parse(raws.shift() ?? '');
              const date = parse(meta.date, 'yyyy/MM/dd', new Date());
              return {
                meta: {
                  name: articleName,
                  author: meta.author,
                  title: raws[0].slice(1).trim(),
                  rawDate: meta.date,
                  date: date,
                  newFlag: differenceInCalendarDays(this.#now, date) < 28,
                  tags: meta.tags,
                },
                article: raws.join('\n'),
              };
            }),
          ),
        ),
      ),
    ),
  );
}
