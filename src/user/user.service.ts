import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserInterface } from './interface/create-user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly otpService: OtpService,
  ) {}
  async create(createUserDto: CreateUserInterface) {
    const userData = this.userRepository.create(createUserDto);
    return await this.userRepository.save(userData);
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    // delete user.password;
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    if (!email) {
      return null;
    }
    return await this.userRepository.findOne({ where: { email } });
  }

  async findUserByPhone(phone: string): Promise<User | null> {
    if (!phone) {
      throw new BadRequestException(`Please provide field 'phone'`);
    }
    const user = await this.userRepository.findOne({ where: { phone } });
    return user || null;
  }

  async findUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async createUser(data: { name: string; phone: string }): Promise<User> {
    const otpSecret = this.otpService.generateSecret();
    const newUser: User = this.userRepository.create({
      name: data.name,
      phone: data.phone,
      otp_secret: otpSecret,
    });
    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }

  async updateUserOtpSecret(user: any, otpSecret: string): Promise<void> {
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    user.otpSecret = otpSecret;
    await this.userRepository.save(user);
  }
}
