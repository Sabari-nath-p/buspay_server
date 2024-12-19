import { Module } from '@nestjs/common';
import { StopService } from './stop.service';
import { StopController } from './stop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stop } from './entities/stop.entity';
import { ResponseModule } from 'src/common/response/response.module';
import { DistrictsModule } from 'src/districts/districts.module';
import { BusTypeModule } from 'src/bus-type/bus-type.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Stop]),
    ResponseModule,
    DistrictsModule,
    BusTypeModule,
  ],
  controllers: [StopController],
  providers: [StopService],
  exports: [StopService],
})
export class StopModule {}
