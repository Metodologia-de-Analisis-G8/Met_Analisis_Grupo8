import { IsString, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateEstablecimientoDto {
  @IsString()
  nombre: string;

  @IsString()
  tipo: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  ubicacion?: {
    lat: number;
    lng: number;
  };

  @IsOptional()
  @IsArray()
  precios?: {
    servicio: string;
    valor: number;
  }[];
}
