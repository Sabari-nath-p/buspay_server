import { IsArray, IsOptional } from 'class-validator';
import { User } from 'src/user/entities/user.entity';

export class UpdateBusDto {
  @IsOptional()
  @IsArray()
  conductors?: User[];
}
