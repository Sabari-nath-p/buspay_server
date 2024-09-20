import { Injectable, NotFoundException } from '@nestjs/common';
import { District } from './entities/district.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseService } from '../common/response/response.service';

@Injectable()
export class DistrictsService {
  constructor(
    @InjectRepository(District)
    private districtRepo: Repository<District>,
    private responseService: ResponseService,
  ) {}

  async findDistrictByName(name: string) {
    const district = await this.districtRepo.findOne({
      where: {
        name: name,
      },
    });
    return district;
  }

  async SaveDistrictData(district: District) {
    await this.districtRepo.save(district);
  }

  async skipOrCreate(data: { name: string }) {
    const district = await this.districtRepo.findOne({
      where: {
        name: data.name,
      },
    });

    if (!district) {
      const districtData = new District();
      districtData.name = data.name;
      await this.districtRepo.save(districtData);
    }
  }
  async listDistrict() {
    const list = await this.districtRepo.find();
    return this.responseService.successResponse(
      'District List Successfull',
      200,
      list,
    );
  }

  async findOne(id: number) {
    const district = await this.districtRepo.findOne({ where: { id } });
    if (!district) {
      throw new NotFoundException('District not found');
    }
    return this.responseService.successResponse(
      'Get District Successfull',
      200,
      district,
    );
  }

  async findOnebyId(id: number) {
    return await this.districtRepo.findOne({ where: { id } });
  }

  async getDistrictCount(): Promise<number> {
    return this.districtRepo.count();
  }
}
