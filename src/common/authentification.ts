import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { Observable } from 'rxjs';
import config from './config';

export function createToken(id: string, login: string): string {
  return sign({ userId: id, login }, config.JWT_SECRET_KEY);
}

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    if (req.headers.authorization === undefined) {
      throw new UnauthorizedException('No token sent');
    }

    const [type, token] = req.headers.authorization.toString().split(' ');

    if (type !== 'Bearer' || !verify(token, config.JWT_SECRET_KEY)) {
      throw new UnauthorizedException('Incorrect token');
    }

    return true;
  }
}
