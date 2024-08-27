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
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signIn.dto';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { SignUpDto } from './dto/signup.dto';
import { RoleService } from 'src/role/role.service';
import { ResponseService } from 'src/common/response/response.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
    private roleService: RoleService,
    private responseService: ResponseService,
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
      const { phone } = signInDto;
      authenticationResult = this.authService.generateOtpForUser(phone);
    }
    return authenticationResult;
  }

  @Post('sign-up')
  async signup(@Body() signUpDto: SignUpDto) {
    const userExist = await this.usersService.findUserByPhone(signUpDto.phone);
    if (userExist) {
      throw new BadRequestException('User already exists');
    }
    const role = await this.roleService.findRoleByName(signUpDto.role);
    let data = {
      name: signUpDto.name,
      phone: signUpDto.phone,
      email: signUpDto.email,
      lattitude: signUpDto.lattitude,
      longitude: signUpDto.longitude,
      role: role,
    };
    const user = await this.usersService.createUser(data);
    const otp = await this.authService.generateOtpForUser(signUpDto.phone);
    return otp;
  }

  @Post('verify-otp')
  async verifyOtpForLogin(
    @Body(new ValidationPipe()) verifyOtpDto: VerifyOtpDto,
  ) {
    const user = await this.usersService.findUserById(verifyOtpDto.user_id);
    const isOtpValid = await this.authService.verifyOtpForLogin(
      verifyOtpDto.user_id,
      verifyOtpDto.otp,
    );

    if (isOtpValid) {
      const tokens = await this.authService.GenerateTokens(
        verifyOtpDto.user_id,
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

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }
}
