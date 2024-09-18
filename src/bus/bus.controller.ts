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
} from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { UserService } from 'src/user/user.service';
import { ResponseService } from 'src/common/response/response.service';

@Controller('bus')
export class BusController {
  constructor(
    private readonly busService: BusService,
    private readonly userService: UserService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  async create(@Body() createBusDto: CreateBusDto) {
    const ownerExist = await this.userService.findUserById(
      createBusDto.owner_id,
    );
    if (!ownerExist) {
      throw new NotFoundException('Bus Owner not found');
    }
    if (ownerExist.role.name !== 'bus_owner') {
      throw new ConflictException('User is not a bus owner');
    }
    const bus = await this.busService.create(createBusDto);
    return this.responseService.successResponse(
      'Bus Data Created Successfully',
      201,
      bus,
    );
  }

  @Get()
  async findAll(@Query() filter) {
    const listData = await this.busService.findAll(filter);
    return this.responseService.successResponse(
      'Bus Data Retrieved Successfully',
      200,
      listData,
    );
  }

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

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusDto: UpdateBusDto) {
    return this.busService.update(+id, updateBusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busService.remove(+id);
  }
}
