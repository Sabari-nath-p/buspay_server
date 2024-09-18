import { Module } from '@nestjs/common';
import { BusTypeService } from './bus-type.service';
import { BusTypeController } from './bus-type.controller';

@Module({
  controllers: [BusTypeController],
  providers: [BusTypeService],
})
export class BusTypeModule {}
