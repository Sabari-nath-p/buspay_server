import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Preference } from './entities/preference.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PreferenceService {
  constructor(
    @InjectRepository(Preference)
    private readonly preferenceRepository: Repository<Preference>,
  ) {}
  async create(createPreferenceDto: CreatePreferenceDto) {
    const newPrefernce = this.preferenceRepository.create(createPreferenceDto);
    return this.preferenceRepository.save(newPrefernce);
  }

  async findAll() {
    return await this.preferenceRepository.find();
  }

  async findOne(id: number) {
    return await this.preferenceRepository.findOne({where:{id}})
  }

  async findOneByParams(params: { [key: string]: any }, relations?: string[]) {}

  async findAllByIds(preferenceIds: number[]): Promise<Preference[]> {
    const preferences =
      await this.preferenceRepository.findByIds(preferenceIds);
    if (preferences.length !== preferenceIds.length) {
      const foundIds = preferences.map((preference) => preference.id);
      const missingIds = preferenceIds.filter((id) => !foundIds.includes(id));
      throw new NotFoundException(
        `Preferences with the following IDs were not found: ${missingIds.join(', ')}`,
      );
    }
    return preferences;
  }
 
  async update(id: number, updatePreferenceDto: UpdatePreferenceDto) {
    const preference = await this.findOne(id)
    if(!preference){
      throw new NotFoundException("preference not found")
    }
  }

  remove(id: number) {
    return `This action removes a #${id} preference`;
  }
}
