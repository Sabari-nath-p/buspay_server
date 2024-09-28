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
import { In } from 'typeorm';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService,
    private roleService: RoleService,
    private responseService: ResponseService,
  ) {}

  @Post('sign-up')
  async signup(@Body() signUpDto: SignUpDto) {
    const userWithPhoneExist = await this.usersService.findUserByPhone(
      signUpDto.phone,
    );
    if (userWithPhoneExist) {
      throw new BadRequestException('User with phone already exists');
    }
    const userWithEmailExist = await this.usersService.findUserByEmail(
      signUpDto.phone,
    );
    if (userWithEmailExist) {
      throw new BadRequestException('User with email already exists');
    }
    const role = await this.roleService.findRoleByName(signUpDto.role);
    let data = {
      name: signUpDto.name,
      phone: signUpDto.phone,
      email: signUpDto.email,
      lattitude: signUpDto.lattitude,
      longitude: signUpDto.longitude,
      role: role,
      status: 'active',
      password: null,
    };
    if (signUpDto.role == 'bus_owner' || signUpDto.role == 'conductor') {
      if (signUpDto.password !== signUpDto.confirm_password) {
        throw new BadRequestException(
          'Password and confirm password do not match',
        );
      }
      data = {
        ...data,
        password: signUpDto.password,
      };
      if (signUpDto.role == 'bus_owner') {
        data.status = 'pending';
        const user = await this.usersService.createUser(data);
        return {
          status: true,
          message:
            'user created successfully, wait for the superadmin to approve',
          data: user,
        };
      }
    }
    const user = await this.usersService.createUser(data);
    const otp = await this.authService.generateOtpForUser(signUpDto.phone);
    return otp;
  }

  @Post('login')
  async signIn(@Body() signInDto: SignInDto, @Req() request: Request) {
    let authenticationResult;
    const appType = request.headers['app-type'];
    if (!appType) {
      throw new BadRequestException('No app-type header found');
    }
    const validAppTypes = ['super_admin', 'user', 'bus_owner', 'conductor'];
    if (!validAppTypes.includes(appType)) {
      throw new BadRequestException('Invalid app-type');
    }
    signInDto.appType = appType;
    if (['super_admin', 'bus_owner', 'conductor'].includes(appType)) {
      const { email, password } = signInDto;
      if (!email || !password) {
        throw new BadRequestException(
          'Email and password are required for this app type',
        );
      }
      authenticationResult = await this.authService.signIn(email, password);
    } else if (appType === 'user') {
      const { phone } = signInDto;
      if (!phone) {
        throw new BadRequestException(
          'Phone number is required for user app type',
        );
      }
      authenticationResult = await this.authService.generateOtpForUser(phone);
    }

    return authenticationResult;
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
