import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // tipo: 'turista' o 'prestador'
  @Prop({ required: true, enum: ['turista', 'prestador'] })
  tipo: string;

  @Prop({ required: false })
  nombre?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
