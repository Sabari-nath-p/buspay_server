import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeORMError } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { OtpModule } from 'src/otp/otp.module';
import { JwtModule } from '@nestjs/jwt';
import { RoleModule } from 'src/role/role.module';
import { ResponseModule } from 'src/common/response/response.module';
import { BusModule } from 'src/bus/bus.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    OtpModule,
    JwtModule,
    RoleModule,
    ResponseModule,
    BusModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
