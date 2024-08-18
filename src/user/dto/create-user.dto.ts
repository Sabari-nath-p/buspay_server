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
import { UserType } from '../entities/user.entity';

export class CreateUserDto {
  @IsIn(['super_admin', 'bus_owner', 'end_user', 'conductor'])
  user_type: UserType;

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
  lattitude: string;

  @IsOptional()
  @IsString()
  longitude: string;

  @IsOptional()
  @IsString()
  profile_image: string;

  @ValidateIf((object) => object.user_type === 'super-admin')
  @IsString()
  password: string;
}