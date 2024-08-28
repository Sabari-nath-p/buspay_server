import { Injectable } from '@nestjs/common';
import { CreateRouteStopDto } from './dto/create-route-stop.dto';
import { UpdateRouteStopDto } from './dto/update-route-stop.dto';

@Injectable()
export class RouteStopsService {
  create(createRouteStopDto: CreateRouteStopDto) {
    return 'This action adds a new routeStop';
  }

  findAll() {
    return `This action returns all routeStops`;
  }

  findOne(id: number) {
    return `This action returns a #${id} routeStop`;
  }

  update(id: number, updateRouteStopDto: UpdateRouteStopDto) {
    return `This action updates a #${id} routeStop`;
  }

  remove(id: number) {
    return `This action removes a #${id} routeStop`;
  }
}
