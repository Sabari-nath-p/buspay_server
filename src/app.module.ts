import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { SeederModule } from './seeder/seeder.module';
import { OtpModule } from './otp/otp.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { StopModule } from './stop/stop.module';
import { BusModule } from './bus/bus.module';
import { RouteModule } from './route/route.module';
import { RouteStopsModule } from './route-stops/route-stops.module';
import { BusTypeModule } from './bus-type/bus-type.module';
import { DistrictsModule } from './districts/districts.module';
import { PreferenceModule } from './preference/preference.module';
import { StatesModule } from './states/states.module';
import { RouteBusModule } from './route-bus/route-bus.module';
import { TripsModule } from './trips/trips.module';
import { CouponsModule } from './coupons/coupons.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: false,
      autoLoadEntities: true,
    }),
    UserModule,
    SeederModule,
    OtpModule,
    RoleModule,
    AuthModule,
    StopModule,
    BusModule,
    RouteModule,
    RouteStopsModule,
    BusTypeModule,
    DistrictsModule,
    PreferenceModule,
    StatesModule,
    RouteBusModule,
    TripsModule,
    CouponsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
