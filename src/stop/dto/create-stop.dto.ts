import { IsArray, IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class CreateStopDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  latitude: string;

  @IsNotEmpty()
  @IsString()
  longitude: string;

  @IsInt()
  @IsPositive()
  district_id: number;

  @IsNotEmpty()
  @IsArray()
  bus_type_ids: number[];
}
