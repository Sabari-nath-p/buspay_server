import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRouteStopDto } from './dto/create-route-stop.dto';
import { UpdateRouteStopDto } from './dto/update-route-stop.dto';
import { Repository } from 'typeorm';
import { RouteStop } from './entities/route-stop.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRouteStopInterface } from './interface/create-route-stops.interface';

@Injectable()
export class RouteStopsService {
  constructor(
    @InjectRepository(RouteStop)
    private readonly routeStopsRepository: Repository<RouteStop>,
  ) {}

  async create(createRouteStopInterface: CreateRouteStopInterface) {
    const newRouteStop = this.routeStopsRepository.create(
      createRouteStopInterface,
    );
    return await this.routeStopsRepository.save(newRouteStop);
  }

  async findAll(filter: any) {
    let where: any = {};
    if (filter.route_id) {
      where = { route_id: filter.route_id };
    }
    if (filter.stop_id) {
      where = { stop_id: filter.stop_id };
    }
    return await this.routeStopsRepository.find({ where });
  }

  findOne(id: number) {
    return `This action returns a #${id} routeStop`;
  }

  async routeStopExistCheck(route_id: number, stop_id: number) {
    const routeStop = await this.routeStopsRepository.findOne({
      where: {
        route_id: route_id,
        stop_id: stop_id,
      },
    });
    if (routeStop) {
      throw new ConflictException(
        'This Stop is already assigned to this route',
      );
    } else {
      return null;
    }
  }

  update(id: number, updateRouteStopDto: UpdateRouteStopDto) {
    return `This action updates a #${id} routeStop`;
  }

  remove(id: number) {
    return `This action removes a #${id} routeStop`;
  }
}
