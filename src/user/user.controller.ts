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

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rolesService: RoleService,
    private readonly responseService: ResponseService,
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
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
