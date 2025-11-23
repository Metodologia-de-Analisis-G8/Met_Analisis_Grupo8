import { IsOptional, IsString, IsNumber } from 'class-validator';

export class FilterEstablecimientosDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  tipo?: string;

  @IsOptional()
  @IsNumber()
  precioMin?: number;

  @IsOptional()
  @IsNumber()
  precioMax?: number;
}
