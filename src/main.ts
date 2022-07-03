import { NestFactory } from '@nestjs/core';
import { configureApp } from './app';
import { RepositoryModule } from './repository/repository.module';

export async function bootstrap() {
  let app = await NestFactory.create(RepositoryModule);
  app = configureApp(app);
  await app.listen(3000);
}
bootstrap();
