import {
  IsOptional,
  IsNotEmpty,
  IsString,
  IsNumber,
  IsEmail,
  IsIn,
  ValidateIf,
  IsPhoneNumber,
  Max,
  Min,
  IsInt,
} from 'class-validator';

export class CreateUserDto {
  @IsIn(['super_admin', 'bus_owner', 'conductor'])
  role: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  pincode: string;

  @IsOptional()
  @IsString()
  district: string;

  @IsOptional()
  @IsString()
  profile_image: string;

  @IsString()
  password: string;
}
