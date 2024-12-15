import {
  IsEnum,
  IsOptional,
  IsNumber,
  IsDate,
  IsNotEmpty,
} from 'class-validator';
import { TripStatus } from '../entities/trip.entity';

export class CreateTripDto {
  @IsNumber()
  @IsNotEmpty()
  bus_id: number;

  @IsNumber()
  @IsOptional()
  conductor_id: number;

  @IsNumber()
  @IsNotEmpty()
  route_id: number;
}
