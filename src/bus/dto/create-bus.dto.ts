import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBusDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  bus_no: string;

  @IsOptional()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsInt()
  owner_id: number;

  @IsNotEmpty()
  @IsInt()
  district_id: number;

  @IsNotEmpty()
  @IsInt()
  no_seats: number;

  @IsNotEmpty()
  @IsInt()
  prefernce_ids: number[];
}
