import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  readonly #http = inject(HttpClient);
  readonly #articleRootUrl = environment.articleRootUrl;
  readonly #headers = new HttpHeaders().set(
    'Content-Type',
    'text/plain; charset=utf-8',
  );

  getArticleNameList() {
    return this.#http
      .get(`${this.#articleRootUrl}articleIndex.text`, {
        headers: this.#headers,
        responseType: 'text',
      })
      .pipe(
        map((res) =>
          res
            .trim()
            .split(/\r\n|\n|\r/)
            .filter((str) => str.length !== 0),
        ),
      );
  }

  getArticle(articleId: string) {
    return this.#http.get(`${this.#articleRootUrl}${articleId}.md`, {
      headers: this.#headers,
      responseType: 'text',
    });
  }
}
