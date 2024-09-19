export interface Article {
  meta: {
    id: string;
    author: string;
    date: Date;
    dateString: string;
    tags: string[];
    mark: string[];
  };
  title: string;
  body: string;
}

export interface SearchedArticle extends Article {
  main: string;
  sub: string;
}
