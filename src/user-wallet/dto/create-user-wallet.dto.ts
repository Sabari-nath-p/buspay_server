import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsDecimal,
  Length,
} from 'class-validator';

export class CreateUserWalletDto {
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 50)
  bank_account_number: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 15)
  bank_ifsc_code: string;

  @IsNotEmpty()
  @IsString()
  @Length(1, 100)
  bank_branch_name: string;
}
