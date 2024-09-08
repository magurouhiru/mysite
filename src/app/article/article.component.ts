import { Component, inject } from '@angular/core';
import { ArticleService } from '../article.service';
import { AsyncPipe } from '@angular/common';
import { MarkdownComponent } from 'ngx-markdown';
import { combineLatest, forkJoin, map, switchMap, tap } from 'rxjs';
import { CardModule } from 'primeng/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    AsyncPipe,
    MarkdownComponent,
    CardModule,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class ArticleComponent {
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly param = this.#activatedRoute.snapshot.paramMap.get('articleName');
  readonly #articleService = inject(ArticleService);
  readonly articleIndex$ = this.#articleService.getArticleNameList();

  readonly articles$ = this.articleIndex$.pipe(
    switchMap((index) =>
      combineLatest(
        index.filter((name)=>{
          return this.param ? this.param === name : true;
        }).
        slice(-4).reverse().map((name) =>
          this.#articleService.getArticle(name).pipe(
            map((article) => {
              return {
                name: name,
                article: article,
              };
            }),
          ),
        ),
      ),
    ),
  );
}
