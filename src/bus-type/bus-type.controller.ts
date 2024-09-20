import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BusTypeService } from './bus-type.service';
import { CreateBusTypeDto } from './dto/create-bus-type.dto';
import { UpdateBusTypeDto } from './dto/update-bus-type.dto';
import { ResponseService } from 'src/common/response/response.service';

@Controller('bus-type')
export class BusTypeController {
  constructor(
    private readonly busTypeService: BusTypeService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  async create(@Body() createBusTypeDto: CreateBusTypeDto) {
    const busType = await this.busTypeService.create(createBusTypeDto);
    return this.responseService.successResponse(
      'Bus Type Created Sucessfully',
      201,
      busType,
    );
  }

  @Get()
  async findAll(@Query() filter) {
    const listData = await this.busTypeService.findAll(filter);
    return this.responseService.successResponse(
      'Bus Type List Sucessfull',
      200,
      listData,
    );
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
