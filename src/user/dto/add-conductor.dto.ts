import {
  IsEmail,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class addConductorDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsInt()
  bus_id: number;

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
