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

@Controller('stop')
export class StopController {
  constructor(
    private readonly stopService: StopService,
    private responseService: ResponseService,
  ) {}

  @Post()
  async create(@Body() createStopDto: CreateStopDto) {
    const stop = await this.stopService.create(createStopDto);
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
