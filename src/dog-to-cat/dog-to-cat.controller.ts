import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateDogToCatDto } from './dto/create-dog-to-cat.dto';
import { DogToCatService } from './dog-to-cat.service';
import { DogToCat } from './entities/dog-to-cat.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('dog2cat')
export class DogToCatController {
  constructor(private service: DogToCatService) {}

  @Post()
  @ApiOperation({ summary: 'Replace dog with cat' })
  @ApiResponse({ status: 201, description: 'Created' })
  async create(@Body() dto: CreateDogToCatDto): Promise<DogToCat> {
    try {
      return this.service.create(dto);
    } catch (error) {
      // extract into a common error handler
      // including logging errors
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Unable to complete your request. Please contact support',
          internalOnly: `${error}`, // TODO: add logging and remove internal error
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        }
      );
    }
  }
}
