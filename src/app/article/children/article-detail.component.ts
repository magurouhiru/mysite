import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs';

import { CardModule } from 'primeng/card';
import { MarkdownComponent } from 'ngx-markdown';

import { ArticleService } from '../../article.service';

import { parse } from 'date-fns';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, CardModule],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent {
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly param =
    this.#activatedRoute.snapshot.paramMap.get('articleId') ?? '';
  readonly #articleService = inject(ArticleService);
  readonly article$ = this.#articleService.getArticle(this.param).pipe(
    tap((x) => console.log(x)),
    tap((x) => console.log(this.param)),
    map((article) => {
      const raws = article.split(/\r?\n/);
      const meta = JSON.parse(raws.shift() ?? '');
      const date = parse(meta.date, 'yyyy/MM/dd', new Date());
      return {
        meta: {
          author: meta.author,
          title: raws[0].slice(1).trim(),
          rawDate: meta.date,
          date: date,
          tags: meta.tags,
        },
        article: raws.join('\n'),
      };
    }),
  );
}
