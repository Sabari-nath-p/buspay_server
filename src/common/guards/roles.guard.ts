import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    try {
      if (!request?.user) {
        throw new Error('User not found in the request');
      }

      const { sub } = request.user;
      const user = await this.userService.findOne(sub);

      if (!user || !user.user_type) {
        throw new Error('User type not available');
      }

      return requiredRoles.includes(user.user_type);
    } catch (error) {
      console.error(`RolesGuard error: ${error.message}`);
      return false;
    }
  }
}
