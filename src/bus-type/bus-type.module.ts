import { Module } from '@nestjs/common';
import { BusTypeService } from './bus-type.service';
import { BusTypeController } from './bus-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusType } from './entities/bus-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BusType])],
  controllers: [BusTypeController],
  providers: [BusTypeService],
})
export class BusTypeModule {}
