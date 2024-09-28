import {
  IsArray,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBusDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  bus_no: string;

  @IsNotEmpty()
  @IsInt()
  district_id: number;

  @IsNotEmpty()
  @IsInt()
  bus_type_id: number;

  @IsNotEmpty()
  @IsInt()
  no_of_seats: number;

  @IsNotEmpty()
  @IsArray()
  prefernce_ids: number[];
}
