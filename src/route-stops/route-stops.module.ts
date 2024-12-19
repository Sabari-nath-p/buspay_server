import { Module } from '@nestjs/common';
import { RouteStopsService } from './route-stops.service';
import { RouteStopsController } from './route-stops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteStop } from './entities/route-stop.entity';
import { ResponseModule } from 'src/common/response/response.module';
import { StopModule } from 'src/stop/stop.module';
import { RouteModule } from 'src/route/route.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RouteStop]),
    ResponseModule,
    StopModule,
    RouteModule,
  ],
  controllers: [RouteStopsController],
  providers: [RouteStopsService],
})
export class RouteStopsModule {}
