import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Establecimiento } from './schemas/establecimiento.schema';
import { CreateEstablecimientoDto } from './dto/create-establecimiento.dto';
import { UpdateEstablecimientoDto } from './dto/update-establecimiento.dto';
import { FilterEstablecimientosDto } from './dto/filter-establecimientos.dto';

@Injectable()
export class EstablecimientosService {
  constructor(
    @InjectModel(Establecimiento.name)
    private establecimientoModel: Model<Establecimiento>,
  ) {}

  async create(dto: CreateEstablecimientoDto) {
    const nuevo = new this.establecimientoModel(dto);
    return nuevo.save();
  }

  async findAll() {
    return this.establecimientoModel.find();
  }

  async findWithFilters(filters: FilterEstablecimientosDto) {
    const query: any = {};

    if (filters.nombre) {
      query.nombre = { $regex: filters.nombre, $options: 'i' };
    }

    if (filters.tipo) {
      query.tipo = filters.tipo;
    }

    if (filters.precioMin || filters.precioMax) {
      query['precios.valor'] = {};
      if (filters.precioMin) query['precios.valor'].$gte = filters.precioMin;
      if (filters.precioMax) query['precios.valor'].$lte = filters.precioMax;
    }

    return this.establecimientoModel.find(query);
  }

  async findOne(id: string) {
    const est = await this.establecimientoModel.findById(id);
    if (!est) throw new NotFoundException('Establecimiento no encontrado');
    return est;
  }

  async update(id: string, dto: UpdateEstablecimientoDto) {
    const actualizado = await this.establecimientoModel.findByIdAndUpdate(
      id,
      dto,
      { new: true },
    );

    if (!actualizado)
      throw new NotFoundException('Establecimiento no encontrado');

    return actualizado;
  }

  async remove(id: string) {
    const eliminado = await this.establecimientoModel.findByIdAndDelete(id);
    if (!eliminado)
      throw new NotFoundException('Establecimiento no encontrado');

    return eliminado;
  }
}
