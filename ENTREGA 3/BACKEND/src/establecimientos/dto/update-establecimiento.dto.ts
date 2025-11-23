import { PartialType } from '@nestjs/mapped-types';
import { CreateEstablecimientoDto } from './create-establecimiento.dto';

export class UpdateEstablecimientoDto extends PartialType(CreateEstablecimientoDto) {}
