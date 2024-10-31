import { BusType } from 'src/bus-type/entities/bus-type.entity';
import { District } from 'src/districts/entities/district.entity';

export interface CreateStopInterface {
  name: string;
  latitude: string;
  longitude: string;
  district: District;
  busTypes: BusType[];
}
