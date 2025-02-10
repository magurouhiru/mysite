import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CardModule } from 'primeng/card';

import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CardModule, AsyncPipe, RouterLink, DatePipe],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.scss',
})
export class ArticleListComponent {
  readonly #articleService = inject(ArticleService);
  readonly articles$ = this.#articleService.getArticleIdList();
}
