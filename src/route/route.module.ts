import { Module } from '@nestjs/common';
import { RouteService } from './route.service';
import { RouteController } from './route.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { ResponseModule } from 'src/common/response/response.module';

@Module({
  imports: [TypeOrmModule.forFeature([Route]), ResponseModule],
  controllers: [RouteController],
  providers: [RouteService],
})
export class RouteModule {}
