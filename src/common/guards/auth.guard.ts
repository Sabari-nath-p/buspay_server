import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { SetMetadata } from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const isPublic = this.reflector.getAllAndOverride<boolean>(
        IS_PUBLIC_KEY,
        [context.getHandler(), context.getClass()],
      );

      if (isPublic) {
      }

      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);

      if (!token) {
        throw new UnauthorizedException('Authorization token not provided');
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_ACCESS_SECRET,
        complete: false,
        ignoreExpiration: true,
      });

      const refreshToken = this.parseCombinedToken(token);

      if (this.isTokenExpired(payload)) {
        const refreshTokenPayload = await this.jwtService.verifyAsync(
          refreshToken,
          {
            secret: process.env.JWT_REFRESH_SECRET,
            complete: false,
            ignoreExpiration: true,
          },
        );

        if (this.isTokenExpired(refreshTokenPayload)) {
          throw new UnauthorizedException('Invalid or expired token');
        }

        const newAccessToken = await this.GenerateTokens(
          payload.sub,
          payload.userName,
        );

        throw new UnauthorizedException({
          message: 'Access token expired, new access token provided',
          error: 'Unauthorized',
          statusCode: 401,
          token: newAccessToken ?? null,
        });
      }

      request['user'] = payload;
      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException && error.getResponse()) {
        const errorResponse = error.getResponse() as {
          message: string;
          token: string;
        };

        if (errorResponse.token) {
          context.switchToHttp().getResponse().status(401).json({
            message: 'Invalid or expired token',
            error: 'Unauthorized',
            token: errorResponse.token,
          });
        }
        // throw new UnauthorizedException({
        //   message: error.message,
        //   error: 'Unauthorized',
        // });
      }

      throw new UnauthorizedException({
        message: error.message,
        error: 'Unauthorized',
      });
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private isTokenExpired(payload: any): boolean {
    if (payload && payload.exp !== undefined) {
      return payload.exp < Date.now() / 1000;
    }
    return true;
  }

  private parseCombinedToken(combinedToken: string) {
    const payload = JSON.parse(
      Buffer.from(combinedToken.split('.')[1], 'base64').toString('utf-8'),
    );
    if (!payload) {
      throw new UnauthorizedException('Invalid token format');
    }
    return payload.refreshToken;
  }

  async GenerateTokens(userID: number, userName: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userID,
          userName,
        },
        {
          secret: process.env.JWT_ACCESS_SECRET,
          expiresIn: process.env.JWT_ACCESS_EXPIRY,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userID,
          userName,
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: process.env.JWT_REFRESH_EXPIRY,
        },
      ),
    ]);

    const combinedToken = this.jwtService.sign(
      {
        sub: userID,
        userName,
        refreshToken,
      },
      {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: process.env.JWT_ACCESS_EXPIRY,
      },
    );
    return combinedToken;
  }
}
