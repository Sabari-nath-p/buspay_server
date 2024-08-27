import { Injectable } from '@nestjs/common';
import { RoleService } from 'src/role/role.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateUserInterface } from 'src/user/interface/create-user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly rolesService: RoleService,
    private readonly usersService: UserService,
  ) {}

  async RolesSeeder() {
    const count = await this.rolesService.getRolesCount();
    if (count <= 3) {
      await Promise.all(
        ['super_admin', 'bus_owner', 'end_user', 'conductor'].map(
          async (name) => {
            await this.rolesService.skipOrCreate({ name: name });
          },
        ),
      );
    }
    console.log('roles seeded successfully');
  }

  async SuperAdminSeeder() {
    const superUserEmail = await this.usersService.findUserByEmail(
      'superadmin@buspay.com',
    );
    const superadminRole =
      await this.rolesService.findRoleByName('super_admin');
    if (!superUserEmail) {
      const superUserInterface: CreateUserInterface = {
        name: 'admin',
        email: 'superadmin@buspay.com',
        phone: '+911122334455',
        role: superadminRole,
        password: 'adminPassword',
      } as CreateUserInterface;

      await this.usersService.create(superUserInterface);
      console.log('Superuser seeded successfully.');
    } else {
      console.log('Superuser already exists.');
    }
  }

  async onApplicationBootstrap() {
    await this.RolesSeeder();
    await this.SuperAdminSeeder();
  }
}
