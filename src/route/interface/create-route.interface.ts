import { District } from 'src/districts/entities/district.entity';

export interface CreateRouteInterface {
  name: string;
  district: District;
}
