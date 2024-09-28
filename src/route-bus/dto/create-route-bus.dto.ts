import {
  IsInt,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsDateString,
  ArrayNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateRouteBusDto {
  @IsInt()
  @IsNotEmpty()
  route_id: number;

  @IsInt()
  @IsNotEmpty()
  bus_id: number;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'start_timing must be a valid time in the format HH:MM:SS',
  })
  start_timing: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, {
    message: 'finish_timing must be a valid time in the format HH:MM:SS',
  })
  finish_timing?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  days_of_week: string[];
}
