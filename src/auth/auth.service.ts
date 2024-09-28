import {
  Injectable,
  Inject,
  UnauthorizedException,
  forwardRef,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from '../otp/otp.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { ResponseService } from 'src/common/response/response.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private usersService: UserService,
    private jwtService: JwtService,
    private readonly otpService: OtpService,
  ) {}

  async signIn(email: string, pass: string) {
    if (!email) {
      throw new BadRequestException(`Provide field 'email'`);
    }
    if (!pass) {
      throw new BadRequestException(`Missing field 'password'`);
    }
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException(`User with email ${email} not found`);
    }
    if (user.status !== 'active') {
      throw new ConflictException(
        'You are inactive or wait until super admin aprroves you',
      );
    }
    const passCheck = await bcrypt.compare(pass, user.password);
    if (!passCheck) {
      throw new UnauthorizedException('Incorrect password');
    }
    return {
      message: 'Login successful',
      tokens: await this.GenerateTokens(user.id, user.name, user.role.name),
      user: user,
    };
  }

  async generateOtpForUser(
    phone: string,
  ): Promise<{ message: string; data: any; success: boolean }> {
    let user = await this.usersService.findUserByPhone(phone);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    if (user.status !== 'active') {
      throw new ConflictException('User is inactive');
    }
    const otpSecret = this.otpService.generateSecret();
    const otp = this.otpService.generateOtp(otpSecret);
    //console.log(otpSecret);
    await this.usersService.updateUserOtpSecret(user, otpSecret);
    return {
      message: `OTP sent successfully to your mobile #${user.phone} #${otp} #${user.id}`, // Remove otp on production
      data: user,
      success: true,
    };
  }

  async verifyOtpForLogin(userId: number, otp: string): Promise<boolean> {
    const user = await this.usersService.findUserById(userId);
    const isValidOtp = await this.otpService.validateOtp(otp, user.otp_secret);
    if (!user.otp_secret) {
      throw new ConflictException('generate OTP for this user first');
    }
    if (isValidOtp) {
      const tokens = await this.GenerateTokens(
        user.id,
        user.name,
        user.role.name,
      );
      user.otp_timestamp = new Date();
      user.otp_secret = null;
      const savedUser = await this.usersService.saveUser(user);
      return true;
    } else {
      return false;
    }
  }

  async resendOtp(
    userId: number,
  ): Promise<{ message: string; data: any; success: boolean }> {
    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (!user.otp_secret) {
      throw new ConflictException('generate OTP for this user first');
    }
    if (
      user.otp_timestamp &&
      user.otp_timestamp.getTime() > Date.now() - 300000
    ) {
      throw new ConflictException('OTP resent too quickly');
    }
    if (
      user.otp_timestamp &&
      user.otp_timestamp.getTime() < Date.now() - 600000
    ) {
      throw new ConflictException('OTP Timed Out');
    }
    const newOtp = this.otpService.regenerateOtp(user.otp_secret);

    // TODO: Send the new OTP (e.g., through SMS, email, etc.)

    return {
      message: `OTP sent successfully to your mobile #${newOtp} , #${userId}`, // rmv otp and user id on production
      data: user,
      success: true,
    };
  }

  async GenerateTokens(userID: number, userName: string, userType: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: userID, userName, user_type: userType },
        {
          secret: process.env.JWT_ACCESS_SECRET || 'defaultAccessSecret',
          expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m',
        },
      ),
      this.jwtService.signAsync(
        { sub: userID, userName, user_type: userType },
        {
          secret: process.env.JWT_REFRESH_SECRET || 'defaultRefreshSecret',
          expiresIn: process.env.JWT_REFRESH_EXPIRY || '30d',
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
