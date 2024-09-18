import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BusTypeService } from './bus-type.service';
import { CreateBusTypeDto } from './dto/create-bus-type.dto';
import { UpdateBusTypeDto } from './dto/update-bus-type.dto';

@Controller('bus-type')
export class BusTypeController {
  constructor(private readonly busTypeService: BusTypeService) {}

  @Post()
  create(@Body() createBusTypeDto: CreateBusTypeDto) {
    return this.busTypeService.create(createBusTypeDto);
  }

  @Get()
  findAll() {
    return this.busTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusTypeDto: UpdateBusTypeDto) {
    return this.busTypeService.update(+id, updateBusTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busTypeService.remove(+id);
  }
}
