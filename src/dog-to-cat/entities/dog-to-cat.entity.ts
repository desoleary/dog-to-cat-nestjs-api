import { ApiProperty } from '@nestjs/swagger';

export class DogToCat {
  @ApiProperty({
    example: `{key: "dog", key2: "dog and cat"}`,
    description: 'JSON payload to be modified',
  })
  payload: string;
}
