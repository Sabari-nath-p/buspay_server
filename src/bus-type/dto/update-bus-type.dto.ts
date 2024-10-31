import { PartialType } from '@nestjs/mapped-types';
import { CreateBusTypeDto } from './create-bus-type.dto';

export class UpdateBusTypeDto extends PartialType(CreateBusTypeDto) {}
