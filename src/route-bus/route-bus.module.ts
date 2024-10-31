import { Module } from '@nestjs/common';
import { RouteBusService } from './route-bus.service';
import { RouteBusController } from './route-bus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouteBus } from './entities/route-bus.entity';
import { ResponseService } from 'src/common/response/response.service';
import { ResponseModule } from 'src/common/response/response.module';

@Module({
  imports: [TypeOrmModule.forFeature([RouteBus]), ResponseModule],
  controllers: [RouteBusController],
  providers: [RouteBusService],
})
export class RouteBusModule {}
