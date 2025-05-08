import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { NewsService } from './news.service';
import { FakeNewsArticle } from './interfaces/news.interface';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @ApiResponse({ status:  200 })
  async getFakeNews(): Promise<FakeNewsArticle[]> {
    return this.newsService.getFakeNews();
  }
  
} 