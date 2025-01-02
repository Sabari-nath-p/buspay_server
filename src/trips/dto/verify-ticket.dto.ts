import {
  IsEnum,
  IsOptional,
  IsNumber,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { TripStatus } from '../entities/trip.entity';

export class VerifyTripDto {
  @IsNumber()
  @IsNotEmpty()
  ticket_id: number;

  @IsNumber()
  @IsOptional()
  trip_id: number;
}
