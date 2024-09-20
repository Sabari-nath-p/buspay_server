import { Injectable } from '@nestjs/common';
import { CreateStopDto } from './dto/create-stop.dto';
import { UpdateStopDto } from './dto/update-stop.dto';
import { CreateStopInterface } from './interface/create-stop.interface';
import { Repository } from 'typeorm';
import { Stop } from './entities/stop.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StopService {
  constructor(
    @InjectRepository(Stop)
    private readonly stopRepository: Repository<Stop>,
  ) {}
  async create(createStopInterface: CreateStopInterface) {
    // const stop = this.stopRepository.create(createStopInterface);
    // return await this.stopRepository.save(stop);
  }

  async findAll(filter: any) {
    let where;
    const listData = await this.stopRepository.find({
      where,
    });
    return listData;
  }

  findOne(id: number) {
    return `This action returns a #${id} stop`;
  }

  update(id: number, updateStopDto: UpdateStopDto) {
    return `This action updates a #${id} stop`;
  }

  remove(id: number) {
    return `This action removes a #${id} stop`;
  }
}
