import { DogToCatService } from './dog-to-cat.service';

describe('DogToCatService', () => {
  describe('create', () => {
    describe('without values with dog', () => {
      const input = {
        a: 1,
        c: 'dog dog',
        d: 'cat',
        e: 'dog cat',
        f: { list: [{ x2: 'cat', x3: 'doggdog' }] },
      };

      it('returns payload unmodified ', () => {
        const service = new DogToCatService();
        const { payload } = service.create({ payload: JSON.stringify(input) });

        const payloadObj = JSON.parse(payload);
        expect(payloadObj).toEqual(input);
      });
    });

    describe('with values including exactly dog', () => {
      const input = {
        a: 1,
        b: 'dog',
        c: 'dog dog',
        d: 'cat',
        e: 'dog cat',
        f: { a: 'dog', list: [{ x1: 'dog', x2: 'cat', x3: 'doggdog' }] },
      };

      it('returns payload with exact match dog replaced with cat', () => {
        const service = new DogToCatService();
        const { payload } = service.create({ payload: JSON.stringify(input) });

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
});
