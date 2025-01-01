import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsEnum,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  bus_type_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  boarding_stop_id: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  destination_stop_id: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  rate: number;

  @IsOptional()
  @IsNumber()
  coupon_code_id?: number;

  @IsNotEmpty()
  @IsString()
  device_id: string;

  @IsOptional()
  @IsEnum(['PENDING', 'PAID', 'FAILED'])
  payment_status?: 'PENDING' | 'PAID' | 'FAILED';

  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;
}
