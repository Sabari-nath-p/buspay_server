import {
  IsNotEmpty,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';

export class CreateRouteStopDto {
  @IsNotEmpty()
  @IsNumber()
  stop_id: number;

  @IsNotEmpty()
  @IsNumber()
  route_id: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  distance_from_start: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'time_from_start must be a valid time in the format HH:MM:SS',
  })
  time_from_start: string;

  @IsOptional()
  @IsBoolean()
  is_starting_point?: boolean;

  @IsOptional()
  @IsBoolean()
  is_destination?: boolean;
}
