import { Module } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { RoleModule } from 'src/role/role.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [RoleModule, UserModule],
  providers: [SeederService],
})
export class SeederModule {}
