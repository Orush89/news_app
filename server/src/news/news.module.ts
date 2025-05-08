import { Module } from '@nestjs/common';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';
import { NewsApiSource } from './sources/newsapi.source';
import { OpenAIService } from 'src/openai/openai.service';

@Module({
  controllers: [NewsController],
  providers: [
    NewsService,
    OpenAIService
  ],
})
export class NewsModule {} 