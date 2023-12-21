import { CanActivate, ExecutionContext } from '@nestjs/common';

export class RoleGaurd implements CanActivate {
  private rolePassed: string;

  constructor(private readonly allowedRoles: string[]) {}
  canActivate(context: ExecutionContext) {
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      return false;
    }

    return this.allowedRoles.includes(user.role);
  }
}
