import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  ValidateIf,
  IsOptional,
} from 'class-validator';

export class SignInDto {
  appType: string;

  @ValidateIf((obj) => obj.appType === 'super_admin')
  @IsEmail()
  email: string;

  @ValidateIf((obj) => obj.appType === 'user')
  @IsOptional()
  @IsString()
  name?: string;

  @ValidateIf((obj) => obj.appType === 'user')
  @IsPhoneNumber()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ValidateIf((obj) => obj.appType === 'super_admin')
  @IsNotEmpty()
  @IsString()
  password: string;
}
