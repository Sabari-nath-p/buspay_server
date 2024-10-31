import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBusTypeDto } from './dto/create-bus-type.dto';
import { UpdateBusTypeDto } from './dto/update-bus-type.dto';
import { CreateBusTypeInterface } from './interface/create-bus-type.interface';
import { In, Repository } from 'typeorm';
import { BusType } from './entities/bus-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BusTypeService {
  constructor(
    @InjectRepository(BusType)
    private readonly busTypeRepository: Repository<BusType>,
  ) {}
  async create(createBusTypeInterface: CreateBusTypeInterface) {
    const newBusType = await this.busTypeRepository.create(
      createBusTypeInterface,
    );
    return this.busTypeRepository.save(newBusType);
  }

  findAll(filter: any) {
    let where: any = {};
    return this.busTypeRepository.find({ where: where });
  }

  async findByIds(ids: number[]): Promise<BusType[]> {
    const busTypes = await this.busTypeRepository.find({
      where: {
        id: In(ids),
      },
    });
    if (busTypes.length === 0) {
      throw new NotFoundException(`Bus types with the provided IDs not found`);
    }
    if (busTypes.length !== ids.length) {
      throw new ConflictException('Failed to find Some Bus Types');
    }
    return busTypes;
  }

  findOne(id: number) {
    return `This action returns a #${id} busType`;
  }

  update(id: number, updateBusTypeDto: UpdateBusTypeDto) {
    return `This action updates a #${id} busType`;
  }

  remove(id: number) {
    return `This action removes a #${id} busType`;
  }
}
