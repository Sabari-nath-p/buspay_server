import { forwardRef, Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';
import { UserModule } from 'src/user/user.module';
import { ResponseModule } from 'src/common/response/response.module';
import { PreferenceModule } from 'src/preference/preference.module';
import { DistrictsModule } from 'src/districts/districts.module';
import { BusTypeModule } from 'src/bus-type/bus-type.module';
import { GuardModule } from 'src/common/guards/guard.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bus]),
    forwardRef(() => UserModule),
    ResponseModule,
    PreferenceModule,
    DistrictsModule,
    BusTypeModule,
    GuardModule,
  ],
  controllers: [BusController],
  providers: [BusService],
  exports: [BusService],
})
export class BusModule {}
