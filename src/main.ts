import { NestFactory } from '@nestjs/core';
import { configureApp } from './app';
import { AppModule } from './repository.module';

export async function bootstrap() {
  let app = await NestFactory.create(AppModule);
  app = configureApp(app);
  await app.listen(3000);
}
bootstrap();
