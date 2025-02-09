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
import { ref, Storage } from '@angular/fire/storage';
import { map, of } from 'rxjs';

import { Article, ArticleApp, ArticleDb, SearchedArticle } from './article';

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
    );
  }

  getArticle(articleId: string) {
    return docData(doc(this.#articleRef, articleId)).pipe(
      map((articleApp) =>
        toArticle(articleApp ?? (null as unknown as ArticleApp)),
      ),
    );
  }

  search(target: string) {
    return of<SearchedArticle[]>([]);
  }

  addArticle(articleApp: ArticleApp) {
    addDoc(this.#articleRef, articleApp);
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
