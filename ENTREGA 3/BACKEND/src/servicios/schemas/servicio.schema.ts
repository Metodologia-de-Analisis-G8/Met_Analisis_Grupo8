import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Servicio extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  categoria: string; // alojamiento, comida, tour, etc.

  @Prop()
  descripcion: string;

  @Prop()
  ubicacion: string;

  @Prop()
  precio: number;
}

export const ServicioSchema = SchemaFactory.createForClass(Servicio);
