import { Test, TestingModule } from '@nestjs/testing';
import { RepositoryService } from './repository.service';
import fetch from 'jest-fetch-mock';

describe('RepositoryService', () => {
  let moduleRef: TestingModule;
  let serviceRef: RepositoryService;

  beforeEach(async () => {
    fetch.resetMocks();
    moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [RepositoryService],
    }).compile();

    await moduleRef.init();
    serviceRef = moduleRef.get(RepositoryService);
  });

  describe('buildList', () => {
    it('clean', () => {
      expect(serviceRef.buildList({ limit: 10 })).toBe(
        RepositoryService.url + '?q=stars:>0&sort=stars&order=des&per_page=10',
      );
    });

    it('created', () => {
      const now = new Date();
      expect(serviceRef.buildList({ limit: 10, startDate: now })).toBe(
        RepositoryService.url +
          `?q=stars:>0+created:>${now.toISOString()}&sort=stars&order=des&per_page=10`,
      );
    });

    it('language', () => {
      expect(serviceRef.buildList({ limit: 10, language: 'python' })).toBe(
        RepositoryService.url +
          `?q=stars:>0+language:python&sort=stars&order=des&per_page=10`,
      );
    });

    it('limit', () => {
      expect(serviceRef.buildList({ limit: 33 })).toBe(
        RepositoryService.url + `?q=stars:>0&sort=stars&order=des&per_page=33`,
      );
    });
  });

  describe('list', () => {
    it('success', async () => {
      const result = { result: 'result' };

      const url = 'https://api.github.com/search/repositories';
      jest.spyOn(serviceRef, 'buildList').mockImplementation(() => url);
      fetch.doMockOnce(JSON.stringify(result));
      const response = await serviceRef.list({ limit: 10 });

      expect(response).toEqual(result);
    });

    it('fail', async () => {
      const result = { message: 'message' };

      const url = 'https://api.github.com/search/repositories';
      jest.spyOn(serviceRef, 'buildList').mockImplementation(() => url);
      fetch.doMockOnce(JSON.stringify(result), { status: 400 });

      await expect(
        async () => await serviceRef.list({ limit: 10 }),
      ).rejects.toThrow(result.message);
    });
  });
});
