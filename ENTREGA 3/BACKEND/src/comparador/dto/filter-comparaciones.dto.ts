import { IsOptional, IsString } from 'class-validator';

export class FilterComparacionesDto {
  @IsOptional()
  @IsString()
  usuarioId?: string;

  @IsOptional()
  @IsString()
  servicioA?: string;

  @IsOptional()
  @IsString()
  servicioB?: string;

  @IsOptional()
  fechaInicio?: string;

  @IsOptional()
  fechaFin?: string;
}
