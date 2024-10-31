import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';
import { DistrictsModule } from 'src/districts/districts.module';
import { StatesModule } from 'src/states/states.module';

@Module({
  imports: [RoleModule, UserModule, DistrictsModule, StatesModule],
  providers: [SeederService],
})
export class SeederModule {}
