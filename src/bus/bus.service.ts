import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { CreateBusInterface } from './interface/create-bus.interface';
import { Bus } from './entities/bus.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BusService {
  constructor(
    @InjectRepository(Bus)
    private readonly busRepository: Repository<Bus>,
  ) {}

  async create(createBusInterface: CreateBusInterface) {
    const bus = this.busRepository.create(createBusInterface);
    return await this.busRepository.save(bus);
  }

  async findAll(filter: any) {
    let where;
    if (filter.owner_id) {
      where = { owner_id: filter.owner_id };
    }
    return await this.busRepository.find({ where });
  }

  async findOne(id: number) {
    const bus = await this.busRepository.findOne({
      where: { id },
      relations: ['conductors', 'routeBus', 'owner'],
    });
    if (!bus) {
      throw new NotFoundException('Bus Not Found');
    }
    return bus;
  }

  update(id: number, updateBusDto: UpdateBusDto) {
    return `This action updates a #${id} bus`;
  }

  async updateBus(busId: number, updateBusDto: UpdateBusDto): Promise<Bus> {
    const bus = await this.findOne(busId);

    if (updateBusDto.conductors) {
      bus.conductors = updateBusDto.conductors;
    }

    return this.busRepository.save(bus);
  }

  remove(id: number) {
    return `This action removes a #${id} bus`;
  }

  save(bus: Bus) {
    return this.busRepository.save(bus);
  }
}
