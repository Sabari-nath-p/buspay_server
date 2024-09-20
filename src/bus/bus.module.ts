import { Module } from '@nestjs/common';
import { BusService } from './bus.service';
import { BusController } from './bus.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bus } from './entities/bus.entity';
import { UserModule } from 'src/user/user.module';
import { ResponseModule } from 'src/common/response/response.module';
import { PreferenceModule } from 'src/preference/preference.module';
import { DistrictsModule } from 'src/districts/districts.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Bus]),
    UserModule,
    ResponseModule,
    PreferenceModule,
    DistrictsModule,
  ],
  controllers: [BusController],
  providers: [BusService],
})
export class BusModule {}
