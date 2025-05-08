import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS
  app.enableCors();
  
  // Enable validation
  app.useGlobalPipes(new ValidationPipe());
  
  // Swagger documentation setup
  const config = new DocumentBuilder()
    .setTitle('Elementor EXC!')
    .setDescription('API for generating fake news from real news articles')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.APP_PORT;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap(); 