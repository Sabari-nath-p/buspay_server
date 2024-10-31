import { IsInt, IsPositive, IsString } from 'class-validator';

export class CreateRouteDto {
  @IsString()
  name: string;

  @IsInt()
  @IsPositive()
  district_id: number;
}
