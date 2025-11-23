import { IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateServicioDto {
  @IsString()
  nombre: string;

  @IsString()
  categoria: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;

  @IsOptional()
  @IsNumber()
  precio?: number;
}
