import {
  CanActivate,
  ExecutionContext,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { HttpError } from 'http/error';
import { JwtService } from 'jwt/jwt.service';
import { TokenExpiredError } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    // const res = context.switchToHttp().getResponse();
    try {
      const token = this.extractTokenFromHeader(request);
      if (!token) {
        throw new HttpError('Token Missing', '', HttpStatus.NO_CONTENT);
      }
      try {
        const payload = await this.jwtService.verify(token);
        request['user'] = payload;
      } catch (error) {
        if (error instanceof TokenExpiredError) {
          throw new HttpError('Token Expired', '', HttpStatus.UNAUTHORIZED);
        } else {
          throw new HttpError('Token Invalid', '', HttpStatus.UNAUTHORIZED);
        }
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
