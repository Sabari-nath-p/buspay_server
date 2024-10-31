import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsPhoneNumber,
  ValidateIf,
  IsOptional,
  isIn,
  IsIn,
  isString,
} from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsIn(['conductor', 'bus_owner', 'end_user'])
  role: string;

  @IsOptional()
  @IsString()
  lattitude: string;

  @IsOptional()
  @IsString()
  longitude: string;

  @ValidateIf((obj) => obj.role == 'bus_owner' || obj.role == 'conductor')
  @IsNotEmpty()
  @IsString()
  password: string;

  @ValidateIf((obj) => obj.role == 'bus_owner' || obj.role == 'conductor')
  @IsNotEmpty()
  @IsString()
  confirm_password: string;
}
