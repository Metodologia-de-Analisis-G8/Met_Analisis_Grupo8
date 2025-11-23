import { IsOptional, IsString } from 'class-validator';

export class FilterServiciosDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @IsString()
  categoria?: string;

  @IsOptional()
  @IsString()
  ubicacion?: string;
}
