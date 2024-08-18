import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Req,
  UseGuards,
  Headers,
  Param,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { VerifyOtpDto } from './dto/verify-otp.dto';
// import { AuthGuard } from '../common/guard/auth.guard';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
  ) {}

  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Req() request: Request) {
    let authenticationResult;
    const appType = request.headers['app-type'];
    signInDto.appType = appType;
    if (!appType) {
      throw new BadRequestException('no app-type header found');
    } else if (appType !== 'super_admin' && appType !== 'user') {
      throw new BadRequestException('Invalid app-type');
    }
    if (appType == 'super_admin') {
      const { email, password } = signInDto;
      authenticationResult = this.authService.signIn(email, password);
    } else if (appType == 'user') {
      const { name, phone } = signInDto;
      authenticationResult = this.authService.generateOtpForUser(name, phone);
    }
    return authenticationResult;
  }

  @Post('verify-otp')
  async verifyOtpForLogin(
    @Body(new ValidationPipe()) verifyOtpDto: VerifyOtpDto,
  ) {
    const user = await this.usersService.findUserById(verifyOtpDto.userId);
    const isOtpValid = await this.authService.verifyOtpForLogin(
      verifyOtpDto.userId,
      verifyOtpDto.otp,
    );

    if (isOtpValid) {
      const tokens = await this.authService.GenerateTokens(
        verifyOtpDto.userId,
        user.name,
        'user',
      );
      return {
        message: 'OTP verification successful',
        tokens,
        user,
      };
    } else {
      return { message: 'Invalid OTP' };
    }
  }

  @Post('resend-otp/:id')
  async resendOtp(@Param('id') userId: number) {
    return await this.authService.resendOtp(userId);
  }

  // @UseGuards(AuthGuard)
  // @Get('me')
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}
