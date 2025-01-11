import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { JwtService as JWT_SERVICE } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private jwtService: JWT_SERVICE) {}

  sign(payload: any) {
    console.log(payload)
    return this.jwtService.signAsync(payload);
  }

  verify(token: string) {
    return this.jwtService.verifyAsync(token);
  }
}
