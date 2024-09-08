import { inject, Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, of, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

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

  getArticle(articleName: string) {
    return this.#http.get(
      `${this.#articleRootUrl}${articleName}/${articleName}.md`,
      {
        headers: this.#headers,
        responseType: 'text',
      },
    );
  }
}
