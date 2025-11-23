import { IsString, IsNumber } from 'class-validator';

export class CreateComparacionDto {
  @IsString()
  usuarioId: string;

  @IsString()
  servicioA: string;

  @IsNumber()
  precioA: number;

  @IsString()
  servicioB: string;

  @IsNumber()
  precioB: number;
}
