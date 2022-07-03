import { Controller, Get, Query } from '@nestjs/common';
import { RepositoryQueryDTO } from './repository.dto';
import { RepositoryService } from './repository.service';

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoryService) {}

  @Get()
  list(@Query() parameters: RepositoryQueryDTO) {
    return this.repositoriesService.list(parameters);
  }
}
