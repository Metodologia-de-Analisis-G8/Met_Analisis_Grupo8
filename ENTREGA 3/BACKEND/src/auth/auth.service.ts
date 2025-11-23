import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Credenciales incorrectas');

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new UnauthorizedException('Credenciales incorrectas');

    const payload = {
      sub: user._id.toString(),
      email: user.email,
      tipo: user.tipo,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: { id: user._id.toString(), email: user.email, tipo: user.tipo, nombre: user.nombre ?? null },
    };
  }
}
