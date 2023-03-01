import { deepKeys, mapObject } from './objelity';

describe('objelity', () => {
  it('deepKeys', () => {
    let obj = {
      a: {
        b: {
          c: [1, 2, 3],
        },
        d: new Date(),
      },
      e: {
        f: {
          g: 'h',
        },
      },
    };
    let _keys = deepKeys(obj);
    console.log(
      deepKeys({
        a: 1,
        b: 'dog',
        c: 'dog dog',
        d: 'cat',
        e: 'dog cat',
        f: { a: 'dog', list: [{ x1: 'dog', x2: 'cat', x3: 'doggdog' }] },
      })
    );

    expect(_keys).toEqual(['a.b.c.0', 'a.b.c.1', 'a.b.c.2', 'a.d', 'e.f.g']);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    obj = [
      {
        name: 'alice',
        age: 17,
      },
      {
        name: 'bob',
        age: 32,
      },
      {
        name: 'charlie',
        age: 25,
      },
    ];
    _keys = deepKeys(obj);
    expect(_keys).toEqual([
      '0.name',
      '0.age',
      '1.name',
      '1.age',
      '2.name',
      '2.age',
    ]);
  });

  describe('mapObject', () => {
    it('mapObject(obj, fn) with sum', () => {
      const obj = {
        aaa: {
          bbb: {
            ccc: 1,
            ddd: 2,
          },
          eee: {
            fff: 3,
            ggg: 4,
          },
        },
      };

      const newObj = mapObject(obj, function (val) {
        return val * 2;
      });

      expect(newObj).toEqual({
        aaa: {
          bbb: {
            ccc: 2,
            ddd: 4,
          },
          eee: {
            fff: 6,
            ggg: 8,
          },
        },
      });
    });

    it('mapObject(obj, fn) with returned array', () => {
      const obj = {
        aaa: {
          bbb: {
            ccc: 1,
            ddd: 0,
          },
          eee: {
            fff: void 0,
            ggg: null,
          },
        },
      };
      const newObj = mapObject(obj, function (val, path) {
        let newPath;
        if (path.match(/aaa\.bbb/)) {
          newPath = path.replace('aaa.bbb', 'xxx');
          return [newPath, val];
        } else {
          return [path, val];
        }
      });
      expect(newObj).toEqual({
        xxx: {
          ccc: 1,
          ddd: 0,
        },
        aaa: {
          eee: {
            fff: void 0,
            ggg: null,
          },
        },
      });
    });

    it('mapObject(obj, fn) with returned object', () => {
      const obj = {
        aaa: {
          bbb: {
            ccc: 1,
            ddd: 0,
          },
          eee: {
            fff: void 0,
            ggg: null,
          },
        },
      };
      const newObj = mapObject(obj, function (val, path) {
        let newPath;
        if (path.match(/aaa\.bbb/)) {
          newPath = path.replace('aaa.bbb', 'xxx');
          return {
            [newPath]: val,
          };
        } else {
          return {
            [path]: val,
          };
        }
      });

      expect(newObj).toEqual({
        xxx: {
          ccc: 1,
          ddd: 0,
        },
        aaa: {
          eee: {
            fff: void 0,
            ggg: null,
          },
        },
      });
    });
  });
});
