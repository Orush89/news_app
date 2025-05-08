import { Injectable, Inject } from '@nestjs/common';
import { NewsSource, NewsArticle, FakeNewsArticle } from './interfaces/news.interface';
import { OpenAIService } from '../openai/openai.service';
import { NewsApiSource } from './sources/newsapi.source';
import { buildNewFeedUrls } from './constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NewsService {
  constructor(
    private readonly openAIService: OpenAIService,
    private configService: ConfigService
  ) {}

  async fetchOriginalNews(): Promise<NewsArticle[]> {
    const rawNewsFeed: string[] = buildNewFeedUrls(this.configService.get<string>('NEWS_API_KEY'))
    
    const newsSources: NewsSource[] = rawNewsFeed.map((source) => {
      const sourceConfig = {
        url: source
      };
      return new NewsApiSource(sourceConfig);
    })

    const articlesPromises = newsSources.map(source => source.fetchArticles());
    const articlesArrays = await Promise.all(articlesPromises);
    const articles = articlesArrays.flat();

    return articles;
  }

  async fakeOriginalNews(articles: NewsArticle[]) : Promise<FakeNewsArticle[]> {
      const fakeNewsPromises = articles.map(async (article) => {
        const [fakeTitle, category] = await Promise.all([
          this.openAIService.generateFakeTitle(article.title),
          this.openAIService.categorizeArticle(article.title),
        ]);

        return {
          ...article,
          fake_title: fakeTitle,
          category,
        };
      });

      return await Promise.all(fakeNewsPromises);
  }

  async getFakeNews(): Promise<FakeNewsArticle[]> {
    try {
      const originalNews: NewsArticle[]  = await this.fetchOriginalNews()
      
      // TODO: Use Database
      const fakeNews: FakeNewsArticle[] = await this.fakeOriginalNews(originalNews)

      return fakeNews
    } catch (error) {
      console.error('Error generating fake news:', error);
      throw new Error('Failed to generate fake news');
    }
  }
} 