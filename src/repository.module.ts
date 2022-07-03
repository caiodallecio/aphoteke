import { Module } from '@nestjs/common';
import { RepositoriesController } from './repository.controller';
import { RepositoryService } from './repository.service';

@Module({
  imports: [],
  controllers: [RepositoriesController],
  providers: [RepositoryService],
})
export class AppModule {}
