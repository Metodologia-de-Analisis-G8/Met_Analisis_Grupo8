import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComparadorController } from './comparador.controller';
import { ComparadorService } from './comparador.service';
import { Comparacion, ComparacionSchema } from './schemas/comparacion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Comparacion.name,
        schema: ComparacionSchema,
      },
    ]),
  ],
  controllers: [ComparadorController],
  providers: [ComparadorService],
  exports: [ComparadorService],
})
export class ComparadorModule {}
