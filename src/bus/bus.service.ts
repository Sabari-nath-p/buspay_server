import { Injectable } from '@nestjs/common';
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
    return await this.busRepository.find({ where });
  }

  async findOne(id: number) {
    return await this.busRepository.findOne({ where: { id } });
  }

  update(id: number, updateBusDto: UpdateBusDto) {
    return `This action updates a #${id} bus`;
  }

  remove(id: number) {
    return `This action removes a #${id} bus`;
  }
}
