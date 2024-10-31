import { Preference } from 'src/preference/entities/preference.entity';

export interface CreateBusInterface {
  name: string;
  bus_no?: string;
  district_id: number;
  owner_id: number;
  no_of_seats: number;
  preferences: Preference[];
}
