import { Module } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { District } from './entities/district.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictsController } from './districts.controller';
import { ResponseModule } from '../common/response/response.module';

@Module({
  imports: [TypeOrmModule.forFeature([District]), ResponseModule],
  providers: [DistrictsService],
  exports: [DistrictsService],
  controllers: [DistrictsController],
})
export class DistrictsModule {}
