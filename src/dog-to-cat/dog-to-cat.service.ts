import { Injectable } from '@nestjs/common';
import { DogToCat } from './entities/dog-to-cat.entity';
import { mapObject } from '../lib/utils/objelity';

@Injectable()
export class DogToCatService {
  public static readonly MATCH_VALUE = 'dog';
  public static readonly REPLACE_VALUE = 'cat';
  private readonly dogToCat: DogToCat = { payload: '' };

  create(dogToCat: DogToCat) {
    Object.assign(this.dogToCat, dogToCat);

    const { payload } = this.dogToCat;
    // TODO: FUTURE DEVELOPMENT -> handle case where payload invalid with 400 Bad Request
    const payloadObj = JSON.parse(payload);
    const transformedPayloadObj = mapObject(payloadObj, (val, path) => {
      if (val === DogToCatService.MATCH_VALUE) {
        return { [path]: DogToCatService.REPLACE_VALUE };
      }

      return {
        [path]: val,
      };
    });

    this.dogToCat.payload = JSON.stringify(transformedPayloadObj);
    return this.dogToCat;
  }
}
