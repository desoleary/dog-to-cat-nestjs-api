import { Injectable } from '@nestjs/common';
import { DogToCat } from './entities/dog-to-cat.entity';

@Injectable()
export class DogToCatService {
  private readonly dogToCat: DogToCat = { payload: '' };

  create(dogToCat: DogToCat) {
    Object.assign(this.dogToCat, dogToCat);
    return this.dogToCat;
  }
}
