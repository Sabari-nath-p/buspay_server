import { Injectable } from '@nestjs/common';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Coupon } from './entities/coupon.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CouponsService {
  constructor(
    @InjectRepository(Coupon)
    private readonly couponRepository: Repository<Coupon>,
  ) {}
  async create(createCouponDto: CreateCouponDto) {
    const coupon = this.couponRepository.create(createCouponDto);
    return await this.couponRepository.save(coupon);
  }

  async findAll(filter: any) {
    let where
    return await this.couponRepository.find();
  }

  async findOne(id: number) {
    return await this.couponRepository.findOne({ where: { id } });
  }

  async update(id: number, updateCouponDto: UpdateCouponDto) {
    return `This action updates a #${id} coupon`;
  }

  async remove(id: number) {
    return `This action removes a #${id} coupon`;
  }
}
