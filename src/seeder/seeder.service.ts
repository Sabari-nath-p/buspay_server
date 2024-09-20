import { Injectable } from '@nestjs/common';
import { DistrictsService } from 'src/districts/districts.service';
import { RoleService } from 'src/role/role.service';
import { StatesService } from 'src/states/states.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateUserInterface } from 'src/user/interface/create-user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SeederService {
  constructor(
    private readonly rolesService: RoleService,
    private readonly usersService: UserService,
    private readonly districtService: DistrictsService,
    private statesService: StatesService,
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

  async StatesSeeder() {
    const count = await this.statesService.getTotalCount();
    if (count == 0) {
      await Promise.all(
        [
          'Andhra Pradesh',
          'Arunachal Pradesh',
          'Assam',
          'Bihar',
          'Chhattisgarh',
          'Goa',
          'Gujarat',
          'Haryana',
          'Himachal Pradesh',
          'Jharkhand',
          'Karnataka',
          'Kerala',
          'Madhya Pradesh',
          'Maharashtra',
          'Manipur',
          'Meghalaya',
          'Mizoram',
          'Nagaland',
          'Odisha',
          'Punjab',
          'Rajasthan',
          'Sikkim',
          'Tamil Nadu',
          'Telangana',
          'Tripura',
          'Uttar Pradesh',
          'Uttarakhand',
          'West Bengal',
          'Andaman and Nicobar Islands',
          'Chandigarh',
          'Dadra and Nagar Haveli and Daman and Diu',
          'Lakshadweep',
          'Delhi',
          'Puducherry',
          'Ladakh',
          'Jammu and Kashmir',
          'Others',
        ].map(async (name) => {
          await this.statesService.skipOrCreate({ name: name });
        }),
      );
      console.log('States seeded successfully');
    }
    console.log('States seeded');
  }

  async DistrictsSeeder() {
    const count = await this.districtService.getDistrictCount();

    if (count === 0) {
      console.log('Seeding districts...');

      const kerala = await this.statesService.findByName('Kerala');
      const districts = [
        'Thiruvananthapuram',
        'Kollam',
        'Pathanamthitta',
        'Alappuzha',
        'Kottayam',
        'Idukki',
        'Ernakulam',
        'Thrissur',
        'Palakkad',
        'Malappuram',
        'Kozhikode',
        'Wayanad',
        'Kannur',
        'Kasaragod',
        'Others',
      ];

      await Promise.all(
        districts.map(async (name) => {
          await this.districtService.skipOrCreate({
            name: name,
            state: kerala,
          });
        }),
      );

      console.log('Districts seeded successfully');
    } else {
      console.log('Districts already seeded');
    }
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
    await this.StatesSeeder();
    await this.SuperAdminSeeder();
    await this.DistrictsSeeder();
  }
}
