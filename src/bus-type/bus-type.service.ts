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

  async findOne(id: number) {
    const busType = await this.busTypeRepository.findOne({ where: { id } });
    if (!busType) {
      throw new NotFoundException('Bus Type Not Found');
    }
    return busType;
  }

  async update(
    id: number,
    updateBusTypeDto: UpdateBusTypeDto,
  ): Promise<BusType> {
    const busType = await this.busTypeRepository.findOne({ where: { id } });
    if (!busType) {
      throw new NotFoundException(`BusType with ID ${id} not found`);
    }
    Object.assign(busType, updateBusTypeDto);
    return await this.busTypeRepository.save(busType);
  }

  async remove(id: number) {
    const busType = await this.findOne(id);
    await this.busTypeRepository.delete(id);
  }
}
