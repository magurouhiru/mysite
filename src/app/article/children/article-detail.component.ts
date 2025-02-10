import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';

import { CardModule } from 'primeng/card';
import { MarkdownComponent } from 'ngx-markdown';

import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-detail',
  standalone: true,
  imports: [MarkdownComponent, AsyncPipe, CardModule, DatePipe],
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.scss',
})
export class ArticleDetailComponent {
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #params = this.#activatedRoute.params;
  readonly #articleService = inject(ArticleService);
  readonly article$ = this.#params.pipe(
    mergeMap((p) => this.#articleService.getArticle(p['articleId'])),
  );
}
