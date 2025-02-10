import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  doc,
  docData,
  Firestore,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  WithFieldValue,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { concat, forkJoin, from, map, of, switchMap } from 'rxjs';

import { Article, ArticleApp, ArticleDb, SearchedArticle } from './article';

import { compareDesc } from 'date-fns';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  readonly #store = inject(Firestore);
  readonly #articleRef = collection(this.#store, '/article/').withConverter(
    articleConverter,
  );
  readonly #storage = inject(Storage);
  readonly #imgRef = ref(this.#storage, 'article/img/');

  getArticleIdList() {
    return collectionData(this.#articleRef).pipe(
      map((articleApps) =>
        articleApps.map((articleApp) => toArticle(articleApp)),
      ),
      map((articles) =>
        articles.sort((a, b) => compareDesc(a.meta.date, b.meta.date)),
      ),
    );
  }

  getArticle(articleId: string) {
    return docData(doc(this.#articleRef, articleId)).pipe(
      map((articleApp) =>
        toArticle(articleApp ?? (null as unknown as ArticleApp)),
      ),
      switchMap((article) => {
        const noImg = { ...article };
        const re = new RegExp(/!\[img\.png\]\([a-zA-Z0-9/-]+\.png\)/, 'g');
        noImg.body = noImg.body.replaceAll(re, '');

        const imgUrls = article.body.match(re);
        if (imgUrls) {
          const rePre = new RegExp(/!\[img\.png\]\([a-zA-Z0-9-]+/, 'g');
          const replaced = forkJoin(
            imgUrls.map((imgUrl) => {
              const path = imgUrl
                .replace(rePre, '')
                .replace('/', '')
                .replace(')', '');
              return from(
                getDownloadURL(ref(this.#imgRef, articleId + '/' + path)),
              ).pipe(
                map((replaceUrl) => {
                  return {
                    imgUrl,
                    replaceUrl: '![img.png](' + replaceUrl + ')',
                  };
                }),
              );
            }),
          ).pipe(
            map((v) => {
              v.forEach(
                ({ imgUrl, replaceUrl }) =>
                  (article.body = article.body.replace(imgUrl, replaceUrl)),
              );
              return article;
            }),
          );
          return concat(of(noImg), replaced);
        } else {
          return concat(of(noImg));
        }
      }),
    );
  }

  search(_target: string) {
    return of<SearchedArticle[]>([]);
  }

  addArticle(articleApp: ArticleApp, imgs: File[] = []) {
    addDoc(this.#articleRef, articleApp).then((v) => {
      imgs.forEach((img) => {
        uploadBytesResumable(ref(this.#imgRef, v.id + '/' + img.name), img);
      });
    });
  }
}

const articleConverter: FirestoreDataConverter<ArticleApp, ArticleDb> = {
  toFirestore(modelObject: ArticleApp): WithFieldValue<ArticleDb> {
    return modelObject;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot<ArticleApp>): ArticleApp {
    return { ...snapshot.data(), id: snapshot.id };
  },
};

function toArticle(articleApp: ArticleApp): Article {
  return {
    meta: {
      id: articleApp.id,
      author: articleApp.meta.author,
      date: articleApp.meta.date.toDate(),
      tags: articleApp.meta.tags.map((tag) => '#' + tag),
    },
    title: articleApp.title,
    body: articleApp.body,
  };
}
