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
import { RouteStopsService } from './route-stops.service';
import { CreateRouteStopDto } from './dto/create-route-stop.dto';
import { UpdateRouteStopDto } from './dto/update-route-stop.dto';
import { ResponseService } from 'src/common/response/response.service';

@Controller('route-stops')
export class RouteStopsController {
  constructor(
    private readonly routeStopsService: RouteStopsService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('assign')
  async create(@Body() createRouteStopDto: CreateRouteStopDto) {
    const { stop_id, route_id } = createRouteStopDto;
    await this.routeStopsService.routeStopExistCheck(route_id, stop_id);
    const routeStop = await this.routeStopsService.create(createRouteStopDto);
    return this.responseService.successResponse(
      'Successfully assigned this stop to the route',
      201,
      routeStop,
    );
  }

  @Get()
  async findAll(@Query() filter) {
    const listData = await this.routeStopsService.findAll(filter);
    return this.responseService.successResponse(
      'Successfully retrieved all route stops',
      200,
      listData,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routeStopsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRouteStopDto: UpdateRouteStopDto,
  ) {
    return this.routeStopsService.update(+id, updateRouteStopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routeStopsService.remove(+id);
  }
}
