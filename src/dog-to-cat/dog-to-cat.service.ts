import { Injectable } from '@nestjs/common';
import { DogToCat } from './entities/dog-to-cat.entity';
import { mapObject } from '../lib/utils/objelity';

@Injectable()
export class DogToCatService {
  public static readonly MATCH_VALUE = 'dog';
  public static readonly REPLACE_VALUE = 'cat';
  private readonly dogToCat: DogToCat = { payload: {} };

  create(dogToCat: DogToCat) {
    const { payload } = dogToCat;

    this.dogToCat.payload = mapObject(payload, (val, path) => {
      if (val === DogToCatService.MATCH_VALUE) {
        return { [path]: DogToCatService.REPLACE_VALUE };
      }

      return {
        [path]: val,
      };
    });

    return this.dogToCat;
  }
}
