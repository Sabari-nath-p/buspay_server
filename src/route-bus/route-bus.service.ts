import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRouteBusDto } from './dto/create-route-bus.dto';
import { UpdateRouteBusDto } from './dto/update-route-bus.dto';
import { CreateRouteBusInterface } from './interface/create-route-bus.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { RouteBus } from './entities/route-bus.entity';
import { Repository } from 'typeorm';
import { allowedNodeEnvironmentFlags } from 'process';
import { throwError } from 'rxjs';

@Injectable()
export class RouteBusService {
  constructor(
    @InjectRepository(RouteBus)
    private readonly routeBusRepository: Repository<RouteBus>,
  ) {}

  async create(createRouteBusInterface: CreateRouteBusInterface) {
    const routeBus = this.routeBusRepository.create(createRouteBusInterface);
    return await this.routeBusRepository.save(routeBus);
  }

  async findAll(filter: any) {
    let where: any = {};
    if (filter) {
      where = filter;
    }
    return await this.routeBusRepository.find({
      where,
      relations: ['bus', 'route'],
    });
  }

  async findOne(id: number) {
    return await this.routeBusRepository.findOne({ where: { id } });
  }

  update(id: number, updateRouteBusDto: UpdateRouteBusDto) {
    return `This action updates a #${id} routeBus`;
  }

  async remove(id: number) {
    const routeBus = await this.findOne(id);
    if (!routeBus) {
      throw new NotFoundException('This Bus is not found on this route');
    }
    return await this.routeBusRepository.remove(routeBus);
  }

  async checkBusExistInRoute(bus_id: number, route_id: number) {
    const busExist = await this.routeBusRepository.findOne({
      where: { bus_id, route_id },
    });
    return busExist ? true : false;
  }

  async findOneByParam(params: { [key: string]: any }, relations?: string[]) {
    return this.routeBusRepository.findOne({
      where: params,
      relations,
    });
  }
}
