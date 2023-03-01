import { Test, TestingModule } from '@nestjs/testing';
import { DogToCatController } from './dog-to-cat.controller';
import { DogToCatService } from './dog-to-cat.service';

describe('DogToCatController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [DogToCatController],
      providers: [DogToCatService],
    }).compile();
  });

  describe('create', () => {
    const input = {
      a: 1,
      b: 'dog',
      c: 'dog dog',
      d: 'cat',
      e: 'dog cat',
      f: { a: 'dog', list: [{ x1: 'dog', x2: 'cat', x3: 'doggdog' }] },
    };

    it('should return mapped payload', async () => {
      const appController = app.get(DogToCatController);

      const { payload } = await appController.create({
        payload: JSON.stringify(input),
      });

      const payloadObj = JSON.parse(payload);
      expect(payloadObj).toEqual({
        a: 1,
        b: 'cat',
        c: 'dog dog',
        d: 'cat',
        e: 'dog cat',
        f: { a: 'cat', list: [{ x1: 'cat', x2: 'cat', x3: 'doggdog' }] },
      });
    });
  });
});
