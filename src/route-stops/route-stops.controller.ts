import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RouteStopsService } from './route-stops.service';
import { CreateRouteStopDto } from './dto/create-route-stop.dto';
import { UpdateRouteStopDto } from './dto/update-route-stop.dto';

@Controller('route-stops')
export class RouteStopsController {
  constructor(private readonly routeStopsService: RouteStopsService) {}

  @Post()
  create(@Body() createRouteStopDto: CreateRouteStopDto) {
    return this.routeStopsService.create(createRouteStopDto);
  }

  @Get()
  findAll() {
    return this.routeStopsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routeStopsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteStopDto: UpdateRouteStopDto) {
    return this.routeStopsService.update(+id, updateRouteStopDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routeStopsService.remove(+id);
  }
}
