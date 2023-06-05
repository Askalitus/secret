import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// todo https://docs-nestjs.netlify.app/openapi/introduction ,  описать сваггер
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
