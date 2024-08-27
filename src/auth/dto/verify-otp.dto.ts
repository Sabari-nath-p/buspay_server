import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsEmail,
  ValidateIf,
} from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsInt()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  otp: string;
}
