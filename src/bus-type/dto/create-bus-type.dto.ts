import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBusTypeDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  minimum_fare: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  minimum_kilometer: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  fare_per_kilometer: number;
}
