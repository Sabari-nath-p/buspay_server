import { IsString } from 'class-validator';

export class CreatePreferenceDto {
  @IsString()
  name: string;
}
