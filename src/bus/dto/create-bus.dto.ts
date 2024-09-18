import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBusDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  bus_no: string;

  @IsNotEmpty()
  @IsInt()
  owner_id: number;

  @IsNotEmpty()
  @IsInt()
  no_trips_per_day: number;
}
