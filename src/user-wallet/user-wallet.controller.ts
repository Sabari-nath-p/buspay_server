import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { UserWalletService } from './user-wallet.service';
import { CreateUserWalletDto } from './dto/create-user-wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user-wallet.dto';
import { ResponseService } from 'src/common/response/response.service';

@Controller('user-wallet')
export class UserWalletController {
  constructor(
    private readonly userWalletService: UserWalletService,
    private readonly responseService: ResponseService,
  ) {}

  @Post()
  async create(@Body() createUserWalletDto: CreateUserWalletDto) {
    const newWallet = await this.userWalletService.create(createUserWalletDto);
    return this.responseService.successResponse(
      'New wallet created for the user',
      HttpStatus.CREATED,
      newWallet,
    );
  }

  @Get()
  async findAll(@Query() filter: any) {
    const where = filter || {};
    const wallets = await this.userWalletService.findAll(where);
    return this.responseService.successResponse(
      'Fetched all user wallets',
      HttpStatus.OK,
      wallets,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const wallet = await this.userWalletService.findOne(+id);
    return this.responseService.successResponse(
      `Fetched wallet with ID ${id}`,
      HttpStatus.OK,
      wallet,
    );
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserWalletDto: UpdateUserWalletDto,
  ) {
    const updatedWallet = await this.userWalletService.update(
      +id,
      updateUserWalletDto,
    );
    return this.responseService.successResponse(
      `Updated wallet with ID ${id}`,
      HttpStatus.OK,
      updatedWallet,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const result = await this.userWalletService.remove(+id);
    return this.responseService.successResponse(
      `Deleted wallet with ID ${id}`,
      HttpStatus.OK,
      result,
    );
  }
}
