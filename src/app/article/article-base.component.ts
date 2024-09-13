import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

import { CardModule } from 'primeng/card';
import { MarkdownComponent } from 'ngx-markdown';

import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-base',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, CardModule, MarkdownComponent, RouterLink],
  templateUrl: './article-base.component.html',
  styleUrl: './article-base.component.scss',
})
export class ArticleBaseComponent {
  readonly #articleService = inject(ArticleService);
  readonly articleIndex$ = this.#articleService.getArticleNameList();
}
