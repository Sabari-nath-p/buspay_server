import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CouponsService } from './coupons.service';
import { CreateCouponDto } from './dto/create-coupon.dto';
import { UpdateCouponDto } from './dto/update-coupon.dto';
import { ResponseService } from 'src/common/response/response.service';

@Controller('coupons')
export class CouponsController {
  constructor(
    private readonly couponsService: CouponsService,
    private readonly resposnseService: ResponseService,
  ) {}

  @Post()
  async create(@Body() createCouponDto: CreateCouponDto) {
    const coupun = await this.couponsService.create(createCouponDto);
    return this.resposnseService.successResponse(
      'New Coupon Created Sucessfully',
      201,
      coupun,
    );
  }

  @Get()
  async findAll(@Query() filter) {
    const couponLIst = await this.couponsService.findAll(filter);
    return this.resposnseService.successResponse(
      'Coupon list',
      200,
      couponLIst,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const coupon = await this.couponsService.findOne(+id);
    return this.resposnseService.successResponse('Coupon details', 200, coupon);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCouponDto: UpdateCouponDto,
  ) {
    const updatedCoupons = await this.couponsService.update(
      +id,
      updateCouponDto,
    );
    return this.resposnseService.successResponse(
      'Coupon details updated',
      200,
      updatedCoupons,
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.couponsService.remove(+id);
  }
}
