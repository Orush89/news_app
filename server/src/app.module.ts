import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NewsModule } from './news/news.module';
import { OpenAIModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
    NewsModule,
    OpenAIModule,
  ],
})
export class AppModule {} 