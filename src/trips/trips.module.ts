import { Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trip } from './entities/trip.entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { BusModule } from 'src/bus/bus.module';
import { RouteModule } from 'src/route/route.module';
import { TripTicket } from './entities/trip-tickets.entity';
import { TicketsModule } from 'src/tickets/tickets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trip, TripTicket]),
    JwtModule,
    UserModule,
    BusModule,
    RouteModule,
    TicketsModule,
  ],
  controllers: [TripsController],
  providers: [TripsService],
})
export class TripsModule {}
