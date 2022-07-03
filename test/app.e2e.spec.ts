import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/repository/repository.module';
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

  describe('/repositories (GET) Default', () => {
    it('Success', () => {
      return request(app.getHttpServer()).get('/repositories').expect(200);
    });
  });

  describe('/repositories (GET) Limit', () => {
    it('Success', () => {
      return request(app.getHttpServer())
        .get('/repositories?limit=20')
        .expect(200);
    });

    it('Fail', () => {
      return request(app.getHttpServer())
        .get('/repositories?limit=clovis')
        .expect(400);
    });
  });

  describe('/repositories (GET) Language', () => {
    it('Success', () => {
      return request(app.getHttpServer())
        .get('/repositories?language=python')
        .expect(200);
    });
  });

  describe('/repositories (GET) StartTime', () => {
    it('Success', () => {
      return request(app.getHttpServer())
        .get('/repositories?startDate=2020-06-29T01:03:54Z')
        .expect(200);
    });

    it('Fail', () => {
      return request(app.getHttpServer())
        .get('/repositories?startDate=clovis')
        .expect(400);
    });
  });
});
