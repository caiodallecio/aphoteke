import { Injectable, InternalServerErrorException } from '@nestjs/common';
import fetch from 'node-fetch';
import { RepositoriesResponseDTO, RepositoryQueryDTO } from './repository.dto';

@Injectable()
export class RepositoryService {
  static url = 'https://api.github.com/search/repositories';

  buildList({ language, limit, startDate }: RepositoryQueryDTO) {
    const queryArray: string[] = [];

    queryArray.push('stars:>0');

    if (startDate) queryArray.push(`created:>${startDate.toISOString()}`);

    if (language) queryArray.push(`language:${language}`);

    const queryString = 'q=' + queryArray.join('+');

    return `${RepositoryService.url}?${queryString}&sort=stars&order=des&per_page=${limit}`;
  }

  async list(props: RepositoryQueryDTO) {
    const uri = this.buildList(props);

    const request = await fetch(uri);
    const payload = await request.json();

    if (!request.ok) throw new InternalServerErrorException(payload.message);

    return payload as RepositoriesResponseDTO;
  }
}
