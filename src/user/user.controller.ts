import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RoleService } from 'src/role/role.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rolesService: RoleService,
  ) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles('super_admin')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const role = await this.rolesService.findRoleByName(createUserDto.role);
    delete createUserDto.role;
    return this.userService.create({ ...createUserDto, role });
  }

  @Get()
  findAll() {
    return this.userService.findAll();
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
