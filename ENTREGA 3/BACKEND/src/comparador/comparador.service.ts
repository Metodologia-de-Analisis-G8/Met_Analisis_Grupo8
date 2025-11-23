import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comparacion } from './schemas/comparacion.schema';
import { CreateComparacionDto } from './dto/create-comparacion.dto';
import { FilterComparacionesDto } from './dto/filter-comparaciones.dto';

@Injectable()
export class ComparadorService {
  constructor(
    @InjectModel(Comparacion.name)
    private comparacionModel: Model<Comparacion>,
  ) {}

  async crearComparacion(dto: CreateComparacionDto) {
    const resultado =
      dto.precioA === dto.precioB
        ? 'iguales'
        : dto.precioA < dto.precioB
        ? 'A es más barato'
        : 'B es más barato';

    const nueva = new this.comparacionModel({
      ...dto,
      resultado,
    });

    return nueva.save();
  }

  async obtenerTodas() {
    return this.comparacionModel.find();
  }

  async filtrarComparaciones(filters: FilterComparacionesDto) {
    const query: any = {};

    if (filters.usuarioId) query.usuarioId = filters.usuarioId;
    if (filters.servicioA) query.servicioA = filters.servicioA;
    if (filters.servicioB) query.servicioB = filters.servicioB;

    // Filtro por rango de fechas
    if (filters.fechaInicio || filters.fechaFin) {
      query.createdAt = {};

      if (filters.fechaInicio) {
        query.createdAt.$gte = new Date(filters.fechaInicio);
      }

      if (filters.fechaFin) {
        query.createdAt.$lte = new Date(filters.fechaFin);
      }
    }

    return this.comparacionModel.find(query);
  }
}
