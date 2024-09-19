import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, combineLatest, switchMap } from 'rxjs';

import { Article, SearchedArticle } from './article';

import { environment } from '../../environments/environment';

import { format, parse } from 'date-fns';

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

  getArticleIdList() {
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
    return this.#http
      .get(`${this.#articleRootUrl}${articleId}.md`, {
        headers: this.#headers,
        responseType: 'text',
      })
      .pipe(
        map((article) => {
          const raws = article.split(/\r?\n/);
          const meta = JSON.parse(raws.shift() ?? '');
          const date = parse(meta.date, 'yyyy/MM/dd', new Date());
          return {
            meta: {
              id: articleId,
              author: meta.author,
              date: date,
              dateString: format(date, 'yyyy/MM/dd'),
              tags: (meta.tags as string[]).map((x) => '#' + x),
              mark: [],
            },
            title: raws.shift()?.replaceAll('#', '').trim(),
            body: raws.join('\n'),
          } as Article;
        }),
      );
  }

  search(target: string) {
    return this.getArticleIdList().pipe(
      switchMap((ids) =>
        combineLatest(ids.reverse().map((id) => this.getArticle(id))),
      ),
      map((articles) => {
        const res: SearchedArticle[] = [];
        const max = 6;
        switch (true) {
          case target.length < 2: {
            for (const article of articles) {
              res.push({
                main: article.title,
                sub: 'タグ：' + article.meta.tags.join(','),
                ...article,
              });
            }
            break;
          }
          case target.includes('#'): {
            const reg = new RegExp(target.slice(1), 'i');
            for (const article of articles) {
              if (res.length >= max) {
                break;
              }
              const tags = article.meta.tags.join(',');
              const match = tags.match(reg);
              if (match !== null) {
                res.push({
                  main: article.title,
                  sub:
                    'タグ：' +
                    tags.replace('#' + match[0], `<mark>#${match[0]}</mark>`),
                  ...article,
                });
              }
            }
            break;
          }
          default: {
            const reg = new RegExp(target, 'i');
            for (const article of articles) {
              if (res.length >= max) {
                break;
              }
              const match = article.title.match(reg);
              if (match !== null) {
                res.push({
                  main: article.title.replace(
                    match[0],
                    `<mark>${match[0]}</mark>`,
                  ),
                  sub: '',
                  ...article,
                });
              }
            }

            for (const article of articles) {
              if (res.length >= max) {
                break;
              }
              const rows = article.body.split(/\r?\n/);
              for (const row of rows) {
                const match = row.match(reg);
                if (match !== null) {
                  if (row.includes('https://')) {
                    continue;
                  }
                  res.push({
                    main: article.title,
                    sub: row.replace(match[0], `<mark>${match[0]}</mark>`),
                    ...article,
                  });
                  break;
                }
              }
            }
            break;
          }
        }
        return res;
      }),
    );
  }
}
