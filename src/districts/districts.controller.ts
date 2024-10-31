import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DistrictsService } from './districts.service';

@Controller('districts')
export class DistrictsController {
  constructor(private readonly districtsService: DistrictsService) {}

  @Get()
  List() {
    return this.districtsService.listDistrict();
  }

  @Get(':id')
  findone(@Param('id') id: string) {
    return this.districtsService.findOne(+id);
  }
}
