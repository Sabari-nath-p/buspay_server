import {
  IsString,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsDecimal,
  IsNumber,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';
import { CouponType } from '../entities/coupon.entity';

export class CreateCouponDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEnum(CouponType)
  type: CouponType;

  @IsOptional()
  @IsDecimal()
  @Min(0)
  @Max(100)
  discount_percentage?: number;

  @IsOptional()
  @IsDecimal()
  @Min(0)
  discount_amount?: number;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}
