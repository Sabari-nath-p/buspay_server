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
import { StopService } from './stop.service';
import { CreateStopDto } from './dto/create-stop.dto';
import { UpdateStopDto } from './dto/update-stop.dto';
import { ResponseService } from 'src/common/response/response.service';
import { DistrictsService } from 'src/districts/districts.service';
import { BusTypeService } from 'src/bus-type/bus-type.service';

@Controller('stop')
export class StopController {
  constructor(
    private readonly stopService: StopService,
    private responseService: ResponseService,
    private readonly districtService: DistrictsService,
    private readonly BusTypeService: BusTypeService,
  ) {}

  @Post()
  async create(@Body() createStopDto: CreateStopDto) {
    const districtResponse = await this.districtService.findOne(
      createStopDto.district_id,
    );
    const busTypes = await this.BusTypeService.findByIds(
      createStopDto.bus_type_ids,
    );
    const stop = await this.stopService.create({
      ...createStopDto,
      district: districtResponse.data,
      busTypes,
    });
    return this.responseService.successResponse(
      'New Stop Created sucessfully',
      201,
      stop,
    );
  }

  @Get()
  async findAll(@Query() filter) {
    const stopList = await this.stopService.findAll(filter);
    return this.responseService.successResponse(
      'Stop List Successfull',
      200,
      stopList,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stopService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStopDto: UpdateStopDto) {
    return this.stopService.update(+id, updateStopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stopService.remove(+id);
  }
}
