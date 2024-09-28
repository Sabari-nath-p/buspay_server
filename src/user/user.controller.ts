import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
  ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RoleService } from 'src/role/role.service';
import { changeUserStatusDto } from './dto/change-status.dto';
import { ResponseService } from 'src/common/response/response.service';
import { addConductorDto } from './dto/add-conductor.dto';
import { BusService } from 'src/bus/bus.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rolesService: RoleService,
    private readonly responseService: ResponseService,
    private readonly busService: BusService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const role = await this.rolesService.findRoleByName(createUserDto.role);
    delete createUserDto.role;
    let status: string;
    if (role.name == 'bus__owner') {
      status = 'pending';
    }
    return this.userService.create({ ...createUserDto, role });
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin')
  @Post(':id/change-status')
  async changeUserStatus(
    @Param('id') id: string,
    @Body() changeUserStatus: changeUserStatusDto,
  ) {
    const user = await this.userService.changeStatus(+id, changeUserStatus);
    return this.responseService.successResponse(
      `user status change to ${(await user).status} successfully`,
      200,
      user,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('bus_owner')
  @Post('add-new-conductor')
  async addConductor(
    @Param('id') id: string,
    @Body() addConductorDto: addConductorDto,
    @Request() req,
  ) {
    const created_by = req.user.sub;
    const bus = await this.busService.findOne(addConductorDto.bus_id);
    const conductorRole = await this.rolesService.findRoleByName('conductor');
    const newConductor = await this.userService.create({
      ...addConductorDto,
      role: conductorRole,
      created_by,
    });
    bus.conductors = [...(bus.conductors || []), newConductor];
    await this.busService.updateBus(bus.id, bus);
    return this.responseService.successResponse(
      'Conductor assigned to the bus successfully',
      201,
    );
  }

  @Get()
  async findAll(@Query() filter) {
    const listData = await this.userService.findAll(filter);
    return this.responseService.successResponse(
      'User List Successfull',
      200,
      listData,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);
    return this.responseService.successResponse(
      'User fetch sucessfull',
      200,
      user,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('bus_owner')
  @Delete('conductor/:id')
  async removeConductor(@Param('id') id: string, @Request() req) {
    const conductor = await this.userService.findOne(+id);
    if (conductor.role.name !== 'conductor') {
      throw new ConflictException('User is not a conductor');
    }
    if (conductor.created_by !== req.user.sub) {
      throw new ConflictException('You are not the owner of the conductor');
    }
    await this.userService.remove(+id);
    return this.responseService.successResponse(
      'Conductor removed successfully',
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
