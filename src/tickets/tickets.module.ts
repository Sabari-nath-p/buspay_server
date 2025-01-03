import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './entities/ticket.entity';
import { RazorpayModule } from 'src/razorpay/razorpay.module';
import { BusTypeModule } from 'src/bus-type/bus-type.module';
import { StopModule } from 'src/stop/stop.module';
import { ResponseModule } from 'src/common/response/response.module';
import { RouteStopsModule } from 'src/route-stops/route-stops.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    RazorpayModule,
    BusTypeModule,
    RouteStopsModule,
    ResponseModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService],
  exports: [TicketsService],
})
export class TicketsModule {}
