import { Module } from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CouponsController } from './coupons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { ResponseModule } from 'src/common/response/response.module';

@Module({
  imports: [TypeOrmModule.forFeature([Coupon]), ResponseModule],
  controllers: [CouponsController],
  providers: [CouponsService],
})
export class CouponsModule {}
