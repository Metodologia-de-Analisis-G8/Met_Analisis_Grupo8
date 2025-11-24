import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

  @Post('register/turista')
  registerTurista(@Body() body: Omit<CreateUserDto, 'tipo'>) {
    return this.authService.register({ ...body, tipo: 'turista' });
  }

  @Post('register/prestador')
  registerPrestador(@Body() body: Omit<CreateUserDto, 'tipo'>) {
    return this.authService.register({ ...body, tipo: 'prestador' });
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
}
