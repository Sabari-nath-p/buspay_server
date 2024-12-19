import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ConflictException,
  Query,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { UserService } from 'src/user/user.service';
import { ResponseService } from 'src/common/response/response.service';
import { PreferenceService } from 'src/preference/preference.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';

@Controller('bus')
export class BusController {
  constructor(
    private readonly busService: BusService,
    private readonly userService: UserService,
    private readonly responseService: ResponseService,
    private readonly preferenceService: PreferenceService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('bus_owner')
  @Post()
  async create(@Body() createBusDto: CreateBusDto, @Request() req) {
    const owner_id = req.user.sub;
    const busPrefence = await this.preferenceService.findAllByIds(
      createBusDto.prefernce_ids,
    );
    const bus = await this.busService.create({
      ...createBusDto,
      owner_id,
      preferences: busPrefence,
    });
    return this.responseService.successResponse(
      'Bus Data Created Successfully',
      201,
      bus,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('bus_owner')
  @Post(':busId/assign-conductor/:userId')
  async assignConductor(
    @Param('busId') busId: number,
    @Param('userId') userId: number,
    @Request() req,
  ) {
    const ownerId = req.user.sub;
    const bus = await this.busService.findOne(busId);
    if (bus.owner_id !== ownerId) {
      throw new ForbiddenException(
        'You do not have permission to assign a conductor to this bus',
      );
    }
    const conductor = await this.userService.validateUserRole(
      userId,
      'conductor',
    );
    bus.conductors = [conductor];
    await this.busService.save(bus);
    return this.responseService.successResponse(
      'Conductor assigned to the bus successfully',
      201,
    );
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Query() filter) {
    const listData = await this.busService.findAll(filter);
    return this.responseService.successResponse(
      'Bus Data Retrieved Successfully',
      200,
      listData,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const bus = await this.busService.findOne(+id);
    if (!bus) {
      throw new NotFoundException('Bus not found');
    }
    return this.responseService.successResponse(
      'Bus Data Retrieved Successfully',
      200,
      bus,
    );
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusDto: UpdateBusDto) {
    return this.busService.update(+id, updateBusDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.busService.remove(+id);
    return this.responseService.successResponse('Bus Data Deleted Sucessfully');
  }
}
