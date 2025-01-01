import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserWalletDto } from './dto/create-user-wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user-wallet.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserWallet } from './entities/user-wallet.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserWalletService {
  constructor(
    @InjectRepository(UserWallet)
    private readonly userWalletRepository: Repository<UserWallet>,
  ) {}

  async create(createUserWalletDto: CreateUserWalletDto) {
    const wallet = this.userWalletRepository.create(createUserWalletDto);
    return await this.userWalletRepository.save(wallet);
  }

  async findAll(params: any, relations?: string[]) {
    return await this.userWalletRepository.find({
      where: params,
      relations: relations,
    });
  }

  async findOne(id: number) {
    const wallet = await this.userWalletRepository.findOne({ where: { id } });
    if (!wallet) {
      throw new NotFoundException(`UserWallet with ID ${id} not found.`);
    }
    return wallet;
  }

  async update(id: number, updateUserWalletDto: UpdateUserWalletDto) {
    const wallet = await this.findOne(id);
    const updatedWallet = this.userWalletRepository.merge(
      wallet,
      updateUserWalletDto,
    );
    return await this.userWalletRepository.save(updatedWallet);
  }

  async remove(id: number) {
    const wallet = await this.findOne(id);
    return await this.userWalletRepository.remove(wallet);
  }
}
