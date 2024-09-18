import { Module } from '@nestjs/common';
import { StopService } from './stop.service';
import { StopController } from './stop.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stop } from './entities/stop.entity';
import { ResponseModule } from 'src/common/response/response.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stop]), ResponseModule],
  controllers: [StopController],
  providers: [StopService],
})
export class StopModule {}
