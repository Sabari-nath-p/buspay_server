import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  Query,
} from '@nestjs/common';
import { RouteBusService } from './route-bus.service';
import { CreateRouteBusDto } from './dto/create-route-bus.dto';
import { UpdateRouteBusDto } from './dto/update-route-bus.dto';
import { ResponseService } from 'src/common/response/response.service';

@Controller('route-bus')
export class RouteBusController {
  constructor(
    private readonly routeBusService: RouteBusService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  async create(@Body() createRouteBusDto: CreateRouteBusDto) {
    const CheckConditon = await this.routeBusService.checkBusExistInRoute(
      createRouteBusDto.bus_id,
      createRouteBusDto.route_id,
    );
    if (CheckConditon == true) {
      throw new ConflictException('Bus Already Exist In this Route');
    }
    const newRouteStop = await this.routeBusService.create(createRouteBusDto);
    return this.responseService.successResponse(
      'Sucessfully Added this Bus to this Route',
      201,
      newRouteStop,
    );
  }

  @Get()
  async findAll(@Query() filter) {
    const RouteBuses = await this.routeBusService.findAll(filter);
    return this.responseService.successResponse(
      'Sucessfully Get All Route Bus',
      200,
      RouteBuses,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routeBusService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRouteBusDto: UpdateRouteBusDto,
  ) {
    return this.routeBusService.update(+id, updateRouteBusDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.routeBusService.remove(+id);
    return this.responseService.successResponse(
      'This Bus has been removed for this route',
    );
  }
}
