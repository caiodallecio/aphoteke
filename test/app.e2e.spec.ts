import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/repository.module';
import { disableFetchMocks } from 'jest-fetch-mock';
import { configureApp } from '../src/app';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    disableFetchMocks();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureApp(app);
    await app.init();
  });

  it('/repositories (GET) Default', () => {
    return request(app.getHttpServer()).get('/repositories').expect(200);
  });

  it('/repositories (GET) Limit', () => {
    return request(app.getHttpServer())
      .get('/repositories?limit=20')
      .expect(200);
  });

  it('/repositories (GET) Language', () => {
    return request(app.getHttpServer())
      .get('/repositories?language=python&limit=1')
      .expect(200);
  });

  it('/repositories (GET) StartDate', () => {
    return request(app.getHttpServer())
      .get('/repositories?startDate=2020-06-29T01:03:54Z&limit=1')
      .expect(200);
  });
});
