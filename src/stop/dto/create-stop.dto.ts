import { IsNotEmpty } from 'class-validator';

export class CreateStopDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  latitude: string;

  @IsNotEmpty()
  longitude: string;

  @IsNotEmpty()
  district: string;

  @IsNotEmpty()
  state: string;

}
