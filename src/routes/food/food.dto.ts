import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { DetailFood } from '../../types';

export class CreateFoodDTO {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty({ type: () => DetailFood, isArray: true })
  details: DetailFood[];

  @ApiProperty()
  category: string;

  @ApiProperty()
  ingredients: string[];
}
