import {
  Injectable,
  Inject,
  UnauthorizedException,
  forwardRef,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OtpService } from '../otp/otp.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

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
      throw new BadRequestException(
        `Provide field 'email' for app-type super_admin`,
      );
    }
    if (!pass) {
      throw new BadRequestException(`Missing field 'password' for super_admin`);
    }
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException(`User with email ${email} not found`);
    }
    const passCheck = await bcrypt.compare(pass, user.password);
    if (!passCheck) {
      throw new UnauthorizedException('Incorrect password');
    }
    return {
      message: 'Login successful',
      tokens: await this.GenerateTokens(user.id, user.name, user.user_type),
      user: user,
    };
  }

  async generateOtpForUser(
    name: string,
    phone: string,
  ): Promise<{ message: string; data: any; success: boolean }> {
    let user = await this.usersService.findUserByPhone(phone);
    if (!user) {
      if (!name) {
        throw new BadRequestException(
          `You have to provide field 'name' for new user`,
        );
      } else {
        user = await this.usersService.createUser({ name, phone });
      }
    }
    const otpSecret = this.otpService.generateSecret(); //user.otpSecret ||
    const otp = this.otpService.generateOtp(otpSecret);
    await this.usersService.updateUserOtpSecret(user, otpSecret);
    return {
      message: `OTP sent successfully to your mobile #${user.phone} #${otp} #${user.id}`, // Remove otp on production
      data: user,
      success: true,
    };
  }

  async verifyOtpForLogin(userId: number, otp: string): Promise<boolean> {
    const user = await this.usersService.findUserById(userId);
    if (!user || user.user_type !== 'end_user') {
      throw new BadRequestException('User not found');
    }
    const isValidOtp = await this.otpService.validateOtp(otp, user.otp_secret);

    if (isValidOtp) {
      const tokens = await this.GenerateTokens(
        user.id,
        user.name,
        user.user_type,
      );
      return true;
    } else {
      return false;
    }
  }

  async resendOtp(
    userId: number,
  ): Promise<{ message: string; data: any; success: boolean }> {
    const user = await this.usersService.findUserById(userId);
    if (!user || user.user_type !== 'end_user') {
      throw new BadRequestException('User not found');
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
