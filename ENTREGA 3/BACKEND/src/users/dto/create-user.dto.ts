import { IsEmail, IsEnum, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(4)
  password: string;

  @IsEnum(['turista', 'prestador'])
  tipo: string;

  @IsOptional()
  nombre?: string;
}
