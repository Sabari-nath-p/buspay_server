import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private rolesRepo: Repository<Role>,
  ) {}

  async findRoleByName(name: string) {
    const role = await this.rolesRepo.findOne({
      where: {
        name: name,
      },
    });
    return role;
  }

  async skipOrCreate(data: { name: string }): Promise<void> {
    const role = await this.rolesRepo.findOne({
      where: {
        name: data.name,
      },
    });

    if (!role) {
      const roleData = new Role();
      roleData.name = data.name;
      await this.rolesRepo.save(roleData);
    }
  }
  async getRolesCount(): Promise<number> {
    return this.rolesRepo.count();
  }
}
