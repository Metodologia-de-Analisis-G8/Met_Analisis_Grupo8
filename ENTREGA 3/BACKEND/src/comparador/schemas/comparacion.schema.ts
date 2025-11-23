import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Comparacion extends Document {
  @Prop({ required: true })
  usuarioId: string;

  @Prop({ required: true })
  servicioA: string; // ID del servicio A

  @Prop({ required: true })
  precioA: number;

  @Prop({ required: true })
  servicioB: string; // ID del servicio B

  @Prop({ required: true })
  precioB: number;

  @Prop()
  resultado: string; // "A es más barato", "B es más barato" o "iguales"
}

export const ComparacionSchema = SchemaFactory.createForClass(Comparacion);
