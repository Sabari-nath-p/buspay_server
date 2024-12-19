import { Module } from '@nestjs/common';
import { RouteBusService } from './route-bus.service';
import { RouteBusController } from './route-bus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteBus } from './entities/route-bus.entity';
import { ResponseService } from 'src/common/response/response.service';
import { ResponseModule } from 'src/common/response/response.module';
import { RouteModule } from 'src/route/route.module';
import { BusModule } from 'src/bus/bus.module';
import { StopModule } from 'src/stop/stop.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RouteBus]),
    ResponseModule,
    RouteModule,
    BusModule,
    StopModule
  ],
  controllers: [RouteBusController],
  providers: [RouteBusService],
})
export class RouteBusModule {}
