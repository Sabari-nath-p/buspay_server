import { UserType } from '../entities/user.entity';

export interface CreateUserInterface {
  user_type: UserType;
  name: string;
  email?: string;
  phone: string;
  password?: string;
}
