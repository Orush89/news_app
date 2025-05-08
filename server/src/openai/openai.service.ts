import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';
import { ConfigService } from '@nestjs/config';
import { completionsDefaults, openApiParams } from './constants';


@Injectable()
export class OpenAIService {
  private openai: OpenAI;
  

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({ apiKey: this.configService.get<string>('OPENAI_API_KEY') });
  }

  async generateFakeTitle(realTitle: string): Promise<string> {
    try {
      const prompt = `Given this real news title: "${realTitle}", generate a fake but related news title that is humorous and satirical. The fake title should maintain the same topic but present it in a misleading or exaggerated way.`;
      const response = await this.openai.chat.completions.create({ ...openApiParams, messages: [
        { role: 'user', content: prompt }
      ], });

      console.log("response:::", response)

      return response?.choices?.[0].message?.content
    } catch (error) {
      console.error('Error generating fake title:', error);
      return realTitle;
    }
  }

  async categorizeArticle(title: string): Promise<string> {
    try {
      const prompt = `Given a news title categorize the title into one of these categories: Technology, Politics, Business, Entertainment, Sports, Health, Science, or Other. Title: "${title}"`;
      const response = await this.openai.chat.completions.create({ ...openApiParams, messages: [
        { role: 'user', content: prompt }
      ], });
      console.log("response:::", response)

      return response?.choices?.[0].message?.content?.trim() || completionsDefaults.category;
    } catch (error) {
      console.error('Error categorizing article:', error);
      return 'Other';
    }
  }
} 