import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BusTypeService } from './bus-type.service';
import { CreateBusTypeDto } from './dto/create-bus-type.dto';
import { UpdateBusTypeDto } from './dto/update-bus-type.dto';
import { ResponseService } from 'src/common/response/response.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('bus-type')
export class BusTypeController {
  constructor(
    private readonly busTypeService: BusTypeService,
    private readonly responseService: ResponseService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin')
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
  async findOne(@Param('id') id: string) {
    const bustype = await this.busTypeService.findOne(+id);
    return this.responseService.successResponse('Bus Type Found', 200, bustype);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBusTypeDto: UpdateBusTypeDto,
  ) {
    const updatedData = await this.busTypeService.update(+id, updateBusTypeDto);
    return this.responseService.successResponse(
      'Bus Type Updated Sucessfully',
      204,
      updatedData,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.busTypeService.remove(+id);
    return this.responseService.successResponse('Bus Type removed Sucessfully');
  }
}
