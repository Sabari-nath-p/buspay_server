import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';
import { DistrictsModule } from 'src/districts/districts.module';

@Module({
  imports: [RoleModule, UserModule, DistrictsModule],
  providers: [SeederService],
})
export class SeederModule {}
