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
import { RouteService } from './route.service';
import { CreateRouteDto } from './dto/create-route.dto';
import { UpdateRouteDto } from './dto/update-route.dto';
import { ResponseService } from 'src/common/response/response.service';
import { DistrictsService } from 'src/districts/districts.service';
import { retry } from 'rxjs';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('route')
export class RouteController {
  constructor(
    private readonly routeService: RouteService,
    private readonly responseService: ResponseService,
    private readonly districtService: DistrictsService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin')
  @Post()
  async create(@Body() createRouteDto: CreateRouteDto) {
    const districtResponse = await this.districtService.findOne(
      createRouteDto.district_id,
    );
    const route = await this.routeService.create({
      ...createRouteDto,
      district: districtResponse.data,
    });
    return this.responseService.successResponse(
      'Route Created Sucessfully',
      201,
      route,
    );
  }

  @Get()
  async findAll(@Query() filter) {
    const listRoute = await this.routeService.findAll(filter);
    return this.responseService.successResponse(
      'Route Listing Sucess',
      200,
      listRoute,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.routeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRouteDto: UpdateRouteDto) {
    return this.routeService.update(+id, updateRouteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.routeService.remove(+id);
  }
}
