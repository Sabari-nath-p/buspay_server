import { Injectable } from '@nestjs/common';
import { CreateBusTypeDto } from './dto/create-bus-type.dto';
import { UpdateBusTypeDto } from './dto/update-bus-type.dto';

@Injectable()
export class BusTypeService {
  create(createBusTypeDto: CreateBusTypeDto) {
    return 'This action adds a new busType';
  }

  findAll() {
    return `This action returns all busType`;
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
