import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from './entities/route.entity';
import { Repository } from 'typeorm';
import { CreateRouteInterface } from './interface/create-route.interface';

@Injectable()
export class RouteService {
  constructor(
    @InjectRepository(Route)
    private readonly routeRepository: Repository<Route>,
  ) {}

  async create(CreateRouteInterface: CreateRouteInterface) {
    const newRoute = this.routeRepository.create(CreateRouteInterface);
    return this.routeRepository.save(newRoute);
  }

  async findAll(filter: any) {
    let where: any = {};
    return await this.routeRepository.find({ where });
  }

  async findOne(id: number) {
    const route = await this.routeRepository.findOne({
      where: { id },
      relations: ['routeStop', 'district', 'routeBus', 'trips'],
    });
    if (!route) {
      throw new NotFoundException(`Route not found`);
    }
    return route;
  }

  update(id: number, updateRouteDto: UpdateRouteDto) {
    return `This action updates a #${id} route`;
  }

  remove(id: number) {
    return `This action removes a #${id} route`;
  }
}
