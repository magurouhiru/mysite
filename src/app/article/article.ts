import { Timestamp } from '@angular/fire/firestore';

export interface Article {
  meta: {
    id: string;
    author: string;
    date: Date;
    tags: string[];
  };
  title: string;
  body: string;
}
export interface ArticleApp {
  id: string;
  meta: {
    author: string;
    date: Timestamp;
    tags: string[];
  };
  title: string;
  body: string;
}

export interface ArticleDb {
  meta: {
    author: string;
    date: Timestamp;
    tags: string[];
  };
  title: string;
  body: string;
}

export interface SearchedArticle extends Article {
  main: string;
  sub: string;
}
