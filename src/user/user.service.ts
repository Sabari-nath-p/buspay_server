import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserInterface } from './interface/create-user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserStatusEnum } from './entities/user.entity';
import { Not, Repository } from 'typeorm';
import { OtpService } from 'src/otp/otp.service';
import { Role } from 'src/role/entities/role.entity';
import { IsLongitude } from 'class-validator';
import { changeUserStatusDto } from './dto/change-status.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly otpService: OtpService,
  ) {}
  async create(CreateUserInterface: CreateUserInterface) {
    const userData = this.userRepository.create(CreateUserInterface);
    return await this.userRepository.save(userData);
  }

  async findAll(filter: any) {
    let where: any = {};
    if (filter.status) {
      where.status = filter.status;
    }
    if (filter.role) {
      where.role = { name: filter.role };
    } else {
      where.role = { name: Not('super_admin') };
    }
    return await this.userRepository.find({
      where,
    });
  }

  async validateUserRole(id: number, role: string) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (user.role.name !== role) {
      throw new NotFoundException(`User is not of role ${role}`);
    }
    return user;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'buses'],
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

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }

  async changeStatus(id: number, changeUserStatus: changeUserStatusDto) {
    const user = await this.findOne(id);
    user.status = changeUserStatus.status;
    return await this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<User | null> {
    if (!email) {
      return null;
    }
    return await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }

  async findUserByPhone(phone: string): Promise<User | null> {
    if (!phone) {
      throw new BadRequestException(`Please provide field 'phone'`);
    }
    const user = await this.userRepository.findOne({ where: { phone } });
    return user || null;
  }

  async findUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['role', 'trips'],
    });
  }

  async saveUser(user: any) {
    return await this.userRepository.save(user);
  }

  async createUser(data: {
    name: string;
    phone: string;
    email: string;
    lattitude: string;
    longitude: string;
    role: Role;
    password: string;
  }): Promise<User> {
    //    const otpSecret = this.otpService.generateSecret();
    const newUser: User = this.userRepository.create({
      name: data.name,
      phone: data.phone,
      email: data.email,
      role: data.role,
      status: UserStatusEnum.PENDING,
      password: data.password,
    });
    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }

  async updateUserOtpSecret(user: User, otpSecret: string): Promise<void> {
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    user.otp_secret = otpSecret;
    await this.userRepository.save(user);
  }
}
