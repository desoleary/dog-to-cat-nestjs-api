import { Module } from '@nestjs/common';
import { DogToCatController } from './dog-to-cat/dog-to-cat.controller';
import { DogToCatService } from './dog-to-cat/dog-to-cat.service';

@Module({
  imports: [],
  controllers: [DogToCatController],
  providers: [DogToCatService],
})
export class AppModule {}
