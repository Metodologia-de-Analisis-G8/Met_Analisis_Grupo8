import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EstablecimientosService } from './establecimientos.service';
import { EstablecimientosController } from './establecimientos.controller';
import { Establecimiento, EstablecimientoSchema } from './schemas/establecimiento.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Establecimiento.name,
        schema: EstablecimientoSchema,
      },
    ]),
  ],
  controllers: [EstablecimientosController],
  providers: [EstablecimientosService],
  exports: [EstablecimientosService],
})
export class EstablecimientosModule {}
