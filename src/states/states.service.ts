import { Injectable } from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { State } from './entities/state.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatesService {
  constructor(
    @InjectRepository(State)
    private readonly stateRepository: Repository<State>,
  ) {}
  create(createStateDto: CreateStateDto) {
    return 'This action adds a new state';
  }

  async skipOrCreate(data: { name: string }) {
    const state = await this.stateRepository.findOne({
      where: {
        name: data.name,
      },
    });

    if (!state) {
      const stateData = new State();
      stateData.name = data.name;
      await this.stateRepository.save(stateData);
    }
  }

  async getTotalCount(): Promise<number> {
    return this.stateRepository.count();
  }

  async findByName(name: string) {
    const state = await this.stateRepository.findOne({
      where: {
        name: name,
      },
    });
    return state;
  }

  findAll() {
    return `This action returns all states`;
  }

  findOne(id: number) {
    return `This action returns a #${id} state`;
  }

  update(id: number, updateStateDto: UpdateStateDto) {
    return `This action updates a #${id} state`;
  }

  remove(id: number) {
    return `This action removes a #${id} state`;
  }
}
