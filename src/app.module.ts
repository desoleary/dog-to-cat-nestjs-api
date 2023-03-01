import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DogToCatController } from './dog-to-cat/dog-to-cat.controller';
import { AppService } from './app.service';
import { DogToCatService } from './dog-to-cat/dog-to-cat.service';

@Module({
  imports: [],
  controllers: [AppController, DogToCatController],
  providers: [AppService, DogToCatService],
})
export class AppModule {}
