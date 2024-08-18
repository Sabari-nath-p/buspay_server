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
  userId: number;

  @IsNotEmpty()
  @IsString()
  otp: string;
}
