import axios from 'axios';
import { NewsSource, NewsArticle } from '../interfaces/news.interface';
import { news } from 'src/constants';

export class NewsApiSource implements NewsSource {
  constructor(private readonly config: {
    url: string;
  }) {}
  url: string;

  get getUrl(): string {
    return this.config.url;
  }

  async fetchArticles(): Promise<NewsArticle[]> {
    try {
      const response = await axios.get(`${this.getUrl}`, {
        params: {
          pageSize: news.PAGE_SIZE,
        },
      });

      return response.data.articles.map((article: any) => ({
        title: article.title,
        url: article.url,
        date: article.publishedAt,
        source: article.source.name,
      }));
    } catch (error) {
      console.error('Error fetching news from NewsAPI:', error);
      throw new Error('Failed to fetch news articles');
    }
  }
} 