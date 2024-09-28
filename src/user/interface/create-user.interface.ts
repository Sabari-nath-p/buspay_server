import { Role } from 'src/role/entities/role.entity';

export interface CreateUserInterface {
  role: Role;
  name: string;
  email?: string;
  phone: string;
  password?: string;
  created_by?: number;
}
