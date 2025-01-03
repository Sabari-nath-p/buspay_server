import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsNumber()
  bus_type_id: number;

  @IsNotEmpty()
  @IsNumber()
  boarding_route_stop_id: number;

  @IsNotEmpty()
  @IsNumber()
  destination_route_stop_id: number;

  @IsNotEmpty()
  @IsString()
  device_id: string;

  @IsOptional()
  @IsNumber()
  coupon_code_id?: number;
}
