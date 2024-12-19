import { forwardRef, Module } from '@nestjs/common';
import { BusTypeService } from './bus-type.service';
import { BusTypeController } from './bus-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusType } from './entities/bus-type.entity';
import { ResponseModule } from 'src/common/response/response.module';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { GuardModule } from 'src/common/guards/guard.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BusType]),
    ResponseModule,
    GuardModule,
    forwardRef(() => UserModule),
  ],
  controllers: [BusTypeController],
  providers: [BusTypeService],
  exports: [BusTypeService],
})
export class BusTypeModule {}
