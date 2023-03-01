import { ApiProperty } from '@nestjs/swagger';

export class DogToCat {
  @ApiProperty({
    example: {
      a: 1,
      b: 'dog',
      c: 'dog dog',
      d: 'cat',
      e: 'dog cat',
      f: { a: 'dog', list: [{ x1: 'dog', x2: 'cat', x3: 'doggdog' }] },
    },
    description: 'JSON payload to be modified',
  })
  payload: object;
}
