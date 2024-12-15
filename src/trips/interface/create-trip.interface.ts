import { Bus } from 'src/bus/entities/bus.entity';
import { Route } from 'src/route/entities/route.entity';
import { User } from 'src/user/entities/user.entity';

export interface CreateTripInterface {
  bus: Bus;
  conductor: User;
  route: Route;
}
