import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Establecimiento extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  tipo: string; // hotel, restaurante, tour, etc.

  @Prop()
  descripcion: string;

  @Prop()
  direccion: string;

  @Prop({
    type: {
      lat: Number,
      lng: Number,
    },
  })
  ubicacion: {
    lat: number;
    lng: number;
  };

  @Prop({
    type: [
      {
        servicio: String,
        valor: Number,
      },
    ],
  })
  precios: {
    servicio: string;
    valor: number;
  }[];
}

export const EstablecimientoSchema =
  SchemaFactory.createForClass(Establecimiento);
