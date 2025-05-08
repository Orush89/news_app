export interface NewsArticle {
  title: string;
  url: string;
  date: string;
  source: string;
}

export interface FakeNewsArticle extends NewsArticle {
  fake_title: string;
  category: string;
}

export interface NewsSource {
  url: string;
  fetchArticles(): Promise<NewsArticle[]>;
} 