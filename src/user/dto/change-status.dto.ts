import { IsIn, IsNotEmpty } from 'class-validator';
import { UserStatusEnum } from '../entities/user.entity';

export class changeUserStatusDto {
  @IsNotEmpty()
  @IsIn(['active', 'offline', 'deactivated', 'suspended', 'pending'])
  status: UserStatusEnum;
}
