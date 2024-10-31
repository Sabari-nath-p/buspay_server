import { PartialType } from '@nestjs/mapped-types';
import { CreateRouteBusDto } from './create-route-bus.dto';

export class UpdateRouteBusDto extends PartialType(CreateRouteBusDto) {}
